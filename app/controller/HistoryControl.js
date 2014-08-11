/**
 * Created by USER on 14-8-8.
 */

Ext.define('SfMobile.controller.HistoryControl', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.app.Route'
    ],

    config: {

        refs: {
            info: 'info',
            infofunction: '[itemId=infofunction]',

            history: 'info history',

            uploadall: '[itemId=uploadall]',

            historydetail: 'info historydetail'
        },

        control: {
            history: {
                itemswipe: 'onHistoryItemSwipe',
                itemtap: 'onHistoryItemTap'
            },
            uploadall: {
                tap: 'onUploadAllTap'
            }

        }
    },

    onHistoryInitialize: function(){

        var me = this;

        me.getApplication().getController('MarkControl').onFailDataFile();

        me.history = me.getHistory();
        if(!me.history){
            me.history = Ext.create('SfMobile.view.history.History');
        }
        me.getUploadall().show();
        me.getInfo().push(me.history);
        me.load = 0;
    },

    onHistoryItemSwipe: function(dataview, index, target, record, e, eOpts) {

        //show item delete button
        if(target.query('button')[0]){
            target.query('button')[0].show();
        }

        Ext.Viewport.element.addListener({tap:function(){
            if(target.query('button')[0] && (target.query('button')[0].getHidden() == false)){
                target.query('button')[0].hide();
            }
        }, single:true});

    },

    onHistoryItemTap: function(list, index, target, record, e, eOpts ){
        var me = this;
        me.historydetail = me.getHistorydetail();
        if(!me.historydetail){
            me.historydetail = Ext.create('SfMobile.view.history.HistoryDetail');
        }
        me.historydetail.onDataSet(record);
        me.getInfofunction().hide();
        me.getUploadall().hide();
        me.getInfo().push(me.historydetail);
    },

    onUploadAllTap: function(){

        var me = this;
        me.getInfofunction().disable();
        me.getUploadall().disable();

        me.onAllRecordUploadBegin();
    },

    onAllRecordUploadBegin: function(){

        plugins.Toast.ShowToast("准备上传本地记录!",3000);
        var me = this;
        var store = Ext.getStore('UploadStore');


        if(me.load == 0){
            me.load = 1;
            var record = store.getAt(0);
            me.onRecordUpload(record, 1);
        }
    },

    //开始上传图片，record为store中的记录，status=0时，说明记录中的图片上传失败，status=1时，说明单张图片上传成功，可以继续上传剩余的图片，或者所有图片上传成功，将record从store中删除
    onRecordUpload: function(record, status){
        var me = this;
        if(status == 1){

            if(record.data.imgindex < record.data.imgjson.split(',').length){
                me.onRecordUpLoadImg(record);
            }
            else{
                var store = Ext.getStore('UploadStore');
                store.removeAt(0);
                store.sync();

                me.onFailRecordToJson(store, 1);
            }
        }
        else{
            me.load = 0;
            me.getInfofunction().enable();
            me.getUploadall().enable();
            me.getApplication().getController('MainControl').getLoad().hide();
            me.onFailRecordToJson(store, 0);
        }
    },


    //单张图片上传
    onRecordUpLoadImg: function(record){

        var me = this;

        var imgjson = record.data.imgjson.split(',');

        var imgcount = imgjson.length;

        var lat = record.data.latitude;
        var lng = record.data.longitude;
        var sdt = record.data.sdt;
        var miaos = record.data.miaos;
        var sindex = record.data.sindex;

        var imgindex = record.data.imgindex;

        var simgid = record.data.simgid;
        var sid = record.data.sid;
        var name = record.data.name;
        var processtime = record.data.processtime;
        var grade = record.data.grade;

        var location = record.data.location;

        var imageURI = imgjson[imgindex];

        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
        options.mimeType = "image/jpeg";

        var results = SfMobile.app.user.sid +"$"
            + SfMobile.app.user.name + "$" + lng + "$" + lat + "$" + sdt
            + "$sz$" + miaos + "$" + location + "$" + simgid + "$" + imgindex
            + "$" + processtime + "$" + grade;

        var ft = new FileTransfer();
        me.getApplication().getController('MainControl').onLoadOrUploadViewShow('正在上传中', '正在上传第1张', 0);
        ft.onprogress = function(progressEvent) {
            if (progressEvent.lengthComputable) {
                var percent = Number((progressEvent.loaded / progressEvent.total) * 100).toFixed(0);
                var nowindex = imgindex + 1;
                me.getApplication().getController('MainControl').getLoad().onDataSet('正在上传中', '正在上传第'+ nowindex + '/' + imgcount + '张,已完成',percent);
            } else {
                plugins.Toast.ShowToast("error",1000);
            }
        };

        ft.upload(imageURI, encodeURI("http://122.226.205.102/sbskSer/data_ht.ashx?t=IntPhotoImg&results=" + results),
            function(r){
                record.data.imgindex++;
                me.onRecordUpload(record, 1);
            },

            function(r){
                plugins.Toast.ShowToast("上传失败!稍后将继续重试!",3000);
                me.onRecordUpload(record, 0);
            },
            options);
    },

    //UploadStore中记录增减的同时，修改本地文件fail.json文件
    onFailRecordToJson: function(store, id){

        var hq = [];

        for(var i = 0; i < store.getAllCount(); i++){
            hq.push(store.getAt(i).data);
        }

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

                            fe.write(
                                {
                                    data: Ext.JSON.encode(hq),
                                    success: function() {

                                        plugins.Toast.ShowToast("已更新记录文件！",3000);

                                        if(id == 1){
                                            if(store.getAllCount() != 0){
                                                plugins.Toast.ShowToast("一组上传成功!还剩" + store.getAllCount() + "组",3000);
                                                var red = store.getAt(0);
                                                me.onRecordUpload(red, 1);
                                            }
                                            else{
                                                plugins.Toast.ShowToast("全部上传成功!",3000);
                                                me.load = 0;
                                                me.getInfofunction().enable();
                                                me.getUploadall().enable();
                                                me.getApplication().getController('MainControl').getLoad().hide();
                                            }
                                        }

                                    },
                                    failure: function(error) {
                                        plugins.Toast.ShowToast("更新记录文件失败！请重试！",3000);
                                    }
                                });
                        },

                        failure: function(error){
                            plugins.Toast.ShowToast("记录文件获取失败！",3000);
                        }
                    });
            },

            failure: function(err) {
                plugins.Toast.ShowToast("请求文件系统失败！" + err.code,3000);
            }
        });
    }
})