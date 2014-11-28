/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/
Ext.Loader.setPath({
    'Ext': 'touch/src',
    'WebInspect': 'app',
    'Ext.data.proxy.SkProxy': 'app/lib/SkProxy.js',
    'Ext.data.proxy.SkJsonp': 'app/lib/SkJsonp.js'
});

Ext.ClassManager.setAlias('Ext.data.proxy.SkProxy', 'proxy.sk');

Ext.application({
    name: 'SfMobile',

    mainthis: '',
    gpstime:30000,//30秒
    user: {sid:'',name: '', password: '',version:'1.0.0.92'},

    imginfo:{imgjson:[],imgindex:0,imgpos:'',simgid:''},//图片值 图片id，位置
    
    requires: [
        'Ext.device.FileSystem',
        'Ext.MessageBox',
        'Ext.data.proxy.SkProxy',
        'Ext.data.proxy.SkJsonp',
        'Ext.device.Camera',
        'Ext.data.proxy.LocalStorage'
    ],

    views: [
        'Main',

        'Login',
        'Function',
        'Title',
        'Info',
        'Load',

        'water.Water',
        'water.WaterDetail',
        'water.WaterMain',
        'water.WaterDay',

        'rain.Rain',
        'rain.RainDetail',
        'rain.RainMain',
        'rain.RainDay',
        'rain.RainMonth',
        'rain.RainArea',

        'mark.MarkMain',
        'mark.Mark',
        'mark.Photo',
        'mark.NewsImg',
        'mark.LocationTree',
        'mark.DetailView',

        'settings.Setting',
        'settings.Frequency',
        'settings.Password',

        'history.History',
        'history.HistoryItem',
        'history.HistoryDetail'
    ],

    models: [
        'FunctionModel',

        'WaterModel',
        'WaterDayModel',
        'HourModel',

        'RainModel',
        'RainDayModel',
        'RainMonthModel',
        'RainYearModel',

        'PhotoModel',
        'VersionModel',
        'SettingModel',
        'TreeModel',

        'UploadModel'
    ],

    stores: [
        'FunctionStore',

        'WaterStore',
        'WaterDayStore',

        'RainStore',
        'RainDayStore',
        'RainMonthStore',
        'RainYearStore',

        'PhotoStore',
        'VersionStore',
        'SettingStore',

        'ProjectLocationStore',
        'PlantLocationStore',

        'UploadStore'
    ],

    controllers: [
        'MainControl',
        'WaterControl',
        'RainControl',
        'MarkControl',
        'SettingControl',
        'HistoryControl'
    ],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // Initialize the main view
        Ext.Viewport.add(Ext.create('SfMobile.view.Main'));
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
