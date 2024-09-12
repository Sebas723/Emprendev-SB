const userSubMenu = document.getElementById("user-sub-menu");
const tag = document.querySelectorAll(".tag");
const tags = document.querySelectorAll(".tag");
const cols = document.querySelectorAll(".cola");

const openModalButtons = document.querySelectorAll(".openModal");
const closeModalButtons = document.querySelectorAll(".closeModal");
const modalContainers = document.querySelectorAll(".modalContainer");
const overlay = document.querySelector(".overlay");

cargarUsuarios();

modalContainers.forEach((modal) => modal.classList.add("hidden"));
overlay.classList.add("hidden");

// Asignar eventos a los botones de abrir modal
function assignOpenModalEvents() {
  openModalButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const offerId = e.target.getAttribute('data-offer-id');
      if (offerId) {
        cargarDetallesOferta(offerId);
        $(".overlay").show();
        $(".modal-container").show();
      } else {
        console.error("El atributo data-offer-id no está definido.");
      }
    });
  });
}

// Asignar eventos a los botones de cerrar modal
function assignCloseModalEvents() {
  closeModalButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      closeModal();
    });
  });
}

function closeModal() {
  modalContainers.forEach((modal) => modal.classList.add("hidden"));
  overlay.classList.add("hidden");
}

//buscador de ofertas
document.addEventListener("keyup", (e) => {
  if (e.target.matches("#buscador")) {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll(".cola").forEach((el) => {
      const text = el.textContent || "";
      text.toLowerCase().includes(query)
        ? el.classList.remove("hidden")
        : el.classList.add("hidden");
    });
  }
});

//Submenu del perfil del usuario (imagen arriba a la izquierda)

userSubMenu.style.display = "none";

SubmenuPerfilBtn_isShowing = false;
function OpenPerfilSubMenu() {
  if (!SubmenuPerfilBtn_isShowing) {
    userSubMenu.style.display = "block";
  } else {
    userSubMenu.style.display = "none";
  }
  SubmenuPerfilBtn_isShowing = !SubmenuPerfilBtn_isShowing;
}

function getUserById(userId) {
  return $.ajax({
    type: "GET",
    url: `http://localhost:8080/emprendev/v1/user/${userId}`,
    xhrFields: {
      withCredentials: true,
    },
    success: function (user) {
      const userName = user.firstName;
    },
  });
}

// Función para cargar ofertas
// Supongamos que tienes el ID del usuario autenticado en una variable
var authenticatedUserId = null; // Reemplaza esto con el ID real del usuario autenticado

function obtenerIdUsuarioAutenticado() {
  $.ajax({
    type: "GET",
    url: `http://localhost:8080/emprendev/v1/user/sessionStatus`, // Asume que esta URL devuelve la información del usuario autenticado
    xhrFields: {
      withCredentials: true,
    },
    success: function (user) {
      authenticatedUserId = user.userId; // Asigna el ID del usuario autenticado a la variable
      console.log("ID del usuario autenticado:", authenticatedUserId);
    },
    error: function () {
      console.error("Error al obtener el ID del usuario autenticado.");
    }
  });
}

$(document).ready(function () {
  obtenerIdUsuarioAutenticado();
});

// Función para cargar ofertas
function cargarOfertas() {
  $.ajax({
    type: "GET",
    url: `http://localhost:8080/api/offers/listOrderAccount`,
    xhrFields: {
      withCredentials: true,
    },
    success: function (offers) {
      $(".cards_container").empty();

      let userPromises = {};

      $.each(offers, function (i, data) {
        var imgSrc = data.image ? "data:image/jpeg;base64," + data.image : "";

        var fullText = `${data.title || ""} ${data.description || ""} ${
          data.payment || ""
        } ${data.creationDate || ""}`;

        var limitedDescription = data.description
          ? data.description.length > 60
            ? data.description.substring(0, 300) + "..."
            : data.description
          : "";

        if (!userPromises[data.userId.id]) {
          userPromises[data.userId.id] = getUserById(data.userId.id);
        }

        userPromises[data.userId.id]
          .done(function (user) {
            var buttons = "";

            // Mostrar botones solo si el usuario autenticado es el creador de la oferta
            if (authenticatedUserId === data.userId.id) {
              buttons = `
                <a href='./editarOferta.html?id=${data.id}' class='edition'>
                  Editar
                </a>
                <button class='delete' data-offer-id='${data.id}'>
                  Eliminar
                </button>
              `;
            }

            var card = `
              <div class='cola' data-full-text='${encodeURIComponent(fullText)}'>
                <div class='card border-0'>
                  <div class='box1'>
                    <img src='${imgSrc}' alt='' style='width: 100%; height: 105%; border-radius:20px;' />
                  </div>
                  <div class='card-content'>
                    <div class='name-proffesion'>
                      <span class='name'>${data.title || ""}</span>
                    </div>
                    <div class='about'>
                      <p>${limitedDescription}</p>
                      <span>Pago: ${data.payment || ""}</span><br>
                      <span>Fecha de Publicacion: ${data.creationDate || ""}</span><br>
                      <span>Creador: ${user.firstName || "Desconocido"} ${user.lastName || ""}</span>
                    </div>
                    <div class='button b1'>
                      ${buttons}
                      <button id='verMas' class='about-me openModal' data-offer-id='${data.id}'>
                        Ver más
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            `;

            $(".cards_container").append(card);
          })
          .fail(function () {
            console.error(
              "Error al obtener detalles del usuario con ID:",
              data.userId
            );
            var card = `
              <div class='cola' data-full-text='${encodeURIComponent(fullText)}'>
                <div class='card border-0'>
                  <div class='box1'>
                    <img src='${imgSrc}' alt='' style='width: 100%; height: 105%; border-radius:20px;' />
                  </div>
                  <div class='card-content'>
                    <div class='name-proffesion'>
                      <span class='name'>${data.title || ""}</span>
                    </div>
                    <div class='about'>
                      <p>${limitedDescription}</p>
                      <span>Pago: ${data.payment || ""}</span><br>
                      <span>Fecha de Publicacion: ${data.creationDate || ""}</span><br>
                      <span>Creador: Desconocido</span>
                    </div>
                    <div class='button b1'>
                      <button class='btn btn-info btn-sm openModal' data-offer-id='${data.id}'>
                        Ver más
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            `;

            $(".cards_container").append(card);
          });
      });

      filtrarTarjetas();
    },
    error: function (xhr, status, error) {
      console.error("Error al cargar Ofertas:", error);
    },
  });
}

// Función para eliminar la oferta
$(document).on("click", ".delete", function () {
  var offerId = $(this).data("offer-id");
  if (confirm("¿Estás seguro de que deseas eliminar esta oferta?")) {
    eliminarOferta(offerId);
  }
});

// Función para eliminar la oferta
function eliminarOferta(offerId) {
  $.ajax({
    type: "DELETE",
    url: `http://localhost:8080/api/offers/${offerId}`,
    success: function () {
      Swal.fire({
        icon: "success",
        title: "Oferta eliminada",
        text: "Oferta eliminada exitosamente...",
      })
      // Recargar las ofertas después de eliminar
      cargarOfertas();
    },
    error: function (xhr, status, error) {
      console.error("Error al eliminar la oferta:", error);
      alert("Hubo un error al intentar eliminar la oferta.");
    },
  });
}

// Función para cargar detalles de la oferta y el mipyme
function cargarDetallesOferta(offerId) {
  $.ajax({
      type: "GET",
      url: `http://localhost:8080/api/offers/${offerId}`,
      xhrFields: {
          withCredentials: true,
      },
      success: function (offerData) {
        console.log(offerData);
          // Cargar los datos del mipyme usando el userId
          $.ajax({
              type: "GET",
              url: `http://localhost:8080/emprendev/v1/user/${offerData.userId.id}`,
              xhrFields: {
                  withCredentials: true,
              },
              success: function (userData) {
                  // Cargar los datos del negocio del mipyme
                  $.ajax({
                      type: "GET",
                      url: `http://localhost:8080/api/mipymes/${userData.id}`,
                      xhrFields: {
                          withCredentials: true,
                      },
                      success: function (mipymeData) {
                          // Actualiza el DOM con los datos obtenidos
                          $(".modal-title").text(offerData.title || "Sin título");
                          $(".modal-description").text(offerData.description || "Sin descripción");
                          $(".modal-payment").text(offerData.payment || "Sin pago especificado");
                          $(".modal-fields").text(offerData.fields || "sin cupos");
                          $(".modal-fieldsOccuped").text(offerData.fieldsOccuped || "0");
                          $(".modal-creation-date").text(offerData.creationDate || "Fecha no disponible");
                          $(".modal-creator-name").text(`${userData.firstName || "Nombre desconocido"} ${userData.lastName || ""}`);
                          $(".modal-business-name").text(mipymeData.nameBusiness || "Nombre del negocio no disponible");
                          $(".modal-business-city").text(mipymeData.cityBusiness || "Ciudad no disponible");
                          $(".modal-business-address").text(mipymeData.addressBusiness || "Dirección no disponible");
                          $(".modal-business-description").text(mipymeData.descriptionBusiness || "Este es un mensaje predeterminado que se mostrará en tu perfil. Puedes personalizar este mensaje en cualquier momento desde la sección 'Perfil/Editar/Descripcion del negocio'. Si no realizas cambios, este mensaje continuará siendo visible para otros usuarios en tu perfil. Este es un mensaje predeterminado que se mostrará en tu perfil. Puedes personalizar este mensaje en cualquier momento desde la sección 'Perfil/Editar'. Si no realizas cambios, este mensaje continuará siendo visible para otros usuarios en tu perfil. Este es un mensaje predeterminado que se mostrará en tu perfil. Puedes personalizar este mensaje en cualquier momento desde la sección 'Perfil/Editar/Descripcion del negocio'. Si no realizas cambios, este mensaje continuará siendo visible para otros usuarios en tu perfil. Este es un mensaje predeterminado que se mostrará en tu perfil. Puedes personalizar este mensaje en cualquier momento desde la sección 'Perfil/Editar/Descripcion del negocio'.");

                          var imgSrc = offerData.image ? "data:image/jpeg;base64," + offerData.image : "";
                          $(".modal-images").attr("src", imgSrc);

                          // Mostrar el modal
                          $(".overlay").show();
                          $(".modal-container").show();
                      },
                      error: function () {
                          console.error("Error al obtener los datos del negocio del mipyme.");
                      }
                  });
              },
              error: function () {
                  console.error("Error al obtener los datos del usuario/mipyme.");
              }
          });
      },
      error: function () {
          console.error("Error al obtener los detalles de la oferta.");
      }
  });
}

//funcion para aplicar a la oferta
$('#apply').click(function(e) {
  e.preventDefault();

  // Obtener el ID de la oferta desde el botón
  var offerId = $(this).data('offer-id');

  // ID del desarrollador que está aplicando (esto puede venir de tu frontend o ser manejado por sesión)
  var developerId = authenticatedUserId; // Esto es solo un ejemplo de cómo obtener el ID del usuario

  // Enviar la solicitud PUT
  $.ajax({
      url: `http://localhost:8080/api/offers/${offerId}/apply`,
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({
          developerId: developerId // Enviamos el ID del usuario desarrollador
      }),
      success: function(response) {
          alert('¡Te has postulado exitosamente!');
          // Aquí puedes actualizar el DOM para reflejar el cambio o redirigir al usuario
      },
      error: function(xhr, status, error) {
          alert('Hubo un error al postularte: ' + xhr.responseText);
      }
  });
});

// Función para filtrar tarjetas basadas en etiquetas activas
function filtrarTarjetas() {
  // Obtener todas las tarjetas
  const cols = Array.from(document.querySelectorAll(".cola"));

  // Obtener las etiquetas activas
  const activeTags = Array.from(tags)
    .filter((t) => t.classList.contains("tag-active"))
    .map((t) => t.textContent.toLowerCase());

  // Mostrar todas las tarjetas primero
  cols.forEach((cola) => cola.classList.remove("hidden"));

  if (activeTags.length > 0) {
    cols.forEach((cola) => {
      // Obtener el texto completo desde el atributo data-full-text
      const fullText = decodeURIComponent(
        cola.getAttribute("data-full-text")
      ).toLowerCase();
      const shouldShow = activeTags.some((activeTag) =>
        fullText.includes(activeTag)
      );
      if (!shouldShow) {
        cola.classList.add("hidden");
      }
    });
  }
}

// Ejecutar cargarOfertas al iniciar la página
$(document).ready(function () {
  cargarOfertas();

  // Agregar el evento de clic a las etiquetas
  tags.forEach((tag) => {
    tag.addEventListener("click", () => {
      tag.classList.toggle("tag-active");
      filtrarTarjetas(); // Llamar a la función de filtrado al hacer clic en una etiqueta
    });
  });
});

// Mostrar Modal
$(document).on("click", ".openModal", function (e) {
  e.preventDefault();
      const offerId = e.target.getAttribute('data-offer-id');
      $('#apply').attr('data-offer-id', offerId);
      if (offerId) {
        cargarDetallesOferta(offerId);
        $(".overlay").show();
        $(".modal-container").show();
      } else {
        console.error("El atributo data-offer-id no está definido.");
      }
  $(".overlay").show();
  $(".modal-container").show();
});

// Ocultar modal
$(document).on("click", ".closeModal, .overlay", function () {
  $(".overlay").hide();
  $(".modal-container").hide();
});

//Scroll Ventana modal
window.addEventListener("scroll", function () {
  var headerHeight = document.querySelector("header").offsetHeight;
  var scrollTop = window.scrollY || document.documentElement.scrollTop;
  var modal = document.querySelector(".modal-body");
  // var newTop = headerHeight + 30 - scrollTop;
  var newTop = headerHeight + 800 - scrollTop;

  modal.style.top = newTop + "px";
});

//mostras desarrolladores en el catalogo
function cargarUsuarios() {
  assignOpenModalEvents();
  assignCloseModalEvents();
}
