/**
 * Created by USER on 14-5-6.
 */

Ext.define('SfMobile.store.ProjectLocationStore', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.ProjectLocationStore',

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
            id: 'project',
            expanded:true,
            items:[
                {
                    text: '坝头',
                    items: [
                        {
                            text: '左坝头',
                            detail: '相邻坝段之间的错动，伸缩缝开合情况和工作状况。混凝土有无破损，混凝土有无溶蚀或水流侵蚀。',
                            leaf: true
                        },
                        {
                            text: '右坝头',
                            detail: '相邻坝段之间的错动，伸缩缝开合情况和工作状况。混凝土有无破损，混凝土有无溶蚀或水流侵蚀。',
                            leaf: true
                        }
                    ]
                },
                {
                    text: '启闭机房',
                    detail: '闸门能否正常工作，启闭设施能否应急启动工作。',
                    leaf: true
                },
                {
                    text: '进水口',
                    detail: '进水口有无堵淤，拦污栅有无损坏。',
                    leaf: true
                },
                {
                    text: '廊道',
                    detail: '廊道内有无裂缝、裂缝内漏水情况，排水孔工作状态，渗漏水的水量和水质有无显著变化。',
                    leaf: true
                },
                {
                    text: '下游',
                    detail: '两岸坝肩区有无裂缝、滑坡、错动和鼓出，下游河床及岸坡的冲刷和淤积情况。',
                    leaf: true
                },

                {
                    text: '库区线',
                    detail: '库区沿线有无塌方、岸坡裂缝变化情况、库面有无漂浮物。',
                    leaf: true
                },
                {
                    text: '二级涵洞',
                    items: [
                        {
                            text: '1#支洞',
                            detail: '山体是否有渗漏、滑坡、坍塌，封堵门是否完好，安全警示牌是否完好。',
                            leaf: true
                        },
                        {
                            text: '2#支洞',
                            detail: '山体是否有渗漏、滑坡、坍塌，封堵门是否完好，安全警示牌是否完好。',
                            leaf: true
                        },
                        {
                            text: '3#支洞',
                            detail: '山体是否有渗漏、滑坡、坍塌，封堵门是否完好，安全警示牌是否完好。',
                            leaf: true
                        },
                        {
                            text: '4#支洞',
                            detail: '山体是否有渗漏、滑坡、坍塌，封堵门是否完好，安全警示牌是否完好。',
                            leaf: true
                        },
                        {
                            text: '5#支洞',
                            detail: '山体是否有渗漏、滑坡、坍塌，封堵门是否完好，安全警示牌是否完好。',
                            leaf: true
                        }
                    ]
                }]
        }
    }
})