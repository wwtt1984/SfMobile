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
            locationtree: 'info locationtree',
            photo: 'photo',
            photodelete: '[itemId=photodelete]',
            photoback: '[itemId=photoback]',
            markconfirm: '[itemId=markconfirm]',

            location: '[itemId=location]',
            tarea_ms: '[itemId=tarea_ms]',

            infofunction: '[itemId=infofunction]',
            locationconfirm: '[itemId=locationconfirm]',
            treeselect: '[itemId=treeselect]',
            status: '[itemId=status]'
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
            },
            treeselect: {
                selectionchange: 'onSelectionChange'
            },
            locationconfirm: {
                tap: 'onLocationConfirmTap'
            },
            status: {
                change: 'onStatusChange'
            }

        }
    },

    onMarkInitialize: function(local){

        var me = this;
        me.markmain = me.getMarkmain();
        if(!me.markmain){
            me.markmain = Ext.create('SfMobile.view.mark.MarkMain');
        }

        me.local = local;

        if(local == 'project'){
            me.markmain.setTitle('工程巡查');
        }
        else{
            me.markmain.setTitle('电厂巡查');
        }
        me.getLocation().setData({location: '请选择部位', detail: ''});
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

    onGeolocationFail:function(error,me)
    {
        Ext.Viewport.setMasked(false);
        plugins.Toast.ShowToast("定位失败!"+error.message,3000);
        me.getMarkconfirm().enable();
    },

    onUploadImg:function(lat,lng,me){

//        var location = me.getLocation().getValue();
        var location = me.getLocation().getData().location;

        //增加“状态描述”
        //var location = me.getStatus().getValue();

        var miaos = me.getTarea_ms().getValue();
        var sdt = '2014-04-09';
        var store = Ext.getStore("PhotoStore");
        var record = store.getAt(me.upimgindex);
        var imageURI = record.get("src");
        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
        options.mimeType = "image/jpeg";

        var results = SfMobile.app.user.sid +"$"
            + SfMobile.app.user.name + "$" + lng + "$" + lat + "$" + sdt
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

        ft.upload(imageURI, encodeURI("http://122.226.205.102/sbskSer/data_ht.ashx?t=IntPhotoImg&results=" + results),
            function(r){me.onMenuPhotoSucMsg(r,me);},
            function(r){me.onMenuPhotoFailMsg(r,me);},
            options);

    },

    onLocationTap: function(){
        var me = this;
        me.locationtree = me.getLocationtree();
        if(!me.locationtree){
            me.locationtree = Ext.create('SfMobile.view.mark.LocationTree');
        }

        var store;
        if(me.local == 'project'){
            store = Ext.getStore('ProjectLocationStore');
        }
        else{
            store = Ext.getStore('PlantLocationStore');
        }
        me.getTreeselect().setStore(store);
        me.getInfofunction().hide();
        me.getLocationconfirm().show();
        me.getInfo().push(me.locationtree);
    },

    onSelectionChange: function(container, list, record, e){
        var me = this;
        var arr = list.getSelection();

        me.projecttext = arr[0].data.text;
        me.detail = arr[0].data.detail;
    },

    onLocationConfirmTap: function(){
        var me = this;
        me.getLocation().setData({location: me.projecttext, detail: me.detail});
        me.getInfo().pop();
        me.getLocationconfirm().hide();
        me.getInfofunction().show();
    },

    //选择 “状态情况”，对“描述”进行联动
    onStatusChange: function(field, newValue, oldValue, eOpts){
        var me = this;
        if(newValue == 'normal'){
            me.getTarea_ms().setValue('正常');
        }
        else{
            me.getTarea_ms().setValue('');
        }
    }
})
