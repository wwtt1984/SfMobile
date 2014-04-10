Ext.define('SfMobile.model.RainModel',{
    extend: 'Ext.data.Model',
    config: {
        idProperty: 'stcd',
        fields: [
            'area',
            'stnm',
            'stcd',
            'today',
            'yesterday',

            'FifteenminYL',
            'thirtyminYL',
            'OnehourYL',
            'threehourYL',
            'tweentyfourhourYL',

            'OnehourWarnYL'
        ]
    }

});