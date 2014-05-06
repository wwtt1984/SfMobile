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

    user: {name: '', password: ''},

    requires: [
        'Ext.MessageBox',
        'Ext.data.proxy.SkProxy',
        'Ext.data.proxy.SkJsonp',
        'Ext.device.Camera'
    ],

    views: [
        'Main',

        'Login',
        'Function',
        'Title',
        'Info',

        'water.Water',
        'water.WaterDetail',
        'water.WaterMain',
        'water.WaterDay',

        'rain.Rain',
        'rain.RainDetail',
        'rain.RainMain',
        'rain.RainDay',
        'rain.RainMonth',

        'mark.MarkMain',
        'mark.Mark',
        'mark.Photo',
        'mark.NewsImg',
        'mark.LocationTree',

        'settings.Setting',
        'settings.Frequency',
        'settings.Password'
    ],

    models: [
        'FunctionModel',

        'WaterModel',
        'WaterDayModel',

        'RainModel',
        'RainDayModel',
        'RainMonthModel',
        'RainYearModel',

        'PhotoModel',

        'SettingModel',

        'TreeModel'
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

        'SettingStore',

        'ProjectLocationStore',
        'PlantLocationStore'
    ],

    controllers: [
        'MainControl',
        'WaterControl',
        'RainControl',
        'MarkControl',
        'SettingControl'
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
