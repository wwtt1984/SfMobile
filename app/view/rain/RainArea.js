/**
 * Created by USER on 14-6-10.
 */

Ext.define('SfMobile.view.rain.RainArea', {
    extend: 'Ext.Panel',
    xtype: 'rainarea',

    requires: [
        'Ext.XTemplate'
    ],

    config: {
        title: '面雨量',

        scrollable: {
            direction: 'vertical',
            directionLock: true
        },

        style: 'background-color: #f7f7f7;',

        tpl: Ext.create('Ext.XTemplate',
            '<table width="100%">',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:15px;text-align:center;">',
            '<td width="40%" style="border:1px solid #ccc;">站名</td>',
            '<td width="60%" style="border:1px solid #ccc;">{stnm}</td>',
            '</tr>',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:15px;text-align:center;">',
            '<td width="40%" style="border:1px solid #ccc;">测站编号</td>',
            '<td width="60%" style="border:1px solid #ccc;">{stcd}</td>',
            '</tr>',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:15px;text-align:center;">',
            '<td width="40%" style="border:1px solid #ccc;">今日面雨量</td>',
            '<td width="60%" style="border:1px solid #ccc;">{[this.formatNull(values.today)]}</td>',
            '</tr>',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:15px;text-align:center;">',
            '<td width="40%" style="border:1px solid #ccc;">昨日面雨量</td>',
            '<td width="60%" style="border:1px solid #ccc;">{[this.formatNull(values.yesterday)]}</td>',
            '</tr>',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:15px;text-align:center;">',
            '<td width="40%" style="border:1px solid #ccc;">15分钟面雨量</td>',
            '<td width="60%" style="border:1px solid #ccc;">{[this.formatNull(values.FifteenminYL)]}</td>',
            '</tr>',

            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:15px;text-align:center;">',
            '<td width="40%" style="border:1px solid #ccc;">30分钟面雨量</td>',
            '<td width="60%" style="border:1px solid #ccc;">{[this.formatNull(values.thirtyminYL)]}</td>',
            '</tr>',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:15px;text-align:center;">',
            '<td width="40%" style="border:1px solid #ccc;">1小时面雨量</td>',
            '<td width="60%" style="border:1px solid #ccc;">{[this.formatNull(values.OnehourYL)]}</td>',
            '</tr>',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:15px;text-align:center;">',
            '<td width="40%" style="border:1px solid #ccc;">3小时面雨量 </td>',
            '<td width="60%" style="border:1px solid #ccc;">{[this.formatNull(values.threehourYL)]}</td>',
            '</tr>',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:15px;text-align:center;">',
            '<td width="40%" style="border:1px solid #ccc;">24小时面雨量</td>',
            '<td width="60%" style="border:1px solid #ccc;">{[this.formatNull(values.tweentyfourhourYL)]}</td>',
            '</tr>',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:15px;text-align:center;">',
            '<td width="40%" style="border:1px solid #ccc;">1小时警戒值</td>',
            '<td width="60%" style="border:1px solid #ccc;">{[this.formatNull(values.OnehourWarnYL)]}</td>',
            '</tr>',
            '</table>',
            {
                formatNull: function(data) {
                    if(data != ''){

                        return data;
                    }
                    else{
                        return '--';
                    }
                }
            }
        )
    },

    onStoreLoad: function(record){
        this.setData(record.data);
    }
});