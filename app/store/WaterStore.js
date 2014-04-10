Ext.define('SfMobile.store.WaterStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'SfMobile.model.WaterModel',

        proxy: {
            type: 'sk'
        }
    }
});