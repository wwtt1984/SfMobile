Ext.define('SfMobile.controller.RainControl', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.app.Route'
    ],

    config: {

        refs: {
            main: 'main',
            functionmain: 'functionmain',
            info: 'info',
            rain: 'info rain',
            raindetail: 'info raindetail',
            rainarea: 'info rainarea',
            rainmain: 'rainmain',
//            waterday: 'waterday',
            infofunction: '[itemId=infofunction]',
            rainSegmentedButton: '[itemId=rainSegmentedButton]',
            infosearch: '[itemId=infosearch]'
        },

        control: {

            rain:{
                itemtap: 'onRainItemTap'
            },
            rainSegmentedButton: {
                toggle: 'onRainSegmentedTap'
            }
        }
    },

    onRainItemTap: function(list, index, target, record, e, eOpts){
        var me = this;

        if(record.data.stnm == '面雨量'){
            me.onRainAreaInitialize(record);
        }
        else{
            me.onRainDetailInitialize(record);
        }

    },

    onRainDetailInitialize: function(record){
        var me = this;

        me.raindetail = me.getRaindetail();
        if(!me.raindetail){
            me.raindetail = Ext.create('SfMobile.view.rain.RainDetail');
        }


        me.raindetail.setTitle(record.data.stnm);

        me.getInfofunction().hide();
        me.getInfosearch().hide();
        me.getInfo().push(me.raindetail);

        me.raindetail.onRainMainLoad(record);
        me.raindetail.setActiveItem(me.getRainmain());
    },

    onRainAreaInitialize: function(record){
        var me = this;

        me.rainarea = me.getRainarea();
        if(!me.rainarea){
            me.rainarea = Ext.create('SfMobile.view.rain.RainArea');
        }


//        me.rainarea.setTitle(record.data.stnm);

        me.getInfofunction().hide();
        me.getInfosearch().hide();
        me.getInfo().push(me.rainarea);

        me.rainarea.onStoreLoad(record);
    },

    onRainSegmentedTap: function(me, button, isPressed, eOpts){

        var me = this;
        if(isPressed){

            var text = button._text;
            switch(text){
                case '主要':
                    me.getRaindetail().setActiveItem(me.getRainmain());
                    me.getInfosearch().hide();
                    break;
                case '日雨量':
                    me.getRaindetail().onRainDayLoad(Ext.Date.format(new Date(), 'Y-m-d'), Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.DAY, -1), 'Y-m-d'), 0);
                    break;
                case '月雨量':
                    me.getRaindetail().onRainMonthLoad(Ext.Date.format(new Date(), 'Y-m'), Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.MONTH, -1), 'Y-m'), 0);
                    break;
                case '年雨量':
                    me.getRaindetail().onRainYearLoad(Ext.Date.format(new Date(), 'Y'), Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.YEAR, -1), 'Y'), 0);
                    break;
            }
        }
    },

    onInfoSearchSelectTap: function(){

        var me = this;
        var raintype = me.getRaindetail().getActiveItem().xtype;

        switch(raintype){
            case 'rainday':
                me.getRaindetail().onRainDayPick();
                break;

            case 'rainmonth':
                me.getRaindetail().onRainMonthPick();
                break;

            case 'rainyear':
                me.getRaindetail().onRainYearPick();
                break;

        }
    }
})