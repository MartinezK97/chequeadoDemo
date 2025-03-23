$(document).ready(function () {
  $("#calculadoraTIR input").on("input", () => {
    var fechaCompra = $("#calculadoraTIR .buy_date").val();
    var fechaVencimiento = $("#calculadoraTIR .expired").val();
    var buyed = new Date(fechaCompra);
    var expired = new Date(fechaVencimiento);
    var timeDiff = expired - buyed;  // Diferencia en milisegundos
    // Convertir a días, si la fecha es válida
    if (timeDiff > 0) {
      var days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      $("#calculadoraTIR .days").val(days);
    }
    var nominal = $("#calculadoraTIR .nominal").val();
    var price = $("#calculadoraTIR .price").val();
    if (nominal > 0 && price > 0) {
      var margin = nominal - price;
      var comission = margin * COMISSION;
      var profits = margin - comission;
      $("#calculadoraTIR .margin").val(num(margin));
      $("#calculadoraTIR .comission").val(num(comission));
      $("#calculadoraTIR .profits").val(num(profits));
      if (days > 0) {
        const tir = (Math.pow((nominal / (nominal - profits)), (360 / (days + 1))) - 1) * 100;
        $("#calculadoraTIR .result").val(num(tir) + '%');
      }
    }
  })

  $("#calcOffer input").on("input", () => {
    var nominal = parseFloat($("#calcOffer .nominal").val());
    var tir = parseFloat($("#calcOffer .tir").val());
    var fechaCompra = $("#calcOffer .buy_date").val();
    var fechaVencimiento = $("#calcOffer .expired").val();

    var buyed = new Date(fechaCompra);
    var expired = new Date(fechaVencimiento);
    var timeDiff = expired - buyed;  // Diferencia en milisegundos

    if (timeDiff > 0) {
      var days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      $("#calcOffer .days").val(days);
    } else {
      $("#calcOffer .days").val('');
      return;
    }

    if (nominal > 0 && tir > 0 && days > 0) {
      console.log("Datos completos");

      // Factor de descuento basado en la TIR
      const factorTIR = Math.pow(1 + (tir / 100), (days + 1) / 360);
      const inversionNeta = nominal / factorTIR;
      const montoOferta = nominal - (nominal - inversionNeta) / (1 - COMISSION);

      // Cálculo de márgenes y comisiones
      const margin = nominal - montoOferta;
      const comission = margin * COMISSION;
      const profits = margin - comission;


      // Asignar valores a los campos
      $("#calcOffer .offer").val(num(montoOferta));
      $("#calcOffer .investment").val(num(montoOferta + comission));
      $("#calcOffer .profits").val(num(profits));
      $("#calcOffer .comission").val(num(comission));
      $("#calcOffer .margin").val(num(margin));
    } else {
      // Limpiar campos si los valores son inválidos
      $("#calcOffer .offer, #calcOffer .profits, #calcOffer .comission, #calcOffer .margin").val('');
    }
  });


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


