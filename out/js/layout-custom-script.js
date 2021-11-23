function initialConfig() {

    const pageUrl = window.location.href;
    const homePage = "https://devcenter.bitrise.io/";
    const jpHomePage = "https://devcenter.bitrise.io/ja/index-ja.html";

    function homePageConfig() {
    
        if (pageUrl !== homePage && pageUrl !== jpHomePage) {
            document.querySelector(".breadcrumb-container").style.display = "block";
            document.querySelector(".feedback-panel").style.display = "block";
        }
    };

    function advSearchAdd() {
        let searchBar = document.querySelector(".tool-search");
        let searchParent = searchBar.parentNode;
        searchParent.insertBefore(searchBar, searchParent.firstChild.nextSibling);

        let newDiv = document.createElement('div');
        newDiv.setAttribute("class", "adv-search");
    
        let newA = document.createElement('a');
        newA.setAttribute("href", "/search.html");
        newA.setAttribute("class", "adv-search-link");
        newA.setAttribute("target", "_blank");
        newA.textContent = "Advanced search";
    
        newDiv.appendChild(newA);
        searchBar.insertAdjacentElement("afterend", newDiv);
    };

    function languageSelector() {
        let langParent = document.querySelector("div.toolbar-tools");
        let jaSelector = langParent.querySelectorAll("li")[1];
        let enSelector = langParent.querySelectorAll("li")[0];

        enSelector.querySelector("a").setAttribute("target", "_self");
        jaSelector.querySelector("a").setAttribute("target", "_self");

        if (pageUrl.indexOf("/ja/") > -1) {
            jaSelector.classList.add("active-lang");
        }
        else {
            enSelector.classList.add("active-lang");
            let breadCrumbHome = document.querySelector(".breadcrumb-link");
            let breadCrumbLink = breadCrumbHome.querySelector("a[href*='index-en.html']");
            breadCrumbLink.href = "/";
            breadCrumbLink.textContent = "Home";
        }

        let jaUrl = pageUrl.replace("/en/", "/ja/");
        let enUrl = pageUrl.replace("/ja/", "/en/");
  
        if (pageUrl !== homePage && pageUrl !== jpHomePage) {
            jaSelector.querySelector("a").setAttribute("href", jaUrl);
            enSelector.querySelector("a").setAttribute("href", enUrl);
        }
    };

    advSearchAdd()
    homePageConfig();
    languageSelector();

    /* Adding cookie consent banner scripts */

    let scriptOne = document.createElement('script');
    scriptOne.src = "https://cdn.cookielaw.org/consent/a8f28a53-d138-4cac-a6dc-bdafd1611beb/OtAutoBlock.js";
    document.head.appendChild(scriptOne);
    
    let scriptTwo = document.createElement('script');      
    scriptTwo.src = "https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"; 
    scriptTwo.setAttribute("data-domain-script", "a8f28a53-d138-4cac-a6dc-bdafd1611beb");
    document.head.appendChild(scriptTwo);
};

initialConfig();