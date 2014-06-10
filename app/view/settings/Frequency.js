/**
 * Created by USER on 14-5-6.
 */

Ext.define('SfMobile.view.settings.Frequency', {
    extend: 'Ext.form.Panel',
    xtype: 'frequency',

    requires: [

    ],

    config: {
        title: '巡查频率',

        scrollable: {
            direction: 'vertical',
            directionLock: true
        },

        items:[
            {
                xtype: 'fieldset',
                title: '设置巡查频率',
                defaults: {
                    labelWidth: '40%'
                },

                items:[
                    {
                        xtype: 'selectfield',
                        name: 'markfrequency',
                        itemId: 'markfrequency',
                        label: '巡查频率',
                        options: [
                            {text: '30秒',  value: '30000'},
                            {text: '1分钟', value: '60000'},
                            {text: '2分钟',  value: '120000'},
                            {text: '5分钟',  value: '300000'}
                        ]
                    }
                ]
            }
        ]
    }
})