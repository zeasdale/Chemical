if (window.screen.width < 1200 ){
	var pageCss = document.createElement('link');
	pageCss.href = 'css/small.css';
	pageCss.rel='stylesheet';
	document.getElementsByTagName('head')[0].appendChild(pageCss);
}

