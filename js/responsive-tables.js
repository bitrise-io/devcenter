$(document).ready(function(){
    /*There will be no classes with the name paligo-filter-table unless the parameter to include the rwd-table.js and css are included, and if they are, this kicks in.*/
    if ($('.table-responsive.paligo-filter-table').length) {
        $('.table-responsive.paligo-filter-table').responsiveTable({
            pattern: 'priority-columns',
            stickyTableHeader: true,
            fixedNavbar: '.fixed-toolbar .toolbar', // Is there a fixed navbar? The stickyTableHeader needs to know about it!
            addDisplayAllBtn: false, // should it have a display-all button?
            addFocusBtn: false, // should it have a focus button?
            focusBtnIcon: 'glyphicon glyphicon-screenshot',
            mainContainer: window,
            i18n: {
                focus: 'Focus',
                display: 'Filter',
                displayAll: 'Display all'
            }
        });
    }
    $('.table-wrapper .dropdown-toggle').html('<span class="filter-text">Filter</span><span class="filter-icon" style="padding:0.5em"><i class="fa fa-filter" aria-hidden="true"></i></span>');
});