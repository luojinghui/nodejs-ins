---
layout: single-column
type: "photos"
slug: photos
title: 相册
noDate: 'true'
comments: 'true'
copyright: false
---



<link rel="stylesheet" href="./ins.css">
 <link rel="stylesheet" href="./photoswipe.css"> 
<link rel="stylesheet" href="./default-skin/default-skin.css"> 

<div class="instagram itemscope">
	<section class="archives album">
		<ul class="img-box-ul">
			<a href="https://www.instagram.com/hushhw/" target="_blank" class="open-ins">图片来自instagram，正在加载中…</a>
		</ul>
	</section>
</div>
<script>
	function add0(m){return m<10?'0'+m:m };
	function getDate(timeString) {
		var time = new Date(parseInt(timeString) * 1000);
		var y = time.getFullYear();
		var m = time.getMonth()+1;
		var d = time.getDate();
		return y+'-'+add0(m)+'-'+add0(d);
	};
</script>
<script>
	(function() {
		var loadScript = function(path) {
			var $script = document.createElement('script')
			document.getElementsByTagName('body')[0].appendChild($script)
			$script.setAttribute('src', path)
		}
		setTimeout(function() {
			loadScript('./ins.js')
		}, 0)
	})()
</script>