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

            locationconfirm: '[itemId=locationconfirm]'
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

        me.onBtnConfirm();
        //android返回键事件监听
        document.addEventListener("backbutton", me.onBackKeyDown, false);
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
            document.addEventListener("backbutton", me.onBackDo, false); // 返回键
            var intervalID = window.setInterval(function() {
                window.clearInterval(intervalID);
                document.removeEventListener("backbutton", me.onBackDo, false); // 返回键
                document.addEventListener("backbutton", me.onBackKeyDown, false); // 返回键
            }, 2000);
            //当前页面是其他的页面时，返回上一级页面
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
                me.onInfoFunctionBackTap();
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
    },

    onLoginTap: function(){

        var me = this;
        SfMobile.app.user.sid = Ext.getCmp('name').getValue();
        SfMobile.app.user.password = Ext.getCmp('password').getValue();

        var results = SfMobile.app.user.sid + "$" +  SfMobile.app.user.password;
        Ext.Viewport.setMasked({xtype:'loadmask',message:'登录中,请稍后...'});

        Ext.data.proxy.SkJsonp.validate('CheckUserInfo',results,{
            success: function(response) {
                if(response.success == "true"){
                    Ext.Viewport.setMasked(false);
                    SfMobile.app.user.name = response.sname;
                    me.getMaintitle().onDataSet(SfMobile.app.user.name);
                    var src = me.getMain();
                    src.setActiveItem(me.getFunctionmain());
                    me.onCheckVesion(me);
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
                me.getMaintitle().onDataSet('软件已下载' + percent + "%,请稍后...");
            } else {
                plugins.Toast.ShowToast("error",1000);
            }
        };

        fileTransfer.download(
            uri,
            "cdvfile://localhost/persistent/dx_download/" + name,
            function(entry) {
                Ext.Viewport.setMasked(false);
                plugins.Toast.ShowToast("下载完成"+entry.fullPath,3000);
                plugins.Install.InstallApk(entry.fullPath);
            },
            function(error) {
                Ext.Viewport.setMasked(false);
                plugins.Toast.ShowToast(' '+error.source,3000);
            }
        );
    }

})