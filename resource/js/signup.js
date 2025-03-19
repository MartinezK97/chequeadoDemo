$(document).ready(function(){
    const input = document.querySelector("#phone");
    const mobile = document.querySelector("#phone");
    const iti = window.intlTelInput(input, {
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        initialCountry: "UY", // Configura Uruguay como el país seleccionado por defecto
        customContainer: "iti__custom-container",
    });

    function updateSelectedFlag() {
        const selectedCountryData = iti.getSelectedCountryData();
        const selectedFlagContainer = document.querySelector('.iti__selected-flag');
        const selectedDialCode = document.createElement('span');
        selectedDialCode.classList.add('iti__selected-dial-code');
        selectedDialCode.textContent = '+' + selectedCountryData.dialCode;
        console.log(selectedCountryData)
        // Elimina cualquier código de marcación existente antes de agregar el nuevo
        const existingDialCode = selectedFlagContainer.querySelector('.iti__selected-dial-code');
        if (existingDialCode) {
            existingDialCode.remove();
        }

        selectedFlagContainer.appendChild(selectedDialCode);
        $("#dial_code").val(selectedCountryData.dialCode)
    }

    // Llama a la función al cargar la página
    updateSelectedFlag();

    // Llama a la función cada vez que se cambia el país
    input.addEventListener('countrychange', updateSelectedFlag);

    $('#signupForm').on('submit', function(event) {
       

        const selectedCountryData = iti.getSelectedCountryData();
        const phone = input.value;
        const name = $("#name_user").val();
        const email = $("#email_user").val();
        var errors  = false;

        // Validar el nombre
        if(name == '' || is_nan(name) || name.length <= 0){
            console.error("El nombre no es válido")
            $("#name_user").css('border-bottom','solid 1px var(--errorB)')
            errors = true

            event.preventDefault();
        }
        
        // Validar el codigo dial
        if(selectedCountryData.dialCode == "" || selectedCountryData.dialCode <= 0){
            console.error("Seleccione un codigo de país")
            $("#phone").css('border-bottom','solid 1px var(--errorB)')
            errors = true
            event.preventDefault();
        }

        // Validar el codigo dial
        if(phone.length <=0 ||  !is_nan(phone)){
            console.error("Ingrese un numero de movil válido")
            $("#phone").css('border-bottom','solid 1px var(--errorB)')
            errors = true
            event.preventDefault();
        }

        if(email.length <= 0){
            console.error("Ingrese una direccion de email válido")
            $("#email_user").css('border-bottom','solid 1px var(--errorB)')
            errors = true
            event.preventDefault();
        }
        // Verificar si  hay errores
        if(!errors){
            console.log("La  información está correcta para ser guardada")
        }

        // Aquí puedes manejar el envío del formulario
    });
    
})