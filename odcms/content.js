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

/*var View = {
	insertPageClickButton: function(){
		$('body').before('<style>.odcms_pageclick{font-size:10px;position:fixed;top:2px;right:2px;width:10px;height:10px;}</style>\
			<div class="odcms_pageclick">\
				pageclick\
			</div>\
		');
	}
}*/

/*function main(){
	View.insertPageClickButton();
	$('.odcms_pageclick').click(function(){
		libs.openNewTab(libs.generatePageClickUrl());
	});
}
main();*/

chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
	if (request==='posData'){
		var posEls = $('.dcms-beacon-position');
		posEls.each(function(i, posEl){
			show($(posEl));
		});
		sendResponse({data:'success'});
	}
	if (request==='editPage'){
		sendResponse({spm: $('body').data('spm')});
	}
});