/**
 * Created by USER on 14-8-8.
 */

Ext.define('SfMobile.view.history.HistoryDetail',{

    extend: 'Ext.Panel',
    xtype: 'historydetail',

    requires: [
        'Ext.XTemplate'
    ],

    config: {
        title: '详细信息',
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },

        style: 'background:#f7f7f7; padding: 10px;',

        tpl: Ext.create('Ext.XTemplate',
            '<div style="min-height:2.2em;width:100%;font-size:18px;font-weight:bold; line-height:1.6em;text-justify:newspaper;margin-bottm:0.3em;">{location}</div>',
            '{[this.getImg(values)]}',
            '<p style="text-indent:2em;line-height:1.6em;font-size:16px;-webkit-margin-after: 0px;margin-top:0.5em;">巡查部位：{location}</p>',
            '<p style="text-indent:2em;line-height:1.6em;font-size:16px;-webkit-margin-after: 0px;margin-top:0.5em;">巡查时间：{sdt}</p>',
            '<p style="text-indent:2em;line-height:1.6em;font-size:16px;-webkit-margin-after: 0px;margin-top:0.5em;">安全状态：{status}</p>',
            '<p style="text-indent:2em;line-height:1.6em;font-size:16px;-webkit-margin-after: 0px;margin-top:0.5em;">描述：{miaos}</p>',
            '<div style="min-height:2em;width:100%;line-height:1.6em;text-align:justify;text-justify:distribute-all-lines;text-align-last:justify;' +
                '-moz-text-align-last:justify;-webkit-text-align-last:justify;">{[this.getContent(values)]}</div>',
            {
                getImg: function(values){
                    var img = [];
                    var string = '';
                    img = values.imgjson.split(',');

                    if(img.length > 0){
//                        if(img[0].toLowerCase().indexOf(".jpg") > 0 || img[0].toLowerCase().indexOf(".png") > 0){
                            string += '<img src="' + img[0] + '" style="width:100%; height: auto; padding:3px; border:1px #f7f7f7 solid;background:white;" id="' + this.getLinkId(values) + '"/>';
                            // string += '<img style="width:100%; height: auto; padding:3px; border:1px #f7f7f7 solid;background:white;" id="' + this.getLinkId(values) + '"/>';

                            string += '<div style="min-height: 1.8em; width: 100%; font-size:12px; font-weight: normal; text-align: right; color: #666;padding:0 8px 5px 8px;"><div style="float: right;padding: 0.2em 0 0 0.3em;">张图片</div><div style="font-size: 16px;color: #000; font-weight: bold;float: right;">' + img.length + '</div><div style="float: right;padding: 0.2em 0.3em 0 0;">共计</div></div>';
//                        }

                    }
                    return string;
                },

                getContent: function(values){

                    var content = [];
                    var string = '';

                    if(values.status == '不安全'){
                        string += '<p style="text-indent:2em;font-size:16px;-webkit-margin-after: 0px;margin-top:0.5em;">隐患等级：' + values.grade + '</p>' +
                                  '<p style="text-indent:2em;font-size:16px;-webkit-margin-after: 0px;margin-top:0.5em;">处理时间：' + values.processtime + '</p>';
                    }
                    Ext.Viewport.setMasked(false);
                    return string;
                },
                getLinkId: function(values) {
                    var result = Ext.id();
                    Ext.Function.defer(this.addListener, 1, this, [result,values]);
                    return result;
                },
                addListener: function(id,values) {
                    var me = this;
                    Ext.get(id).on('tap', function(e){
                        me.addImg(values);
                    })//////增加add图片的事件
                },
                addImg:function(values){

                    Ext.ComponentQuery.query('#info')[0].onImageShow(values);

                }
            }
        )
    },

    onDataSet: function(record){
        this.setData({location:record.data.location, sdt:record.data.sdt, status:record.data.status,
            miaos: record.data.miaos, grade: record.data.grade, processtime: record.data.processtime,
            imgjson: record.data.imgjson});
    }
});