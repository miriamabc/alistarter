/* function show(posEl){
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
};*/

function viewTrace(){
	$('[data-trace]').each(function(){
		var trace = $(this).data('trace');
		if (trace){
			$(this).css('position', 'relative')
				.attr('href', '');
			$(this).append('<div class="showHit" style="position: absolute;width:10px;background-color:#FF9900;border-style:solid;border-width:1px;border-color:#CC6600;color:#333;;font-size:12px;font-family:arial;text-align:left;line-height:80%;padding:1px;top:0px;left:0px;" data-keytrace="' + trace + '">&nbsp;</div>');
			$(this).find('.showHit').hover(function(){
				$(this).css('width', '')
					.css('z-index', '999');
				$(this).html('<textarea>'+trace+'</textarea>');
			},function(){
				$(this).css('width', '10px')
					.css('z-index', '');
				$(this).html('&nbsp;');
			});
			$(this).find('.showHit').click(function(event){
				event.stopPropagation();
				event.preventDefault();
			})
		}
	});
}


chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
	/*if (request==='posData'){
		var posEls = $('.dcms-beacon-position');
		posEls.each(function(i, posEl){
			show($(posEl));
		});
		sendResponse({data:'success'});
	}*/
	if (request==='editPage'){
		sendResponse({spm: $('body').data('spm')});
	}
	if (request==='viewTrace'){
		viewTrace();
		sendResponse('success');
	}
});