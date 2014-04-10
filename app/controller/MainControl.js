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
            confirm: '#confirm'
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
            case 'rain':
                me.onInfoFunctionBackTap();
                break;

            case 'raindetail':
                me.getInfo().pop();
                me.getInfofunction().show();
                break;

            case 'water':
                me.onInfoFunctionBackTap();
                break;

            case 'waterdetail':
                me.getInfo().pop();
                me.getInfofunction().show();
                break;

            case 'markmain':
                me.onInfoFunctionBackTap();
                break;
        }
    },

    onLoginTap: function(){

        var me = this;
        SfMobile.app.user.name = Ext.getCmp('name').getValue();
        SfMobile.app.user.password = Ext.getCmp('password').getValue();

//        if(SfMobile.app.user.name && SfMobile.app.user.password){
//            var results = SfMobile.app.user.name + '$' + SfMobile.app.user.password;
//
//            Ext.data.proxy.SkJsonp.validate('Login',results,{
//                success: function(response) {
//                    if(response.success == "true"){
//                        me.getMaintitle().onDataSet(SfMobile.app.user.name);
//                        var src = me.getMain();
//                        src.setActiveItem(me.getFunctionmain());
//                    }
//                    else{
//                        Ext.Msg.alert('用户名或密码错误！');
//                    }
//                },
//                failure: function(){
//                    Ext.Msg.alert('请求失败，请重试！');
//                }
//            });
//        }

        me.getMaintitle().onDataSet(SfMobile.app.user.name);
        var src = me.getMain();
        src.setActiveItem(me.getFunctionmain());
    },

    //监听info页面的“主页面”按钮，点击后，返回“主功能”页面
    onInfoFunctionBackTap: function(){
        this.getMain().setActiveItem(this.getFunctionmain());
        if(this.getInfo().getActiveItem().xtype == 'markmain'){
            Ext.ComponentQuery.query('#photo')[0].clearImgListeners();
        }
        this.getInfo().destroy();
    },

    onInfoBackTap: function(view, eOpts){

        if(view.getActiveItem() == view.getAt(1)){
            this.getInfofunction().show();
            this.getInfosearch().hide();
        }
    },

    onFunctionItemTap: function(list, index, target, record, e, eOpts ){

        var me = this;

        me.info = me.getInfo();
        if(!me.info){
            me.info = Ext.create('SfMobile.view.Info');
        }

        me.getMain().add(me.info);

        switch(record.data.name){
            case '水情信息':
                me.onWaterListSet();
                break;
            case '雨情信息':
                me.onRainListSet();
                break;
            case '水库巡查':
                me.getApplication().getController('MarkControl').onMarkInitialize();
                break;
            case '退出系统':
                me.onQuitSystem();
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
    }
})