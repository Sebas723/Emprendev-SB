function sendPasswordResetRequest() {
    var email = document.getElementById("correo_usuario").value;

    // Verifica que la variable 'email' tiene un valor
    if (!email) {
        Swal.fire('¡Error!', 'Por favor, ingresa un correo electrónico.', 'error');
        return;
    }

    fetch('http://localhost:8080/auth/request_password_reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        credentials: 'include',
        body: 'email=' + encodeURIComponent(email),
    })
    
    .then(response => {
        if (!response.ok) {
            throw new Error('La solicitud no pudo ser completada: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        if (data.status === 'success') {
            Swal.fire({
                title: '¡Éxito!',
                text: data.message,
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                window.location.href = 'cambiarPassword.html';
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
