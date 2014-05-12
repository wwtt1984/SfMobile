/**
 * Created by USER on 14-5-6.
 */

Ext.define('SfMobile.controller.SettingControl', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.app.Route'
    ],

    config: {

        refs: {
            main: 'main',
            infofunction: '[itemId=infofunction]',
            info: 'info',
            setting: 'info setting',
            frequency: 'info frequency',
            password: 'info password',
            settinglist: '[itemId=settinglist]',
            markfrequency: '[itemId=markfrequency]',
            oldword: '[itemId=oldword]',
            newword: '[itemId=newword]',
            wordchange: '[itemId=wordchange]',
            sysquit: '[itemId=sysquit]'

        },

        control: {
            settinglist: {
                itemtap: 'onSettingListItemTap'
            },
            markfrequency: {
                change: 'onMarkFrequencyChange'
            },
            wordchange: {
                tap: 'onWordChangeTap'
            },
            sysquit: {
                tap: 'onSystemQuitTap'
            }


        }
    },

    onSettingInitialize: function(){

        this.setting = this.getSetting();
        if(!this.setting){
            this.setting= Ext.create('SfMobile.view.settings.Setting');
        }
        this.getInfo().push(this.setting);
    },

    onSettingListItemTap: function(list, index, target, record, e, eOpts ){

        var me = this;
        var titlestr = ['mark', 'password'];

        switch(record.data.name){
            case titlestr[0]:
                me.onFrequencySet();
                break;
            case titlestr[1]:
                me.onPasswordSet();
                break;
        }
    },

    //点击 ”巡查频率“， 进入巡查频率设置页面
    onFrequencySet: function(){

        this.frequency = this.getFrequency();
        if(!this.frequency){
            this.frequency= Ext.create('SfMobile.view.settings.Frequency');
        }
        this.getInfofunction().hide();
        this.getInfo().push(this.frequency);
    },

    //选择 “巡查频率”进行设置
    onMarkFrequencyChange: function(field, newValue, oldValue, eOpts){
        Ext.Msg.alert(oldValue + '+' + newValue);
    },

    //点击“修改密码”，进入修改密码页面
    onPasswordSet: function(){

        this.password = this.getFrequency();
        if(!this.password){
            this.password= Ext.create('SfMobile.view.settings.Password');
        }
        this.getInfofunction().hide();
        this.getOldword().setValue(SfMobile.app.user.password);
        this.getInfo().push(this.password);
    },

    //点击 “确认修改” 按钮，进行修改密码操作
    onWordChangeTap: function(){
        var me = this;
        var word = me.getNewword().getValue();

        if(word){
            Ext.Msg.alert('设置成功');
        }
        else{
            plugins.Toast.ShowToast("新密码不能为空!",3000);
        }
    },

    onSystemQuitTap: function(){
        navigator.app.exitApp();
    }

})