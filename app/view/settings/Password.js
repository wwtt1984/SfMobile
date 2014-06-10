/**
 * Created by USER on 14-5-6.
 */

Ext.define('SfMobile.view.settings.Password', {
    extend: 'Ext.form.Panel',
    xtype: 'password',

    requires: [

    ],

    config: {
        title: '修改密码',

        scrollable: {
            direction: 'vertical',
            directionLock: true
        },

        items:[
            {
                xtype: 'fieldset',
                title: '请输入新密码',
                defaults: {
                    labelWidth: '40%'
                },

                items:[
                    {
                        xtype: 'textfield',
                        name: 'oldword',
                        label: '原始密码',
                        itemId: 'oldword',
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        name: 'newword',
                        label: '新密码',
                        itemId: 'newword'
                    }
                ]
            },
            {
                xtype: 'panel',
                height: '4em',
                style: 'margin: 15px 0 15px 0',
                items: [
                    {
                        xtype: 'button',
                        text: '确定修改',
                        cls: 'demobtn',
                        style: 'height: 2.2em;margin: 15px 10px 0 10px;',
                        itemId: 'wordchange'
                    }
                ]
            }
        ]
    }
})