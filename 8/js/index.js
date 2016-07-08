(function($) {
	var reportController = {
		__name: 'handson.ReportController',
		
		// バリデーションコントローラの設定
		_formController: h5.ui.FormController,
		__meta: {
			_formController: {
				rootElement: 'form'
			}
		},
		__ready: function() {
			this.$find('input[name="reportDate"]').val(
    		handson.utils.formatDateWithHyphen(new Date())
  		);
			this.$find('input[name="startTime"]').val('09:00');
			this.$find('input[name="endTime"]').val(
				handson.utils.formatTime(new Date()));
			
			// バリデーションのプラグイン設定
			this._formController.addOutput(['style', 'composition']);
			// バリデーションの設定
			this._formController.setSetting({
				output: {
					style: {
						errorClassName: 'has-error',
						replaceElement: function(element) {
							return $(element).closest('.form-group');
						}
					},
					composition: {
						container: this.$find('.msg'),
						wrapper: 'div'
					},
				},
				property: function() {
					var results = {};
					$.each(['title', 'category', 'comment'], function(i, name) {
						var ele = $("input[name='"+name+"'],textarea[name='"+name+"']");
						results[name] = {displayName: ele.parents('.form-group').text().trim()};
					});
					return results;
				}()
			});
		},
		
		'input[name="img"] change': function(context, $el) {
			// 変数の定義
    	var $imgPreview = this.$find('.img-preview');
			
			// input要素からファイルを取得
    	var file = $el[0].files[0];
			
			// FileReaderインスタンスの作成
    	var reader = new FileReader();
			
			// ファイルが読み込まれた時の処理を記述
    	reader.onload = function(e) {
				// 画像を表示
        $imgPreview.find('img').attr('src', e.target.result);
				$imgPreview.show();
    	};
			// ファイル読み込み開始
    	reader.readAsDataURL(file);
		},

		'.confirm click': function(context, $el) {
			// 初期化
			context.event.preventDefault();
			
			// バリデーション実行
			if (!this._formController.validate().isValid) {
				this.$find(".msg").show();
				return false;
			} else {
				this.$find(".msg").hide();
			}
			// パラメータの設定
			var params = {};
			var ary = $('form').serializeArray();
			for (i in ary) {
				params[ary[i].name] = ary[i].value;
			}
			
			// 複数行対応分のエスケープ処理
			params.comment = handson.utils.escapeHTML(params.comment)
			
			// ビューの設定
			this.view.update('.modal-content', 'confirm', params);
			
			// モーダル表示
			$('#confirmModal').modal();
		},
		
		'.register click': function(context, $el) {
			// Ajaxの擬似的実行
			h5.ajax({
				type: 'post',
				data: $('form').serialize(),
				url: '/register'
			}).then(function() {
				alert('登録しました');
				$('#confirmModal').modal('hide');
			})
		}
	};
	
	h5.core.expose(reportController);
})(jQuery);
$(function() {
	h5.core.controller(document.body, handson.ReportController);
});

