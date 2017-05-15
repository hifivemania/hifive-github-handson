(function ($) {
  h5.u.obj.expose('handson.utils', {
    formatDateWithHyphen: function(date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var mStr = m < 10 ? '0' + m : m.toString();
        var d = date.getDate();
        var dStr = d < 10 ? '0' + d : d.toString();
        return h5.u.str.format('{0}-{1}-{2}', y, mStr, dStr);
    }
  });
  
  // ダミー用のajax（サーバを使用しないため、）
  h5.ajax = function() {
     var dfd = h5.async.deferred();
     setTimeout(function(){
         dfd.resolve({});
     }, 500);
     return dfd.promise();
  };
})(jQuery);
