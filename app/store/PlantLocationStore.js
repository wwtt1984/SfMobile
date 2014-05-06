/**
 * Created by USER on 14-5-6.
 */

Ext.define('SfMobile.store.PlantLocationStore', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.PlantLocationStore',

    requires: [
        'SfMobile.model.TreeModel'
    ],

    config: {
        autoLoad: true,
        model: 'SfMobile.model.TreeModel',
        defaultRootProperty: 'items',

//        proxy: {
//            type: 'sk',
////            extraParams: {
////                t: 'GetXcjhTD',
////                results: 'jsonp'
////            },
//            reader: {
//                type: 'json'
//            }
//        },
        root: {
            id: 'plant',
            expanded:true,
            items:[
                {
                    text: '1号机机旁屏侧面',
                    leaf: true
                },
                {
                    text: '2号机机旁屏侧面',
                    leaf: true
                },
                {
                    text: '励磁变室',
                    leaf: true
                },
                {
                    text: '蝶阀油压装置压力罐上',
                    leaf: true
                },
                {
                    text: '1号机机墩',
                    leaf: true
                },

                {
                    text: '2号机机墩',
                    leaf: true
                },
                {
                    text: '集水井楼梯口',
                    leaf: true
                },
                {
                    text: '空压机室内',
                    leaf: true
                },
                {
                    text: '直流屏内',
                    leaf: true
                },
                {
                    text: '高压开关室',
                    leaf: true
                },

                {
                    text: '110KV开关柱上',
                    leaf: true
                },
                {
                    text: '110KV压变柱上',
                    leaf: true
                }
            ]
        }
    }
})