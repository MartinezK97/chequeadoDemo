window.onload = function () {
    google.accounts.id.initialize({
        client_id: '92003677526-b2va6p32jvmqf7lunci0ubbgddcsckbu.apps.googleusercontent.com',
        callback: (response) => {
            console.log("Token JWT recibido:", response.credential);
            const decodedData = parseJwt(response.credential);
            console.log(decodedData);
        }
    });

    google.accounts.id.renderButton(
        document.getElementById('google-signup-button'), {
        theme: "outline",
        size: "large"
    }
    );
};

function handleCredentialResponse(response) {
    const userCredential = response.credential;
    console.log(userCredential)
    // Enviar el token de Google al backend para la verificación
    fetch(URL_BASE + 'registrarme/google/', {
        method: 'POST',
        body: JSON.stringify({
            idToken: userCredential
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            // Manejar la respuesta del backend (puedes guardar los datos del usuario o redirigir)
            if (data.success) {
                window.location.href = URL_BASE + '/' + data.auth;
            }
        })
        .catch(err => console.error('Error:', err));
}

// Manejo del formulario de registro
const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevenir el envío por defecto del formulario
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
});


function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1]; // Obtiene la parte del payload
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error('Error al decodificar el token JWT:', e);
        return null;
    }
}