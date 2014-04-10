Ext.define('SfMobile.view.rain.RainDay', {
    extend: 'Ext.Panel',
    xtype: 'rainday',

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
            '<div class="tidetime" style="width:100%;height:100%;float:left;">日期：{TM}&nbsp;08:00:00</div>',
            '<table width="100%">',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:15px;text-align:center;">',
            '<td width="50%" style="border:1px solid #ccc;">站名</td>',
            '<td width="50%" style="border:1px solid #ccc;">{stnm}</td>',
            '</tr>',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:15px;text-align:center;">',
            '<td width="50%" style="border:1px solid #ccc;">测站编号</td>',
            '<td width="50%" style="border:1px solid #ccc;">{stcd}</td>',
            '</tr>',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:15px;text-align:center;">',
            '<td width="50%" style="border:1px solid #ccc;font-weight:bold;">{TM1}日累计雨量</td>',
            '<td width="50%" style="border:1px solid #ccc;font-weight:bold;">{[this.formatNull(values.yesterday)]}</td>',
            '</tr>',
            '<tpl for="value">',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:15px;text-align:center;">',
            '<td width="50%" style="border:1px solid #ccc;">{data.hour}时</td>',
            '<td width="50%" style="border:1px solid #ccc;">{data.RN}</td>',
            '</tr>',
            '</tpl>',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:15px;text-align:center;">',
            '<td width="30%" style="border:1px solid #ccc;font-weight:bold;">{TM}日累计雨量</td>',
            '<td width="70%" style="border:1px solid #ccc;font-weight:bold;">{[this.formatNull(values.sum)]}</td>',
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

    onStoreLoad: function(data, time, time1){
        var value = []
        value = data;

        var str = {stnm: data[0].data.stnm, stcd: data[0].data.stcd, TM: time, TM1: time1, yesterday: data[0].data.yesterday, sum: data[0].data.sum, value: value};
        this.setData(str);
    }
});