/**
 * Created by USER on 14-4-9.
 */

Ext.define('SfMobile.controller.MarkControl', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.app.Route'
    ],

    config: {

        refs: {
            info: 'info',
            markmain: 'info markmain',
            mark: 'mark',
            photo: 'photo',
            photodelete: '[itemId=photodelete]',
            photoback: '[itemId=photoback]',
            markconfirm: '[itemId=markconfirm]',

            location: '[itemId=location]',
            tarea_ms: '[itemId=tarea_ms]'
        },

        control: {

            photodelete: {
                tap: 'onPhotoDeleteTap'
            },
            photoback: {
                tap: 'onPhotoBackTap'
            },
            markconfirm: {
                tap: 'onMarkConfirmTap'
            }

        }
    },

    onMarkInitialize: function(){

        var me = this;
        me.markmain = me.getMarkmain();
        if(!me.markmain){
            me.markmain = Ext.create('SfMobile.view.mark.MarkMain');
        }
        me.getInfo().push(me.markmain);
    },

    onPhotoDeleteTap: function(){
        this.getInfo().onPhotoDelete();
    },

    onPhotoBackTap: function(){
        var me = this;
        me.getInfo().onViewHide();
    },

    onMarkConfirmTap: function(){

        var me = this;
        this.upimgindex = 0;
        var store = Ext.getStore("PhotoStore");////上传图片
        this.upimgcount = store.getCount() - 1;////上传图片数量
        this.lat = null;/////纬度
        this.lng = null ////经度

        if(this.upimgcount == 0)
        {
            plugins.Toast.ShowToast("图片上传一张吧!",3000);
        }
        else
        {
            me.getMarkconfirm().disable();
            Ext.Viewport.setMasked({xtype:'loadmask',message:'位置获取中,请稍后...'});
            navigator.geolocation.getCurrentPosition(
                function(position){me.onGeolocationSuccess(position,me);},
                function(error){me.onGeolocationFail(error,me);},
                { maximumAge: 3000, timeout: 30000, enableHighAccuracy: true }
            );
        }
    },

    onMenuPhotoSucMsg:function(r,me)
    {
        me.upimgindex++;
        if(me.upimgindex < me.upimgcount)
        {
            me.onUploadImg(me.lat,me.lng,me);
        }
        else
        {
            plugins.Toast.ShowToast("上传成功!",3000);
            me.getPhoto().onPhotoAllDelete();
            me.getTarea_ms().setValue(null);
            Ext.getCmp('onprogress').setHtml(null);
            me.upimgindex = 0;
            me.upimgcount = 0; //// 清0
            me.getMarkconfirm().enable();
        }
    },

    onMenuPhotoFailMsg:function(error,me)
    {
        plugins.Toast.ShowToast("上传失败!"+ error,3000);
        me.getMarkconfirm().enable();
    },

    onGeolocationSuccess:function(position,me)
    {
        Ext.Viewport.setMasked(false);
        me.lat = position.coords.latitude;
        me.lng = position.coords.longitude;
        me.onUploadImg(me.lat,me.lng,me);

    },

    onGeolocationFail:function(error)
    {
        Ext.Viewport.setMasked(false);
        plugins.Toast.ShowToast("定位失败!"+error.message,3000);
    },

    onUploadImg:function(lat,lng,me){

        var location = me.getLocation().getValue();
        var miaos = me.getTarea_ms().getValue();
        var sdt = '2014-04-09';
        var store = Ext.getStore("PhotoStore");
        var record = store.getAt(me.upimgindex);
        var imageURI = record.get("src");
        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
        options.mimeType = "image/jpeg";

        var results = SfMobile.app.user.name +"$"
            +"" + "$" + lng + "$" + lat + "$" + sdt
            + "$sz$" + miaos + "$" + location;

        var ft = new FileTransfer();
        ft.onprogress = function(progressEvent) {
            if (progressEvent.lengthComputable) {
                var percent = Number((progressEvent.loaded / progressEvent.total) * 100).toFixed(0);
                var nowindex = me.upimgindex + 1;
                Ext.getCmp('onprogress').setHtml("正在上传第 "+ nowindex +"/"
                    + me.upimgcount
                    + " 图片,已完成" + percent + "%,请稍后...");
            } else {
                plugins.Toast.ShowToast("error",1000);
            }
        };
        ft.upload(imageURI, encodeURI("http://webservices.qgj.cn/sbskService/Data_Ht.ashx?t=IntPhotoImg&results=" + results),
            function(r){me.onMenuPhotoSucMsg(r,me);},
            function(r){me.onMenuPhotoFailMsg(r,me);},
        options);

    }
})
