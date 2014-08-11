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
            saveconfirm: '[itemId=saveconfirm]',

            location: '[itemId=location]',
            tarea_ms: '[itemId=tarea_ms]',

            infofunction: '[itemId=infofunction]',
            locationconfirm: '[itemId=locationconfirm]',
            treeselect: '[itemId=treeselect]',
            status: '[itemId=status]',
            grade: '[itemId=grade]',
            processtime: '[itemId=processtime]'
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
            saveconfirm: {
                tap: 'onSaveConfirmTap'
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

        me.load = 0;

        SfMobile.app.imginfo.imgjson.length = 0;
        me.upimgindex = 0;
        me.upimgcount = 0; //// 清0
        me.simgid = '';
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
//        me.upimgindex = 0;
//        me.simgid = '';
        var store = Ext.getStore("PhotoStore");////上传图片
        me.upimgcount = store.getCount() - 1;////上传图片数量
        me.lat = null;/////纬度
        me.lng = null ////经度

        if(me.upimgcount == 0)
        {
            plugins.Toast.ShowToast("图片上传一张吧!",3000);
        }
        else
        {
            me.getMarkconfirm().disable();
            me.getSaveconfirm().disable();
            Ext.Viewport.setMasked({xtype:'loadmask',message:'位置获取中,请稍后...'});
            navigator.geolocation.getCurrentPosition(
                function(position){me.onGeolocationSuccess(position,me);},
                function(error){me.onGeolocationFail(error,me);},
                { maximumAge: 3000, timeout: 30000, enableHighAccuracy: true }
            );
        }
    },

    onMenuPhotoSucMsg:function(position,r,me)
    {
        me.upimgindex++;
        if(me.upimgindex < me.upimgcount)
        {
            me.onUploadImg(position,me.lat,me.lng,me);
        }
        else
        {
            plugins.Toast.ShowToast("上传成功!",3000);
            me.onPhotoInit();
            me.getApplication().getController('MainControl').getLoad().hide();
        }
    },

    onPhotoInit: function(){
        var me = this;
        me.getPhoto().onPhotoAllDelete();
        me.getTarea_ms().setValue(null);
//            Ext.getCmp('onprogress').setHtml(null);
        SfMobile.app.imginfo.imgjson.length = 0;
        me.upimgindex = 0;
        me.upimgcount = 0; //// 清0
        me.simgid = '';
        me.getMarkconfirm().enable();
        me.getSaveconfirm().enable();
    },

    onMenuPhotoFailMsg:function(position,error,me)
    {
        plugins.Toast.ShowToast("上传失败!"+ error,3000);
        me.onFailDataAdd(position);
        me.getApplication().getController('MainControl').getLoad().hide();
        me.getMarkconfirm().enable();
        me.getSaveconfirm().enable();
    },

    onGeolocationSuccess:function(position,me)
    {
        Ext.Viewport.setMasked(false);
        me.lat = position.coords.latitude;
        me.lng = position.coords.longitude;
        me.onUploadImg(position, me.lat,me.lng,me);
    },

    onGeolocationFail:function(error,me)
    {
        Ext.Viewport.setMasked(false);
        plugins.Toast.ShowToast("定位失败!"+error.message,3000);
        me.getMarkconfirm().enable();
        me.getSaveconfirm().enable();
    },

    onUploadImg:function(position,lat,lng,me){

//        var location = me.getLocation().getValue();
        var location = me.getLocation().getData().location;

        //增加“状态描述”
        //var location = me.getStatus().getValue();

        var miaos = me.getTarea_ms().getValue();

//        var status = me.getStatus().getValue();
        var grade = me.getGrade().getValue();
        var processtime = me.getProcesstime().getValue();

        var sdt = Ext.Date.format(new Date(), 'Y-m-d H:m:s').toString();
        var store = Ext.getStore("PhotoStore");
        var record = store.getAt(me.upimgindex);
        var imageURI = record.get("src");
        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
        options.mimeType = "image/jpeg";

        var sindex;

//        if(me.upimgcount > 1 && me.upimgindex == 0)
        if(me.upimgindex == 0)
        {
            me.simgid = this.unix_to_datetimestr();
        }

        var results = SfMobile.app.user.sid +"$"
            + SfMobile.app.user.name + "$" + lng + "$" + lat + "$" + sdt
            + "$sz$" + miaos + "$" + location + "$" + me.simgid + "$" + me.upimgindex
            + "$" + processtime + "$" + grade;
        alert(SfMobile.app.user.sid +"$"
            + SfMobile.app.user.name + "$" + lng + "$" + lat + "$" + sdt
            + "$sz$" + miaos + "$" + location + "$" + me.simgid + "$" + me.upimgindex
            + "$" + processtime + "$" + grade);

        var ft = new FileTransfer();
        me.getApplication().getController('MainControl').onLoadOrUploadViewShow('正在上传中', '正在上传第1张', 0);
        ft.onprogress = function(progressEvent) {
            if (progressEvent.lengthComputable) {
                var percent = Number((progressEvent.loaded / progressEvent.total) * 100).toFixed(0);
                var nowindex = me.upimgindex + 1;
//                Ext.getCmp('onprogress').setHtml("正在上传第 "+ nowindex +"/"
//                    + me.upimgcount
//                    + " 图片,已完成" + percent + "%,请稍后...");
                me.getApplication().getController('MainControl').getLoad().onDataSet('正在上传中', '正在上传第'+ nowindex + '/' + me.upimgcount + '张,已完成',percent);
            } else {
                plugins.Toast.ShowToast("error",1000);
            }
        };

        ft.upload(imageURI, encodeURI("http://122.226.205.102/sbskSer/data_ht.ashx?t=IntPhotoImg&results=" + results),
            function(r){me.onMenuPhotoSucMsg(position,r,me);},
            function(r){me.onMenuPhotoFailMsg(position,r,me);},
            options);

    },

    //点击“上传”按钮，上传失败后，将事件加入UploadStore中，同时存入本地文件fail.json中
    onFailDataAdd: function(position){

        alert('添加只uploadstore');
        var me = this;

        var imgjson = SfMobile.app.imginfo.imgjson.join(',');

        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var sdt = Ext.Date.format(new Date(), 'Y-m-d H:m:s').toString();
        var miaos = me.getTarea_ms().getValue();
        var sindex = 0;

//        var simgid = this.unix_to_datetimestr();
        var simgid;
        if(!me.simgid){
            me.simgid = this.unix_to_datetimestr();
            me.upimgindex = 0;
        }
        simgid = me.simgid;

        var sid = SfMobile.app.user.sid;
        var name = SfMobile.app.user.name;

        var grade = me.getGrade().getValue();
        var processtime = me.getProcesstime().getValue();

        var location = me.getLocation().getData().location;
        var status = me.getStatus().getValue();

        var store = Ext.getStore('UploadStore');

        store.add({sid: sid, name: name, simgid: simgid, sindex: sindex, latitude: latitude, longitude: longitude,
            sdt: sdt, miaos: miaos, imgjson: imgjson, imgindex: me.upimgindex, location: location, type: 'sz',
            grade: grade, processtime: processtime, status: status});

        store.sync();

        alert('UploadStore' + store.getAllCount());
        me.onFailRecordToJson(store, 0);
    },

    unix_to_datetimestr:function(){

        var date = new Date();
        var sdate = '';

        var month = date.getMonth()+1;
        if(month < 10) month='0'+ parseInt(date.getMonth()+1).toString();

        var day = date.getDate();
        if(day < 10) day='0'+ parseInt(date.getDate()).toString();

        sdate += date.getFullYear().toString()
            +  month.toString() //月份
            +  day.toString() //日
            +  date.getHours().toString() //小时
            +  date.getMinutes().toString() //分
            +  date.getSeconds().toString() //秒
            +  date.getMilliseconds().toString(); //毫秒

        return sdate;

    },

    //UploadStore中记录增减的同时，修改本地文件fail.json文件
    onFailRecordToJson: function(store, id){

        alert('开始添加至文件！');
        var hq = [];

        for(var i = 0; i < store.getAllCount(); i++){
            hq.push(store.getAt(i).data);
        }

        var me = this;

        Ext.device.FileSystem.requestFileSystem({
            type: LocalFileSystem.PERSISTENT,
            size: 1024 * 1024,
            success: function(fileSystem) {

                alert('进入文件系统！');
                me.fs = fileSystem;

                var fe = Ext.create("Ext.device.filesystem.FileEntry", "sffail.json", fileSystem);

                fe.getEntry(
                    {
                        file: 'sffail.json',
                        options: {create: true},
                        success: function(entry) {
                            alert('找到了sffail');
                            fe.write(
                                {
                                    data: Ext.JSON.encode(hq),
                                    success: function() {
                                        alert('存入成功');
                                        plugins.Toast.ShowToast("失败记录已存入本地文件中！",3000);
                                        if(id == 0){
                                            me.onPhotoInit();
                                        }
                                    },
                                    failure: function(error) {
                                        plugins.Toast.ShowToast("失败记录存入本地文件失败！请重试！",3000);
                                    }
                                });
                        },

                        failure: function(error){
                            plugins.Toast.ShowToast("本地文件获取失败！",3000);
                        }
                    });
            },

            failure: function(err) {
                plugins.Toast.ShowToast("请求文件系统失败！" + err.code,3000);
            }
        });
    },

    onSaveConfirmTap: function(){
        var me = this;

        var imgjson = SfMobile.app.imginfo.imgjson.join(',');
        var count = imgjson.length;////保存图片数量

        me.lat = '';
        me.lng = '';

        if(count == 0)
        {
            plugins.Toast.ShowToast("没有图片需要保存!",3000);
        }
        else
        {
            me.getMarkconfirm().disable();
            me.getSaveconfirm().disable();
            Ext.Viewport.setMasked({xtype:'loadmask',message:'位置获取中,请稍后...'});
            navigator.geolocation.getCurrentPosition(
                function(position){me.onLocalGeolocationSuccess(position,me);},
                function(error){me.onLocalGeolocationFail(error,me);},
                { maximumAge: 3000, timeout: 30000, enableHighAccuracy: true }
            );
        }
    },

    onLocalGeolocationSuccess: function(position,me){
        Ext.Viewport.setMasked(false);
        me.lat = position.coords.latitude;
        me.lng = position.coords.longitude;
        plugins.Toast.ShowToast("定位成功!正在保存中！",3000);
        me.onFailDataAdd(position);
    },

    onLocalGeolocationFail: function(error,me){
        Ext.Viewport.setMasked(false);
        plugins.Toast.ShowToast("定位失败!"+error.message,3000);
        me.getMarkconfirm().enable();
        me.getSaveconfirm().enable();
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
            me.getTarea_ms().setValue('安全');
            me.getGrade().hide();
            me.getProcesstime().hide();
        }
        else{
            me.getTarea_ms().setValue('');
            me.getGrade().show();
            me.getProcesstime().show();
            me.getProcesstime().blur();
        }
    },

    //判断本地文件fail.json中是否有失败记录，若有，则取出放入UploadStore中
    onFailDataFile: function(){

        var me = this;

        Ext.device.FileSystem.requestFileSystem({
            type: LocalFileSystem.PERSISTENT,
            size: 1024 * 1024,
            success: function(fileSystem) {

                me.fs = fileSystem;

                var fe = Ext.create("Ext.device.filesystem.FileEntry", "sffail.json", fileSystem);

                fe.getEntry(
                    {
                        file: 'sffail.json',
                        options: {create: true},
                        success: function(entry) {

                            fe.read({
                                type: 'text',
                                success: function(data){

                                    if(data){
                                        var hq = Ext.JSON.decode(data);

                                        plugins.Toast.ShowToast("存在上传失败记录！",3000);
                                        var store = Ext.getStore('UploadStore');
                                        store.setData(hq);
                                        store.sync();
                                        alert("失败记录:" + store.getAllCount());
                                    }

                                },

                                failure: function(error){
                                    plugins.Toast.ShowToast("不存在上传失败记录！",3000);
                                }
                            });
                        },
                        failure: function(error) {plugins.Toast.ShowToast("读取记录文件失败！",3000);}
                    });
            },
            failure: function(err) {
                plugins.Toast.ShowToast("请求文件系统失败！" + err.code,3000);
            }
        });
    }
})
