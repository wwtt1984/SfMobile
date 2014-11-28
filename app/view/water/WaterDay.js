Ext.define('SfMobile.view.water.WaterDay', {
    extend: 'Ext.Panel',
    xtype: 'waterday',

    requires: [
        'Ext.XTemplate'
    ],

    config: {
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },

        tpl: Ext.create('Ext.XTemplate',
            '<div class="tidetime" style="width:100%;height:100%;float:left;">日期：{TM}</div>',
            '<table width="100%">',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:15px;text-align:center;">',
            '<td width="30%" style="border:1px solid #ccc;">站名</td>',
            '<td width="70%" style="border:1px solid #ccc;">{stnm1}</td>',
            '</tr>',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:15px;text-align:center;">',
            '<td width="30%" style="border:1px solid #ccc;">测站编号</td>',
            '<td width="70%" style="border:1px solid #ccc;">{stcd1}</td>',
            '</tr>',

            '<tpl for="HourSW">',
                '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:15px;text-align:center;">',
                    '<td width="30%" style="border:1px solid #ccc;">{time}</td>',
                    '<td width="70%" style="border:1px solid #ccc;">{value}</td>',
                '</tr>',
            '</tpl>',


            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:15px;text-align:center;">',
            '<td width="30%" style="border:1px solid #ccc;">最新水位</td>',
            '<td width="70%" style="border:1px solid #ccc;">{[this.formatNull(values.newSW)]}</td>',
            '</tr>',

            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:15px;text-align:center;">',
            '<td width="30%" style="border:1px solid #ccc;">最新水位时间</td>',
            '<td width="70%" style="border:1px solid #ccc;">{[this.formatNull(values.newTM)]}</td>',
            '</tr>',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:15px;text-align:center;">',
            '<td width="30%" style="border:1px solid #ccc;">台汛水位</td>',
            '<td width="70%" style="border:1px solid #ccc;">{[this.formatNull(values.txjjsw)]}</td>',
            '</tr>',

            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:15px;text-align:center;">',
            '<td width="30%" style="border:1px solid #ccc;">梅汛水位</td>',
            '<td width="70%" style="border:1px solid #ccc;">{[this.formatNull(values.mxjjsw)]}</td>',
            '</tr>',

            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:15px;text-align:center;">',
            '<td width="30%" style="border:1px solid #ccc;">历史最高水位</td>',
            '<td width="70%" style="border:1px solid #ccc;">{[this.formatNull(values.HisMaxSW)]}</td>',
            '</tr>',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:15px;text-align:center;">',
            '<td width="30%" style="border:1px solid #ccc;">最高水位时间</td>',
            '<td width="70%" style="border:1px solid #ccc;">{[this.formatNull(values.HisMaxSWTM)]}</td>',
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

    onStoreLoad: function(data){
        this.setData(data);
    }
});