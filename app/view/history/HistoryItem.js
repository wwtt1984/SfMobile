/**
 * Created by xiaona on 14-2-14.
 */

Ext.define('SfMobile.view.history.HistoryItem', {
    extend: 'Ext.dataview.component.DataItem',
    xtype: 'historyitem',

    requires: [
        'Ext.XTemplate'
    ],

    config: {

        cls: 'list-demo',

        items: [
            {
                xtype: 'container',
                cls: 'news-list',
                baseCls: 'x-list-item-label',
                itemId: 'historyItemDetail',
                tpl: Ext.create('Ext.XTemplate',
                    '<div class="list-item">',
                    '    {[this.getImg(values)]}',
                    '    <h1>{location}-{status}</h1>',
                    '    <div class="time">{miaos}</div>',
                    '    <div class="time" style="float: right;">{sdt}</div>',
                    '</div>',
                    {
                        getImg: function(values){

                            var string = '';

                            if(values.imgjson){
                                string += '<img class="photo" src="' + values.imgjson.split(',')[0] + '" />';
                            }
                            else{
                                string += '<img class="photo" src="resources/images/nopic.jpg" />';
                            }
                            return string;
                        }
                    }
                ),

//                    '<div style="font-size:18px; font-weight: bold; line-height: 1.6em;">{location}</div>',
//                    '<div style="font-size:15px; line-height: 1.6em;">描述：{miaos}</div>',
//                    '<div style="font-size:15px; line-height: 1.6em;">巡查时间：{sdt}</div>'
//                ],
                items: [
                    {
                        xtype: 'button',
                        cls: 'my-buttons',
                        docked: 'right',
                        hidden: true,
                        itemId: 'deleteHistory',
                        margin: '0 0 0 10px',
                        iconCls: 'trash',
                        iconMask: true
//                        text: '删除'
                    }
                ]
            }
        ],
        listeners: [
            {
                fn: 'onContactDeleteButtonTap',
                event: 'tap',
                delegate: '#deleteHistory'
            }
        ]
    },

    onContactDeleteButtonTap: function(button, e, eOpts) {

        e.stopEvent();

        var me = this;

        var store = Ext.getStore('UploadStore');
        store.remove(me.getRecord());
        store.sync();
        SfMobile.app.getController('MarkControl').onFailRecordToJson(store, 1);


    }

});