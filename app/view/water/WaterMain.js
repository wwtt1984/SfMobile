Ext.define('SfMobile.view.water.WaterMain', {
    extend: 'Ext.Panel',
    xtype: 'watermain',

    requires: [
        'Ext.XTemplate'
    ],

    config: {
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },

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
            '<td width="30%" style="border:1px solid #ccc;">昨日8点水位</td>',
            '<td width="70%" style="border:1px solid #ccc;">{[this.formatNull(values.yesEighthourSW)]}</td>',
            '</tr>',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:15px;text-align:center;">',
            '<td width="30%" style="border:1px solid #ccc;">8点水位</td>',
            '<td width="70%" style="border:1px solid #ccc;">{[this.formatNull(values.eighthourSW)]}</td>',
            '</tr>',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:15px;text-align:center;">',
            '<td width="30%" style="border:1px solid #ccc;">流量</td>',
            '<td width="70%" style="border:1px solid #ccc;">{[this.formatNull(values.LL)]}</td>',
            '</tr>',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:15px;text-align:center;">',
            '<td width="30%" style="border:1px solid #ccc;">8点库容</td>',
            '<td width="70%" style="border:1px solid #ccc;">{[this.formatNull(values.eighthourKR)]}</td>',
            '</tr>',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:15px;text-align:center;">',
            '<td width="30%" style="border:1px solid #ccc;">当前水位</td>',
            '<td width="70%" style="border:1px solid #ccc;">{[this.formatNull(values.newSW)]}</td>',
            '</tr>',

            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:15px;text-align:center;">',
            '<td width="30%" style="border:1px solid #ccc;">水位时间</td>',
            '<td width="70%" style="border:1px solid #ccc;">{[this.formatNull(values.newTM)]}</td>',
            '</tr>',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:15px;text-align:center;">',
            '<td width="30%" style="border:1px solid #ccc;">当前库容</td>',
            '<td width="70%" style="border:1px solid #ccc;">{[this.formatNull(values.newKR)]}</td>',
            '</tr>',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:15px;text-align:center;">',
            '<td width="30%" style="border:1px solid #ccc;">台汛期警戒水位</td>',
            '<td width="70%" style="border:1px solid #ccc;">{[this.formatNull(values.WarnSW)]}</td>',
            '</tr>',

            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:15px;text-align:center;">',
            '<td width="30%" style="border:1px solid #ccc;">梅汛期警戒水位</td>',
            '<td width="70%" style="border:1px solid #ccc;">{[this.formatNull(values.DangerSW)]}</td>',
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