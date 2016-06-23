(function ($) {
    h5.u.obj.expose('itpro.sample.report', {
            Section: function (sectionId, category, title, comment) {
                this.sectionId = sectionId;
                this.category = category;
                this.title = title;
                this.comment = comment;
            }
	});

     function User(userId, userName, realName) {
        this.userId = userId;
        this.userName = userName;
        this.realName = realName;
    }

    h5.u.obj.expose('itpro.sample.report.utils', {
        /**
         * ログインしているユーザ情報を取得します。<br>
         * 未ログイン時は、このメソッドはnullを返します。
         *
         * @function
         * @name getLoginUserInfo
         * @memberOf itpro.sample.report.utils
         * @returns {Object} ログインしているユーザ情報。次のプロパティを持ちます。
         *          <ul>
         *          <li>userId : ユーザID
         *          <li>userName：ユーザ名
         *          <li>realName：ユーザの実名
         *          </ul>
         */
        getLoginUserInfo : function () {
             // ダミーの値を返す
             return new User('0000001', 'yamada', '山田太郎');
        },

	    /**
	     * URLのパラメータをオブジェクトにシリアライズします
	     *
	     * @returns {キー名:値}のオブジェクトに変換されたパラメータ
	     * @memberOf itpro.sample.report.utils
	     */
    	getRequestParameters:function () {
	        var params = {};
	        var queryString = location.href.match(/\?(.+)/);
	        if (queryString != null && queryString.length > 0) {
	            var queries = queryString[1].split('&');
	            for (var i = 0, len = queries.length; i < len; i++) {
	                var pair = queries[i].split('=');
	                if (pair.length === 0) {
	                    continue;
	                }
	                params[pair[0]] = decodeURIComponent(pair[1].replace(/\+/g, '%20'));
	            }
	        }
	        return params;
	    },

	    /**
	     * 日付をyyyy-mm-ddにフォーマット
	     *
	     * @memberOf itpro.sample.report.utils
	     * @param date
	     * @returns
	     */
	    formatDateWithHyphen: function(date) {
	        var y = date.getFullYear();
	        var m = date.getMonth() + 1;
	        var mStr = m < 10 ? '0' + m : m.toString();
	        var d = date.getDate();
	        var dStr = d < 10 ? '0' + d : d.toString();
	        return h5.u.str.format('{0}-{1}-{2}', y, mStr, dStr);
	    },

	    /**
	     * 日付をyyyy/mm/ddにフォーマット
	     *
	     * @memberOf itpro.sample.report.utils
	     * @param date
	     * @returns
	     */
	    dateSlashFormat: function (date) {
	        return itpro.sample.report.utils.formatDateWithHyphen(new Date(date)).replace(/-/g, '/');
	    },

        /**
         * 時刻をhh:mmにフォーマット
         *
         * @memberOf itpro.sample.report.utils
         * @param {Date} date
         * @returns
         */
        formatTime : function (date) {
            var h = date.getHours();
            var m = date.getMinutes();
            return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
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