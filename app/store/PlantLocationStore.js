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
                    detail: '发电机运行声音、振动情况；调速器运行情况；调速器油压装置油压、油位，回油箱油位是否正常；机旁屏上各指示灯指示是否正确；触摸屏上各运行参数是否正常；励磁系统各运行参数是否正常；机组各导轴承油温、空冷器温度是否正常；上下导冷却水水压是否正常。',
                    leaf: true
                },
                {
                    text: '2号机机旁屏侧面',
                    detail: '发电机运行声音、振动情况；调速器运行情况；调速器油压装置油压、油位，回油箱油位是否正常；机旁屏上各指示灯指示是否正确；触摸屏上各运行参数是否正常；励磁系统各运行参数是否正常；机组各导轴承油温、空冷器温度是否正常；上下导冷却水水压是否正常。',
                    leaf: true
                },
                {
                    text: '励磁变室',
                    detail: '励磁变声音、温度是否正常；励磁变闸刀位置是否正确；励磁高压熔丝有否熔断。',
                    leaf: true
                },
                {
                    text: '蝶阀油压装置压力罐上',
                    detail: '蝶阀油压装置压力罐油压、油位是否正常，回油箱油位是否正常；油泵启动是否正常；蝶阀开关位置指示是否正常。',
                    leaf: true
                },
                {
                    text: '1号机机墩',
                    detail: '水导振动是否正常；水导观察孔甩油是否正常；主轴密封出水是否正常；机墩内积水是否正常；剪断销是否正常；下导油位是否正常；各导轴承冷却水示流是否正常。',
                    leaf: true
                },

                {
                    text: '2号机机墩',
                    detail: '水导振动是否正常；水导观察孔甩油是否正常；主轴密封出水是否正常；机墩内积水是否正常；剪断销是否正常；下导油位是否正常；各导轴承冷却水示流是否正常。',
                    leaf: true
                },
                {
                    text: '集水井楼梯口',
                    detail: '集水井水位是否正常；水泵启动是否正常；指示灯指示是否正确。',
                    leaf: true
                },
                {
                    text: '空压机室内',
                    detail: '高低压压力罐气压是否正常；气泵启动是否正常；指示灯指示是否正确。',
                    leaf: true
                },
                {
                    text: '直流屏内',
                    detail: '110kv线路保护装置运行是否正常；主变保护装置运行是否正常； 1#、２#机保护装置运行是否正常；公用ＬＣＵ屏上各参数是否正常； 直流系统运行是否正常；厂用电系统电压电流是否正常。',
                    leaf: true
                },
                {
                    text: '高压开关室',
                    detail: '高压开关室内气味是否正常；高压开关柜内开关、闸刀、流变、压变、高压熔丝、高压电缆连接头、母排及穿墙套管等设备是否正常；各电气连接处温度是否正常。',
                    leaf: true
                },

                {
                    text: '110KV开关柱上',
                    detail: '主变运行声音是否正常；主变本体有无渗漏油情况；高压套管油位是否正常；主变本体油位是否正常，上层油温是否正常；110kv开关SF6气体压力是否正常；开关位置指示是否正常',
                    leaf: true
                },
                {
                    text: '110KV压变柱上',
                    detail: '110kv流变油位是否正常；110kv压变油位是否正常；避雷器泄漏电流是否正常，计数器指示是否有变化',
                    leaf: true
                }
            ]
        }
    }
})