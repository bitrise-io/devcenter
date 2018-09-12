function collapseLongCodeBlocks() {
	var codeBlockCodeElements = document.querySelectorAll("main.content pre code");

	for (let i = 0; i < codeBlockCodeElements.length; i++) {
		const codeBlock = codeBlockCodeElements[i].parentNode;

		if (codeBlock.clientHeight > 300) {
			codeBlock.classList.add("collapseable");
			collapseCodeBlock(codeBlock);
		}
	}
}

function collapseCodeBlock(codeBlock) {
	var collapserButton = document.createElement("button");
	collapserButton.classList.add("collapser");
	collapserButton.setAttribute("onclick", "toggleCodeBlockCollapsing(event)");
	codeBlock.appendChild(collapserButton);
	codeBlock.classList.add("collapsed");
}

function toggleCodeBlockCollapsing(event) {
	var collapserButton = event.target;
	var codeBlock = collapserButton.parentNode;

	codeBlock.classList.toggle("collapsed");
}

collapseLongCodeBlocks();
