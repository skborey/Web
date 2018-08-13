$(document).ready(function () {
    var $onboard = $('#onboard\\.test'),
        $pages = $onboard.find('.Page\\.cls'),
        $indicator = $('#indicator\\.id'),
        $pointers,
        _auto;

    $pages.each(function (i) { $indicator.append('<span>'); });
    $pointers = $indicator.find('span');
    activePointer (0, true);

    $('body').click(function(e) {
        var id = e.target.id;

        switch (id) {
            case 'onboard.test': $onboard.hide(); clearTimeout(_auto); break;
            case '_test_slide.btn':
                $onboard.show();
                showSlide(0);
                break;
            default:
                if (e.target.offsetParent.id === 'indicator.id') { showSlide($(e.target).index()); }
        }
    });

    $('body').on('mousedown', function (e) {
        clearTimeout(_auto);
    });

    function showSlide (index) {
        var $active = $onboard.find('.Active\\.cls'),
            prev = $active.index(),
            index = index,
            move_to,
            left;

        clearTimeout(_auto);

        // previous page
        $active.removeClass('Active.cls').addClass('Hide.cls');

        // new page
        move_to = $($pages[index]).offset().left + (prev <= index ? 50 : -50);
        $($pages[index]).offset({left: move_to}).delay(50);
        $($pages[index]).removeClass('Hide.cls').addClass('Active.cls');
        $($pages[index]).animate({ left: '50%'}, 'slow');

        activePointer (prev, false);
        activePointer (index, true);
        $active = $($pages[index]);
        $indicator.offset({ top: $active.offset().top + $active[0].offsetHeight + 15});
        _auto = setTimeout(function () { if (index < $pages.length - 1) { showSlide (index + 1); } }, 2000);
    }

    function activePointer (index, active) {
        if (active) { $($pointers[index]).css({'background-color': 'white', 'box-shadow': '0px 0px 10px white'}); }
        else { $($pointers[index]).css({'background-color': '', 'box-shadow': ''}); }
    }
});