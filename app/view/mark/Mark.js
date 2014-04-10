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
                xtype: 'fieldset',
                style: 'border-radius: .4em;background-color: #fff; margin: 0 0 0 0;margin: 0 0 15px 0;',
                items:[
                    {
                        xtype: 'selectfield',
                        itemId: 'location',
                        label: '巡查部位',
                        labelAlign: 'top',
                        doneButton: '确定',
                        cancelButton: '取消',
                        options: [
                            {text: '左坝头',  value: '左坝头'},
                            {text: '右坝头', value:'右坝头'},
                            {text: '启闭机房',  value: '启闭机房'},
                            {text: '进水口',  value: '进水口'},
                            {text: '廊道', value: '廊道'},
                            {text: '下游',  value: '下游'},
                            {text: '库区线',  value: '库区线'}
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
                        itemId:'tarea_ms'
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
            },
        ]
    }
})