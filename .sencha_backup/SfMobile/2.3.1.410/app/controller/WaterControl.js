Ext.define('SfMobile.controller.WaterControl', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.app.Route'
    ],

    config: {

        refs: {
            main: 'main',
            functionmain: 'functionmain',
            info: 'info',
            water: 'info water',
            waterdetail: 'info waterdetail',
            watermain: 'watermain',
            waterday: 'waterday',
            infofunction: '[itemId=infofunction]',
            waterSegmentedButton: '[itemId=waterSegmentedButton]',
            infosearch: '[itemId=infosearch]'
        },

        control: {

            water:{
                itemtap: 'onWaterItemTap'
            },
            waterSegmentedButton: {
                toggle: 'onWaterSegmentedTap'
            }
        }
    },



    onWaterItemTap: function(list, index, target, record, e, eOpts){

        var me = this;

        me.waterdetail = me.getWaterdetail();
        if(!me.waterdetail){
            me.waterdetail = Ext.create('SfMobile.view.water.WaterDetail');
        }
        me.waterdetail.onWaterMainLoad(record);

        me.waterdetail.setTitle(record.data.stnm);

        me.getInfofunction().hide();
        me.getInfosearch().hide();

        me.waterdetail.setActiveItem(me.getWatermain());

        me.getInfo().push(me.waterdetail);
    },

    onWaterSegmentedTap: function(me, button, isPressed, eOpts){

        var me = this;
        if(isPressed){

            var text = button._text;
            switch(text){
                case '主要':
                    me.getWaterdetail().setActiveItem(me.getWatermain());
                    me.getInfosearch().hide();
                    break;
                case '日水位':
                    me.getWaterdetail().onWaterDayLoad(Ext.Date.format(new Date(), 'Y-m-d'), 0);
                    break;
            }
        }
    }
})