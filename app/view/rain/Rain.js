Ext.define('SfMobile.view.rain.Rain', {
    extend: 'Ext.List',
    xtype: 'rain',

    requires: [
        'Ext.plugin.PullRefresh'
    ],

    config: {

        title: '雨情信息',

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
        store: 'RainStore',

        emptyText: '<p class="no-searches">没有符合要求的记录</p>',

        itemTpl: [
            '<div style="width:25%;font-size:18px;line-height:2.2em;text-align:center;padding:0;margin:0;overflow:hidden;text-overflow: clip;white-space: nowrap;float:left;">{stnm}</div>',
            '<div style="width:25%;font-size:18px;line-height:2.2em;text-align:center;padding:0;margin:0;float:left;">{[this.formatNull(values.OnehourYL)]}</div>',
            '<div style="width:25%;font-size:18px;line-height:2.2em;text-align:center;padding:0;margin:0;float:left;">{[this.formatNull(values.today)]}</div>',
            '<div style="width:25%;font-size:18px;line-height:2.2em;text-align:center;padding:0;margin:0;float:right;">{[this.formatNull(values.today)]}</div>',
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
                html: '<div style="width:25%;height:100%;float:left;">测站</div><div style="width:25%;height:100%;float:left;">1小时</div><div style="width:25%;height:100%;float:left;">今日</div><div style="width:25%;height:100%;float:left;">昨日</div>'
            }
        ]
    }
});