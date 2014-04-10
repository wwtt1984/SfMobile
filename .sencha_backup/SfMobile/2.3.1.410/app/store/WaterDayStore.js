Ext.define('SfMobile.store.WaterDayStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'SfMobile.model.WaterDayModel',

        proxy: {
            type: 'sk'
        }
    }
});