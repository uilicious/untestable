let template = 
`<div id="{{id}}-card" class="card">
	<label for="{{id}}-btn" class="card-label">
		{{label}}
	</label>
	<button id="{{id}}-btn" href="#" class="card-btn">
		<img src="{{image}}" alt="LA">
	</button>
</div>`

function renderCardList(cardListElement){

	if(!cardListElement){
		return;
	}

	let cards = [
		{id: "visit-chicago", label: "Chicago", image: "./images/chicago.jpg"},
		{id: "visit-los_angeles", label: "Los Angeles", image: "./images/los_angeles.jpg"},
		{id: "visit-new_york", label: "New York", image: "./images/new_york.jpg"}
	]
	
	// re-render card list
	for(var i = 0; i < cards.length; i++){

		// create new element
		let newCard = cards[i]
		if(newCard){

			// create new element from template
			let newCardElementContainer = document.createElement("div");
			newCardElementContainer.innerHTML = template
				.replaceAll("{{id}}", newCard.id)
				.replaceAll("{{label}}", newCard.label)
				.replaceAll("{{image}}", newCard.image);
			let newCardElement = newCardElementContainer.children[0]
			
			// update card list
			let currentElement = cardListElement.children[i]
			if(currentElement){
				cardListElement.replaceChild(newCardElement, currentElement)   
			} else {
				cardListElement.appendChild(newCardElement)
			}

		}

	}

	// remove extras
	for(var i = cards.length ; i < cardListElement.children.length; i++){
		let childNode = cardListElement.children[i]
		if(childNode){
			cardListElement.removeChild(childNode);
		}
	}

}