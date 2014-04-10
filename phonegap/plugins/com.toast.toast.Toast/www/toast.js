var Toast = function () {};
/**
 * 设置提示值
 * @param content
 * @param length
 * @returns {*}
 */
Toast.prototype.ShowToast = function (content, length) {
    return cordova.exec(null, null,"ToastPlugin","Toast",[content,length]);
};
module.exports = (new Toast());
