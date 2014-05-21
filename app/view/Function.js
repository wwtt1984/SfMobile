Ext.define('SfMobile.view.Function', {
    extend: 'Ext.Panel',
    xtype: 'functionmain',

    requires: [
        'SfMobile.view.Title',
        'Ext.dataview.List'
    ],
    config: {

        layout: 'fit',
        items: [
            {
                xtype: 'maintitle',
                width: '100%',
                height: '100px',
                docked: 'top'
            },
            {
                xtype: 'list',
                id: 'functionlist',
                store: 'FunctionStore',
                cls: 'grid',
                scrollable: {
                    direction: 'vertical',
                    directionLock: true
                },
                itemTpl: Ext.create('Ext.XTemplate',
                     '<div class="movie">',
                     '<div class="img" style="background-image: url({image})"></div>',
                     '<div class="title">{title}</div>',
                     '</div>'
                )
            }
//            {
//                xclass: 'SfMobile.view.Load',
////                hidden: true,
//                style: 'height: 20px; position:absolute; top:80%;'
//            }
        ]
    }
});
