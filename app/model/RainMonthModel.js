Ext.define('SfMobile.model.RainMonthModel',{
    extend: 'Ext.data.Model',
    config: {
        fields: [
            'area',
            'stnm',
            'stcd',
            'lastMonth',
            {name: 'dd', type: 'int'},

            'RN',
            'sum'
        ]
    }

});