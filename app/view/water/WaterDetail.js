Ext.define('SfMobile.view.water.WaterDetail', {
    extend: 'Ext.Panel',
    xtype: 'waterdetail',

    requires: [
        'SfMobile.view.water.WaterMain',
        'SfMobile.view.water.WaterDay',
        'Ext.SegmentedButton',
        'Ext.picker.Date'
    ],

    config: {

        title: '水情信息',

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
                        itemId: 'waterSegmentedButton',
                        allowDepress: false,
                        allowMultiple: false,
                        items: [
                            {
                                text: '主要',
                                pressed: true
                            },
                            {
                                text: '日水位'
                            }]
                    }]
            },
            {
                xclass: 'SfMobile.view.water.WaterMain'
            },
            {
                xclass: 'SfMobile.view.water.WaterDay'
            }

        ]
    },

    onWaterMainLoad: function(record){
        this.stcd = record.data.stcd;
        this.down('watermain').onStoreLoad(record);
    },

    onWaterDayLoad: function(time, type){

        var me = this;

        var store = Ext.getStore('WaterDayStore');
        store.getProxy().setExtraParams({
            t: 'GetStSwInfo',
            results: time + '$' + me.stcd
        });

        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: '努力加载中...'
        });

        store.load(function(records, operation, success){

            if(store.getAllCount()){
                store.getAt(0).data.TM = time;
                me.down('waterday').onStoreLoad(store.getAt(0).data);

            }
            else{
                Ext.Msg.alert('无日水位信息');
            }

            if(type == 0){
                me.setActiveItem(me.down('waterday'));
                Ext.ComponentQuery.query('#infosearch')[0].show();
            }
            Ext.Viewport.setMasked(false);
        }, this);
    },

    onWaterDayPick: function(){

        var me = this;

        if(!me.onDatePicker){
            me.onDatePicker = Ext.create('Ext.picker.Date', {
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
                            me.onWaterDayLoad(Ext.Date.format(value, 'Y-m-d'), 1);
                        }
                    }
                }
            });
            if (!me.onDatePicker.getParent()) {
                Ext.Viewport.add(me.onDatePicker);
            }
        }
        me.onDatePicker.show();
    }
});