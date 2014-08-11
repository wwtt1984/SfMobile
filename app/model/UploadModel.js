Ext.define('SfMobile.model.UploadModel',{
	extend: 'Ext.data.Model',
    config: {
        fields: [
            'sid',
            'name',
            'simgid',
            'sindex',
            'latitude',
            
            'longitude',            
            'sdt',
            'miaos',
            'imgjson',
            'imgindex',

            'location',
            'type',
            'grade',
            'processtime',
            'status'
        ]
    }
});