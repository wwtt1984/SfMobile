/**
 * Created by USER on 14-5-13.
 */

Ext.define('SfMobile.view.mark.DetailView',{

    extend: 'Ext.Panel',
    xtype: 'detailview',

    requires: [
        'Ext.XTemplate'
    ],

    config: {
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },

        modal: true,
        centered: false,
        hideOnMaskTap: true,

        ui: 'detail',
        width: '100%',

        bottom: 0,
        right: 0,

        style: 'background:#f7f7f7;',

        tpl: Ext.create('Ext.XTemplate',
//            '<tpl if="detail &lt; null">',
//                '<div style="min-height:2.2em;width:100%;font-size:16px;font-weight:bold; line-height:1.6em;text-justify:newspaper;margin-bottm:0.3em;text-align:center;">{stitle}</div>',
//                '<div style="min-height:2em;width:100%;line-height:1.6em;text-align:justify;text-justify:distribute-all-lines;text-align-last:justify;-moz-text-align-last:justify;-webkit-text-align-last:justify;">',
//                    '<p style="text-indent:2em;font-size:14px;-webkit-margin-after: 0px;margin-top:0.5em;">详细巡视内容：</p>',
//                    '<p style="text-indent:2em;font-size:14px;-webkit-margin-after: 0px;margin-top:0.5em;">{detail}</p>',
//                '</div>',
//            '</tpl>',
//            '<tpl else>',
//                '<div style="min-height:2.2em;width:100%;font-size:16px;font-weight:bold; line-height:1.6em;text-justify:newspaper;margin-bottm:0.3em;text-align:center;">请先选择巡查部位。</div>',
//            '</tpl>',
            '{[this.getContent(values)]}',
            {
                getContent: function(values){
                    if(values.detail == ''){
                        return '<div style="min-height:2.2em;width:100%;font-size:16px;font-weight:bold; line-height:1.6em;text-justify:newspaper;margin-bottm:0.3em;text-align:center;">请先选择巡查部位。</div>';
                    }
                    else{
                        return '<div style="min-height:2.2em;width:100%;font-size:16px;font-weight:bold; line-height:1.6em;text-justify:newspaper;margin-bottm:0.3em;text-align:center;">' + values.stitle + '</div>' +
                            '<div style="min-height:2em;width:100%;line-height:1.6em;text-align:justify;text-justify:distribute-all-lines;text-align-last:justify;-moz-text-align-last:justify;-webkit-text-align-last:justify;">'+
                            '<p style="text-indent:2em;font-size:14px;-webkit-margin-after: 0px;margin-top:0.5em;">详细巡视内容：</p>'+
                            '<p style="text-indent:2em;font-size:14px;-webkit-margin-after: 0px;margin-top:0.5em;">' + values.detail + '</p>'+
                            '</div>';
                    }
                }
            }
        )
    },

    onDataSet: function(record){
        this.setData({stitle: record.location, detail: record.detail});
    }
});