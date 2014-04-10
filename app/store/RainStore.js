Ext.define('SfMobile.store.RainStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'SfMobile.model.RainModel',

        proxy: {
            type: 'sk'
        }
    }
});