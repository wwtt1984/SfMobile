Ext.define('SfMobile.view.Info', {
    extend: 'Ext.navigation.View',
    xtype: 'info',
    
    requires: [
    ],
    config: {

    	navigationBar: {
    		ui: 'light',
            layout: 'fit',
            items: [
                {
            	    xtype: 'button',
            	    itemId: 'infofunction',
            	    ui: 'back',
            	    text: '主页面'
                },
                {
                    xtype: 'button',
                    itemId: 'infosearch',
                    ui: 'plain',
                    docked: 'right',
                    iconCls: 'search',
                    iconMasked: true,
                    hidden: true
                }
            ]
        },

        itemId: 'info',

        defaultBackButtonText: '返回'
    },

    onViewHide: function(){
        this.view.hide();
        this.view.destroy();
    },

    onPhotoShow: function(id, index){
        this.view = this.down('newsimg');
        if(!this.view){
            this.view = Ext.create('SfMobile.view.mark.NewsImg');
        }

        this.view.onPhotoDataSet(id, index);

        if (!this.view.getParent()) {
            Ext.Viewport.add(this.view);
        }
        this.view.show();
    },

    onPhotoDelete: function(){
        this.view.onPhotoDelete();
    }
});
