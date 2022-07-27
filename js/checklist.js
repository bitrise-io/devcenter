
function initChecklist(){
$('[data-toggle="checklist-tooltip"]').tooltip();

    $('.checklist-reset').click(function (ev) {
        currentlist = $(this).closest('div.checklist').find('ul.checklist');
        //The parent div has the id
        id = currentlist.parent().attr('id');
        localStorage.removeItem(id);
        currentlist.find('>li').each(function () {
            $(this).removeClass('checked');
            var checkbox = $(this).find('.checklist-checkbox');
            checkbox.prop("checked", false);
            $(this).show();
        });
        ev.stopPropagation();
    });

    $('ul.checklist').each(function () {
        var currentlist = $(this);
        listid = currentlist.parent().attr('id');

        var storedlist = localStorage.getItem(listid);

        var index = 0;

        currentlist.find('>li').each(function () {
            var span = document.createElement("SPAN");
            var txt = document.createTextNode("\u00D7");
            span.className = "close";
            span.appendChild(txt);
            this.appendChild(span);

            if (storedlist !== null) {
                var storedArr = storedlist.split(',');
                var value = storedArr[index];
                if (value === 'removed') {
                    $(this).hide();
                } else if (value === 'checked') {
                    $(this).addClass('checked');
                    var checkbox = $(this).find('.checklist-checkbox');
                    checkbox.prop("checked", true);
                }
            }
            index++;
        });
    });

    $('ul.checklist > li .mediaobject, ul.checklist > li .inlinemediaobject').click(function (ev) {
        ev.stopPropagation();
    });

    $('ul.checklist > li').click(function (ev) {
        //Only check unless the click is on a link inside the checklist item
        var link = ev.target.closest('a[href]');

        if(link === undefined || link === null){
            listid = $(this).closest('div.checklist').attr('id');
            var listitem = $(this);
            var checkbox = listitem.find('.checklist-checkbox').first();

            listitem.toggleClass('checked');
            /*toggle checkbox too:*/
            checkbox.prop("checked", ! checkbox.prop("checked"));
            ev.stopPropagation();

            var values =[];
            var list = $(this).parent('ul.checklist');
            list.find('>li').each(function () {
                if ($(this).css('display') == 'none') {
                    values.push("removed");
                } else if ($(this).hasClass('checked')) {
                    values.push("checked");
                } else {
                    values.push("todo");
                }
            });

            valuestring = values.join();
            localStorage.setItem(listid, valuestring);
            var values_from_localstorage = localStorage.getItem(listid);
        }

    });


    // Click on a close button to hide the current list item
    var close = document.getElementsByClassName("close");
    var i;
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }
}


