function configureSideMenu() {
  
  const currentPage = window.location.href;
  const menuOpeners = document.querySelectorAll("[class^=menu-list-opener]");

  function menuParent(el) {
    el.parentElement.parentElement.previousElementSibling.classList.toggle('open', true);
  }

  function menuListOpener() {

    for (i = 0; i < menuOpeners.length; i++) {
      if (menuOpeners[i].href == currentPage) {
        menuOpeners[i].classList.toggle("open");
      }
      if (menuOpeners[i].href == currentPage && menuOpeners[i].classList.contains('menu-list-opener')) {
        menuParent(menuOpeners[i]);
      }
    }
  }
  menuListOpener();
  
  function menuItemOpener() { 

    const menuItems = document.querySelectorAll(".menu-link");

    for (i = 0; i < menuItems.length; i++) {
      let menuItemParent = menuItems[i].parentElement.parentElement.previousElementSibling; 
      if (menuItems[i].href == currentPage) {
        if (menuItemParent.classList.contains("menu-list-opener")) {
          menuItems[i].classList.toggle("current", true), menuParent(menuItems[i]), menuParent(menuItemParent);
        }
        else {
          menuItems[i].classList.toggle("current", true), menuParent(menuItems[i]);
        }
      }
    }
  }
  menuItemOpener();

}

function toggleSideBar() {
	var sideMenu = document.getElementById('side-menu');
	sideMenu.classList.toggle("open");
}

configureSideMenu();