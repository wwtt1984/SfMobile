/**
 * Created by USER on 14-5-6.
 */

Ext.define('SfMobile.view.mark.LocationTree', {
    extend: 'Ext.Container',
    xtype: 'locationtree',

    requires: [
        'SfMobile.view.TouchTreeGrid'
    ],

    config: {
        title: '选择',
        layout: 'fit',           //touchtreegrid需要
        itemId: 'assignlist',

        items: [
            {
                xtype: 'touchtreegrid',
                columns: [
                    {
                        dataIndex: 'text',
                        width: '95%',
                        style: ' text-align: left; font-size: 18px;'
//                                categStyle: 'height:35px !important;'
                    }],
                leafSelect: true,
                itemHeight: 40,
                listItemId: 'firstexamplelist',
                mode: 'SINGLE',
                arrowPctWidth: '8',
                disableSelection: false,
                includeFooter: false,
                categDepthColors: true,
                categDepthColorsArr: [
                    '#eee',
                    '#f7f7f7',
                    '#fff'
                ],
                includeFooterLevels: false,
//                        helpHtml: './resources/html/TaskExample.html',
//                store: 'ProjectLocationStore',
                includeHeader: false,
                defaultCollapseLevel: 1,
                singleExpand: true,
                cls: [
                    'x-touchtreegrid-list',
                    'x-touchtreegrid-list-accordion'
                ],
                itemId: 'treeselect'
            },
            {
                xtype: 'panel',
                itemId: 'selectionpanel',
                hidden: true,
                docked: 'bottom',
                style: 'min-height:1.6em;font-size:16px;line-height:1.6em;background:#f7f7f7;',
                tpl: Ext.create('Ext.XTemplate',
                    '<div style="position:absolute;;width:100%;height:100%;background:#fff;filter:alpha(opacity=50); -moz-opacity:0.5;-khtml-opacity: 0.5;opacity: 0.5;"></div>',
                    '<div style="width:100%;height:100%;position:relative;">{select}</div>'
                )
            }
        ]
    }
});