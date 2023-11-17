(function(){
    'use strict';
    
    $(document).ready(function() {
        if ($('.qg-nested-search').length > 0) {
            qg_forgov.fn.initNestedSearch();
        }
    });

    // Init nested search
    qg_forgov.fn.initNestedSearch = function() {

        // Init Select 2 fields
        if ($('.qg-nested-search .form-group.select2').length > 0) {
            $('.qg-nested-search .form-group.select2 select').select2({
                placeholder: "Select"
            });
        }

        // Submit form on change of sorting dropdowns
        $('.qg-nested-search-sort select').on('change', function() {
            $(this).closest('form').find('input[type="submit"]').click();
        });

        // Return to page 1 on new submission
        $('.qg-nested-search').closest('form').on('submit', function(e) {
            var currentPageInput = $(this).find('input[id$="_result_page"]');
            if (currentPageInput.length > 0) {
                currentPageInput.val('1');
            }
            return;
        });
    }
    
}());
