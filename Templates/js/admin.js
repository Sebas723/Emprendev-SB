

$(document).ready(function () {
  function cargarUsuarios() {
    $.ajax({
      type: "GET",
      url: "http://localhost:8080/emprendev/v1/user/listOrderAccount",
      dataType: "json",
      xhrFields: {
        withCredentials: true,
      },
      success: function (data) {
        $("#tabla > tbody").empty();
        data.forEach((item) => {
          const fullName = `${item.firstName} ${item.secondName}`;
          const fullLastName = `${item.lastName} ${item.lastName2}`;
          const accountStateText = item.accountState === 1 ? "Activo" : "Desactivado";
          const stateClass = item.accountState === 1 ? "" : 'class="deactivated_user"';

          // Obtener los milisegundos de la fecha desde los datos
          const birthDateMillis = item.birthDate;

          // Creamos un objeto Date a partir de los milisegundos.
          const birthDate = new Date(birthDateMillis);

          // Extraemos el día, el mes y el año.
          const day = String(birthDate.getDate()).padStart(2, "0");
          const month = String(birthDate.getMonth() + 1).padStart(2, "0"); // Los meses empiezan en 0, por eso se suma 1
          const year = birthDate.getFullYear();

          // Formateamos la fecha en YYYY-MM-DD para el input de tipo date
          const formattedDate = `${year}-${month}-${day}`;

          const row = `
                        <tr ${stateClass}>
                            <td>${item.docNum}</td>
                            <td>${item.role}</td>
                            <td>${fullName}</td>
                            <td>${fullLastName}</td>
                            <td>${formattedDate}</td>
                            <td>${item.phoneNum}</td>
                            <td>${item.address}</td>
                            <td>${item.email}</td>
                            <td>${accountStateText}</td>
                            <td>${item.creationDate}</td>
                            <td>
                                <img id='user_icon' class='user_img' src='${item.imgProfile}' alt='Imagen de perfil' width='40' height='40'>
                            </td>
                            <td>
                                <button id ="idbtn" class='btn btn-primary btn-sm editarUser' data-id='${item.id}'>Editar</button>
                                <button class='btn btn-${item.accountState === 1 ? "danger" : "success"} btn-sm ${item.accountState === 1 ? "desactivarUser" : "reactivarUser"}' data-id='${item.id}'>
                                    ${item.accountState === 1 ? "Desactivar" : "Reactivar"}
                                </button>
                            </td>
                        </tr>
                    `;
          $("#tabla > tbody").append(row);
        });
      },
      error: function (xhr, status, error) {
        console.error("Error al cargar Usuarios:", error);
      },
    });
  }

  cargarUsuarios();

  // Eventos delegados para editar, desactivar y reactivar
  $(document).on("click", ".editarUser", function () {
    const id = $(this).data("id");
    $.ajax({
      type: "GET",
      url: `http://localhost:8080/emprendev/v1/user/${id}`,
      dataType: "json",
      xhrFields: {
        withCredentials: true,
      },
      success: function (data) {
        const birthDateMillis = data.birthDate;

        // Creamos un objeto Date a partir de los milisegundos.
        const birthDate = new Date(birthDateMillis);

        // Extraemos el día, el mes y el año.
        const day = String(birthDate.getDate()).padStart(2, "0");
        const month = String(birthDate.getMonth() + 1).padStart(2, "0"); // Los meses empiezan en 0, por eso se suma 1
        const year = birthDate.getFullYear();

        // Formateamos la fecha en YYYY-MM-DD para el input de tipo date
        const formattedDate = `${year}-${month}-${day}`;

        $("#edit-id").val(data.id);
        $("#edit_first_name").val(data.firstName);
        $("#edit_sec_name").val(data.secondName);
        $("#edit_last_name").val(data.lastName);
        $("#edit_last_name2").val(data.lastName2);
        $("#edit_type_id").val(data.docType);
        $("#edit_number_id").val(data.docNum);
        $("#edit_birth_date").val(formattedDate);
        $("#edit_rol").val(data.role);
        $("#edit_phone_number").val(data.phoneNum);
        $("#edit_address").val(data.address);
        $("#edit_email").val(data.email);
        $("#edit-form").show();
      },
      error: function (xhr, status, error) {
        console.error("Error al cargar datos de Usuario:", error);
      },
    });
  });
  
  $(document).on("click", "#user-save-edit-btn", async function () {
    const validacionesPasaron = await validateForm();

    if (validacionesPasaron && confirm("¿Desea Guardar Los cambios Realizados?")) {
        const id = $("#edit-id").val();

        const data = {
            firstName: $("#edit_first_name").val(),
            secondName: $("#edit_sec_name").val(),
            lastName: $("#edit_last_name").val(),
            lastName2: $("#edit_last_name2").val(),
            docNum: $("#edit_number_id").val(),
            birthDate: $("#edit_birth_date").val(),
            role: $("#edit_rol").val(),
            phoneNum: $("#edit_phone_number").val(),
            address: $("#edit_address").val(),
            email: $("#edit_email").val(),
        };

        $.ajax({
            type: "PUT",
            url: `http://localhost:8080/emprendev/v1/user/${id}`,
            contentType: "application/json",
            data: JSON.stringify(data),
            xhrFields: {
                withCredentials: true,
            },
            success: function () {
                $("#edit-form").hide();
                Swal.fire({
                    icon: "success",
                    title: "¡Usuario Actualizado!",
                    text: "El usuario ha sido actualizado exitosamente...",
                }).then(() => {
                    cargarUsuarios();
                });
            },
            error: function (xhr, status, error) {
                console.error("Error al actualizar Usuario:", error);
            },
        });
    } else {
        $("#edit-form").show();
    }
});

$(document).on("click", ".desactivarUser, .reactivarUser", function () {
  const id = $(this).data("id"); // Extraer el id del botón clicado
  const isDeactivating = $(this).hasClass("desactivarUser"); // Verificar si la clase es desactivarUser
  const accountState = isDeactivating ? 0 : 1;

  if (confirm(`¿Desea ${isDeactivating ? "desactivar" : "reactivar"} este usuario?`)) {
    $.ajax({
      type: "PUT",
      url: `http://localhost:8080/emprendev/v1/user/${id}`,
      contentType: "application/json",
      data: JSON.stringify({ accountState }),
      xhrFields: {
        withCredentials: true,
      },
      success: function () {
        cargarUsuarios();
      },
      error: function (xhr, status, error) {
        console.error(`Error al ${isDeactivating ? "desactivar" : "reactivar"} Usuario:`, error);
      },
    });
  }
});

cargarUsuarios(); // Llamada inicial para cargar los usuarios
});

async function validateForm() {
  const nombre = $("#edit_first_name").val();
  const segundoNombre = $("#edit_sec_name").val();
  const apellido = $("#edit_last_name").val();
  const segundoApellido = $("#edit_last_name2").val();
  const documentoIdentidad = $("#edit_number_id").val();
  const fechaNacimiento = $("#edit_birth_date").val();
  const rol = $("#edit_rol").val();
  const telefono = $("#edit_phone_number").val();
  const correo = $("#edit_email").val();

  let todasLasValidacionesPasaron = true;

  function showErrorMessage(message) {
      Swal.fire({
          icon: "error",
          title: "Error",
          text: message,
      });
      todasLasValidacionesPasaron = false;
  }

  const validaciones = [
      "nombre",
      "segundoNombre",
      "apellido",
      "segundoApellido",
      "documentoIdentidad",
      "fechaNacimiento",
      "rol",
      "telefono",
      "correo"
  ];

  for (let validacion of validaciones) {
      switch (validacion) {
          case "nombre":
              if (/[\d\W]+/.test(nombre)) {
                  showErrorMessage("Los nombres no pueden contener números o simbologías.");
              }
              if (nombre.trim() === "") {
                  showErrorMessage("Por favor, completa el campo Primer Nombre");
              }
              break;
          case "segundoNombre":
              if (/[\d\W]+/.test(segundoNombre)) {
                  showErrorMessage("Los nombres no pueden contener números o simbologías.");
              }
              break;
          case "apellido":
              if (/[\d\W]+/.test(apellido)) {
                  showErrorMessage("Los apellidos no pueden contener números o simbologías.");
              }
              if (apellido.trim() === "") {
                  showErrorMessage("Por favor, completa el campo Primer Apellido");
              }
              break;
          case "segundoApellido":
              if (/[\d\W]+/.test(segundoApellido)) {
                  showErrorMessage("Los apellidos no pueden contener números o simbologías.");
              }
              break;
          case "documentoIdentidad":
              if (isNaN(documentoIdentidad) || /^\s*$/.test(documentoIdentidad)) {
                  showErrorMessage("El documento de identidad debe ser un número válido.");
              }
              break;
          case "fechaNacimiento":
              if (!fechaNacimiento) {
                  showErrorMessage("Por favor, ingresa tu fecha de nacimiento.");
              } else {
                  const fechaNacimientoDate = new Date(fechaNacimiento);
                  const hoy = new Date();
                  if (fechaNacimientoDate > hoy) {
                      showErrorMessage("La fecha de nacimiento no puede estar en el futuro.");
                  } else {
                      let edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
                      if (
                          hoy.getMonth() < fechaNacimientoDate.getMonth() ||
                          (hoy.getMonth() === fechaNacimientoDate.getMonth() &&
                              hoy.getDate() < fechaNacimientoDate.getDate())
                      ) {
                          edad--;
                      }
                      if (edad < 18 || edad > 70) {
                          showErrorMessage("Tu edad no es válida, intenta nuevamente.");
                      }
                  }
              }
              break;
          case "rol":
              if (rol != "Desarrollador" && rol != "Mipyme" && rol != "Administrador") {
                  showErrorMessage("Por favor, digita un rol permitido");
              }
              break;
          case "telefono":
              if (isNaN(telefono)) {
                  showErrorMessage("Por favor, ingrese un número de teléfono válido.");
              }
              break;
          case "correo":
              if (!/^\S+@\S+\.\S+$/.test(correo)) {
                  showErrorMessage("Por favor, ingresa un correo electrónico válido.");
              }
              break;
          default:
              break;
      }
  }

  console.log("Todas las validaciones pasaron:", todasLasValidacionesPasaron);

  return todasLasValidacionesPasaron;
}


  //Desde aqui empiezan las llamada de la oferta en la tabla para el administrador
  //Desde aqui empiezan las llamada de la oferta en la tabla para el administrador
  //Desde aqui empiezan las llamada de la oferta en la tabla para el administrador
  function cargarOfertas() {
    $.ajax({
      type: "GET",
      url: `http://localhost:8080/api/offers/listOrderAccount`,
      xhrFields: {
        withCredentials: true,
      },
      success: function (offer) {
        $("#tablaOferta > tbody").empty();
        $.each(offer, function (i, data) {
          // Convertir el BLOB en una URL para la imagen
          var imgSrc = data.image ? "data:image/jpeg;base64," + data.image : "";

          if (imgSrc) {
            $("#edit_offer_image").attr("src", imgSrc).show();
          } else {
            $("#edit_offer_image").hide();
          }

          // Limitar la descripción a 50 caracteres, comprobando que no sea null o undefined
          var limitedDescription = data.description
            ? data.description.length > 50
              ? data.description.substring(0, 50) + "..."
              : data.description
            : "";

          // Verificar el estado de la oferta y construir la fila correspondiente
          var row = `<tr>
                        <td><img src="${imgSrc}" alt="imagen-oferta" width="50px" height="30px"></td>
                        <td>${data.title}</td>
                        <td>${limitedDescription}</td>
                        <td>${data.payment}</td>
                        <td>${data.fields}</td>
                        <td>${data.creationDate}</td>
                        <td>${data.offerState}</td>
                        <td>`;

          if (data.offerState == 1) {
            row += `<button class='btn btn-primary btn-sm editarOffer' data-offer-id='${data.id}'>Editar</button>
                                <button class='btn btn-danger btn-sm desactivarOffer' data-offer-id='${data.id}'>Desactivar</button>`;
          } else {
            row += `<button class='btn btn-success btn-sm reactivarOffer' data-id='${data.id}'>Reactivar</button>`;
          }

          row += `</td></tr>`;

          $("#tablaOferta > tbody").append(row);
        });
      },
      error: function (xhr, status, error) {
        console.error("Error al cargar Ofertas:", error);
      },
    });
  }

  cargarOfertas();

  // Mostrar el formulario de edición con los datos de la oferta
  $(document).on("click", ".editarOffer", function () {
    var id = $(this).data("offer-id");

    $.ajax({
      type: "GET",
      url: "http://localhost:8080/api/offers/" + id,
      dataType: "json",
      xhrFields: {
        withCredentials: true,
      },
      success: function (data) {
        $("#edit-offer-id").val(data.id);
        $("#edit_offer_tittle").val(data.title);
        $("#edit_offer_desc").val(data.description);
        $("#edit_offer_payment").val(data.payment);
        $("#edit_offer_fields").val(data.fields);
        $("#edit_offer_state").val(data.offerState);

        // Almacenar las fechas existentes en los campos ocultos
        $("#hidden_creation_date").val(data.creationDate);
        $("#hidden_finalization_date").val(data.finalizationDate);

        var imgSrc = data.image ? "data:image/jpeg;base64," + data.image : "";

        if (imgSrc) {
          $("#edit_offer_image").attr("src", imgSrc).show();
        } else {
          $("#edit_offer_image").hide();
        }

        $("#edit-offer-form").show();
        $("#deactivate-offer-form").hide();
      },
      error: function (xhr, status, error) {
        console.error("Error al cargar datos de la Oferta:", error);
      },
    });
  });

  // Manejar la previsualización de la nueva imagen seleccionada
  $(document).on("change", "#edit_offer_image_input", function () {
    var file = this.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function (e) {
        // Mostrar la imagen seleccionada en el formulario
        $("#edit_offer_image").attr("src", e.target.result).show();
      };
      reader.readAsDataURL(file);
    }
  });

// Funcionalidad de guardado para los cambios de la oferta
$(document).on("click", "#offer-save-edit-btn", async function () {
  // Validar el formulario antes de continuar
  const validacionesPasaron = await validateOfferForm();

  if (validacionesPasaron && confirm("¿Desea guardar los cambios realizados?")) {
      var id = $("#edit-offer-id").val();
      var title = $("#edit_offer_tittle").val();
      var description = $("#edit_offer_desc").val();
      var payment = $("#edit_offer_payment").val();
      var fields = $("#edit_offer_fields").val();
      var offerState = $("#edit_offer_state").val();

      // Usar las fechas almacenadas en los campos ocultos
      var creationDate = $("#hidden_creation_date").val();
      var finalizationDate = $("#hidden_finalization_date").val();

      // Crear un objeto FormData para enviar la imagen y otros datos
      var formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("payment", payment);
      formData.append("fields", fields);
      formData.append("offerState", offerState);
      formData.append("creationDate", creationDate);
      formData.append("finalizationDate", finalizationDate);

      // Añadir la imagen si existe
      const file = document.getElementById("edit_offer_image_input").files[0];
      if (file) {
          formData.append("image", file);
      }

      $.ajax({
          type: "PUT",
          url: "http://localhost:8080/api/offers/" + id,
          data: formData,
          processData: false, // Evitar que jQuery procese los datos
          contentType: false, // Evitar que jQuery establezca el tipo de contenido
          xhrFields: {
              withCredentials: true,
          },
          success: function (response) {
              $("#edit-offer-form").hide();
              Swal.fire({
                  icon: "success",
                  title: "¡Oferta Actualizada!",
                  text: "La oferta ha sido actualizada exitosamente...",
              }).then(() => {
                  cargarOfertas(); // Recargar la lista de ofertas
              });
          },
          error: function (xhr, status, error) {
              console.error("Error al actualizar la oferta:", error);
          },
      });
  } else {
      $("#edit-offer-form").show();
  }
});

//Función de validación del formulario
async function validateOfferForm() {
    const tituloOferta = document.querySelector('#edit_offer_tittle').value;
    const descripcionOferta = document.querySelector('#edit_offer_desc').value;
    const pagoOferta = document.querySelector('#edit_offer_payment').value;
    const cuposOferta = document.querySelector('#edit_offer_fields').value;

    let todasLasValidacionesPasaron = true;

    function showErrorMessage(message) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
        });
        todasLasValidacionesPasaron = false;
    }

    const validaciones = [
        'tituloOferta',
        'descripcionOferta',
        'pagoOferta',
        'cuposOferta'
    ];

    for (let validacion of validaciones) {
        switch (validacion) {
            case 'tituloOferta':
                if (tituloOferta.trim() === '') {
                    showErrorMessage("Por favor, completa el campo Titulo");
                }
                break;
            case 'descripcionOferta':
                if (descripcionOferta.trim() === '') {
                    showErrorMessage("Por favor, completa el campo Descripcion");
                }
                if (descripcionOferta.length < 200) {
                    showErrorMessage("La descripcion de la oferta debe contener por lo menos 200 caracteres");
                }
                break;
            case 'pagoOferta':
                if (pagoOferta.trim() === '') {
                    showErrorMessage("Por favor, completa el campo Pago");
                }
                if (isNaN(pagoOferta)) {
                    showErrorMessage("El pago por la oferta solo puede contener números");
                }
                if (parseFloat(pagoOferta) < 100000) {
                    showErrorMessage("El pago por la oferta no puede ser menor a 100.000");
                }
                break;
            case 'cuposOferta':
                if (cuposOferta.trim() === '') {
                    showErrorMessage("Por favor, completa el campo Cupos");
                }
                if (isNaN(cuposOferta)) {
                    showErrorMessage("Los cupos de la oferta solo pueden contener números");
                }
                if (parseInt(cuposOferta) <= 0) {
                    showErrorMessage("La oferta debe contener al menos un cupo");
                }
                break;
            default:
                break;
        }
    }

    return todasLasValidacionesPasaron;
}

  // Mostrar formulario de desactivación de la oferta
  $(document).on("click", ".desactivarOffer", function () {
    var id = $(this).data("offer-id");

    $.ajax({
      type: "GET",
      url: "http://localhost:8080/api/offers/" + id,
      dataType: "json",
      xhrFields: {
        withCredentials: true,
      },
      success: function (data) {
        $("#edit-offer-id").val(data.id);
        $("#deactivate-offer-form").show(); // Mostrar el formulario de desactivación de oferta
        $("#edit-offer-form").hide();
      },
      error: function (xhr, status, error) {
        console.error("Error al cargar datos de Oferta:", error);
      },
    });
  });

  // Actualizar estado de la oferta para la desactivación
  $(document).on("click", "#deactivate-offer-btn", function () {
    if (confirm("¿Desea desactivar este registro?") == true) {
        var id = $("#edit-offer-id").val();

        $.ajax({
            type: "PUT",
            url: "http://localhost:8080/api/offers/" + id + "/deactivate",
            success: function (response) {
                $("#deactivate-offer-form").hide();
                cargarOfertas(); // Actualizar la lista de ofertas
            },
            error: function (xhr, status, error) {
                console.error("Error al desactivar la oferta:", error);
            },
        });
    } else {
        $("#deactivate-offer-form").hide();
    }
  });


  // Manejar la reactivación de una oferta
  $(document).on("click", ".reactivarOffer", function () {
    if (confirm("¿Desea reactivar esta Oferta?") == true) {
        var id = $(this).data("id");

        $.ajax({
            type: "PUT",
            url: "http://localhost:8080/api/offers/" + id + "/reactivate",
            success: function () {
                cargarOfertas(); // Recargar la lista de ofertas
            },
            error: function (xhr, status, error) {
                console.error("Error al reactivar la oferta:", error);
            },
        });
    }
  });

//admin search
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const table = document.getElementById("tabla");
  const tbody = table.querySelector("tbody");

  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();
    const rows = tbody.querySelectorAll("tr");

    rows.forEach((row) => {
      const cells = row.querySelectorAll("td");
      const rowText = Array.from(cells)
        .map((cell) => cell.textContent.toLowerCase())
        .join(" ");

      if (rowText.includes(searchTerm)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const table = document.getElementById("tablaOferta");
  const tbody = table.querySelector("tbody");

  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();
    const rows = tbody.querySelectorAll("tr");

    rows.forEach((row) => {
      const cells = row.querySelectorAll("td");
      const rowText = Array.from(cells)
        .map((cell) => cell.textContent.toLowerCase())
        .join(" ");

      if (rowText.includes(searchTerm)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  });
});

//functionalities

const user_tbl_btn = document.getElementById("user-table-btn");
const dev_tbl_btn = document.getElementById("dev-table-btn");
const mipyme_tbl_btn = document.getElementById("mipyme-table-btn");
const UserTable = document.getElementById("UserTable");
const devTable = document.getElementById("DevTable");
const userdroplist = document.getElementById("userdroplist");

const user_sub_menu = document.getElementById("user-sub-menu");
const adminButtons = document.getElementById("adminbuttons");

const region_tbl_btn = document.getElementById("region-tbl-btn");
const offertable = document.getElementById("offerTable");
const offerbtn = document.getElementById("offerbtn");
const offerdroplist = document.getElementById("offer-drop-list");

var TituloTabla = document.getElementById("TituloTabla");

user_sub_menu.classList.add("hidden");
user_btn_IsShowing = false;
function OpenUserSubMenu() {
  if (!user_btn_IsShowing) {
    dev_tbl_btn.style.display = "block";
    mipyme_tbl_btn.style.display = "block";
    userdroplist.style.backgroundColor = "gray";
  } else {
    dev_tbl_btn.style.display = "none";
    mipyme_tbl_btn.style.display = "none";
    userdroplist.style.backgroundColor = "#f5f5f5";
  }
  user_btn_IsShowing = !user_btn_IsShowing;
}

function UserTableSelected() {
  AddAnimation();
  TituloTabla.textContent = "Tabla Usuarios";
  user_tbl_btn.style.backgroundColor = "gray";
  user_tbl_btn.style.color = "white";

  dev_tbl_btn.style.backgroundColor = "#f5f5f5";
  dev_tbl_btn.style.color = "black";

  mipyme_tbl_btn.style.backgroundColor = "#f5f5f5";
  mipyme_tbl_btn.style.color = "black";

  offerbtn.style.backgroundColor = "#f5f5f5";
  offerbtn.style.color = "black";

  offertable.style.display = "none";
  UserTable.style.display = "block";
  adminButtons.style.display = "block";

  $("#deactivate-offer-form").hide();
  $("#edit-offer-form").hide();
  $("#edit-form").hide();
}

function DevTableSelected() {
  AddAnimation();
  TituloTabla.textContent = "Tabla Desarrolladores";
  dev_tbl_btn.style.backgroundColor = "gray";
  dev_tbl_btn.style.color = "white";

  user_tbl_btn.style.backgroundColor = "#f5f5f5";
  user_tbl_btn.style.color = "black";

  mipyme_tbl_btn.style.backgroundColor = "#f5f5f5";
  mipyme_tbl_btn.style.color = "black";

  offerbtn.style.backgroundColor = "#f5f5f5";
  offerbtn.style.color = "black";

  offertable.style.display = "none";
  UserTable.style.display = "block";
  adminButtons.style.display = "block";

  $("#deactivate-offer-form").hide();
  $("#edit-offer-form").hide();
  $("#edit-form").hide();
}

function MipymeTableSelected() {
  AddAnimation();
  TituloTabla.textContent = "Tabla Mipymes";
  mipyme_tbl_btn.style.backgroundColor = "gray";
  mipyme_tbl_btn.style.color = "white";

  user_tbl_btn.style.backgroundColor = "#f5f5f5";
  user_tbl_btn.style.color = "black";

  dev_tbl_btn.style.backgroundColor = "#f5f5f5";
  dev_tbl_btn.style.color = "black";

  offerbtn.style.backgroundColor = "#f5f5f5";
  offerbtn.style.color = "black";

  offertable.style.display = "none";
  UserTable.style.display = "block";
  adminButtons.style.display = "block";

  $("#deactivate-offer-form").hide();
  $("#edit-offer-form").hide();
  $("#edit-form").hide();
}

//offers

offer_btn_IsShowing = false;
function OfferSubMenu() {
  if (!offer_btn_IsShowing) {
    region_tbl_btn.style.display = "block";
    offerdroplist.style.backgroundColor = "gray";
  } else {
    region_tbl_btn.style.display = "none";
    offerdroplist.style.backgroundColor = "#f5f5f5";
  }
  offer_btn_IsShowing = !offer_btn_IsShowing;
}

function OpenOffers() {
  AddAnimation();
  TituloTabla.textContent = "Ofertas";

  offertable.style.display = "flex";
  UserTable.style.display = "none";

  offerbtn.style.backgroundColor = "gray";
  offerbtn.style.color = "white";

  mipyme_tbl_btn.style.backgroundColor = "#f5f5f5";
  mipyme_tbl_btn.style.color = "black";

  user_tbl_btn.style.backgroundColor = "#f5f5f5";
  user_tbl_btn.style.color = "black";

  dev_tbl_btn.style.backgroundColor = "#f5f5f5";
  dev_tbl_btn.style.color = "black";

  $("#deactivate-offer-form").hide();
  $("#edit-offer-form").hide();
  $("#edit-form").hide();
}

function AddAnimation() {
  setInterval(() => {
    TituloTabla.classList.add("fade-in-up-reversed");
  }, 1);
  TituloTabla.classList.remove("fade-in-up-reversed");
}

//logout

user_sub_menu_isShowing = false;
function OpenAdminMenu() {
  if (!user_sub_menu_isShowing) {
    user_sub_menu.style.display = "block";
  } else {
    user_sub_menu.style.display = "none";
  }
  user_sub_menu_isShowing = !user_sub_menu_isShowing;
}
