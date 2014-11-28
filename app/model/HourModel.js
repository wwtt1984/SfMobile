/**
 * Created by USER on 14-11-27.
 */

Ext.define('SfMobile.model.HourModel',{
    extend: 'Ext.data.Model',
    config: {
        fields: [
            'time',
            'value'
        ],
        belongsTo: 'WaterDayModel'
    }

});