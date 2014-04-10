Ext.define('Ext.data.proxy.SkJsonp', {
  	
	singleton: true,///////////////////实例化单列/////////////////////////////
	
    config: {
   		url: 'http://10.33.150.109:8006/MobileSfsk/Data_Ys.ashx',
//        url: 'http://localhost/SfWebservice/Data_Ys.ashx',
		callbackKey: 'callback'

    },
	
	validate: function(t,results, options) {
		
        options = options || {};
		
        Ext.applyIf(options, {
            scope: this,
            success: Ext.emptyFn,
            failure: Ext.emptyFn
        });
        
        Ext.data.JsonP.request({
            url: this.config.url,
			callbackKey: 'callback',
            params: {
                t: t,
				results:results
            },
            scope: this,
            success: function(response) {
                options.success.call(options.scope, response);
            },
            failure: function() {
                options.failure.call(options.scope);
            }
        });
    }
});