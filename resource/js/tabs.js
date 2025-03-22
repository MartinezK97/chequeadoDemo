$(document).ready(function () {

    $(".tab").on('click', function () {
        var select = $(this).data('rel')
        console.log("#" + select)
        $(".tab").removeClass("color-primary")
        $(".tab_content").addClass('nodisplay')
        $("#" + select).removeClass('nodisplay')
        $(this).addClass("color-primary")

    })
})