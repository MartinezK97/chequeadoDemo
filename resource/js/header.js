document.addEventListener('DOMContentLoaded', function () {
    // Función para aplicar el color del esquema de color preferido
    function applyThemeColor() {
        const color = getComputedStyle(document.documentElement).getPropertyValue('--headerC').trim();
        console.log(color)
        document.getElementById('theme-color-meta').setAttribute('content', color);
    }

    // Aplicar el color cuando se carga la página
    applyThemeColor();

    // Escuchar cambios en el esquema de color preferido del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyThemeColor);
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', applyThemeColor);
});