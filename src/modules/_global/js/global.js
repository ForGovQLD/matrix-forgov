(function () {
    'use strict';

    // Global variables
    var qg_forgov = {
        'fn': {},
        'vars': {}
    };

    // Functions
    qg_forgov.fn.sampleFunction = function () {

    };

    // Make squiz variable available to the console for debugging
    window.qg_forgov = qg_forgov;


    //Header Scripts

    // Functional to extract the value for a specific cookie
    qg_forgov.fn.getCookie = function(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    qg_forgov.fn.initAgencyPersonalisation = function() {
        // On load, if there is a cookie set already, update the Personalisation form field to match the set cookie
        if (document.cookie) {
            if (qg_forgov.fn.getCookie("agency")) {
                var exists = false;
                $('select.ssq-agencies option').each(function () {
                    if (this.value == qg_forgov.fn.getCookie('agency')) {
                        exists = true;
                        return false;
                    }
                });

                if (exists) {
                    var selects = document.querySelectorAll('.ssq-agencies'), i;

                    for (i = 0; i < selects.length; ++i) {
                        selects[i].value = qg_forgov.fn.getCookie('agency');
                    }
                }
            }
        }
        
        // Watch the Header Personalisation form field, on update, set the cookie to the agency value and submit the form causing a reload of the page.
        $('select.ssq-agencies').change(function () {
            $(this).closest('form').addClass('was-validated');
            document.cookie = "agency=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "agency=" + $(this).val() + "; path=/;";
            $(this).closest('form').submit();
        });
    };

    qg_forgov.fn.initAgencyPersonalisation();


    //Handle the video transcripts - taken from forgov

    
    qg_forgov.fn.initVideoTranscripts = function(){
        $('#qg-primary-content div.video-transcript').each(function() {
            $(this).attr('data-height', $(this).outerHeight());
            $(this).addClass('qg-visually-hidden').attr('aria-hidden', 'true')
            $('#article').trigger('x-height-change')
            $(this).before('<div class="toggletranscript"><a href="#">View transcript</a></div>');
        });
        $('#qg-primary-content div.toggletranscript a').click(function(e) {
            e.preventDefault();
            $(this).parent('div').next('div').toggleClass('qg-visually-hidden').attr('aria-hidden', function(i, a) {
                if (a === 'false') {
                    return 'true';
                } else {
                    return 'false';
                }
            });
            var linkText = $(this).text();
            $(this).html(function(i, h) {
                if (h === 'View transcript') {
                    return 'Hide transcript'
                } else {
                    return 'View transcript'
                }
            });
            $('#article').trigger('x-height-change')
            if ($(this).closest('.content-collapse').length) {
                var linkTOCChapter = $(this).closest('.content-collapse');
                var newHeight = linkTOCChapter.height();
                var transcriptHeight = $(this).parent().next('.video-transcript').data('height');
                if (linkText === 'View transcript') {
                    newHeight += transcriptHeight + 16;
                } else if (linkText === 'Hide transcript') {
                    newHeight -= transcriptHeight + 16;
                }
                linkTOCChapter.height(newHeight);
            };
        });
    };
    qg_forgov.fn.initVideoTranscripts();


}());
