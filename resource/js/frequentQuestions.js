$(document).ready(function () {
    // Cuando se haga clic en la pregunta
    $(".question").css('transition', '250ms ease-in-out')
    $('.question').click(function () {
        $(this).toggleClass(['box-bg-t1', 'border-light', 'pad-1'])
        // Alternar la visibilidad de la respuesta correspondiente
        $(this).find('div.fz-1').toggleClass(['nodisplay', 'border-bm-light']);
        // $(".question").removeClass('border-bm-light')
        // Alternar el icono de expansión (cambiar entre fa-angle-down y fa-angle-up)
        var icon = $(this).find('i');
        var question = $(this).find('p');
        var answer = $(this).find('div');
        if (icon.hasClass('fa-angle-down')) {
            icon.removeClass('fa-angle-down').addClass('fa-angle-up color-placeholder');
            question.addClass('color-primary').removeClass('border-bm-light')
        } else {
            icon.removeClass('fa-angle-up color-placeholder').addClass('fa-angle-down');
            question.removeClass('color-primary').addClass('border-bm-light')


        }
    });
});