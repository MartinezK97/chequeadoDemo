// const URL_BASE = 'http://'+window.location.hostname + "/chequeado/"; 
const URL_BASE = "https://MartinezK97.github.io/chequeadoHome/";


const COMISSION = 0.21;
const PROFIT = 0.79;
const botonDinamico = document.getElementById("botonDinamico"); // Reemplázalo con el ID real de tu botón
const getURL = window.location.href; // Reemplázalo con el ID real de tu botón
console.log(getURL)
$('html').keydown(function (e) {
    if (e.which == 27) {
        $(".modal").css('display', 'none');
        $(".error").css('display', 'none');
        $(".success").css('display', 'none');
        $(".content-loader").css('display', 'none');
    }
});






$(document).ready(function () {


    $('.scrollToEnd').each(function () {
        $(this).scrollLeft($(this)[0].scrollWidth); // Posiciona el scroll al final
    });

    //Eliminar el mensaje de error
    $(".success, .error").click(function () {
        $(this).css('display', 'none');
    })
    setTimeout(() => {
        $('.success, .error').css('display', 'none')
    }, 7000);

    $(".opportunitie").click(function () {
        $(this).children('.more').toggleClass("expand");
    })

    $('article.accordion').click(function () {
        // Selecciona el <section> hermano que contiene las opciones
        var $contentOptions = $(this).next('.content-options');

        // Si el contenido está visible, lo oculta; si está oculto, lo despliega
        if ($contentOptions.is(':visible')) {
            $contentOptions.slideUp(function () {
                // Restablece los enlaces al estado inicial después de ocultar

                $contentOptions.children('a').each(function (index, element) {
                    setTimeout(function () {
                        $(element).css('transform', 'translateX(-100%)');  // Añade la clase para la animación
                    }, index * 50);  // 100ms de retraso entre cada enlace
                });
                // $contentOptions.children('a').css('transform','translateX(-100%)');
            });
        } else {
            // Despliega el contenido del <section> con slideDown
            $contentOptions.slideDown(300, function () {  // Duración ajustada a 300ms para mayor fluidez
                // Después de que el contenedor está visible, inicia las animaciones de los enlaces
                $contentOptions.children('a').each(function (index, element) {
                    setTimeout(function () {
                        $(element).css('transform', 'translateX(0)');  // Añade la clase para la animación
                    }, index * 50);  // 100ms de retraso entre cada enlace
                });
            });
        }
    });



    $("#document_number").on("input", function () {
        var currentVal = $(this).val();
        console.log(currentVal)
        // Obtenemos el valor "crudo" (solo dígitos)
        var raw = currentVal.replace(/[\.\-]/g, '').replace(/\D/g, '');
        // Guardamos el valor crudo en un atributo data para usarlo al enviar
        $(this).data('raw', raw);
        // Aplicamos el formato (si es mayor a 1 dígito)
        var formatted = CI(currentVal);
        // Actualizamos el input con el valor formateado
        $(this).val(formatted);
    });

});



function num(n) {
    return n.toLocaleString('es-ES', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true
    });
}


function CI(value) {
    // Quitar cualquier punto, guión o carácter no numérico
    var raw = value.replace(/[\.\-]/g, '').replace(/\D/g, '');
    // Si no hay dígitos, se retorna cadena vacía
    if (raw.length === 0) {
        return '';
    }
    // Si tiene solo un dígito, no hay formato a aplicar
    if (raw.length === 1) {
        return raw;
    }
    // Separamos el dígito verificador (último dígito) del cuerpo
    var cuerpo = raw.slice(0, -1);
    var dv = raw.slice(-1);

    // Formateamos el cuerpo: insertamos puntos cada tres dígitos desde la derecha
    var formattedBody = '';
    while (cuerpo.length > 3) {
        // Extraemos los últimos tres dígitos y los anteponemos con un punto
        formattedBody = '.' + cuerpo.slice(-3) + formattedBody;
        cuerpo = cuerpo.slice(0, -3);
    }
    formattedBody = cuerpo + formattedBody;

    // Retornamos el cuerpo formateado y el dígito verificador separado por guión
    return formattedBody + '-' + dv;
}




function calcRate(nominal, price, days) {
    var exponent = days / 30;
    var res = (Math.pow((nominal / price), (1 / (exponent))) - 1) * 100;
    console.log("calcRate(): nominal: " + nominal)
    console.log("calcRate(): precio: " + price)
    console.log("calcRate(): dias: " + days)
    console.log("calcRate(): " + res.toFixed(2))
    return res.toFixed(2)

}

function calculateDays(date) {
    var today = new Date();
    var selectedDate = new Date(date);
    var timeDiff = selectedDate - today;  // Diferencia en milisegundos

    // Convertir a días, si la fecha es válida
    if (timeDiff > 0) {
        var days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        return days;
    }
    return 0;
}


function formatDateTime(datetime) {
    // Crear un objeto Date a partir del string
    const date = new Date(datetime);

    // Extraer partes de la fecha y hora
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses comienzan desde 0
    const year = String(date.getFullYear()).slice(-2); // Últimos dos dígitos del año
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Formatear la fecha y hora
    return `<span class='number-family'>${day}/${month}/${year}</span> a las </span class='number-family'>${hours}:${minutes}</span> hs.`;
}

function formatDate(datetime) {
    // Crear un objeto Date a partir del string
    const date = new Date(datetime);

    // Extraer partes de la fecha y hora
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses comienzan desde 0
    const year = String(date.getFullYear()).slice(-2); // Últimos dos dígitos del año

    // Formatear la fecha y hora
    return `${day}/${month}/${year} `;
}

function calcTIR(n, p, d) {
    var c = (n - p) * COMISSION;
    var r = (Math.pow((n / (p + c)), (360 / (d + 1))) - 1) * 100;
    console.log("CalcTIR(): " + r)
    console.log("Nominal: " + n)
    console.log("Precio: " + p)
    console.log("dias: " + d)
    return r;
}