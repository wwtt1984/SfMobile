Ext.define('SfMobile.model.RainDayModel',{
    extend: 'Ext.data.Model',
    config: {
        fields: [
            'area',
            'stnm',
            'stcd',
            'yesterday',
            {name: 'hour', type: 'int'},

            'RN',
            'sum'
        ]
    }

});