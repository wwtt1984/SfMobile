Ext.define('SfMobile.view.Main', {
    extend: 'Ext.Container',
    xtype: 'main',

    requires: [
        'SfMobile.view.Login',
        'SfMobile.view.Function'
    ],
    config: {

        layout: 'card',


        items: [
            {
                xclass: 'SfMobile.view.Login'
            },
            {
                xclass: 'SfMobile.view.Function'
            }
        ]
    }
});
