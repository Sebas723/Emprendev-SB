function checkSessionStatus() {
    $.ajax({
        url: 'http://localhost:8080/emprendev/v1/user/sessionStatus',
        type: 'GET',
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            if (data.sessionActive) {
                // Si la sesión está activa, se obtienen los datos del usuario
                console.log('Session is active:', data);
                // Aquí puedes usar los datos del usuario como desees
                $('.session_user_id').text(data.id);
                $('.session_user_firstName').text(data.firstName);
                $('.session_user_secondName').text(data.secondName);
                $('.session_user_lastName').text(data.lastName);
                $('.session_user_lastName2').text(data.lastName2);
                $('.session_user_docType').prop(data.docType);
                $('.session_user_docNum').text(data.docNum);
                $('.session_user_birthDate').text(data.birthDate);
                $('.session_user_role').text(data.role);
                $('.session_user_phoneNum').text(data.phoneNum);
                $('.session_user_address').text(data.address);
                $('.session_user_email').text(data.email);
                $('.session_user_password').text(data.password);
                $('.session_user_imgProfile').attr('src', data.imgProfile);
                $('.session_user_accountState').text(data.accountState);
                $('.session_user_creationDate').text(data.creationDate);
            } else {
                // Si la sesión no está activa, se muestra un mensaje
                console.log('No active session:', data.message);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Error checking session status:', textStatus, errorThrown);
        }
    });
}

//ir al perfil segun su rol
$(document).on('click', '#check_profile', function () {
    $.ajax({
        url: 'http://localhost:8080/emprendev/v1/user/sessionStatus',
        type: 'GET',
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            if (data.sessionActive) {
                // Si la sesión está activa, se obtienen los datos del usuario
                console.log('Session is active:', data);
                // redirección al perfil
                if (data.role == 'mipyme') {
                    window.location.href = 'perfil_mipyme.html';
                } else if (data.role == 'dev'){
                    window.location.href = 'perfil_dev.html';
                }
            } else {
                // Si la sesión no está activa, se muestra un mensaje
                console.log('No active session:', data.message);
                window.location.href = 'index.html';
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Error checking session status:', textStatus, errorThrown);
        }
    });
});

// Llama a la función para verificar el estado de la sesión
checkSessionStatus();

//petición para cerrar la sesión
$(document).on('click', '#logout_btn', function () {
    if (confirm("¿Desea cerrar sesión?")) {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/emprendev/v1/user/logout",
            success: function (response) {
                Swal.fire({
                    icon: 'warning',
                    title: 'cerrar sesión',
                    text: 'su sesión ha terminado',
                }).then(() => {
                    window.location.href = "index.html";
                });

            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
            }
        });
    }
});