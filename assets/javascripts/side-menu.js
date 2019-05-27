function configureSideMenu() {
	var activeMenuItem = document.querySelector("#side-menu a.current");
	var iteratedElement = activeMenuItem;

	while (iteratedElement) {
		while (iteratedElement.tagName != "OL" && !iteratedElement.classList.contains("menu-list")) {
			iteratedElement = iteratedElement.parentNode;
		}

		var listOpener = iteratedElement.previousElementSibling;
		if (listOpener.tagName != "BUTTON") {
			break;
		}

		listOpener.classList.add("open");
		iteratedElement = listOpener;
	}
}

function toggleSideBar() {
	var sideMenu = document.getElementById('side-menu');
	sideMenu.classList.toggle("open");
}

function toggleMenuListOpener(event) {
	event.target.classList.toggle("open");
}

configureSideMenu();
