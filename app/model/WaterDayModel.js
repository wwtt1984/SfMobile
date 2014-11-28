Ext.define('SfMobile.model.WaterDayModel',{
    extend: 'Ext.data.Model',
    config: {
        fields: [
            'area',
            'stnm',
            'stcd',
            'stcd1',
            'stnm1',

            'HourSW',
//            'WarnSW',
//            'eighthourSW',

            'txjjsw',
            'mxjjsw',
            'newSW',
            'newTM',
            'HisMaxSW',

            'HisMaxSWTM',
            'TM'
        ],

        hasOne: [
            {
                model: 'SfMobile.model.HourModel',
                name:'HourSW'
            }
        ]
    }

});