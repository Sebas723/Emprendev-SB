const userSubMenu = document.getElementById("user-sub-menu");

function validarFormulario() {
  const nombre = document.querySelector('[name="nombre"]').value;
  const segundoNombre = document.querySelector('[name="segundo_nombre"]').value;
  const apellido = document.querySelector('[name="apellido"]').value;
  const segundoApellido = document.querySelector('[name="segundo_apellido"]').value;
  const documentoIdentidad = document.querySelector('[name="id_usuario"]').value;
  const fechaNacimiento = document.querySelector('[name="fecha_nac"]').value;
  const telefono = document.querySelector('[name="telefono"]').value;
  const correo = document.querySelector('[name="correo"]').value;

  const validaciones = [
    "nombre",
    "segundo_nombre",
    "apellido",
    "segundo_apellido",
    "documentoIdentidad",
    "fechaNacimiento",
    "telefono",
    "correo",
  ];

  for (let validacion of validaciones) {
    switch (validacion) {
      case "correo":
        if (!/^\S+@\S+\.\S+$/.test(correo)) {
          alert("Por favor, ingresa un correo electrónico válido.");
          return false;
        }
        break;
      case "telefono":
        if (telefono.trim() === "") {
          alert("Por favor, ingresa tu número de teléfono.");
          return false;
        }
        if (isNaN(telefono)) {
          alert("El número de teléfono no puede contener letras.");
          return false;
        }
        if (telefono.length != 10) {
          alert("El número de teléfono debe contener 10 números.");
          return false;
        }
        break;
      case "fechaNacimiento":
        if (fechaNacimiento.trim() === "") {
          alert("Por favor, ingresa tu fecha de nacimiento.");
          return false;
        }
        break;
      case "documentoIdentidad":
        if (
          isNaN(documentoIdentidad) ||
          /^\s*$/.test(documentoIdentidad) ||
          documentoIdentidad.length != 10
        ) {
          alert("El documento de identidad debe ser un número válido.");
          return false;
        }
        break;
      case "segundo_apellido":
        if (/^\d+$/.test(segundoApellido)) {
          alert("Los apellidos no pueden contener números.");
          return false;
        }
        break;
      case "apellido":
        if (apellido.trim() === "") {
          alert("Por favor, completa el campo Primer Apellido para continuar.");
          return false;
        }
        if (/^\d+$/.test(apellido)) {
          alert("Los apellidos no pueden contener números.");
          return false;
        }
        break;
      case "segundo_nombre":
        if (/^\d+$/.test(segundoNombre)) {
          alert("Los nombres no pueden contener números.");
          return false;
        }
        break;
      case "nombre":
        if (nombre.trim() === "") {
          alert("Por favor, completa el campo Primer Nombre para continuar.");
          return false;
        }
        if (/^\d+$/.test(nombre)) {
          alert("Los nombres no pueden contener números.");
          return false;
        }
        break;
      default:
        break;
    }
  }
  return true;
}

$(document).ready(function () {
  function loadUserData() {
    $.ajax({
      url: "http://localhost:8080/emprendev/v1/user/sessionStatus",
      type: "GET",
      xhrFields: {
        withCredentials: true,
      },
      success: function (data) {
        if (data.sessionActive) {
          // Cargar datos del usuario
          populateUserForm(data);

          // Obtener el ID del usuario y cargar datos adicionales de Dev
          const userId = data.userId;

          $.ajax({
            url: `http://localhost:8080/api/devs/${userId}`,
            type: "GET",
            xhrFields: {
              withCredentials: true,
            },
            success: function (devData) {
              // Llenar el formulario con datos del desarrollador
              populateDevForm(devData);
            },
            error: function (jqXHR, textStatus, errorThrown) {
              console.error("Error al cargar datos de Dev:", textStatus, errorThrown);
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo cargar los datos del desarrollador.",
              });
            }
          });
        } else {
          console.log("No active session:", data.message);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error("Error checking session status:", textStatus, errorThrown);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo verificar el estado de la sesión.",
        });
      },
    });
  }

  function populateUserForm(userData) {
    const birthDateMillis = userData.birthDate;
    const birthDate = new Date(birthDateMillis);
    const day = String(birthDate.getDate()).padStart(2, "0");
    const month = String(birthDate.getMonth() + 1).padStart(2, "0");
    const year = birthDate.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;

    $("#id").val(userData.userId);
    $("#firstName").val(userData.firstName);
    $("#lastName").val(userData.lastName);
    $("#secondName").val(userData.secondName || "");
    $("#lastName2").val(userData.lastName2 || "");
    $("#docType").val(userData.docType);
    $("#docNum").val(userData.docNum);
    $("#birthDate").val(formattedDate);
    $("#role").val(userData.role);
    $("#phoneNum").val(userData.phoneNum);
    $("#address").val(userData.address || "");
    $("#email").val(userData.Email);
    $("#password").val(userData.password);
    $("#imgProfile").val(userData.imgProfile);
    $("#accountState").val(userData.accountState);
    $("#creationDate").val(userData.creationDate);
  }

  function populateDevForm(devData) {

    const careerStartDate = formatDate(devData.careerStartDate);
    const careerEndDate = formatDate(devData.careerEndDate);

    // Formatear fechas de cargo
    const chargeStartDate = formatDate(devData.chargeStartDate);
    const chargeEndDate = formatDate(devData.chargeEndDate);

    $("#profileDescription").val(devData.profileDescription || "");
    $("#university").val(devData.university || "");
    $("#career").val(devData.career || "");
    $("#careerStartDate").val(careerStartDate || "");
    $("#careerEndDate").val(careerEndDate || "");
    $("#charge").val(devData.charge || "");
    $("#company").val(devData.company || "");
    $("#chargeStartDate").val(chargeStartDate || "");
    $("#chargeEndDate").val(chargeEndDate || "");
    $("#chargeDescription").val(devData.chargeDescription || "");
  }

  function formatDate(dateMillis) {
    if (!dateMillis) return "";  // Manejar fechas nulas o indefinidas
    const date = new Date(dateMillis);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  // Llama a la función para cargar los datos del usuario cuando el documento esté listo
  loadUserData();
});

//Guardar los datos editados
const form = document.getElementById("form-dev");

form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Evita que el formulario se envíe de la forma tradicional
  const id = $("#id").val();

  // Recolecta los datos del formulario principal
  const formData = {
    firstName: $("#firstName").val(),
    lastName: $("#lastName").val(),
    secondName: $("#secondName").val(),
    lastName2: $("#lastName2").val(),
    docNum: $("#docNum").val(),
    birthDate: $("#birthDate").val(),
    phoneNum: $("#phoneNum").val(),
    address: $("#address").val(),
    email: $("#email").val(),
    profileDescription: $("#profileDescription").val(),
    university: $("#university").val(),
    career: $("#career").val(),
    careerStartDate: $("#careerStartDate").val(),
    careerEndDate: $("#careerEndDate").val(),
    charge: $("#charge").val(),
    company: $("#company").val(),
    chargeStartDate: $("#chargeStartDate").val(),
    chargeEndDate: $("#chargeEndDate").val(),
    chargeDescription: $("#chargeDescription").val()
  };

  try {
    // Envía los datos del formulario principal al servidor usando fetch con método PUT
    await $.ajax({
      type: "PUT",
      url: `http://localhost:8080/emprendev/v1/user/${id}`,
      contentType: "application/json",
      data: JSON.stringify(formData),
      xhrFields: {
        withCredentials: true,
      },
      success: function (response) {
        console.log("Usuario actualizado con éxito:", response);
      },
      error: function (xhr, status, error) {
        console.error("Error al actualizar Usuario:", xhr.responseText);
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar Usuario',
          text: `Detalles: ${xhr.responseText}`,
        });
        throw new Error("Error al actualizar Usuario");
      },
    });

    // Envía los datos adicionales al servidor usando fetch con método PUT
    await $.ajax({
      type: "PUT",
      url: `http://localhost:8080/api/devs/${id}`,
      contentType: "application/json",
      data: JSON.stringify(formData),
      xhrFields: {
        withCredentials: true,
      },
      success: function (response) {
        console.log("Datos adicionales actualizados con éxito:", response);
      },
      error: function (xhr, status, error) {
        console.error("Error al actualizar Datos adicionales:", xhr.responseText);
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar Datos adicionales',
          text: `Detalles: ${xhr.responseText}`,
        });
        throw new Error("Error al actualizar Datos adicionales");
      },
    });

    // Mensaje de éxito si todo salió bien
    Swal.fire({
      icon: 'success',
      title: 'Datos Guardados',
      text: 'Datos guardados con éxito.',
    }).then(() => {
      window.location.href = "./perfil_dev.html";
    });

  } catch (error) {
    // Mostrar error si hubo un problema
    Swal.fire({
      icon: 'error',
      title: 'Error general',
      text: `No se pudo actualizar los datos. ${error.message}`,
    });
  }
});

  //Submenu del perfil del usuario (imagen arriba a la izquierda)
  userSubMenu.style.display = "none";

  let SubmenuPerfilBtn_isShowing = false;
  function OpenPerfilSubMenu() {
    if (!SubmenuPerfilBtn_isShowing) {
      userSubMenu.style.display = "block";
    } else {
      userSubMenu.style.display = "none";
    }
    SubmenuPerfilBtn_isShowing = !SubmenuPerfilBtn_isShowing;
  }
