/**
 * Created by USER on 14-5-20.
 */

Ext.define('SfMobile.view.Load', {
    extend: 'Ext.Panel',
    xtype: 'load',
//    id: 'load',

    requires: [
        'Ext.XTemplate'
    ],

    config:{
//        style: 'background:url(resources/images/function/header.png);',
        cls: 'download',
        tpl:  Ext.create('Ext.XTemplate',
            '<div class="loading-status">',
            '<div class="percent" style="width:{[this.getWidth(values)]};color:#fff;font-size:12px;line-height:12px;">&nbsp;&nbsp;{width}%</div>',
            '</div>',
            {
                getWidth: function(values){
                    return values.width + '%';
                }
            }
        )
    },

    initialize: function(){
        this.setData({width: 0});
    },

    onDataSet: function(width){
        this.setData({width: width});
    }
});