var searchInput = document.getElementById('search-input');

var sjs = SimpleJekyllSearch({
	searchInput: searchInput,
	resultsContainer: document.getElementById('results-container'),
	json: '/search.json',
	fuzzy: true
});

function clearSearchField() {
	searchInput.value = "";
	sjs.search("");
}
