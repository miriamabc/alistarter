;(function($){
    chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
        if (request==='posData'){
            var posEls = $('.dcms-beacon-position');
            posEls.each(function(i, posEl){
                show($(posEl));
            });
            sendResponse({data:'success'});
        };
		if (request==='pageClick'){
            var newUrl = getPageClickUrl();
            sendResponse({url:newUrl,title:document.title});
        };
    });
	function getPageClickUrl(){
		var curUrl = window.location.href.split('//')[1],
			today = new Date(),
			yesterday=new Date(); 
		var	yesterday_milliseconds=today.getTime()-1000*60*60*24;   
        yesterday.setTime(yesterday_milliseconds); 
		var curYear = yesterday.getFullYear().toString(),
			curMonth = yesterday.getMonth() + 1,
			curDay = yesterday.getDate();
		if (curMonth < 10) curMonth = '0' + curMonth.toString();
		if (curDay < 10) curDay = '0' + curDay.toString();
		return "http://pageclick.alibaba-inc.com/cgi-bin/pageclick3.py?date=" + curYear + curMonth + curDay +"&site=cn&url=" + curUrl;
	}
    function show(posEl){
        var dataContainer = showCover(posEl); 
        dataRequest(posEl, dataContainer);
    }
    function showCover(posEl){
        var cover = $('<div class="odcms-cover" />'),
            dataContainer = $('<div class="odcms-vdata" />'),
            body = $('body', document),
            offset = posEl.offset(),
            width = posEl.outerWidth(),
            height = posEl.outerHeight();
        cover.appendTo(body);
		cover.offset(offset);
		cover.width(width);
        cover.height(height);
		cover.fadeIn('slow');
        dataContainer.appendTo(body);
        dataContainer.offset(offset);
      
        dataContainer.html('<h5 class="odcms-vdata-h5">点击：<span class="odcms-vdata-clickpv">555555</span> (CTR：<span class="odcms-vdata-ctr">0.3%</span>)</h5>\
            <ul class="odcms-vdata-list">\
                <li>曝光PV：<span class="odcms-vdata-exposurepv">555555</span></li>\
                <li>曝光COOKIE：<span class="odcms-vdata-exposureck">555555</span></li>\
                <li>点击PV：<span class="odcms-vdata-clickpv">555555</span></li>\
                <li>点击COOKIE：<span class="odcms-vdata-clickck">555555</span></li>\
                <li>CTR(点击PV/曝光PV)：<span class="odcms-vdata-ctr">0.3%</span></li>\
            </ul>');
        return dataContainer;
    }
    function getPositionCode(posEl){
        //return posEl.find('a').eq(0).data('click-param').split('&')[0].replace('pid=','');
        return posEl.data('exposure-id').split(',')[0];
    }
    function dataRequest(posEl, dataContainer){
        var url = 'http://dcms.china.alibaba.com/open/Dcms_Position_Rule.do',
            data = {};
            //data['action'] = 'Dcms_action';
            data['single'] = 'true';
            data['beginDate'] = data['endDate'] = getBeforeDay();
            //data['type'] = type;
            data['code'] = getPositionCode(posEl);
            //data['callback'] = 'ddd';
        
        $.ajax({
            url: url,
            //dataType: 'jsonp',
            data: data,
            success: function(o){
                o = $.parseJSON(o);
                if (o.status==='success'){
                    $('.odcms-vdata-exposurepv', dataContainer).text(o.data[0].exposurepv);
                    $('.odcms-vdata-exposureck', dataContainer).text(o.data[0].exposurecookie);
                    $('.odcms-vdata-clickpv', dataContainer).text(o.data[0].clickpv);
                    $('.odcms-vdata-clickck', dataContainer).text(o.data[0].clickcookie);
                    $('.odcms-vdata-ctr', dataContainer).text(o.data[0].ctr);
                }
                $('.odcms-vdata').fadeIn('slow');
            }
        });
    }
    function getBeforeDay(){
        var today = new Date(),
            beforeDay = new Date(Date.parse(today)-1000*60*60*24);
        return beforeDay.getFullYear()+'-'+(beforeDay.getMonth()+1)+'-'+beforeDay.getDate();
    }
})(jQuery);