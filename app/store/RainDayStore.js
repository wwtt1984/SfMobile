Ext.define('SfMobile.store.RainDayStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'SfMobile.model.RainDayModel',

        proxy: {
            type: 'sk'
        }
    }
});