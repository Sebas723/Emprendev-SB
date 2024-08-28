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
    "edad",
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
      case "edad":
        const fechaNacimientoDate = new Date(fechaNacimiento);
        const hoy = new Date();
        let edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
        if (
          hoy.getMonth() < fechaNacimientoDate.getMonth() ||
          (hoy.getMonth() === fechaNacimientoDate.getMonth() &&
            hoy.getDate() < fechaNacimientoDate.getDate())
        ) {
          edad--;
        }
        if (edad <= 18 || edad > 80) {
          alert("Tu edad no es válida, intenta nuevamente");
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
  function populateForm(data) {
    const birthDateMillis = data.birthDate;

    // Creamos un objeto Date a partir de los milisegundos.
    const birthDate = new Date(birthDateMillis);

    // Extraemos el día, el mes y el año.
    const day = String(birthDate.getDate()).padStart(2, "0");
    const month = String(birthDate.getMonth() + 1).padStart(2, "0"); // Los meses empiezan en 0, por eso se suma 1
    const year = birthDate.getFullYear();

    // Formateamos la fecha en YYYY-MM-DD para el input de tipo date
    const formattedDate = `${year}-${month}-${day}`;
    
    $("#id").val(data.userId);
    $("#firstName").val(data.firstName);
    $("#lastName").val(data.lastName);
    $("#secondName").val(data.secondName || "");
    $("#lastName2").val(data.lastName2 || "");
    $("#docType").val(data.docType);
    $("#docNum").val(data.docNum);
    $("#birthDate").val(formattedDate);
    $("#role").val(data.role);
    $("#phoneNum").val(data.phoneNum);
    $("#address").val(data.address || "");
    $("#email").val(data.Email);
    $("#password").val(data.password);
    $("#imgProfile").val(data.imgProfile);
    $("#accountState").val(data.accountState);
    $("#creationDate").val(data.creationDate);
  }

  function loadUserData() {
    $.ajax({
      url: "http://localhost:8080/emprendev/v1/user/sessionStatus",
      type: "GET",
      xhrFields: {
        withCredentials: true,
      },
      success: function (data) {
        if (data.sessionActive) {
          console.log("Session is active:", data);
          populateForm(data);
        } else {
          console.log("No active session:", data.message);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error(
          "Error checking session status:",
          textStatus,
          errorThrown
        );
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo verificar el estado de la sesión.",
        });
      },
    });
  }

  // Llama a la función para cargar los datos del usuario cuando el documento esté listo
  loadUserData();
});

// Función para comprobar los datos y actualizar
function checkDataAndUpdate(id, formData2) {
  $.ajax({
    type: "GET",
    url: `http://localhost:8080/api/devs/${id}`,
    dataType: "json",
    xhrFields: {
      withCredentials: true,
    },
    success: function (response) {
      // Si la solicitud GET es exitosa, eso significa que hay datos.
      console.log("Datos encontrados:", response);
      // Realiza la solicitud PUT si hay datos
      updateData(id, formData2);
    },
    error: function (xhr, status, error) {
      // Si la solicitud GET falla con un error 404, eso significa que no hay datos.
      if (xhr.status === 404) {
        console.log("Datos no encontrados. Realizando POST...");
        // Realiza la solicitud POST si no hay datos
        createData();
      } else {
        console.error("Error al verificar datos:", error);
      }
    }
  });
}

// Función para crear datos
function createData() {

  const formData2 = {
    profileDescription: $("#profileDescription").val(),
    university: $("#university").val(),
    career: $("#career").val(),
    careerStartDate: $("#careerStartDate").val(),
    careerEndDate: $("#careerEndDate").val(),
    charge: $("#charge").val(),
    company: $("#company").val(),
    chargeStartDate: $("#chargeStartDate").val(),
    chargeEndDate: $("#chargeEndDate").val(),
    chargeDescription: $("#chargeDescription").val(),
  };

  $.ajax({
    type: "POST",
    url: "http://localhost:8080/api/devs",
    contentType: "application/json",
    data: JSON.stringify(formData2),
    xhrFields: {
      withCredentials: true,
    },
    success: function () {
      console.log("Datos creados exitosamente.");
      // Aquí puedes agregar lógica para manejar el éxito del POST
    },
    error: function (xhr, status, error) {
      console.error("Error al crear datos:", error);
    }
  });
}

// Función para actualizar datos
function updateData(id, formData2) {
  $.ajax({
    type: "PUT",
    url: `http://localhost:8080/api/devs/${id}`,
    contentType: "application/json",
    data: JSON.stringify(formData2),
    xhrFields: {
      withCredentials: true,
    },
    success: function () {
      console.log("Datos actualizados exitosamente.");
      // Aquí puedes agregar lógica para manejar el éxito del PUT
    },
    error: function (xhr, status, error) {
      console.error("Error al actualizar datos:", error);
    }
  });
}

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
  };

  // Recolecta los datos adicionales del formulario
  const formData2 = {
    profileDescription: $("#profileDescription").val(),
    university: $("#university").val(),
    career: $("#career").val(),
    careerStartDate: $("#careerStartDate").val(),
    careerEndDate: $("#careerEndDate").val(),
    charge: $("#charge").val(),
    company: $("#company").val(),
    chargeStartDate: $("#chargeStartDate").val(),
    chargeEndDate: $("#chargeEndDate").val(),
    chargeDescription: $("#chargeDescription").val(),
  };

  try {
    // Envía los datos del formulario principal al servidor usando fetch con método PUT
    $.ajax({
      type: "PUT",
      url: `http://localhost:8080/emprendev/v1/user/${id}`,
      contentType: "application/json",
      data: JSON.stringify(formData),
      xhrFields: {
        withCredentials: true,
      },
      success: function () {
        $("#edit-form").hide();
      },
      error: function (xhr, status, error) {
        console.error("Error al actualizar Usuario:", error);
      },
    });

    // Llama a la función para verificar los datos y actualizar o crear datos
    checkDataAndUpdate(id, formData2);

  } catch (error) {
    // Mostrar error si hubo un problema
    Swal.fire({
      icon: 'error',
      title: 'Error',
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

//drag n drop tags
let tags = document.getElementsByClassName("tag");
let tagsContainer = document.getElementById("tags-container");
let dropAreaTags = document.getElementById("drop-area-tags");
let cardTagsPreview = document.getElementById("card-tags-preview");

for (let tag of tags) {
  tag.addEventListener("dragstart", function (e) {
    let selected = e.target;

    tagsContainer.addEventListener("dragover", function (e) {
      e.preventDefault();
    });
    tagsContainer.addEventListener("drop", function (e) {
      tagsContainer.appendChild(selected);
      UpdateCard();
      selected = null;
    });

    dropAreaTags.addEventListener("dragover", function (e) {
      e.preventDefault();
      dropAreaTags.classList.add("active");
    });
    dropAreaTags.addEventListener("drop", function (e) {
      dropAreaTags.appendChild(selected);
      UpdateCard();
      selected = null;
    });
  });
}

function UpdateCard() {
  let html = `<div id="drop-area-tags" class="card-area-tags">${dropAreaTags.innerHTML}</div>`;
  cardTagsPreview.innerHTML = html;
}
