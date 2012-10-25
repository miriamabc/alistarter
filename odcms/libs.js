var libs = {
	openNewTab: function(url){
		chrome.tabs.getCurrent(function(tab){
			chrome.tabs.create({index:tab.id + 1,url:url});
		})
	},
	generatePageClickUrl: function(){
		var curUrl = window.location.href.split('//')[1];
		return "http://172.16.197.97/cgi-bin/pageclick4.py?date=" + this.getYesterday() +"&site=cn&url=" + curUrl;
	},
	formatDate: function(date){
		var newdate = '';
		for (i in (date.getFullYear(), date.getMonth() + 1, date.getDate())){
			if (i < 10){
				newdate += '0' + number.toString();
			}else{
				newdate += i.toString();
			}
		}
		return newdate;
	},
	getYesterday: function(){
		var today = new Date(),
			yesterday = new Date();
		yesterday.setTime(today.getTime() - 1000*60*60*24);
		return this.formatDate(yesterday);
	}
}