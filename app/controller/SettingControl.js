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
            login: 'login',
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
            sysquit: '[itemId=sysquit]',
            changeuser: '[itemId=changeuser]'

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
            },
            changeuser: {
                tap: 'onChangeUserTap'
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

        var me = this;

        me.frequency = me.getFrequency();
        if(!me.frequency){
            me.frequency= Ext.create('SfMobile.view.settings.Frequency');
        }
        me.getInfofunction().hide();

        me.frequency.setValues({markfrequency: SfMobile.app.gpstime});

        me.getInfo().push(me.frequency);
    },

    //选择 “巡查频率”进行设置
    onMarkFrequencyChange: function(field, newValue, oldValue, eOpts){

        var me = this;

        if(newValue != SfMobile.app.gpstime){

            var results = SfMobile.app.user.sid + '$' + newValue;

            Ext.data.proxy.SkJsonp.validate('UpdateUserPl',results,{
                success: function(response) {
                    if(response.success == "true"){

                        SfMobile.app.gpstime = newValue;
//                        Ext.Msg.alert('巡查频率设置成功！');
                        plugins.Toast.ShowToast("巡查频率设置成功！",2000);
                    }
                    else{

                        me.getFrequency().setValues({markfrequency: SfMobile.app.gpstime});
//                        Ext.Msg.alert('修改失败，请重试！');
                        plugins.Toast.ShowToast("设置失败，请重试！",2000);
                    }
                },
                failure: function(){

                    me.getFrequency().setValues({markfrequency: SfMobile.app.gpstime});
//                    Ext.Msg.alert('请求失败，请重试！');
                    plugins.Toast.ShowToast("请求失败，请重试！",2000);
                }
            });
        }
    },

    //点击“修改密码”，进入修改密码页面
    onPasswordSet: function(){

        var me = this;

        me.password = me.getPassword();
        if(!me.password){
            me.password= Ext.create('SfMobile.view.settings.Password');
        }
        me.getInfofunction().hide();
        me.getOldword().setValue(SfMobile.app.user.password);
        me.getInfo().push(me.password);
    },

    //点击 “确认修改” 按钮，进行修改密码操作
    onWordChangeTap: function(){
        var me = this;
        var oldword = me.getPassword().getValues().oldword;
        var newword = me.getPassword().getValues().newword;

        var results = SfMobile.app.user.sid + '$' + newword;

        if(newword){
            Ext.data.proxy.SkJsonp.validate('UpdateUserInfo',results,{
                success: function(response) {
                    if(response.success == "true"){

                        me.getPassword().setValues({oldword: newword, newword: ''});
                        SfMobile.app.user.password = newword;
                        me.getApplication().getController('MainControl').onUserWriteJson(); //重新记住新密码
//                        Ext.Msg.alert('修改成功！');
                        plugins.Toast.ShowToast("修改成功！",2000);
                    }
                    else{

                        me.getPassword().setValues({newword: ''});
//                        Ext.Msg.alert('修改失败，请重试！');
                        plugins.Toast.ShowToast("修改失败，请重试！",2000);
                    }
                },
                failure: function(){

                    me.getPassword().setValues({newword: ''});
//                    Ext.Msg.alert('请求失败，请重试！');
                    plugins.Toast.ShowToast("请求失败，请重试！",2000);
                }
            });

        }
        else{
//            Ext.Msg.alert('新密码不能为空！');
            plugins.Toast.ShowToast("新密码不能为空!",3000);
        }
    },

    onSystemQuitTap: function(){
        navigator.app.exitApp();
    },

    onChangeUserTap: function(){
        var me = this;
        var src = me.getMain();
        src.setActiveItem(me.getLogin());
    }

})