Ext.define('SfMobile.view.mark.NewsImg',{

	extend: 'Ext.Panel',
	xtype: 'newsimg',
	
	requires:[
	    'Ext.carousel.Carousel',
        'Ext.Img'
	],
	
	config: {
		itemId: 'newimg',

		items:[
		{
			xtype: 'carousel',
            cls: 'fun-carousel',
            itemId: 'newscarousel',
			style: 'position: absolute;margin:0; padding:0;width:100%;height:100%;background: #000;',
		    direction: 'horizontal',

            directionLock: true
		},
		{
			xtype: 'panel',
			width: '100%',
			height: '2.2em',
			layout: 'hbox',
			items:[
			    {
			        xtype: 'button',
			        iconCls: 'arrow_left',
                    itemId: 'photoback',
			        height: '100%',
			        left: 0,
			        ui: 'plain',
		    	    style: 'width:50px;margin:5px 0 0 5px;color:#fff;filter:alpha(opacity=100);-moz-opacity:1;-khtml-opacity:1;opacity:1;'
		    	},
                {
                    xtype: 'button',
                    iconCls: 'delete',
                    itemId: 'photodelete',
//                    hidden: true,
                    height: '100%',
                    right: 0,
                    ui: 'plain',
                    style: 'width:50px;margin:5px 0 0 5px;color:#fff;filter:alpha(opacity=100);-moz-opacity:1;-khtml-opacity:1;opacity:1;'
                }
            ]
		}]		
	},

    onImgDataSet: function(values){
        Ext.ComponentQuery.query('#photodelete')[0].hide();
        var img = [];
        img = values.imgjson.split(',');

        var item =[];

        this.down('carousel').removeAll();

        for(var i=0; i<img.length; i++){

            item.push({xtype: 'image',cls: 'my-carousel-item-img',src: img[i]});
        }

        this.down('carousel').setItems(item);
    },

    onPhotoDataSet: function(id, index){

        Ext.ComponentQuery.query('#photodelete')[0].show();
        var store = Ext.getStore('PhotoStore');

        var item =[];

        Ext.ComponentQuery.query('#newscarousel')[0].removeAll();

        for(var i=0; i<store.getAllCount() - 1; i++){
//            item.push({xtype: 'image',cls: 'my-carousel-item-img',src: store.getAt(i).data.src});
            item.push({xtype: 'image',cls: 'my-carousel-item-img',src: store.getAt(i).data.src});
        }

        Ext.ComponentQuery.query('#newscarousel')[0].setItems(item);
    },

    onPhotoDelete: function(){

        var cars = Ext.ComponentQuery.query('#newscarousel')[0];
        var index = cars.getActiveIndex();

        cars.removeAt(index + 1);

        var store = Ext.getStore('PhotoStore');
        var record = store.getAt(index);


        Ext.getStore('PhotoStore').removeAt(index);

        Ext.ComponentQuery.query('#photo')[0].onPhotoDelete(record);

        if(cars.getItems().getCount() == 1){
            Ext.ComponentQuery.query('#info')[0].onViewHide();
        }
    }
})