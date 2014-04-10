Ext.define('SfMobile.store.RainYearStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'SfMobile.model.RainYearModel',
        sorters: [
            {
                property : 'mm',
                direction: 'ASC'
            }
        ],
        proxy: {
            type: 'sk'
        }
    }
});