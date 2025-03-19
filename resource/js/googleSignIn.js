window.onload = function () {
    google.accounts.id.initialize({
        client_id: '92003677526-b2va6p32jvmqf7lunci0ubbgddcsckbu.apps.googleusercontent.com',
        callback: handleCredentialResponse // Se usa la función externa
    });

    google.accounts.id.renderButton(
        document.getElementById('google-signin-button'), {
        theme: "outline",
        size: "large"
    });
};

function handleCredentialResponse(response) {
    if (!response.credential) {
        console.error("No se recibió un token JWT válido.");
        return;
    }

    console.log("Token JWT recibido:", response.credential);
    const decodedData = parseJwt(response.credential);
    console.log("Datos decodificados:", decodedData);

    // Enviar el token de Google al backend para la verificación
    fetch(URL_BASE + '/acceder/google/', {
        method: 'POST',
        body: JSON.stringify({ idToken: response.credential }),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                console.log("Autenticación exitosa, redirigiendo...");
                window.location.href = URL_BASE + data.auth;
            } else {
                console.error("Error en la autenticación:", data.message);
            }
        })
        .catch(err => console.error('Error en la solicitud:', err));
}

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