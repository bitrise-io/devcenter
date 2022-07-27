$(document).ready(function () {
    setLogo();

    const attrObserver = new MutationObserver((mutations) => {
        mutations.forEach(mu => {
            if (mu.type !== "attributes" && mu.attributeName !== "class") return;
            /*console.log("class was modified!");*/
            setLogo();
        });
    });
    
    const ELS_test = document.querySelectorAll(".present");
    ELS_test.forEach(el => attrObserver.observe(el, {
        attributes: true
    }));
});

function setLogo() {
    if ($('.alt-slide.present:not(.slide-background)').length) {
        $('.reveal .slides .default-logo').hide();
        $('.reveal .slides .alt-logo').show();
        
        /*console.log('alt');*/
    } else {
        $('.reveal .slides .default-logo').show();
        $('.reveal .slides .alt-logo').hide();
        
        /*console.log('light');*/
    }
}