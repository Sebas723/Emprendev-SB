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
      cargarDetallesOferta(offerId);
      $(".overlay").show();
      $(".modal-container").show();
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
function cargarOfertas() {
  $.ajax({
    type: "GET",
    url: `http://localhost:8080/api/offers/listOrderAccount`,
    xhrFields: {
      withCredentials: true,
    },
    success: function (offers) {
      $(".cards_container").empty();

      // Usar un objeto para almacenar los usuarios y evitar llamadas repetidas
      let userPromises = {};

      $.each(offers, function (i, data) {
        var imgSrc = data.image ? "data:image/jpeg;base64," + data.image : "";

        // Texto completo de la oferta
        var fullText = `${data.title || ""} ${data.description || ""} ${
          data.payment || ""
        } ${data.creationDate || ""}`;

        // Limitar la descripción a 60 caracteres para la vista en el catálogo
        var limitedDescription = data.description
          ? data.description.length > 60
            ? data.description.substring(0, 60) + "..."
            : data.description
          : "";

        // Verificar si ya se ha hecho una petición para este userId
        if (!userPromises[data.userId]) {
          userPromises[data.userId] = getUserById(data.userId);
        }

        userPromises[data.userId]
          .done(function (user) {
            var card =
              "<div class='cola' data-full-text='" +
              encodeURIComponent(fullText) +
              "'>" +
              "<div class='card border-0'>" +
              "<div class='box1'>" +
              "<img src='" +
              imgSrc +
              "' alt='' style='width: 100%; height: 105%; border-radius:20px;' />" +
              "</div>" +
              "<div class='card-content'>" +
              "<div class='name-proffesion'>" +
              "<span class='name'>" +
              (data.title || "") +
              "</span>" +
              "</div>" +
              "<div class='about'>" +
              "<p>" +
              limitedDescription +
              "</p>" +
              "<span>Pago: " +
              (data.payment || "") +
              "</span>" +
              "<br>" +
              "<span>Fecha de Publicacion: " +
              (data.creationDate || "") +
              "</span>" +
              "<br>" +
              "<span>Creador: " +
              (user.firstName || "Desconocido") +
              " " +
              (user.lastName || "") +
              "</span>" +
              "</div>" +
              "<div class='button b1'>" +
              "<a href='./editarOferta.html?id=" +
              data.id +
              "'><button class='edition'>Editar</button></a>" +
              "<button class='about-me openModal'>Ver más</button>" +
              "<button class='delete'>Eliminar</button>" +
              "</div>" +
              "</div>" +
              "</div>" +
              "</div>";

            $(".cards_container").append(card);
          })
          .fail(function () {
            console.error(
              "Error al obtener detalles del usuario con ID:",
              data.userId
            );
            // Manejar el error si la llamada al usuario falla
            var card =
              "<div class='cola' data-full-text='" +
              encodeURIComponent(fullText) +
              "'>" +
              "<div class='card border-0'>" +
              "<div class='box1'>" +
              "<img src='" +
              imgSrc +
              "' alt='' style='width: 100%; height: 105%; border-radius:20px;' />" +
              "</div>" +
              "<div class='card-content'>" +
              "<div class='name-proffesion'>" +
              "<span class='name'>" +
              (data.title || "") +
              "</span>" +
              "</div>" +
              "<div class='about'>" +
              "<p>" +
              limitedDescription +
              "</p>" +
              "<span>Pago: " +
              (data.payment || "") +
              "</span>" +
              "<br>" +
              "<span>Fecha de Publicacion: " +
              (data.creationDate || "") +
              "</span>" +
              "<br>" +
              "<span>Creador: Desconocido</span>" +
              "</div>" +
              "<div class='button b1'>" +
              "<a href='./editarOferta.html?id=" +
              data.id +
              "'><button class='edition'>Editar</button></a>" +
              "<button id='verMas' class='about-me openModal'>Ver más</button>" +
              "<button class='delete'>Eliminar</button>" +
              "</div>" +
              "</div>" +
              "</div>" +
              "</div>";

            $(".cards_container").append(card);
          });
      });

      // Llamar a la función de filtrado después de cargar las ofertas
      filtrarTarjetas();
    },
    error: function (xhr, status, error) {
      console.error("Error al cargar Ofertas:", error);
    },
  });
}

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
$(document).on("click", ".openModal", function () {
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
  var newTop = headerHeight + 600 - scrollTop;

  modal.style.top = newTop + "px";
});

//mostras desarrolladores en el catalogo
function cargarUsuarios() {
  assignOpenModalEvents();
  assignCloseModalEvents();
}

assignOpenModalEvents();
assignCloseModalEvents();
