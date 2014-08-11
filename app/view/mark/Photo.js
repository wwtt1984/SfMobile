/**
 * Created by USER on 14-3-25.
 */
Ext.define('SfMobile.view.mark.Photo',{
    extend: 'Ext.Container',
    xtype: 'photo',

    config: {
        itemId: 'photo',
        cls: 'x-content',
        style: 'background:#fff;',
        html: null
    },

    getWeatherTemplate: function() {
        return new Ext.XTemplate([
            '<tpl for=".">',
            '<div class="day" id="imgadd0">',
            '<div class="icon" >',
            '<img src="{data.src}" id={[this.getLinkId(values)]} />',
            '</div>',
            '</div>',
            '</tpl>',
            {

                getLinkId: function(values) {
                    var result = Ext.id();
                    Ext.Function.defer(this.addListener, 1, this, [result,values]);
                    return result;
                },
                addListener: function(id,values) {
                    var me = this;
                    Ext.get(id).on('tap', function(e){
                        e.stopEvent();
                        Ext.ComponentQuery.query('#tarea_ms')[0].blur();///////////////焦点失去
                        me.addImg();
                    })//////增加add图片的事件
                },
                addImg:function(){

                    var me = this;
                    var store = Ext.getStore('PhotoStore');
                    if(store.getCount() <= 5)
                    {

//                        navigator.camera.getPicture(
//                            function(image){me.onPhotoDataSuccess(image)},
//                            function(){me.onFail},
//                            {
//                                quality: 50,
//                                targetWidth: 900,
//                                targetHeight: 1200,
//                                correctOrientation: true,
//                                destinationType: Camera.DestinationType.FILE_URI
//                        });
                        Ext.device.Camera.capture({
                            success :function(image){me.onPhotoDataSuccess(image)},
                            failure: function(){me.onFail},
                            quality: 50,
                            targetWidth: 900,
                            targetHeight: 1200,
                            correctOrientation: true,
                            destination:  'file'
                        });

                    }
                    else
                    {
                        plugins.Toast.ShowToast("暂时只能上传5张图片!",3000);
                    }

                },
                onPhotoDataSuccess: function(imageData) {

                    SfMobile.app.imginfo.imgjson.push(imageData);
                    Ext.ComponentQuery.query('#photo')[0].onDataSet(imageData);
                },
                onFail: function(message) {
                    plugins.Toast.ShowToast(message,3000);
                }
            }
        ]);
    },

    initialize: function(){
        var me = this;
        me.store = Ext.getStore('PhotoStore');
        var contentView = Ext.ComponentQuery.query('#photo')[0];
        var tpl =  me.getWeatherTemplate();
        me.store.load(function(records, operation, success) {

            contentView.setHtml(tpl.apply(me.store.getData().all));
        });
        me.callParent(arguments);
        this.photoindex = 0;
    },

    onDataSet: function(image){

        var me = this;
        var imgname = me.photoindex + 1;
        var data = {id: 'A' + imgname, name: imgname, imgadd: "imgadd" + imgname, src: image};
        var index = this.store.getAllCount();
        me.store.insert(index-1, data);

        var imgiconname = "imgsrc" + imgname;
        Ext.DomHelper.insertBefore("imgadd0", "<div class=\"day\" id=\"imgadd" + imgname + "\">"
            +"<div class=\"icon\" >"
            +"<img src=\""+image+"\" id=\""+imgiconname+"\" />"
            +"</div>"
            +"</div>");

        me.addImgListener(imgiconname,index-1);
//        me.photoindex = me.store.getCount() - 1;
        me.photoindex++;
    },

    addImgListener: function(id,storeid) {
        var me = this;
        Ext.get(id).addListener('tap', function(e){
            e.stopEvent();
            Ext.ComponentQuery.query('#tarea_ms')[0].blur();/////////////////把焦点失掉//////////////////////////
            Ext.ComponentQuery.query('#info')[0].onPhotoShow(id, storeid);
        });
    },

    clearImgListeners : function(){
        var me = this;
        var store = Ext.getStore('PhotoStore');

        var i = store.getAllCount();
        while(--i) {
            var id = "imgsrc" + store.getAt(i-1).data.name;
            Ext.get(id).clearListeners();
        }
    },

    onPhotoDelete: function(record){
        var id = "imgsrc" + record.data.name;
        Ext.get(id).clearListeners();

        var div = document.getElementById(record.data.imgadd);
        div.parentNode.removeChild(div);   //删除
    },

    onPhotoAllDelete: function(){
        var store = Ext.getStore('PhotoStore');
        var count = store.getAllCount();

        for(var i=count-2; i>=0; i--){
            var record = store.getAt(i);
            var id = "imgsrc" + record.data.name;
            Ext.get(id).clearListeners();

            var div = document.getElementById(record.data.imgadd);
            div.parentNode.removeChild(div);   //删除
            store.removeAt(i);
        }
    }
})