Ext.define('SfMobile.view.water.Water', {
    extend: 'Ext.List',
    xtype: 'water',

    requires: [
        'Ext.plugin.PullRefresh'
    ],

    config: {

        title: '水情信息',

        loadingText: '努力加载中...',
        scrollToTopOnRefresh: false,

        plugins: [
            {
                xclass: 'Ext.plugin.PullRefresh',
                pullText: '下拉刷新...',

                releaseText: '松开进行刷新...',

                loadingText: '正在刷新...',

                loadedText: '刷新完成.',

                lastUpdatedText: '刷新时间:&nbsp;'
            }
        ],

        cls: 'tidelist',
        store: 'WaterStore',

        emptyText: '<p class="no-searches">没有符合要求的记录</p>',

        itemTpl: [
            '<div style="width:40%;font-size:18px;line-height:2.2em;text-align:center;padding:0;margin:0;float:left;">{stnm}</div>',
            '<div style="width:30%;font-size:18px;line-height:2.2em;text-align:center;padding:0;margin:0;float:left;">{[this.formatNull(values.newSW)]}</div>',
            '<div style="width:30%;font-size:18px;line-height:2.2em;text-align:center;padding:0;margin:0;float:right;">{[this.formatNull(values.WarnSW)]}</div>',
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
        ],

        items: [
            {
                docked: 'top',
                xtype: 'panel',
                cls: 'tide-header',
                html: '<div style="width:40%;height:100%;float:left;">测站</div><div style="width:30%;height:100%;float:left;">当前水位</div><div style="width:30%;height:100%;float:left;">超警水位</div>'
            }
        ]
    },

    onWaterMainLoad: function(record){
        this.stcd = record.data.stcd;
        this.down('watermain').onStoreLoad(record);
    }
});