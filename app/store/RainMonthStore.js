Ext.define('SfMobile.store.RainMonthStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'SfMobile.model.RainMonthModel',
        sorters: [
            {
                property : 'dd',
                direction: 'ASC'
            }
        ],
        proxy: {
            type: 'sk'
        }
    }
});