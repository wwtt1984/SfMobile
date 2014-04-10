Ext.define('SfMobile.view.rain.RainDetail', {
    extend: 'Ext.Panel',
    xtype: 'raindetail',

    requires: [
        'SfMobile.view.rain.RainMain',
        'SfMobile.view.rain.RainDay',
        'SfMobile.view.rain.RainMonth',
        'SfMobile.view.rain.RainYear',
        'Ext.SegmentedButton',
        'Ext.picker.Date'
    ],

    config: {

        title: '雨情信息',

        layout: 'card',

        items: [
            {
                docked: 'bottom',
                ui: 'gray',
                xtype: 'toolbar',
                style: 'border-top: 1px #ccc solid;',
                items:[
                    {
                        width: '100%',
                        padding: '0 5 0 0',
                        defaults: {
                            flex: 1
                        },
                        xtype: 'segmentedbutton',
                        itemId: 'rainSegmentedButton',
                        allowDepress: false,
                        allowMultiple: false,
                        items: [
                            {
                                text: '主要',
                                pressed: true
                            },
                            {
                                text: '日雨量'
                            },
                            {
                                text: '月雨量'
                            },
                            {
                                text: '年雨量'
                            }]
                    }]
            },
            {
                xclass: 'SfMobile.view.rain.RainMain'
            },
            {
                xclass: 'SfMobile.view.rain.RainDay'
            },
            {
                xclass: 'SfMobile.view.rain.RainMonth'
            },
            {
                xclass: 'SfMobile.view.rain.RainYear'
            }

        ]
    },

    onRainMainLoad: function(record){
        this.stcd = record.data.stcd;
        this.down('rainmain').onStoreLoad(record);
    },

    onRainDayLoad: function(time, time1, type){

        var me = this;

        var store = Ext.getStore('RainDayStore');
        store.getProxy().setExtraParams({
            t: 'GetStDayRain',
            results: time + '$' + me.stcd
        });

        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: '努力加载中...'
        });

        store.load(function(records, operation, success){

            if(store.getAllCount()){
                me.down('rainday').onStoreLoad(store.getData().items, time, time1);

            }
            else{
                Ext.Msg.alert('无日雨量信息');
            }

            if(type == 0){
                me.setActiveItem(me.down('rainday'));
                Ext.ComponentQuery.query('#infosearch')[0].show();
            }
            Ext.Viewport.setMasked(false);
        }, this);
    },

    onRainPick: function(){

        var me = this;

        if(!me.onDayPicker){
            me.onDayPicker = Ext.create('Ext.picker.Date', {
                useTitles: true,
                value: new Date(),
                monthText: '月',
                dayText: '日',
                yearText: '年',
                slotOrder:["year","month", "day"],
                yearFrom: 2010,
                doneButton: {
                    text: '确定'
                },
                cancelButton: {
                    text: '取消'
                },
                listeners: {
                    change: function(t, value, op) {

                        var date = value; //日期对象
                        if(value > new Date()){
                            Ext.Msg.alert('对不请，时间不能超过今天！');
                        }
                        else{
                            var type = me.getActiveItem().xtype;
                            switch(type){
                                case 'rainday':
                                    me.onRainDayLoad(Ext.Date.format(value, 'Y-m-d'), Ext.Date.format(Ext.Date.add(value, Ext.Date.DAY, -1), 'Y-m-d'), 1);
                                    break;
                                case 'rainmonth':
                                    me.onRainMonthLoad(Ext.Date.format(value, 'Y-m'), Ext.Date.format(Ext.Date.add(value, Ext.Date.MONTH, -1), 'Y-m'), 1);
                                    break;
                                case 'rainyear':
                                    me.onRainYearLoad(Ext.Date.format(value, 'Y'), Ext.Date.format(Ext.Date.add(value, Ext.Date.YEAR, -1), 'Y'), 1);
                                    break;
                            }
                        }
                    }
                }
            });
            if (!me.onDayPicker.getParent()) {
                Ext.Viewport.add(me.onDayPicker);
            }
        }
        me.onDayPicker.show();
    },

    onRainMonthLoad: function(time, time1, type){

        var me = this;
        var st = time + '-01';

        var store = Ext.getStore('RainMonthStore');
        store.getProxy().setExtraParams({
            t: 'GetStMonthRain',
            results: st + '$' + me.stcd
        });

        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: '努力加载中...'
        });

        store.load(function(records, operation, success){

            if(store.getAllCount()){
                me.down('rainmonth').onStoreLoad(store.getData().items, time, time1);
            }
            else{
                Ext.Msg.alert('无月雨量信息');
            }

            if(type == 0){
                me.setActiveItem(me.down('rainmonth'));
                Ext.ComponentQuery.query('#infosearch')[0].show();
            }
            Ext.Viewport.setMasked(false);
        }, this);
    },

    onRainYearLoad: function(time, time1, type){

        var me = this;

        var store = Ext.getStore('RainYearStore');
        store.getProxy().setExtraParams({
            t: 'GetStYearRain',
            results: time + '$' + me.stcd
        });

        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: '努力加载中...'
        });

        store.load(function(records, operation, success){

            if(store.getAllCount()){
                me.down('rainyear').onStoreLoad(store.getData().items, time, time1);
            }
            else{
                Ext.Msg.alert('无年雨量信息');
            }

            if(type == 0){
                me.setActiveItem(me.down('rainyear'));
                Ext.ComponentQuery.query('#infosearch')[0].show();
            }
            Ext.Viewport.setMasked(false);
        }, this);
    }
})