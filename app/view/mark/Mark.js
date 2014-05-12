/**
 * Created by USER on 14-3-21.
 */
Ext.define('SfMobile.view.mark.Mark', {
    extend: 'Ext.Panel',
    xtype: 'mark',

    requires: [
        'Ext.XTemplate',
        'Ext.field.Select'
    ],

    config: {

        scrollable: {
            direction: 'vertical',
            directionLock: true
        },

        style: 'background:#f7f7f7; padding: 10px 10px 0 10px;',

        items: [
            {
                xtype: 'panel',
                cls: 'local-form',
                itemId: 'location',

                tpl: Ext.create('Ext.XTemplate',
                    '<div class="local-form-div" style="margin: 0 0 0 0">',
                    '<div class="label">',
                    '<span>巡查部位</span>',
                    '</div>',
                    '<div class="choose" id="{[this.getLinkId(values,0)]}">',
//                            '<span>{[this.getContent(values.td)]}</span>',
                    '<span>{location}</span>',
                    '<img src="resources/images/code3.png" style="color:#ccc;float:right;width:20px;height:20px;margin-top:3px;"/>',
                    '</div>',
                    '</div>',
                    {

                        getLinkId: function(values,index){
                            var result = Ext.id();
                            Ext.Function.defer(this.addListener, 1, this, [result,values,index]);
                            return result;
                        },
                        addListener: function(id,values,index) {
                            var me = this;

                            Ext.get(id).addListener('tap', function(e){

                                e.stopEvent();
                                Ext.ComponentQuery.query('#tarea_ms')[0].blur();/////////////////把焦点失掉//////////////////////////
//
                                SfMobile.app.getController('MarkControl').onLocationTap();
                            })//////增加点击的事件
                        }
                    }
                )
            },
            {
                xtype: 'fieldset',
                style: 'border-radius: .4em;background-color: #fff; margin: 0 0 0 0;margin: 0 0 15px 0;',
                items:[
                    {
                        xtype: 'selectfield',
                        itemId: 'status',
                        label: '状态情况',
                        labelAlign: 'top',
                        doneButton: '确定',
                        cancelButton: '取消',
                        options: [
                            {text: '正常',  value: 'normal'},
                            {text: '不正常', value:'abnormal'}
                        ]
                    }
                ]
            },
            {
                xtype: 'fieldset',
                style: 'border-radius: .4em;background-color: #fff; margin: 0 0 0 0;',
                itemId: 'textpanel',
                items: [
                    {
                        label: '请输入描述',
                        labelAlign: 'top',
                        xtype: 'textareafield',
                        cls: 'miaos',
                        itemId:'tarea_ms',
                        value: '正常'
                    }]
            },
            {
                xtype: 'panel',
                html: '<div style="font-size: 18px;font-weight; margin-top:10px;bold;height: 2em;line-height: 2em;">拍照请按下面+按钮:</div>'
            },
            {
                xtype: 'photo',
                style: 'background:#fff;border-radius: .4em;min-height:80px;'
            },
            {
                xtype: 'panel',
                height: '4em',
                style: 'margin: 15px 0 15px 0',
                items: [
                    {
                        xtype: 'button',
                        text: '上传',
                        cls: 'demobtn',
                        style: 'height: 2.2em;margin: 15px 0 0 0;',
                        itemId: 'markconfirm'
                    }
                ]

            },
            {
                xtype: 'panel',
                id:'onprogress',
                html: ''
            }
        ]
    }
})