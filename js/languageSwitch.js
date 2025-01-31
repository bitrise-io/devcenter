$(document).on("ajaxComplete DOMContentLoaded", function () {
  const sectionId = $("section[data-permalink]").attr("data-legacy-id") || $("section[data-permalink]").attr("id");
  if(sectionId === undefined) {
    return;
  }
  const currentSectionLang = $("section[data-permalink]").attr("lang");
  const currentSectionLangIndex = langIndex[sectionId];
  const currentSectionLanguages = Object.keys(currentSectionLangIndex);
  const $insertLanguageSwitchBefore = $(
    ".site-footer .inner .publication-date"
  );

  let relativePrefix = "../";
  relativePrefix +=
    $("#topic-content section").attr("data-relative-prefix") || "";

  const languageItems = currentSectionLanguages.map(
    function (language) { return `
    <li>
        <a
            class="language-item dropdown-item"
            lang="${language}"
            href="${relativePrefix + currentSectionLangIndex[language]}"
            >
            ${langShortToLong[language]}
        </a>
    </li>
    `
});

  const languageSwitch = `
    <div xmlns="http://www.w3.org/1999/xhtml" class="dropup languages pull-right col-md-2">
        <button data-toggle="dropdown" class="dropdown-toggle btn btn-default">
            ${langShortToLong[currentSectionLang]}
            <b class="caret"></b>
        </button>
        <ul class="dropdown-menu">
            ${languageItems.join("")}
        </ul>
    </div>
    `;

  if ($("footer button.dropdown-toggle").length < 1) {
    $insertLanguageSwitchBefore.before(languageSwitch);
  }
});
