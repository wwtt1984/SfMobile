Ext.define('SfMobile.view.Info', {
    extend: 'Ext.navigation.View',
    xtype: 'info',
    
    requires: [
    ],
    config: {

    	navigationBar: {
    		ui: 'light',
            layout: 'fit',
            items: [
                {
            	    xtype: 'button',
            	    itemId: 'infofunction',
            	    ui: 'back',
            	    text: '主页面'
                },
                {
                    xtype: 'button',
                    itemId: 'infosearch',
                    ui: 'plain',
                    docked: 'right',
                    iconCls: 'search',
                    iconMasked: true,
                    hidden: true
                }
            ]
        },

        itemId: 'info',

        defaultBackButtonText: '返回'
    }
});
