Ext.define('Ext.data.proxy.SkProxy', {
    extend: 'Ext.data.proxy.JsonP',
    alias: 'proxy.sk',
		
    config: {
//		url: 'http://10.33.150.109:8006/MobileSfsk/Data_Ys.ashx',
        url:'http://61.175.134.26:8090/sbskser2/data_ht.ashx',
//        url: 'http://localhost/SfWebservice/Data_Ys.ashx',
        callbackKey: 'callback'
    },
	
    buildRequest: function(operation) {
    	
        var request = this.callParent(arguments);
        return request;
    }
});