Ext.define('SfMobile.model.RainYearModel',{
    extend: 'Ext.data.Model',
    config: {
        fields: [
            'area',
            'stnm',
            'STCD',
            'lastYear',
            {name: 'mm', type: 'int'},

            'RN',
            'sum'
        ]
    }

});