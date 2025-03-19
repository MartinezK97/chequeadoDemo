$(document).ready(function () {
    $('.btn-money.UYU').click(function () {
        $(".content_moneyUSD").css({ 'animation': 'bounceOutRight', 'animation-duration': '1000ms' });
        $(".content_moneyUYU").css({ 'animation': 'bounceInLeft', 'animation-duration': '1000ms' });
        $(".btn-money.UYU").css('color', 'var(--primary)');
        $(".btn-money.USD").css('color', 'var(--font-primary)');
        setTimeout(() => {
            $(".content_moneyUSD").css('display', 'none')
            $(".content_moneyUYU").css('display', 'block')
        }, 0.1);
        $(this).next().css('color', 'var(--font-primary)');
        $(this).prev().css('color', 'var(--font-primary)');
        $(this).css('color', 'var(--primary)')
        $(".dollar_symbol").addClass('peso_symbol').removeClass('dollar_symbol')

    });

    $('.btn-money.USD').click(function () {
        $(".content_moneyUYU").css({ 'animation': 'bounceOutLeft', 'animation-duration': '1000ms' });
        $(".content_moneyUSD").css({ 'animation': 'bounceInRight', 'animation-duration': '1000ms' });
        $(".btn-money.USD").css('color', 'var(--primary)');
        $(".btn-money.UYU").css('color', 'var(--font-primary)');
        setTimeout(() => {
            $(".content_moneyUYU").css('display', 'none')
            $(".content_moneyUSD").css('display', 'block')
        }, 0);
        $(this).next().css('color', 'var(--font-primary)');
        $(this).prev().css('color', 'var(--font-primary)');
        $(this).css('color', 'var(--primary)')
        $(".peso_symbol").addClass('dollar_symbol').removeClass('peso_symbol')
    });

    $('.tab-btn').click(function () {
        let rel = $(this).attr('rel');
        let parentID = $(this).parent().attr('id');
        $('.tab-btn').css('color', 'var(--font-primary)')
        $(".tab-view").css('display', 'none')
        $(this).css('color', 'var(--primary)');
        $("#" + rel).css('display', 'block')
    });
});        