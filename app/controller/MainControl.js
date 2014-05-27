Ext.define('SfMobile.controller.MainControl', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.app.Route'
    ],

    config: {

        refs: {
            main: 'main',
            maintitle: 'maintitle',
            functionmain: 'functionmain',
            functionlist: '#functionlist',
            info: 'info',
            infofunction: '[itemId=infofunction]',
            infosearch: '[itemId=infosearch]',
            water: 'info water',
            rain: 'info rain',
            waterdetail: 'waterdetail',
            raindetail: 'raindetail',
            confirm: '#confirm',

            locationconfirm: '[itemId=locationconfirm]',
            load: '[itemId=load]',

            mark: 'mark'
        },

        control: {
            main: {
                initialize: 'onMainInit'
            },
            confirm: {
                tap: 'onLoginTap'
            },
            info:{
                back: 'onInfoBackTap'
            },
            functionlist: {
                itemtap: 'onFunctionItemTap'
            },
            infofunction: {
                tap: 'onInfoFunctionBackTap'
            },
            infosearch: {
                tap: 'onInfoSearchTap'
            }
        }
    },

    onMainInit: function(){
        var me = this;
        SfMobile.app.mainthis = this;
        this.closeApp = false;///////关闭APP为false ， 用来防止 定位没定到 就关闭程序了。
        this.gpsreset = 30; ///////////////////////如果20次都没定位成功,则不重新定位了
        this.nowgpscount = 0; /////////////////////当前重启GPS次数

        me.onBtnConfirm();
        me.onDoChickAppIco();
        //android返回键事件监听
        document.addEventListener("backbutton", me.onBackKeyDown, false);
    },

    onDoChickAppIco:function(){   /////////执行点击应用程序图标事件

        var me = this;
        var data = '';
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
            function(fileSystem){me.onwtreadFS(fileSystem,me,1,data);},
            function(error){me.onwtfail(error,me);}
        ); ////写文件

    },

    onDeviceReady: function(){

    },

    onBtnConfirm: function(){ ////////////////////重写Confirm////////////////////

        if(Ext.MessageBox) {
            var MB = Ext.MessageBox;
            Ext.apply(MB, {
                YES: { text: '确认', itemId: 'yes', ui: 'action' },
                NO:  { text: '取消', itemId: 'no' },
                OK:  { text: '确定', itemId: 'ok' }
            });
            Ext.apply(MB, {
                YESNO: [Ext.MessageBox.NO, Ext.MessageBox.YES]
            });
        }
    },

    onBackKeyDown: function(){
        var me  = SfMobile.app.mainthis;
        var mainactive = Ext.Viewport.getActiveItem().getActiveItem().xtype;

        if((mainactive == "login") || (mainactive == "functionmain") )
        {
            //当当前页面是“登录”或“主功能页面”时，双击“返回键”退出应用程序
            plugins.Toast.ShowToast("请再点一次退出",1000);

            document.removeEventListener("backbutton", me.onBackKeyDown, false); // 注销返回键
            document.addEventListener("backbutton", me.onQuitSystemTap, false);//绑定退出事件

            var intervalID = window.setInterval(function() {
                window.clearInterval(intervalID);
                document.removeEventListener("backbutton", me.onQuitSystemTap, false); // 注销返回键
                document.addEventListener("backbutton", me.onBackKeyDown, false); // 返回键

            }, 2000);
        }
        else if(mainactive == "info")
        {
            document.removeEventListener("backbutton", me.onBackKeyDown, false); // 注销返回键
            me.onBackKeyTap();
        }
        else
        {
            navigator.app.backHistory();
        }
    },

    onQuitSystemTap: function(){
        navigator.app.exitApp(); //////////////////退出系统
    },

    onBackDo: function(){

    },

    //当前页面是其他的页面时，返回上一级页面
    onBackKeyTap: function(){
        var me  = SfMobile.app.mainthis;
        var screen = me.getMain();
        var info = screen.getActiveItem();
        var active = info.getActiveItem();

        switch(active.xtype){

            //雨情
            case 'rain':
                me.onInfoFunctionBackTap();
                break;

            case 'raindetail':
                me.getInfo().pop();
                me.getInfofunction().show();
                me.getInfosearch().hide();
                break;

            //水情
            case 'water':
                me.onInfoFunctionBackTap();
                break;

            case 'waterdetail':
                me.getInfo().pop();
                me.getInfofunction().show();
                me.getInfosearch().hide();
                break;

            //巡查
            case 'markmain':
                if((me.getMark().view) && (me.getMark().view.getHidden() == false)){
                    me.getMark().view.hide();
                }
                else if(me.getInfo().view && (me.getInfo().view.getHidden() == false)){
                    me.getInfo().view.hide();
                }
                else{
                    me.onInfoFunctionBackTap();
                }
                break;

            case 'locationtree':
                me.getInfo().pop();
                me.getLocationconfirm().hide();
                me.getInfofunction().show();
                break;

            //设置
            case 'setting':
                me.onInfoFunctionBackTap();
                break;

            case 'frequency':
                me.getInfo().pop();
                me.getInfofunction().show();
                break;

            case 'password':
                me.getInfo().pop();
                me.getInfofunction().show();
                break;
        }

        document.addEventListener("backbutton", me.onBackKeyDown, false); // 返回键
    },

    onLoginTap: function(){

        var me = this;
        SfMobile.app.user.sid = Ext.getCmp('name').getValue();
        SfMobile.app.user.password = Ext.getCmp('password').getValue();


        me.onUserCheck();

    },

    //用户验证
    onUserCheck: function(){

        var me = this;

        var results = SfMobile.app.user.sid + "$" +  SfMobile.app.user.password;
        Ext.Viewport.setMasked({xtype:'loadmask',message:'登录中,请稍后...'});

        if(SfMobile.app.user.sid && SfMobile.app.user.password){
            //用户名、密码输入完整
            Ext.data.proxy.SkJsonp.validate('CheckUserInfo',results,{
                success: function(response) {
                    if(response.success == "true"){
                        Ext.Viewport.setMasked(false);
                        SfMobile.app.user.name = response.sname;
                        me.getMaintitle().onDataSet(SfMobile.app.user.name);
                        me.onUserWriteJson(); //将验证成功的用户信息，存在本地
                        var src = me.getMain();
                        src.setActiveItem(me.getFunctionmain());
                        me.onCheckVesion(me);
                        me.onOpenGPS(me);///////////////////////////登录成功再定位
                    }
                    else{
                        Ext.Viewport.setMasked(false);
                        plugins.Toast.ShowToast("用户名或者密码错误！",3000);
                    }
                },
                failure: function(){

                    Ext.Viewport.setMasked(false);
                    plugins.Toast.ShowToast("请求失败，请重试！",3000);
                }
            });
        }
        else{
            //用户名、密码输入不完整
            Ext.Viewport.setMasked(false);
            plugins.Toast.ShowToast("用户名和密码不能为空！",3000);
        }
    },

    onUserWriteJson: function(){
        var me = this;
        var json = [];
        json.push({
            sid: SfMobile.app.user.sid,
            pwd: SfMobile.app.user.password,
            name: SfMobile.app.user.name
        });

        //将验证成功的用户信息，存在本地
        ////////////////////////////////写入文件////////////////////////////////
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
            function(fileSystem){me.onwtgotFS(fileSystem,me,json[0]);},
            function(error){me.onwtfail(error,me);}
        ); ////写文件
    },

    /////////////////////////////////写文件/////////////////////////////////////////////////

    onwtgotFS:function(fileSystem,me,json) {
        fileSystem.root.getFile("sflogin.json", {create: true, exclusive: false},
            function(fileEntry){me.onwtgotFileEntry(fileEntry,me,json);},
            function(error){me.onwtfail(error,me);}
        );
    },

    onwtgotFileEntry:function(fileEntry,me,json) {
        fileEntry.createWriter(
            function(writer){me.onwtgotFileWriter(writer,me,json);},
            function(error){me.onwtfail(error,me);}
        );
    },

    onwtgotFileWriter:function(writer,me,json) {
        writer.onwriteend = function(evt) {

        }
        writer.write("{\"sid\":\""+json.sid+"\",\"pwd\":\""+json.pwd+"\",\"name\":\""+json.name+"\"}");
    },

    //////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////读取文件///////////////////////////////////////////////////
    onwtreadFS:function(fileSystem,me,num,data) {
        fileSystem.root.getFile("sflogin.json", null,
            function(fileEntry){me.onwtreadFileEntry(fileEntry,me,num,data);},
            function(error){me.onwtfail(error,me);}
        );
    },

    onwtreadFileEntry:function(fileEntry,me,num,data) {
        fileEntry.file(
            function(file){me.onwtreadFileWriter(file,me,num,data);},
            function(error){me.onwtfail(error,me);}
        );
    },

    onwtreadFileWriter:function(file,me,num,data) {

        var reader = new FileReader();
        reader.onloadend = function(evt) {

            var json = Ext.decode(evt.target.result);
            SfMobile.app.user.sid = json.sid;
            SfMobile.app.user.password = json.pwd;
            SfMobile.app.user.name = json.name;

            Ext.getCmp('name').setValue(SfMobile.app.user.sid);
            Ext.getCmp('password').setValue(SfMobile.app.user.password);

            me.onUserCheck();

        };
        reader.readAsText(file);
    },

    onwtfail:function(error,me)
    {
        //plugins.Toast.ShowToast(error,3000);
        if(error.code == 1) //////////表示文件不存在

        {
            //////////////////不管它///////////////////////////
        }

    },

    //监听info页面的“主页面”按钮，点击后，返回“主功能”页面
    onInfoFunctionBackTap: function(){
        this.getMain().setActiveItem(this.getFunctionmain());
        if(this.getInfo().getActiveItem().xtype == 'markmain'){
            Ext.ComponentQuery.query('#photo')[0].clearImgListeners();
        }
        this.getInfo().destroy();
    },

    //info的“返回键”事件，当只有一张页面时，返回至“主功能”页面
    onInfoBackTap: function(view, eOpts){

        var me = this;
        if(view.getActiveItem() == view.getAt(1)){
            me.getInfofunction().show();
            me.getLocationconfirm().hide();
            me.getInfosearch().hide();
        }
    },

    onFunctionItemTap: function(list, index, target, record, e, eOpts ){

        var me = this;

        me.info = me.getInfo();
        if(!me.info){
            me.info = Ext.create('SfMobile.view.Info');
        }

        me.getMain().add(me.info);

        var titlestr = ['water', 'rain', 'projectmark', 'plantmark', 'settings'];

        switch(record.data.name){
            case titlestr[0]:
                me.onWaterListSet();
                break;
            case titlestr[1]:
                me.onRainListSet();
                break;
            case titlestr[2]:
                me.getApplication().getController('MarkControl').onMarkInitialize('project');
                break;
            case titlestr[3]:
                me.getApplication().getController('MarkControl').onMarkInitialize('plant');
                break;
            case titlestr[4]:
                me.getApplication().getController('SettingControl').onSettingInitialize();
                break;
        }
        me.getMain().setActiveItem(me.getInfo());
    },

    onQuitSystem: function(){
        navigator.app.exitApp();
    },

    onWaterListSet: function(){

        var me = this;

        var store = Ext.getStore('WaterStore');

        store.removeAll();

        store.getProxy().setExtraParams({
            t: 'GetSqInfo'
        });

        me.water = me.getWater();

        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: '努力加载中...'
        });

        store.load(function(records, operation, success){
            Ext.Viewport.setMasked(false);
        }, this);

        if(!me.water){
            me.water = Ext.create('SfMobile.view.water.Water');
        }
        me.getInfo().push(me.water);
    },

    onRainListSet: function(){

        var me = this;

        var store = Ext.getStore('RainStore');

        store.removeAll();

        store.getProxy().setExtraParams({
            t: 'GetYqInfo'
        });

        me.rain = me.getRain();

        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: '努力加载中...'
        });

        store.load(function(records, operation, success){
            Ext.Viewport.setMasked(false);
        }, this);

        if(!me.rain){
            me.rain = Ext.create('SfMobile.view.rain.Rain');
        }
        me.getInfo().push(me.rain);
    },

    onInfoSearchTap: function(){
        var me = this;
        var type = me.getInfo().getActiveItem().xtype;
        switch(type){
            case 'waterdetail':
                me.getWaterdetail().onWaterDayPick();
                break;
            case 'raindetail':
                me.getApplication().getController('RainControl').onInfoSearchSelectTap();
                break;
        }
    },

    onCheckVesion:function(me)
    {
        var store = Ext.getStore('VersionStore');
        store.getProxy().setExtraParams({
            t: 'CheckVersion',
            results: 'android'
        });
        store.load(function(records, operation, success){

            if(records.length > 0)
            {

                if(records[0].data.strThisVersion != SfMobile.app.user.version)
                {
                    Ext.Msg.confirm("当前版本 " + SfMobile.app.user.version,
                        "新版本("+records[0].data.strThisVersion+")，是否下载更新？",function(btn){
                            if(btn == 'yes'){

//                                me.load = me.getLoad();
//                                if(!me.load){
//                                    me.load = Ext.create('SfMobile.view.Load',{
//                                        itemId: 'load',
//                                        style: 'height: 20px; position:absolute; top:80%;'
//                                    });
//                                }
//                                me.getLoad().onDataSet(0);
//                                me.getFunctionmain().add(me.load);
//
//                                me.downLoad(records[0].data.strFileName,records[0].data.strGetFileVersionFileURL,me);

                                me.onLoadOrUploadViewShow();

                                me.downLoad(records[0].data.strFileName,records[0].data.strGetFileVersionFileURL,me);
                            }
                        });
                }
            }

        }, this);

    },

    downLoad:function(name,url,me)
    {
        var uri = encodeURI(url);
        var fileTransfer = new FileTransfer();

        fileTransfer.onprogress = function(progressEvent) {
            if (progressEvent.lengthComputable) {
                var percent = Number((progressEvent.loaded / progressEvent.total) * 100).toFixed(0);
                me.getLoad().onDataSet(percent);
            } else {
                plugins.Toast.ShowToast("error",1000);
                me.getLoad().hide();
            }
        };

        fileTransfer.download(
            uri,
            "cdvfile://localhost/persistent/Download/" + name,
            function(entry) {
                Ext.Viewport.setMasked(false);
                plugins.Toast.ShowToast("下载完成"+entry.fullPath,3000);
                me.getLoad().hide();
                plugins.Install.InstallApk("mnt/sdcard"+entry.fullPath);
            },
            function(error) {

                Ext.Viewport.setMasked(false);
                plugins.Toast.ShowToast(' '+error.source,3000);
                me.getLoad().hide();
            }
        );
    },

    onOpenGPS:function(me){      ///////////////////////////////////////打开GPS//////////////////////////////////////

        navigator.geolocation.getCurrentPosition(
            function(position){me.onGpsSuccess(position,me);},
            function(error){me.onGpsError(error,me);},
            { maximumAge: 3000, timeout: 30000, enableHighAccuracy: true });
    },

    onGpsSuccess:function(position,me){

        me.nowgpscount = 0;/////////////////////gps定位次数清0
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        //var sdt = this.unix_to_datetime(position.timestamp);
        var results = SfMobile.app.user.sid + "$" + SfMobile.app.user.name
            + "$" + lng + '$' + lat + '$$$$';
        Ext.data.proxy.SkJsonp.validate('IntXcsj',results,{
            success: function(response) {
                /////////////程序不关闭的时候才可以继续循环。
                if(!me.closeApp) me.TimeGPS = window.setTimeout(function(){me.onOpenGPS(me);},SfMobile.app.gpstime);
            },
            failure: function() {

            }
        });

        Ext.getCmp('header').onGpsSet(1);
    },

    onGpsError:function(error,me){

        plugins.Toast.ShowToast("GPS连接不上,请检查GPS是否开启或者到室外定位!",3000);
        Ext.getCmp('header').onGpsSet(0);

        if(!me.closeApp)//////////////////////////程序不关闭的受才可以。
        {
            ///////////////////////如果30次都没定位成功,则不重新定位了
            if(me.nowgpscount < me.gpsreset)
            {
                me.TimeGPS = window.setTimeout(function(){
                    plugins.Toast.ShowToast("正在尝试重新定位("+me.nowgpscount+"/"+me.gpsreset+")...",3000);
                    me.onOpenGPS(me);
                },SfMobile.app.gpstime);

                me.nowgpscount++;
            }
            else
            {
                plugins.Toast.ShowToast("GPS连接失败,如需再次定位请点击GPS图标手动开启!",3000);
            }
        }

    },

    onLoadOrUploadViewShow: function(){

        var me = this;

        me.load = me.getLoad();

        if(!me.load){
            me.load = Ext.create('SfMobile.view.Load');
        }

        if (Ext.os.deviceType.toLowerCase() == "phone") {
            me.load.setMinHeight('35%');
        }

        me.load.onDataSet(0);
        if (!me.load.getParent()) {
            Ext.Viewport.add(me.load);
        }
        me.load.show();

    }

})