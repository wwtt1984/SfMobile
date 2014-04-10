Ext.define('SfMobile.model.WaterModel',{
    extend: 'Ext.data.Model',
    config: {
        idProperty: 'stcd',
        fields: [
            'area',
            'stnm',
            'stcd',
            'eighthourSW',
            'eighthourKR',

            'newSW',
            'newTM',
            'newKR',
            'KRpercent',
            'KR',

            'WarnSW',
            'DangerSW'
        ]
    }

});