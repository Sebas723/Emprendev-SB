function sendPasswordResetRequest() {
    var email = document.getElementById("correo_usuario").value;

    // Realiza la solicitud POST al endpoint del backend
    fetch('http://localhost:8080/auth/request_password_reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'email=' + encodeURIComponent(email),
    })
        .then(response => {
            // Verifica el estado de la respuesta
            if (!response.ok) {
                throw new Error('La solicitud no pudo ser completada: ' + response.statusText);
            }
            return response.json(); // Parsea la respuesta como JSON
        })
        .then(data => {
            // Manejo de la respuesta del servidor
            if (data.status === 'success') {
                Swal.fire({
                    title: '¡Éxito!',
                    text: data.message,
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    window.location.href = 'cambiarPassword.html'; // Redirige a la página de cambio de contraseña
                });
            } else {
                Swal.fire('¡Error!', data.message, 'error');
            }
        })
        .catch(error => {
            console.error('Error al enviar solicitud:', error);
            Swal.fire('¡Error!', 'Hubo un problema al enviar la solicitud', 'error');
        });
}