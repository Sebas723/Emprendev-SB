function validatePassword(password) {
    const validacionPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,15}$/;
    return validacionPassword.test(password);
}

function showErrorMessage(message) {
    Swal.fire({
        icon: "error",
        title: "Error",
        text: message,
    });
}

function resetPassword(event) {
    event.preventDefault();

    const token = document.getElementById("codigo").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Validación de la nueva contraseña
    if (!validatePassword(newPassword)) {
        showErrorMessage("La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.");
        return;
    }

    // Validación de confirmación de contraseña
    if (newPassword !== confirmPassword) {
        showErrorMessage("La contraseña no coincide.");
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
