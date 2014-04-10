Ext.define('SfMobile.store.FunctionStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'SfMobile.model.FunctionModel',
        data:[
    		{id: '01', name: '水情信息', image: 'resources/images/function/water.png'},
            {id: '02', name: '雨情信息', image: 'resources/images/function/rain.png'},
            {id: '03', name: '水库巡查', image: 'resources/images/function/mark.png'},
            {id: '04', name: '退出系统', image: 'resources/images/function/setting.png'}
        ],
                
        autoLoad: true
    }
});