Ext.define('SfMobile.store.VersionStore', {
    extend: 'Ext.data.Store',
    config: {
        model: 'SfMobile.model.VersionModel',

        proxy: {
            type: 'sk'
        }
    }
});