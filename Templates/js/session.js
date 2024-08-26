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
                $('.session_user_secondName').text(data.secondName || "No disponible");
                $('.session_user_lastName').text(data.lastName);
                $('.session_user_lastName2').text(data.lastName2 || "No disponible");
                $('.session_user_docType').text(data.docType);
                $('.session_user_docNum').text(data.docNum);
                $('.session_user_birthDate').text(data.birthDate);
                $('.session_user_role').text(data.role);
                $('.session_user_phoneNum').text(data.phoneNum);
                $('.session_user_address').text(data.address || "No encontrado");
                $('.session_user_email').text(data.Email);
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

// Función para formatear la fecha
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
}

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
                    icon: 'success', // Cambio a 'success' para indicar que la operación fue exitosa
                    title: 'Cerrar sesión',
                    text: 'Su sesión ha terminado',
                }).then(() => {
                    window.location.href = "index.html";
                });
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al cerrar sesión.',
                });
            }
        });
    }
});


// Esta funcion para es para redirigir al usuario al perfil segun su rol
redirectButton.addEventListener('click', function () {
    checkRoleAndRedirect();
});

function checkRoleAndRedirect() {
    $.ajax({
        url: 'http://localhost:8080/emprendev/v1/user/sessionStatus',
        type: 'GET',
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            if (data.sessionActive) {

                console.log('Session is active:', data);

                let url;
                const rolUsuario = data.role; 
                

                if (rolUsuario === 'Desarrollador') {
                    url = './perfil_dev.html';
                } else if (rolUsuario === 'Mipyme') {
                    url = './perfil_Mipyme.html';
                } else {
                    url = './ocurrio-un-error.html'; // URL por defecto si no coincide con ningún rol
                }

                // Redirigir a la URL correspondiente
                window.location.href = url;
            } else {
                console.log('No active session:', data.message);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Error checking session status:', textStatus, errorThrown);
            // Opcional: Mostrar un mensaje al usuario en caso de error
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo verificar el estado de la sesión.',
            });
        }
    });
}

function disableBtnsByRole(){
    const create_offer_btn = document.getElementById("create_offer_btn");
    const my_offers_btn = document.getElementById("my_offers_btn");
  
    $.ajax({
      url: 'http://localhost:8080/emprendev/v1/user/sessionStatus',
      type: 'GET',
      xhrFields: {
          withCredentials: true
      },
      success: function (data) {
        if (data.sessionActive) {
          if (create_offer_btn && my_offers_btn) {
            if (data.role === "Desarrollador") {
              create_offer_btn.classList.add("hidden");
              my_offers_btn.classList.add("hidden");
            }
          } else {
            console.log('No active session:', data.message);
          }
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
          console.error('Error checking session status:', textStatus, errorThrown);
          // Opcional: Mostrar un mensaje al usuario en caso de error
          Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo verificar el estado de la sesión.',
          });
      }
    });
  }