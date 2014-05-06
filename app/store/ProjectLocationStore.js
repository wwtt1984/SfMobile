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
                            leaf: true
                        },
                        {
                            text: '右坝头',
                            leaf: true
                        }
                    ]
                },
                {
                    text: '启闭机房',
                    leaf: true
                },
                {
                    text: '进水口',
                    leaf: true
                },
                {
                    text: '廊道',
                    leaf: true
                },
                {
                    text: '下游',
                    leaf: true
                },

                {
                    text: '库区线',
                    leaf: true
                },
                {
                    text: '二级涵洞',
                    items: [
                        {
                            text: '1#支洞',
                            leaf: true
                        },
                        {
                            text: '2#支洞',
                            leaf: true
                        },
                        {
                            text: '3#支洞',
                            leaf: true
                        },
                        {
                            text: '4#支洞',
                            leaf: true
                        },
                        {
                            text: '5#支洞',
                            leaf: true
                        }
                    ]
                }]
        }
    }
})