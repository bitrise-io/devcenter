function configureSideMenu() {

  var currentPage = window.location.href;

  $("#side-menu a").each(
    function() {
      if (this.href == currentPage && this.href.indexOf("index") != -1) {
        $(this).addClass("open") && $(this.closest("ol").previousElementSibling).addClass("open");
      }

      else if (this.href == currentPage && this.href.indexOf("index") == -1) {
        var mainMenuItem =  this.closest("div.menu-wrapper > ol > li > ol").previousElementSibling;
        $(this.closest("ol > li > ol").previousElementSibling).addClass("open") && $(mainMenuItem).addClass("open");
      }
    }
  );
}

function toggleSideBar() {
	var sideMenu = document.getElementById('side-menu');
	sideMenu.classList.toggle("open");
}

function toggleMenuListOpener(event) {
	event.target.classList.toggle("open");
}

configureSideMenu();
