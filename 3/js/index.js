(function($) {

	var REGIST_URL = 'regist';

	/**
	 * 日報画面用ロジック
	 */
	 var reportLogic = {
		__name: 'itpro.sample.report.logic.ReportLogic',
	 
	 };

	h5.core.expose(reportLogic);
})(jQuery);

(function($) {
	var utils = itpro.sample.report.utils;
	/**
	 * 日報画面用コントローラ定義
	 *
	 * @name itpro.sample.report.controller.ReportController
	 * @namespace
	 */
	var reportController = {
		/**
		 * コントローラ名
		 *
		 * @type String
		 * @memberOf itpro.sample.report.controller.ReportController
		 */
		__name: 'itpro.sample.report.controller.ReportController',

		_reportLogic: itpro.sample.report.logic.ReportLogic,
		/**
		 * ユーザ情報
		 */
		_userInfo: null,
		/**
		 * @memberOf itpro.sample.report.controller.ReportController
		 */
		__ready: function() {
			// ユーザID,ユーザ名を追加
			this._userInfo = utils.getLoginUserInfo();
			this.$find('.userName').text(this._userInfo.id);
			this.$find('.realName').text(this._userInfo.name);
			this._$msg = this.$find('.report-content').find('.msg');
			this._$indicator = this.$find('.indicator-wrap');
			this._setDafaultWorkTime();
			// コントローラバインド時にトップへスクロールして、タイトルバーを隠す(モバイル用)
			h5.ui.scrollToTop();

			// 日付が指定されていない場合は今日の日報
			    this.$find('input[name="reportDate"]').val(utils.formatDateWithHyphen(new Date()));
		},

		/**
		 * inputとtextarea要素のfocusoutイベントで入力内容の検証をします
		 *
		 * @memberOf itpro.sample.report.controller.ReportControlle
		 */
		'input, textarea focusout': function(context, $el) {

		},

		/**
		 * 写真を選択したときにプレビューを表示する
		 *
		  * @memberOf itpro.sample.report.controller.ReportController
		 */
		 'input[name="img"] change': function(context, $el) {
		 
		 },

		/**
		 * 日報をサーバに登録する
		 *
		 * @memberOf itpro.sample.report.controller.ReportController
		 */
		 '.register click': function(context, $el) {
		 
		 },

		/**
		 * レポートオブジェクトを作成
		 *
		 * @memberOf itpro.sample.report.controller.ReportController
		 * @returns Object
		 */
		_createReport: function() {
			var reportDate = this.$find('input[name="reportDate"]').val();
			var startTime = this.$find('input[name="startTime"]').val();
			var endTime = this.$find('input[name="endTime"]').val();

			var $section = this.$find('.section');
			var sectionId = $section.find('input[name="sectionId"]').val();
			var category = $section.find('input[name="category"]').val();
			var title = $section.find('input[name="title"]').val();
			var comment = $section.find('textarea[name="comment"]').val();
			var section = new itpro.sample.report.Section(sectionId, category, title, comment);

			return {
				userInfo: this._userInfo,
				reportDate: reportDate,
				startTime: startTime,
				endTime: endTime,
				section: section
			};
		},
		/**
		 * デフォルトの勤務時間を設定する
		 *
		 * @memberOf itpro.sample.report.controller.ReportController
		 */
		_setDafaultWorkTime: function() {
			// 9:00～現在時刻をデフォルトの勤務時間として設定
			this.$find('input[name="startTime"]').val('09:00');
			this.$find('input[name="endTime"]').val(
					itpro.sample.report.utils.formatTime(new Date()));
		}
	};
	// 名前空間 itpro.sample.report.controller に ReportController を配置
	h5.core.expose(reportController);
})(jQuery);
$(function() {
	// 公開されているコントローラを、操作対象となるHTML要素に割り当てる
	h5.core.controller(document.body, itpro.sample.report.controller.ReportController);
});