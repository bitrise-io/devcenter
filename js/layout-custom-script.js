function initialConfig() {
    const pageUrl = window.location.href;
    const homePage = 'https://devcenter.bitrise.io/';
    const jpHomePage = 'https://devcenter.bitrise.io/ja/index-ja.html';
    const feedbackPanel = document.querySelector('div.feedback-panel');
  
    let kbWrapper = document.createElement('div');
    let kbCta = document.createElement('a');
  
    kbWrapper.setAttribute('class', 'kb-wrapper');
  
    kbCta.setAttribute('class', 'kb-cta');
    kbCta.setAttribute('href', 'https://support.bitrise.io/hc/en-us/categories/360000108597-Knowledge-Data-Base-?utm_source=devcenter&utm_medium=bottom_cta');
    kbCta.setAttribute('target', '_blank');
    kbCta.textContent = 'Visit our Knowledge Base!';
  
    let intCta = kbCta.cloneNode();
    intCta.setAttribute('class', 'int-cta');
    intCta.setAttribute('href', 'https://bitrise.io/integrations');
    intCta.textContent = 'Check out all Bitrise Steps!';
  
    kbWrapper.appendChild(kbCta);
    kbWrapper.appendChild(intCta);
  
    feedbackPanel.insertAdjacentElement('beforebegin', kbWrapper);
  
    function advSearchAdd() {
      let searchBar = document.querySelector('.tool-search');
      let searchParent = searchBar.parentNode;
      searchParent.insertBefore(searchBar, searchParent.firstChild.nextSibling);
  
      let newDiv = document.createElement('div');
      newDiv.setAttribute('class', 'adv-search');
  
      let newA = document.createElement('a');
      newA.setAttribute('href', '/search.html');
      newA.setAttribute('class', 'adv-search-link');
      newA.setAttribute('target', '_blank');
      newA.textContent = 'Advanced search';
  
      newDiv.appendChild(newA);
      searchBar.insertAdjacentElement('afterend', newDiv);
    }
  
    function langSwitcher() {
      let dropdownContainer = document.createElement('div');
      dropdownContainer.setAttribute('class', 'dropdown-container');
  
      let menuText = document.createElement('span');
      dropdownContainer.appendChild(menuText);
  
      let dropdownContent = document.createElement('ul');
      dropdownContent.setAttribute('class', 'dropdown-content');
  
      let langOptionJa = document.createElement('a');
      langOptionJa.setAttribute('href', 'https://devcenter.bitrise.io/ja/index-ja.html');
      langOptionJa.setAttribute('hreflang', 'ja');
      langOptionJa.textContent = '日本語';
  
      let langOptionEn = document.createElement('a');
      langOptionEn.setAttribute('href', 'https://devcenter.bitrise.io/');
      langOptionEn.setAttribute('hreflang', 'en');
      langOptionEn.textContent = 'EN';
  
      let liItemEn = document.createElement('li');
      liItemEn.setAttribute('class', 'lang-option');
      let liItemJa = liItemEn.cloneNode();
  
      liItemEn.appendChild(langOptionEn);
      liItemJa.appendChild(langOptionJa);
  
      dropdownContent.appendChild(liItemEn);
      dropdownContent.appendChild(liItemJa);
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
        feedbackPanel.style.display = 'block';
      } else if (pageUrl !== homePage && pageUrl !== jpHomePage && pageUrl.indexOf('/ja/') > -1) {
        langOptionJa.setAttribute('href', pageUrl);
        langOptionEn.setAttribute('href', enUrl);
        feedbackPanel.style.display = 'block';
      }
  
      function toggleDropdown() {
        dropdownContent.classList.toggle('show');
      }
  
      dropdownContainer.addEventListener('click', toggleDropdown);
    }
  
    advSearchAdd();
    langSwitcher();
  
    /* Adding cookie consent banner scripts */
  
    let scriptOne = document.createElement('script');
    scriptOne.src = 'https://cdn.cookielaw.org/consent/74dfda25-8e61-4fab-9330-4718635e7050/OtAutoBlock.js';
    document.head.appendChild(scriptOne);

    let scriptTwo = document.createElement('script');
    scriptTwo.src = 'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js';
    scriptTwo.setAttribute('data-domain-script', '74dfda25-8e61-4fab-9330-4718635e7050');
    document.head.appendChild(scriptTwo);
  
    /* changing the feedback URL */
  
    let feedbackLink = document.querySelector('#email-feedback > p > a');
    feedbackLink.setAttribute('href', 'https://www.bitrise.io/');
    feedbackLink.setAttribute('target', '_blank');
  }
  
  //Data Layer - for use with GTM
  function getDataLayerEventsInfo () {
    let parsedInfo = {};
    try {
      const dataLayerCookie = document.cookie.split('; ').find(row => row.startsWith('bDL='));
      if (dataLayerCookie) {
        const cookieInfo = decodeURIComponent(dataLayerCookie.split('=')[1]);
        parsedInfo = JSON.parse(cookieInfo);
      }
      return parsedInfo;
    }
    catch (e) {
      return parsedInfo;
    }
  }

  function pick(fields, obj) {
    return fields.reduce(function (picked, field) {
      picked[field] = obj[field];
      return picked;
    }, {});
  }

  
  const dlEventsInfo = getDataLayerEventsInfo();
  const validEvents = Object.keys(dlEventsInfo).filter(function(event) {return Boolean(dlEventsInfo[event])});
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(pick(validEvents, dlEventsInfo));


  // GTM
  const gtmContainerId = 'GTM-TZK32GR';
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer',gtmContainerId);
  
  initialConfig();