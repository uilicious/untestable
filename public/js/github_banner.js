(function(){

	var banner = document.createElement("a")
	banner.setAttribute("class", "github-banner")

	let url = "https://github.com/uilicious/untestable/tree/main/public/"
	if(location.pathname === "/"){
		url += "index.html"
	} else {
		url += location.pathname 
	}
	if(!location.pathname.endsWith(".html")){
		url += ".html"
	}
	banner.setAttribute("href", url)
	banner.setAttribute("title", "Edit this page")
	
	var img = document.createElement("img")
	img.setAttribute("src", "/images/github-mark-white.png")
	img.setAttribute("alt", "Github Logo")
	banner.appendChild(img)

	document.body.appendChild(banner)

})()

