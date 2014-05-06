Ext.define('SfMobile.model.VersionModel',{
	extend: 'Ext.data.Model',
    config: {
       fields: [
            'id', 
            'strThisVersion',
            'strGetNewVersionURL',
			'strGetFileVersionFileURL',
			'strFileName'
        ]
    }
        
});