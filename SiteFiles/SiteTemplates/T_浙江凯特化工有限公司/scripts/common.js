/*公共js*/
function popimg(event){
	var light = document.getElementById('light');
	light.style.display='block';
	var img = document.createElement("img");
	img.setAttribute("src",event.src);
	img.style.width='95%';
	img.style.height='95%';
	img.style.display='block';
	img.style.margin='auto';
	light.appendChild(img);
	document.getElementById('fade').style.display='block';
}
function closeimg(){
	var light = document.getElementById('light');
	var img=light.lastChild;
	light.removeChild(img);
	light.style.display='none';
	document.getElementById('fade').style.display='none';
}