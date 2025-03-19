$(document).ready(function () {

    // $('.menu-btn').click(function(){
    //         $(".menu").toggleClass('hide');
    // })

    $('.menu-btn').on('click', function (e) {
        e.stopPropagation(); // Evita que el clic se propague al documento
        $('#menu').toggleClass('hide');
    });

    $(document).on('click', function (e) {
        if (!$(e.target).closest('#menu').length && !$(e.target).is('.menu-btn')) {
            $('#menu').addClass('hide');
        }
    });

    $('#menu').on('click', function (e) {
        e.stopPropagation(); // Evita que el clic en el menú se propague al documento
    });

    $('#newCheck').on('click', function (e) {
        e.stopPropagation(); // Evita que el clic en el menú se propague al documento
    });

    // Obtén la URL actual
    const currentUrl = window.location.href;

    // Encuentra el botón dinámico
    const dynamicButton = $('.content-menu-btn .btn-new-check'); // Ajusta este selector según tu HTML
    const dynamicIcon = dynamicButton.find('i'); // Encuentra el ícono dentro del botón
    const dynamicText = dynamicButton.find('span'); // Encuentra el span dentro del botón

    // Verifica si la URL actual contiene "acceder"
    if (currentUrl.includes('/acceder')) {
        dynamicButton.attr('href', URL_BASE + 'registrarme'); // Cambia el href a /registrarme
        dynamicIcon.removeClass('fa-sign-in').addClass('fa-user-plus'); // Cambia la clase del ícono
        dynamicText.text('Registrarme'); // Cambia el texto del span
    }
    // Verifica si la URL actual contiene "registrarme"
    else if (currentUrl.includes('/registrarme')) {
        dynamicButton.attr('href', URL_BASE + 'acceder'); // Cambia el href a /acceder
        dynamicIcon.removeClass('fa-user-plus').addClass('fa-sign-in'); // Cambia la clase del ícono
        dynamicText.text('Acceder'); // Cambia el texto del span
    }




});