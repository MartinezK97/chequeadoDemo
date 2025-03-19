VANTA.WAVES({
    el: "#portada",
    mouseControls: true,
    touchControls: true,
    gyroControls: true,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x1a3d49,
})


$(document).on("scroll", function () {
    var $elemento = $("#comofunciona");
    if ($elemento.length === 0) return; // Asegurarse de que el elemento exista

    var rect = $elemento[0].getBoundingClientRect();
    var viewportMiddle = $(window).height() / 2;

    // Definir un margen de error en píxeles (por ejemplo, 5px)
    var threshold = 5;

    // Si el borde superior del elemento está dentro del margen de error del centro de la pantalla
    if (Math.abs(rect.top - viewportMiddle) <= threshold) {
        console.log("El borde superior de #comofunciona está en el 50% de la pantalla");
    }
});

