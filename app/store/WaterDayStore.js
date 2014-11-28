Ext.define('SfMobile.store.WaterDayStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'SfMobile.model.WaterDayModel',

        proxy: {
            type: 'sk'
        }

//        autoLoad: true,

//        data: [
//            {
//                'area':'区域5',
//                'stcd':'1',
//                'stnm':'沙畈水库',
//                'stcd1':'6612 ',
//                'stnm1':'坝上站',
//
//                HourSW:[
//                    {time: '8时水位', value:'222.00'},
//                    {time: '9时水位', value:'222.00'},
//                    {time: '10时水位', value:'222.00'},
//                    {time: '11时水位', value:'222.00'},
//                    {time: '12时水位', value:'222.00'}
//                ],
//
//                'mxjjSW':'270.06',
//                'txjjSW':'270.06',
//                'newSW':'260.38',
//                'newTM':'2014-11-26 15:39:47',
//                'HisMaxSW':'272.59',
//                'HisMaxSWTM':'2009-08'
//            }
//        ]
    }
});