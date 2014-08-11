Ext.define('SfMobile.store.FunctionStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'SfMobile.model.FunctionModel',
        data:[
    		{id: '01', name: 'water', title: '水情信息', image: 'resources/images/function/water.png'},
            {id: '02', name: 'rain', title: '雨情信息', image: 'resources/images/function/rain.png'},
            {id: '03', name: 'projectmark', title: '工程巡查', image: 'resources/images/function/projectmark.png'},
            {id: '04', name: 'plantmark', title: '电厂巡查', image: 'resources/images/function/plantmark.png'},
            {id: '05', name: 'history', title: '本地记录', image: 'resources/images/function/history.png'},
            {id: '06', name: 'settings', title: '设置', image: 'resources/images/function/setting.png'}
        ],
                
        autoLoad: true
    }
});