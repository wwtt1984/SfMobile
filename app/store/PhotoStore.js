Ext.define('SfMobile.store.PhotoStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'SfMobile.model.PhotoModel',
        data:[
//            //{id: 'A2', uid:'B2', name: '海塘-11', src: 'resources/images/xk.jpg'},
//            //{id: 'A1', uid:'B1', name: '海塘-11', src: 'resources/images/1375943943975.jpg'},
            {id: 'A0', name: 'imgsrc0', src: 'resources/images/add.png', imgadd: 'imgadd0'}
//            {id: 'A1', name: '海塘-43', src: 'resources/images/add.png'},
//            {id: 'A2', name: '海塘-44', src: 'resources/images/add.png'},
//            {id: 'A3', name: '海塘-45', src: 'resources/images/add.png'},
//            {id: 'A4', name: '海塘-46', src: 'resources/images/add.png'}
//            
        ]
//        
//        grouper: {
//            groupFn: function(record) {
//                 return record.get('id');
//            }
//        }
    }
});