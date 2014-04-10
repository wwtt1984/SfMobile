/**
 * Created by USER on 14-3-21.
 */
Ext.define('SfMobile.view.mark.MarkMain', {
    extend: 'Ext.Panel',
    xtype: 'markmain',

    requires: [
        'Ext.XTemplate',
        'SfMobile.view.mark.Mark'
    ],

    config: {
        title: '水库巡查',

        layout: 'fit',
        items:[
            {
                xclass: 'SfMobile.view.mark.Mark'
            }
        ]
    }
});