Ext.define('Ext.data.proxy.SkProxy', {
    extend: 'Ext.data.proxy.JsonP',
    alias: 'proxy.sk',
		
    config: {
//		url: 'http://10.33.150.109:8006/MobileSfsk/Data_Ys.ashx',
        url:'http://122.226.205.102/sbskSer/data_ht.ashx',
        callbackKey: 'callback'
    },
	
    buildRequest: function(operation) {
    	
        var request = this.callParent(arguments);
        return request;
    }
});