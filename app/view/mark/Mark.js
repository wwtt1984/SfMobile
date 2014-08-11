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
        itemId: 'mark',

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
                    '<div class="choose" id="{[this.getLinkId(values,1)]}" style="border-top:1px solid #ccc;min-height: 2em;padding: 0 0.6em 0 0.4em;line-height: 2em;height:1em;">',
//                            '<span>{[this.getContent(values.td)]}</span>',
                    '<span style="font-size:14px;">详细巡视内容</span>',
                    '<img src="resources/images/code3.png" style="color:#ccc;float:right;width:20px;height:20px;margin-top:9px;"/>',
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

                                if(index == 0){
                                    SfMobile.app.getController('MarkControl').onLocationTap();
                                }
                                else{
                                    Ext.ComponentQuery.query('#mark')[0].onDetailViewShow(values);
                                }

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
                        label: '安全状态',
                        doneButton: '确定',
                        cancelButton: '取消',
                        options: [
                            {text: '安全',  value: '安全'},
                            {text: '不安全', value:'不安全'}
                        ]
                    },
                    {
                        xtype: 'selectfield',
                        itemId: 'grade',
                        hidden: true,
                        label: '隐患等级',
                        doneButton: '确定',
                        cancelButton: '取消',
                        options: [
                            {text: '一般',  value: '一般'},
                            {text: '较大', value:'较大'},
                            {text: '严重', value:'严重'}
                        ]
                    },
                    {
                        xtype: 'textfield',
                        hidden: true,
                        itemId: 'processtime',
                        label: '处理时间'
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
                        value: '安全'
                    }]
            },
            {
                xtype: 'panel',
                html: '<div style="font-size: 18px;font-weight; margin-top:10px;bold;height: 2em;line-height: 2em;">拍照请按下面+按钮:</div>'
            },
            {
                xtype: 'photo',
                style: 'background:#fff;border-radius: .4em;border:1px #eee solid;min-height:80px;'
            },
            {
                xtype: 'panel',
                height: '4em',
                style: 'margin: 15px 0 15px 0',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'button',
                        text: '上传',
                        cls: 'demobtn',
                        style: 'height: 2.2em;margin: 15px 10px 0 0;',
                        itemId: 'markconfirm',
                        flex: 1
                    },
                    {
                        xtype: 'button',
                        text: '本地保存',
                        cls: 'demobtn',
                        style: 'height: 2.2em;margin: 15px 0 0 10px;',
                        itemId: 'saveconfirm',
                        flex: 1
                    }
                ]

            }
        ]
    },

    onDetailViewShow: function(record){
        this.view = this.down('detailview');
        if(!this.view){
            this.view = Ext.create('SfMobile.view.mark.DetailView');
        }

        if (Ext.os.deviceType.toLowerCase() == "phone") {
            this.view.setWidth(null);
            this.view.setMinHeight('45%');
            this.view.setTop(null);
            this.view.setLeft(0);
        }
        this.view.onDataSet(record);

        if (!this.view.getParent()) {
            Ext.Viewport.add(this.view);
        }
        this.view.show();
    }
})