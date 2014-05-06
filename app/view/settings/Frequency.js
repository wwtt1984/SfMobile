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
                        itemId: 'markfrequency',
                        label: '巡查频率',
                        options: [
                            {text: '30秒',  value: 'thirty'},
                            {text: '1分钟', value: 'one'},
                            {text: '2分钟',  value: 'two'},
                            {text: '5分钟',  value: 'five'}
                        ]
                    }
                ]
            }
        ]
    }
})