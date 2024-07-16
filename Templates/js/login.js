document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const correo = document.querySelector('[name="correo"]').value;
        const contrasena = document.querySelector('[name="contrasena"]').value;

        const correoRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        const contrasenaRegex = /^.{8,}$/;

        let valido = true;

        if (!correoRegex.test(correo) || !contrasenaRegex.test(contrasena)) {
            valido = false;
        }

        if (!valido) {
            Swal.fire({
                icon: 'error',
                title: 'Credenciales erróneas',
                text: 'El correo o la contraseña son incorrectos.',
            });
        } else {
            const loginCredentials = {
                email: correo, 
                password: contrasena
            }   

            $.ajax({
                type: 'POST',
                url: 'http://localhost:8080/emprendev/v1/user/login',
                contentType: 'application/json',
                data: JSON.stringify(loginCredentials),
                success: function (data) {
                    if (data.success) {
                        const rolUsuario = data.role;
                        const accountState = data.accountState;

                        if (accountState === 1) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Bienvenido',
                                text: 'Inicio de sesión exitoso...',
                            }).then(() => {
                                if (rolUsuario === 'dev') {
                                    window.location.href = 'catalogo.html';
                                } else if (rolUsuario === 'mipyme') {
                                    window.location.href = 'catalogo_devs.html';
                                } else if (rolUsuario === 'admin') {
                                    window.location.href = 'admin.html';
                                }
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Lo sentimos',
                                text: 'Tu cuenta está desactivada, contacta al soporte para más información.',
                            });
                        }
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Credenciales erróneas',
                            text: 'El correo o la contraseña son incorrectos.',
                        });
                    }
                },
                error: function (xhr, status, error) {
                    console.error(error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Credenciales erróneas',
                        text: 'El correo o la contraseña son incorrectos.',
                    });
                }
            });
        }
    });
});