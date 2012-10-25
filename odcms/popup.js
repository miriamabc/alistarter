(function($){
	$('#showPosData').click(function(e){
		chrome.tabs.query({highlighted:true,windowType:'normal'}, function(tabs){
			var tabId = tabs[0].id;
			chrome.tabs.sendRequest(tabId, 'posData', function(state){});
		});
	});
	$('.link').click(function(e){
		var $e = $(this);
		chrome.tabs.query({highlighted:true,windowType:'normal'}, function(tabs){
			var tabId = tabs[0].id;
			var tabIndex = tabs[0].index;
			var nextTabIndex = tabIndex + 1;
			var url = $e.attr("href");
			chrome.tabs.create({index:nextTabIndex,url:url});
		});
	});
	console.log(1);
	var BodyView = Backbone.View.extend({

		el: "body",

		events: {
			"click #editPage":  "edit",
			"click #showPageClick":   "viewData"
		},

		edit: function() {
			chrome.tabs.query({highlighted:true,windowType:'normal'}, function(tabs){
				chrome.tabs.sendRequest(tabs[0].id, 'editPage', function(data){
					if (data.spm) {
						var uri = 'http://cms.cn.alibaba-inc.com/page/build_visual_page.html?action=pageManager&event_submit_do_locate_from_spm=true&spm=' + data.spm;
						chrome.tabs.create({index:tabs[0].index + 1,url:uri});
					}
				});
			})
		},

		viewData: function(){
			var t = new Date(),
				y = new Date();
			y.setTime(t.getTime() - 1000*60*60*24); //前一天
			var yymmdd = '';
			_.each([y.getFullYear(), y.getMonth() + 1, y.getDate()], function(i){
				if (i < 10){
					yymmdd += '0' + number.toString();
				}else{
					yymmdd += i.toString();
				}
			});
			chrome.tabs.query({highlighted:true,windowType:'normal'}, function(tabs){
				var uri = "http://172.16.197.97/cgi-bin/pageclick4.py?date=" + yymmdd +"&site=cn&url=" + tabs[0].url.split('//')[1];
				chrome.tabs.create({index:tabs[0].index + 1,url:uri});
			})
		}

	});
	var body = new BodyView;

})(jQuery);

