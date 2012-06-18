$('#showPosData').click(function(e){
	chrome.tabs.query({highlighted:true,windowType:'normal'}, function(tabs){
		var tabId = tabs[0].id;
		chrome.tabs.sendRequest(tabId, 'posData', function(state){});
	});
});
$('#showPageClick').click(function(e){
	chrome.tabs.query({highlighted:true,windowType:'normal'}, function(tabs){
		var tabId = tabs[0].id;
		var tabIndex = tabs[0].index;
		var nextTabIndex = tabIndex + 1;
		chrome.tabs.sendRequest(tabId, 'pageClick', function(data){
			chrome.tabs.create({index:nextTabIndex,url:data.url});
		});
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