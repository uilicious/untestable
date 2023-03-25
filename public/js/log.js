/**
 * Print a message to the in-app logs
 * @param {*} message 
 */
function log(message){
	var log = document.createElement("div")
	log.setAttribute("class", "log-line")
	log.innerText = message
	document.getElementById("log").appendChild(log)
}

function getElementDescriptor(element){
	
	let tagName = element.tagName.toLowerCase();
	
	let id = element.getAttribute("id")
	let classList = element.classList;
	let text = element.innerText.substr(0, 20)

	let descriptor = tagName;
	if(id){
		descriptor += "#" + id
	} else if(classList.length > 0) {
		classList.forEach(cls => {
			descriptor += "." + cls
		})
	} else if(text){
		descriptor = "//" + tagName + "[contains(text(), " + text +")]";
	}

	return descriptor;
}

/**
 * Log element clicked event
 * @param {*} event 
 */
function logElementClicked(event){
	log("\"" + getElementDescriptor(event.target) + "\" clicked.")
}

/**
 * Clear logs
 */
function clearLogs(){
	let logLines = document.getElementById("log").querySelectorAll(".log-line");
	logLines.forEach((line)=>{
		line.parentElement.removeChild(line);
	})
}

/**
 * Log hover element
 */
function logHoverElement(event){

	let elementDescriptor = getElementDescriptor(event.target)

	let tooltip = document.getElementById("hover-element-descriptor-tooltip")
	if(tooltip == null){
		tooltip = document.createElement("div")
		tooltip.setAttribute("id", "hover-element-descriptor-tooltip")
		tooltip.style.position = "fixed"
		tooltip.style.top = "-100px"
		tooltip.style.left = "-100px"
		document.body.appendChild(tooltip)
	}

	if(event.target.closest("#info")){
		// if hover over "#info" section, hide tooltip
		tooltip.style.top = "-100px"
		tooltip.style.bottom = ""
		tooltip.style.left = "-100px"
		tooltip.style.right = ""
	} else {

		// show tooltip
		tooltip.textContent = elementDescriptor;
		
		// edge detection (near the right edge)
		if(event.clientX > (window.innerWidth - 200)){
			tooltip.style.left = ""
			tooltip.style.right = (window.innerWidth - event.clientX + 10) + "px"
		} else {
			tooltip.style.right = ""
			tooltip.style.left = (event.clientX + 10) + "px"
		}

		// edge detection (near the bottom edge)
		if(event.clientY > (window.innerHeight - 50)){
			tooltip.style.top = ""
			tooltip.style.bottom = (window.innerHeight - event.clientY + 10) + "px"
		} else {
			tooltip.style.bottom = ""
			tooltip.style.top = (event.clientY + 10) + "px"
		}

	}
	
}


// Log mouse events
document.addEventListener("readystatechange", function(){
	if(document.readyState === "complete"){

		// log element clicks
		document.getElementById("page").addEventListener("click", logElementClicked)

		// log element hover
		document.addEventListener("mousemove", logHoverElement)
		
	}
}) 