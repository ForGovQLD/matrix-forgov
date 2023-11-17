(function(){
    'use strict';
    
    // Event Search page
    if($('.qg-event-search')) {
        initEventSearch();
    }

    function initEventSearch() {
        // Reset button
        $('.qg-event-search input[type=reset]').click(function(){
            setTimeout(function(){
                $('.qg-event-search input[type=text], .qg-event-search input[type=number], .qg-event-search select').val('');
                $('.qg-event-search input[type=checkbox]').prop("checked", false);
            }, 100);
        });

        // Flatpickr
        var frompickr = flatpickr('.qg-search-date .fromInput', {
            altFormat: "d/m/Y",
            altInput: true,
            dateFormat: "Y-m-d",
            onClose: function(selectedDates, dateStr, instance) {
                topickr.set('minDate', dateStr);
              }
        });

        var topickr = flatpickr('.qg-search-date .toInput', {
            altFormat: "d/m/Y",
            altInput: true,
            dateFormat: "Y-m-d",
            onClose: function(selectedDates, dateStr, instance) {
                frompickr.set('maxDate', dateStr);
            }
        });

        // Applying the date selected in the date picker
        $('.qg-search-date input').change(function() {
            var date = new Date($(this).val());
            var target = $(this).attr("data-target");
            $('#' + target + '_d').val(date.getDate());
            $('#' + target + '_m').val(date.getMonth() + 1);
            $('#' + target + '_y').val(date.getFullYear());
        });
        
        // Change sort order on dropdown change
        $('.event-header-sort select').change(function() {
            $('.qg-event-search-actions input[type=submit]').click();
        });
        
        // Open accordions on load if the filter is selected
        var urlParams = new URLSearchParams(window.location.search),
            url = decodeURIComponent(window.location);
        
        if(urlParams.get('queries_date-filter_fquery_fromvalue[d]') !== '--' && url.indexOf('queries_date-filter_fquery_fromvalue[d]') > -1) {
            applyDates('queries_date-filter_fquery_fromvalue', $('.qg-search-date .fromInput'));
        }
        
        if(urlParams.get('queries_date-filter_fquery_tovalue[d]') !== '--' && url.indexOf('queries_date-filter_fquery_tovalue[d]') > -1) {
            applyDates('queries_date-filter_fquery_tovalue', $('.qg-search-date .toInput'));
        }

        if (urlParams.get('queries_date_query_fromvalue[d]')!== '--' && url.indexOf('queries_date_query_fromvalue[d]') > -1) {
            applyDates('queries_date_query_fromvalue', $('.qg-search-date .fromInput'));  
        }

        if (urlParams.get('queries_date_query_tovalue[d]')!== '--' && url.indexOf('queries_date_query_tovalue[d]') > -1) {
            applyDates('queries_date_query_tovalue', $('.qg-search-date .toInput'));    
        }
        
        if(url.indexOf('queries_category_query[') > -1) {
            openAccordion($('.queries_category_query'));
        }
        
        if(url.indexOf('queries_agency_query[') > -1) {
            openAccordion($('.queries_agency_query'));
        }
        
        if(url.indexOf('queries_role_query[') > -1) {
            openAccordion($('.queries_role_query'));
        }
        
        if(url.indexOf('queries_profession_query[') > -1) {
            openAccordion($('.queries_profession_query'));
        }

        function applyDates(param, input) {
            openAccordion($('.queries_date'));
            var month = urlParams.get(param + '[m]'),
                date = urlParams.get(param +'[d]');
            input.val(doubleDigit(date) + '/' + doubleDigit(month) + '/' + urlParams.get(param + '[y]'));
        }
        
        function doubleDigit(str) {
            if(str.length == 1) {
                str = '0' + str;
            }
            return str;
        }
        
        function openAccordion(parent) {
            parent.find('.acc-heading').addClass('qg-accordion--open').attr('arisa-expanded', 'true');
        }
    }
}());
