Ext.define('SfMobile.view.rain.RainMain', {
    extend: 'Ext.Panel',
    xtype: 'rainmain',

    requires: [
        'Ext.XTemplate'
    ],

    config: {
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },

        style: 'background-color: #f7f7f7;',

        tpl: Ext.create('Ext.XTemplate',
            '<table width="100%">',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:15px;text-align:center;">',
            '<td width="30%" style="border:1px solid #ccc;">站名</td>',
            '<td width="70%" style="border:1px solid #ccc;">{stnm}</td>',
            '</tr>',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:15px;text-align:center;">',
            '<td width="30%" style="border:1px solid #ccc;">测站编号</td>',
            '<td width="70%" style="border:1px solid #ccc;">{stcd}</td>',
            '</tr>',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:15px;text-align:center;">',
            '<td width="30%" style="border:1px solid #ccc;">今日雨量</td>',
            '<td width="70%" style="border:1px solid #ccc;">{[this.formatNull(values.today)]}</td>',
            '</tr>',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:15px;text-align:center;">',
            '<td width="30%" style="border:1px solid #ccc;">昨日雨量</td>',
            '<td width="70%" style="border:1px solid #ccc;">{[this.formatNull(values.yesterday)]}</td>',
            '</tr>',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:15px;text-align:center;">',
            '<td width="30%" style="border:1px solid #ccc;">15分钟雨量</td>',
            '<td width="70%" style="border:1px solid #ccc;">{[this.formatNull(values.FifteenminYL)]}</td>',
            '</tr>',

            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:15px;text-align:center;">',
            '<td width="30%" style="border:1px solid #ccc;">30分钟雨量</td>',
            '<td width="70%" style="border:1px solid #ccc;">{[this.formatNull(values.thirtyminYL)]}</td>',
            '</tr>',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:15px;text-align:center;">',
            '<td width="30%" style="border:1px solid #ccc;">1小时雨量</td>',
            '<td width="70%" style="border:1px solid #ccc;">{[this.formatNull(values.OnehourYL)]}</td>',
            '</tr>',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:15px;text-align:center;">',
            '<td width="30%" style="border:1px solid #ccc;">3小时雨量 </td>',
            '<td width="70%" style="border:1px solid #ccc;">{[this.formatNull(values.threehourYL)]}</td>',
            '</tr>',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:15px;text-align:center;">',
            '<td width="30%" style="border:1px solid #ccc;">24小时雨量</td>',
            '<td width="70%" style="border:1px solid #ccc;">{[this.formatNull(values.tweentyfourhourYL)]}</td>',
            '</tr>',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:15px;text-align:center;">',
            '<td width="30%" style="border:1px solid #ccc;">1小时警戒值</td>',
            '<td width="70%" style="border:1px solid #ccc;">{[this.formatNull(values.OnehourWarnYL)]}</td>',
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