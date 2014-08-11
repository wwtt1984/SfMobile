Ext.define('SfMobile.store.UploadStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'SfMobile.model.UploadModel',
//        pageSize: 3,
        clearOnPageLoad: false,
        autoLoad: true,
        
        proxy: {
      
            type: 'localstorage',
            id  : 'upload'
        }
//        data:[
//		{"status":'安全',"sdt":"2013-08-22 17:57:25","grade":"顾世杰","miaos":"","processtime":"南岸","location":"滨江区海塘","imgjson":"upload/gsj/20130822/1377145246782.jpg"},
//		{"status":'安全',"sdt":"2013-08-20 16:15:33","grade":"顾世杰","miaos":"办公室办公室办公室办公室办公室办公室办公室办公室办公室办公室办公室办公室办公室办公室办公室办公室办公室办公室办公室","processtime":"南岸","location":"滨江区海塘","imgjson":"upload/gsj/20130820/1376986419796.jpg,upload/gsj/20130820/1376986419796.jpg,upload/gsj/20130820/1376986419796.jpg,upload/gsj/20130820/1376986419796.jpg,upload/gsj/20130820/1376986419796.jpg"},
//		{"status":'不安全',"sdt":"2013-08-20 15:43:48","grade":"顾世杰","miaos":"333","processtime":"南岸","location":"滨江区海塘","imgjson":"upload/gsj/20130820/1376984645095.jpg"},
//		{"status":'不安全',"sdt":"2013-08-20 15:41:09","grade":"顾世杰","miaos":"123","processtime":"南岸","location":"滨江区海塘","imgjson":"upload/gsj/20130820/1376984467201.jpg,upload/gsj/20130820/1376984482967.jpg"},
//		{"status":'不安全',"sdt":"2013-08-20 14:50:10","grade":"顾世杰","miaos":"擦擦擦","processtime":"南岸","location":"滨江区海塘","imgjson":"upload/gsj/20130820/1376981408165.jpg"},
//		{"status":'安全',"sdt":"2013-08-19 14:40:36","grade":"顾世杰","miaos":"啊啊啊","processtime":"南岸","location":"滨江区海塘","imgjson":"upload/gsj/20130819/1376894439688.jpg,upload/gsj/20130819/1376894448476.jpg"},
//		{"status":'安全',"sdt":"2013-08-19 10:34:06","grade":"顾世杰","miaos":"爸爸","processtime":"北岸","location":"长安沙周边","imgjson":"upload/gsj/20130819/1376879624999.jpg,upload/gsj/20130819/1376879633537.jpg"}
//		]
    }
});