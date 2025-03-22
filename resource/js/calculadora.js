$(document).ready(function () {
  function calculateTIR() {
    // Obtener valores de entrada
    const valor = parseFloat($("#calc_tir_value").val()) || 0; // Valor nominal
    const precio = parseFloat($("#calc_tir_buy").val()) || 0; // Precio de compra
    const comision = parseFloat($("#calc_tir_comission").val()) || 0; // Comisión en porcentaje

    const fechaCompra = new Date($("#calc_tir_buy_date").val());
    const fechaVencimiento = new Date($("#calc_tir_expired").val());

    // Calcular margen inicial
    const margen = valor - precio;

    // Ajustar ganancia restando el porcentaje de comisión
    const ganancia = margen * (1 - comision / 100);

    // Mostrar ganancia ajustada automáticamente
    $("#calc_tir_profit").val(ganancia.toFixed(2));

    // Validar fechas
    if (isNaN(fechaCompra.getTime()) || isNaN(fechaVencimiento.getTime())) {
      $("#tir_neta_result").val("Fecha inválida");
      return;
    }

    // Calcular días entre fechas
    const diferenciaDias = (fechaVencimiento - fechaCompra) / (1000 * 60 * 60 * 24);
    $("#calc_tir_days").val(diferenciaDias)

    // Calcular la TIR neta
    if (diferenciaDias > 0 && ganancia > 0) {
      const tir = (Math.pow((valor / (valor - ganancia)), 360 / diferenciaDias) - 1) * 100;
      $("#tir_neta_result").val(tir.toFixed(2) + "% anual");
    } else {
      $("#tir_neta_result").val("Error en los datos");
    }
  }
  // Asignar evento input a los campos relevantes
  $("#calc_tir_value, #calc_tir_buy, #calc_tir_comission, #calc_tir_buy_date, #calc_tir_expired").on("input", calculateTIR);


  function calculatePriceFromTIR() {
    // Obtener los valores de los inputs
    const valor = parseFloat($("#calc_price_value").val()) || 0; // Valor del cheque
    const tir = parseFloat($("#calc_price_tir").val()) || 0; // TIR anual
    const fechaCompra = new Date($("#calc_price_buy_date").val());
    const fechaVencimiento = new Date($("#calc_price_expired").val());
    const percent = parseFloat($("#calc_price_percent").val()) || 0; // Porcentaje ingresado
    const discountPercent = parseFloat($("#calc_price_comission").val()) || 0; // Comisión
    let comission;

    // Validar fechas
    if (isNaN(fechaCompra.getTime()) || isNaN(fechaVencimiento.getTime())) {
      $("#price_result").val("Fecha inválida");
      $("#investment_result").val("Fecha inválida");
      $("#calc_price_days").val("");
      return;
    }

    // Calcular diferencia de días
    const diferenciaDias = (fechaVencimiento - fechaCompra) / (1000 * 60 * 60 * 24);
    $("#calc_price_days").val(diferenciaDias + 1);

    // Calcular precio resultante
    if (diferenciaDias > 0 && tir > 0 && valor > 0) {
      const factorTIR = 1 + (tir / 100);
      const exponente = diferenciaDias / 360;
      const precioFinal = valor / Math.pow(factorTIR, exponente);

      $("#investment_result").val(precioFinal.toFixed(2));

      // Calcular diferencia (ganancia neta)
      ganancia = valor - precioFinal;

      margin = (ganancia) / (1 - (percent / 100))
      comission = margin - ganancia;
      // $("#calc_price_margin").val(margen.toFixed(2));
      $("#price_result").val(num(valor - margin));

      // Aplicar porcentaje ingresado (calc_price_percent) a calcular comisión y ganancia
      if (percent >= 0 && percent <= 100) {
        // const comision = (margen * 100 ) / (percent / 100); // Comisión calculada
        // const ganancia = margen - comision; // Ganancia restante
        // $("#calc_price_comission").val(comision.toFixed(2));
        $("#calc_price_profit").val(ganancia.toFixed(2));
        $("#calc_price_margin").val(margin.toFixed(2));
        $("#calc_price_comission").val(comission.toFixed(2));
      }
    } else {
      // Reiniciar campos si los datos son inválidos
      $("#price_result").val("Error en los datos");
      $("#investment_result").val("Error en los datos");
      $("#calc_price_margin, #calc_price_comission, #calc_price_profit").val("");
    }
  }

  // Evento para recalcular cuando cambian los valores
  $("#calc_price_tir, #calc_price_value, #calc_price_buy_date, #calc_price_expired, #calc_price_percent").on("input", calculatePriceFromTIR);

  //?CALCULAR PRECIO DE VENTA
  $("#calc_price_sale input").on('input', function () {
    var exp = $("#calc_price_sale .expired").val()
    var nominal = $("#calc_price_sale .nominal").val()
    var range = $("#calc_price_sale .range").val()
    //Fecha de vencimiento seteada
    if (exp != '') {
      //Calcular diferencia en dias y setear el valor
      var days = calculateDays(exp)
      $("#calc_price_sale .days").val(days)
      //Verificar que no sean mas de 180 días
      if (days > 180) {
        //Mostrar error
        $("#calc_price_sale .days").parent().css('border-bottom', 'var(--border-error)')
        $("#calc_price_sale .expired").parent().css('border-bottom', 'var(--border-error)')
      } else {
        //Quitar error
        $("#calc_price_sale .days").parent().css('border-bottom', 'var(--border-light)')
        $("#calc_price_sale .expired").parent().css('border-bottom', 'var(--border-light)')
      }
    }
    if (range <= 1.5) {
      $("#calc_price_sale .range").val(1.5)
      $("#calc_price_sale .rate").val("1.5%")
      return;
    }
    $("#calc_price_sale .rate").val(num(range) + '%')
    if (exp != '' && nominal != '') {
      var price = nominal / (Math.pow((1 + (range / 100)), (days / 30)));
      // var res = calcRate(nominal, nominal, days)
      $("#calc_price_sale .result").val("$" + num(price))
    }
  })//end calc price

  //?CALCULAR VALOR DEL CHEQUE
  $("#calc_nominal_check input").on('input', function () {
    var price = $("#calc_nominal_check .price").val()
    var exp = $("#calc_nominal_check .expired").val()
    var range = $("#calc_nominal_check .range").val()
    if (exp != '') {
      var days = calculateDays(exp);
      $("#calc_nominal_check .days").val(days);

      if (days > 180) {
        $("#calc_nominal_check .days").parent().css('border-bottom', 'var(--border-error)');
        $("#calc_nominal_check .expired").parent().css('border-bottom', 'var(--border-error)');
      } else {
        $("#calc_nominal_check .days").parent().css('border-bottom', 'var(--border-light)');
        $("#calc_nominal_check .expired").parent().css('border-bottom', 'var(--border-light)');
      }
    }
    if (range <= 1.5) {
      $("#calc_nominal_check .range").val(1.5);
      $("#calc_nominal_check .rate").val("1.5%");
      return;
    }
    $("#calc_nominal_check .rate").val(num(range) + '%');
    if (price != '' && exp != '') {
      var nominal = price * Math.pow((1 + (range / 100)), (days / 30));
      $("#calc_nominal_check .result").val("$" + num(nominal));
    }
  })
})


