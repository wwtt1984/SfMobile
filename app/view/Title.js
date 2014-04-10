Ext.define('SfMobile.view.Title', {
	extend: 'Ext.Panel',
	xtype: 'maintitle',
	id: 'maintitle',
	
	requires: [
        'Ext.XTemplate'
    ],
    
	config:{
		style: 'background:url(resources/images/function/header.png);',
		tpl:  Ext.create('Ext.XTemplate',
		  '<div style="height:100%;width:100%;">',
		      '<div style="position:absolute;height:100%;width:100%;background-color:#fff;filter:alpha(opacity=0);-moz-opacity:0;-khtml-opacity:0;opacity:0;"></div>',
              '<div style="height: 63px; width:60px;float:left;margin:20px 10px 20px 10px;background:url(resources/images/function/user.png); background-position:center center;background-size:4.2em auto;border-radius: .4em;"></div>',
              '<div style="height: 100%; min-width: 100px; float: left; color: #fff;">',
                '<div style="height:100%;margin:41px 0 0 0;font-size: 18px;width:100%;">{user}</div>',
//		        '<div style="height:50%;margin:6px 0 0 0;width:100%;font-size:15px;">{telephone}</div>',
              '</div>',
//              '<div style="height: 100%; width: 100px;margin:27px 0 0 0;text-align:center; float: right; color: #fff;font-size:15px;line-height:1.6em;">',
//              	'<div style= "height: 50%;width:100%">{stxt}</div>',
//              	'<div style= "height: 50%;width:100%">{stemperature}</div>',
//              '</div>',
		  '</div>'
		)
	},
	
	onDataSet: function(user, telephone){
//		this.setData({user:user, telephone: telephone, stxt: record.data.stxt, simg: record.data.simg, stemperature: record.data.stemperature});
        this.setData({user:user, telephone: telephone});
	}

});