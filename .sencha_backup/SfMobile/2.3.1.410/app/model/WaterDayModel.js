Ext.define('SfMobile.model.WaterDayModel',{
    extend: 'Ext.data.Model',
    config: {
        fields: [
            'area',
            'stnm',
            'stcd',
            'stcd1',
            'stnm1',

            'eighthourSW',
            'WarnSW',
            'newSW',
            'newTM',
            'HisMaxSW',

            'HisMaxSWTM',
            'TM'
        ]
    }

});