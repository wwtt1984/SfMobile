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

    onLoginTap: function(){

        var me = this;
        SfMobile.app.user.name = Ext.getCmp('name').getValue();
        SfMobile.app.user.password = Ext.getCmp('password').getValue();

        if(SfMobile.app.user.name && SfMobile.app.user.password){
            var results = SfMobile.app.user.name + '$' + SfMobile.app.user.password;

            Ext.data.proxy.SkJsonp.validate('Login',results,{
                success: function(response) {
                    if(response.success == "true"){
                        me.getMaintitle().onDataSet(SfMobile.app.user.name);
                        var src = me.getMain();
                        src.setActiveItem(me.getFunctionmain());
                    }
                    else{
                        Ext.Msg.alert('用户名或密码错误！');
                    }
                },
                failure: function(){
                    Ext.Msg.alert('请求失败，请重试！');
                }
            });
        }
    },

    //监听info页面的“主页面”按钮，点击后，返回“主功能”页面
    onInfoFunctionBackTap: function(){
        this.getMain().setActiveItem(this.getFunctionmain());
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

        if(record.data.name == '水情信息'){
            me.onWaterListSet();
        }
        else if(record.data.name == '雨情信息'){
            me.onRainListSet();
        }
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
        me.getMain().setActiveItem(me.getInfo());
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
        me.getMain().setActiveItem(me.getInfo());
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