function initialConfig() {
  const pageUrl = window.location.href;
  const homePage = 'https://devcenter.bitrise.io/';
  const jpHomePage = 'https://devcenter.bitrise.io/ja/index-ja.html';

  const indexImage = document.querySelector(".index-image");
  const introText = document.querySelector("ul.intro-container");
  if (pageUrl === homePage || pageUrl === jpHomePage) {
    introText.after(indexImage);
  }

  const setAttr = (newElem, elemClass, elemHref, target, elemText) => {
    newElem.setAttribute('class', elemClass)
    newElem.setAttribute('href', elemHref)
    newElem.setAttribute('target', target)
    newElem.textContent = elemText
  }

  /* Knowledge Base and Integrations CTA buttons on the bottom

  const feedbackPanel = document.querySelector('div.feedback-panel');
  let kbWrapper = document.createElement('div');
  kbWrapper.setAttribute('class', 'kb-wrapper');
  
  let kbCta = document.createElement('a');
  setAttr(kbCta, 'kb-cta', 'https://support.bitrise.io/hc/en-us/categories/360000108597-Knowledge-Data-Base-?utm_source=devcenter&utm_medium=bottom_cta', '_blank','Visit our Knowledge Base!')

  let intCta = kbCta.cloneNode();
  setAttr(intCta, 'int-cta', 'https://bitrise.io/integrations', '_blank', 'Check out all Bitrise Steps!')

  kbWrapper.appendChild(kbCta);
  kbWrapper.appendChild(intCta);

  feedbackPanel.insertAdjacentElement('beforebegin', kbWrapper);
  */
 

  // advanced search in the header

  function advSearchAdd() {
    let searchBar = document.querySelector('.tool-search');
    let searchParent = searchBar.parentNode;
    searchParent.insertBefore(searchBar, searchParent.firstChild.nextSibling);

    let newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'adv-search');

    let newA = document.createElement('a');
    setAttr(newA, 'adv-search-link', '/search.html', '_blank', 'Advanced search')

    newDiv.appendChild(newA);
    searchBar.insertAdjacentElement('afterend', newDiv);
  }

  // Dark mode 

  const createToggle = () => {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.setAttribute("class", "darktoggle");
    darkModeToggle.addEventListener("click", f => {
      toggleDarkMode();
    });
    document.querySelector('.tool-search').insertAdjacentElement('beforebegin', darkModeToggle);
  }

  const storedTheme = localStorage.getItem('theme')
  if (storedTheme) {
    document.documentElement.setAttribute('data-theme', storedTheme);
  }
  else {
    document.documentElement.setAttribute('data-theme', 'light')
  }

  const toggleDarkMode = () => {
    let currentTheme = document.documentElement.getAttribute('data-theme');
    let targetTheme = 'light'
    if (currentTheme === 'light') {
      targetTheme = 'dark'
    };

    document.documentElement.setAttribute('data-theme', targetTheme)
    localStorage.setItem('theme', targetTheme);
  }

  // language switcher in the header

  function langSwitcher() {
    let dropdownContainer = document.createElement('div');
    dropdownContainer.setAttribute('class', 'dropdown-container');

    let menuText = document.createElement('span');
    dropdownContainer.appendChild(menuText);

    let dropdownContent = document.createElement('ul');
    dropdownContent.setAttribute('class', 'dropdown-content');

    let langOptionJa = document.createElement('a');
    setAttr(langOptionJa, '', 'https://devcenter.bitrise.io/ja/index-ja.html', '_self', '日本語')
    langOptionJa.setAttribute('hreflang', 'ja');

    let langOptionEn = document.createElement('a');
    setAttr(langOptionEn, '', 'https://devcenter.bitrise.io/', '_self', 'EN')
    langOptionEn.setAttribute('hreflang', 'en');

    let liItemEn = document.createElement('li');
    liItemEn.setAttribute('class', 'lang-option');
    let liItemJa = liItemEn.cloneNode();

    liItemEn.appendChild(langOptionEn);
    liItemJa.appendChild(langOptionJa);

    dropdownContent.append(liItemEn, liItemJa);
    dropdownContainer.appendChild(dropdownContent);
    document.querySelector('.adv-search').insertAdjacentElement('afterend', dropdownContainer);

    if (pageUrl.indexOf('/ja/') > -1) {
      liItemJa.classList.add('active-lang');
      menuText.textContent = '日本語';
    } else if (pageUrl.indexOf('/en/') > -1) {
      liItemEn.classList.add('active-lang');
      menuText.textContent = 'EN';
    } else {
      liItemEn.classList.add('active-lang');
      menuText.textContent = 'EN';
    }

    let jaUrl = pageUrl.replace('/en/', '/ja/');
    let enUrl = pageUrl.replace('/ja/', '/en/');

    if (pageUrl !== homePage && pageUrl !== jpHomePage && pageUrl.indexOf('/en/') > -1) {
      langOptionJa.setAttribute('href', jaUrl);
      langOptionEn.setAttribute('href', pageUrl);
      /* feedbackPanel.style.display = 'flex'; */
    } else if (pageUrl !== homePage && pageUrl !== jpHomePage && pageUrl.indexOf('/ja/') > -1) {
      langOptionJa.setAttribute('href', pageUrl);
      langOptionEn.setAttribute('href', enUrl);
      /* feedbackPanel.style.display = 'flex'; */
    }


    /* feedback panel at the bottom

    document.querySelector('.voting-title').textContent = `Was this page helpful?`;
    */

    function toggleDropdown() {
      dropdownContent.classList.toggle('show');
    }

    dropdownContainer.addEventListener('click', toggleDropdown);
     
  }
 

  advSearchAdd();
  createToggle();
  langSwitcher();


  /* Adding cookie consent banner scripts */
/*

  let scriptOne = document.createElement('script');
  scriptOne.src = 'https://cdn.cookielaw.org/consent/74dfda25-8e61-4fab-9330-4718635e7050/OtAutoBlock.js';
  document.head.appendChild(scriptOne);

  let scriptTwo = document.createElement('script');
  scriptTwo.src = 'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js';
  scriptTwo.setAttribute('data-domain-script', '74dfda25-8e61-4fab-9330-4718635e7050');
  document.head.appendChild(scriptTwo);
  */

}

initialConfig();

// GTM

const gtmContainerId = 'GTM-TZK32GR';
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;
// NOTE: Manual OneTrust categorization override to unblock gtm.js loading
j.setAttribute('class','optanon-category-C0002'); 
f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer',gtmContainerId);

// implementing tabs

const tabs = document.querySelectorAll(".tabs");
const sections = document.querySelectorAll("div.tab-content");

tabs.forEach(tab => {
  tab.addEventListener("click", e => {
    addActiveTab(tab);
  });
})

const addActiveTab = tab => {
  tab.classList.add("is-active");
  hasAdjacentTabSiblings(tab, "tabs")
  let tabsArray = Array.from(tabs)
  let tabIndex = tabsArray.indexOf(tab);
  sections[tabIndex].classList.add("is-active")
  hasAdjacentTabSiblings(sections[tabIndex], "tab-content")
}

function hasAdjacentTabSiblings(el, cl) {
  let prevSibling = el.previousElementSibling;
  let nextSibling = el.nextElementSibling;

  while (prevSibling !== null && prevSibling.classList.contains(cl)) {
    if (prevSibling.classList.contains("is-active")) {
      prevSibling.classList.remove("is-active")
      break
    }
    else {
      prevSibling = prevSibling.previousElementSibling
    }
  }

  while (nextSibling !== null && nextSibling.classList.contains(cl)) {
    if (nextSibling.classList.contains("is-active")) {
      nextSibling.classList.remove("is-active")
      break
    }
    else {
      nextSibling = nextSibling.nextElementSibling
    }
  }
}

const copyPasteCode = () => {
  const codeBlocks = document.querySelectorAll(".programlisting");
  const cbArray = Array.from(codeBlocks);

  cbArray.forEach((block) => {
    let copiedText = block.textContent;
    let codeButton = document.createElement("button");
    codeButton.textContent = "Copy";
    codeButton.classList.add("code-button");
    codeButton.addEventListener('click', () => {
      navigator.clipboard.writeText(copiedText);
      codeButton.textContent = "Copied!"
      setTimeout(function() {
        codeButton.textContent = "Copy"
      },
      2000)
    })
    block.appendChild(codeButton);
  });
}

copyPasteCode();