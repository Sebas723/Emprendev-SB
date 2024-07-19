function resetPassword(event) {
    event.preventDefault();

    var token = document.getElementById("codigo").value;
    var newPassword = document.getElementById("newPassword").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    if (newPassword !== confirmPassword) {
        Swal.fire('¡Error!', 'Las contraseñas no coinciden', 'error');
        return;
    }

    fetch('http://localhost:8080/auth/reset_password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        credentials: 'include',
        body: 'token=' + encodeURIComponent(token) + '&newPassword=' + encodeURIComponent(newPassword),
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
                window.location.href = 'index.html'; // Redirige a la página principal después de cambiar la contraseña
            });
        } else {
            Swal.fire('¡Error!', data.message, 'error');
        }
    })
    .catch(error => {
        console.error('Error al cambiar la contraseña:', error);
        Swal.fire('¡Error!', 'Hubo un problema al cambiar la contraseña', 'error');
    });
}