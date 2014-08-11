/**
 * Created by xiaona on 14-1-7.
 */

Ext.define('SfMobile.view.history.History', {
//    extend: 'Ext.Panel',
    extend: 'Ext.dataview.DataView',
    xtype: 'history',

    requires: [
    ],

    config: {

        title: '本地记录',

        itemId: 'history',

        mode: 'MULTI',
        baseCls: 'x-list',
        cls: 'x-list-normal',
        emptyText: '<p class="no-searches" style="margin-top:50%;">没有本地记录</p>',
        disableSelection: true,
        defaultType: 'historyitem',
        store: 'UploadStore',
        useComponents: true,
        loadingText: '努力加载中...'
    }
});