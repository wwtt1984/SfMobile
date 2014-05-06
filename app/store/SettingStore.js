/**
 * Created by USER on 14-5-6.
 */

Ext.define('SfMobile.store.SettingStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'SfMobile.model.SettingModel',
        data:[
            {id: '01', name: 'mark', title: '巡查频率'},
            {id: '02', name: 'password', title: '修改密码'}
        ],

        autoLoad: true
    }
});