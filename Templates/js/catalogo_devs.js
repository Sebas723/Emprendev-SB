// Submenu del perfil del usuario (imagen arriba a la izquierda)
const userSubMenu = document.getElementById("user-sub-menu");
const tag = document.querySelectorAll(".tag");
const tags = document.querySelectorAll('.tag');
const cols = document.querySelectorAll('.cola');

const openModalButtons = document.querySelectorAll(".openModal");
const closeModalButtons = document.querySelectorAll(".closeModal");
const modalContainers = document.querySelectorAll(".modalContainer");
const overlay = document.querySelector(".overlay");

userSubMenu.style.display = "none";
let SubmenuPerfilBtn_isShowing = false;

var fullText = '';

function OpenPerfilSubMenu(){
    if (!SubmenuPerfilBtn_isShowing){
        userSubMenu.style.display="block";
    } else {
        userSubMenu.style.display="none";
    }
    SubmenuPerfilBtn_isShowing = !SubmenuPerfilBtn_isShowing;
};

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

cargarUsuarios();

modalContainers.forEach(modal => modal.classList.add("hidden"));
overlay.classList.add("hidden");

window.addEventListener('scroll', function() {
  var headerHeight = document.querySelector('header').offsetHeight;
  var scrollTop = window.scrollY || document.documentElement.scrollTop;
  var modal = document.querySelector('.modal-body');
  var newTop = headerHeight + 430 - scrollTop;
  modal.style.top = newTop + 'px';
});

// Mostrar desarrolladores en el catálogo
let allCards = []; // Almacena todas las tarjetas generadas

function cargarUsuarios() {
  $.ajax({
    type: "GET",
    url: "http://localhost:8080/emprendev/v1/user/listOrderAccount",
    dataType: "json",
    xhrFields: {
      withCredentials: true
    },
    beforeSend: function() {
      $(".cards_container").html('<p>Loading...</p>'); // Indicador de carga
    },
    success: function (data) {
      $(".cards_container").empty(); // Limpiar el contenedor antes de agregar nuevos elementos

      // Filtrar y crear tarjetas solo para desarrolladores activos
      const filteredData = data.filter(item => item.accountState == 1 && item.role === "Desarrollador"); 
      allCards = [];

      filteredData.forEach(item => {
        $.ajax({
          type: "GET",
          url: `http://localhost:8080/api/devs/${item.id}`, // Obtener detalles del Dev
          dataType: "json",
          xhrFields: {
            withCredentials: true
          },
          success: function(devData) {
            const imgUrl = item.imgProfile ? "data:image/jpeg;base64," + item.imgProfile: "";
            fullText = `${devData.profileDescription || ""}`;
            allCards.push({
              id: item.id,
              imgProfile: imgUrl,
              firstName: item.firstName,
              lastName: item.lastName,
              role: item.role,
              profileDescription: devData.profileDescription || "Este es un mensaje predeterminado que se mostrará en tu perfil." // Agregar descripción del perfil
            });

            // Mostrar las tarjetas cada vez que se completa la solicitud de un Dev
            mostrarTarjetas(allCards);
          },
          error: function (xhr, status, error) {
            console.error("Error al cargar los detalles del Dev:", error);
          }
        });
      });
    },
    error: function (xhr, status, error) {
      console.error("Error al cargar Usuarios:", error);
      $(".cards_container").html('<p>Error al cargar usuarios. Inténtelo de nuevo más tarde.</p>'); // Mensaje de error
    }
  });
}

function mostrarTarjetas(cards) {
  const cardsHtml = cards.map(item => `
    <div class='cola' data-full-text='${encodeURIComponent(fullText)}' data-role='${item.role.toLowerCase()}'>
      <div class='card border-0'>
        <div class='box1'></div>
        <div class='card-content'>
          <div class='img'>
            <img src='${item.imgProfile}' alt=''>
          </div>
          <div class='name-proffesion'>
            <div class='dev_names'>
              <span class='name'>${item.firstName}</span>
              <span class='name'>${item.lastName}</span>
            </div>
            <span class='profession'>${item.role}</span>
          </div>
          <hr>
          <div class='about'>
            <p>${item.profileDescription}</p>
          </div>
          <div class='button b1'>
            <button class='about-me openModal' data-id='${item.id}'>Ver más</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
  $(".cards_container").html(cardsHtml);

  // Llamar a la función de filtrado después de cargar las ofertas
  filtrarTarjetas();
  assignOpenModalEventsForDevs(); // Asignar eventos para abrir los modales después de mostrar las tarjetas
  assignCloseModalEvents();
}


function cargarDetallesDesarrollador(devId) {
  $.ajax({
    type: "GET",
    url: `http://localhost:8080/emprendev/v1/user/${devId}`,
    xhrFields: {
      withCredentials: true,
    },
    success: function (devData) {
      // Obtener detalles adicionales del desarrollador
      $.ajax({
        type: "GET",
        url: `http://localhost:8080/api/devs/${devId}`,
        xhrFields: {
          withCredentials: true,
        },
        success: function (detailsData) {
          // Actualiza el DOM con los datos obtenidos
          $(".modal-title").text(`${devData.firstName || "Nombre desconocido"} ${devData.lastName || ""}`);
          $(".modal-email").text(devData.email || "Email no disponible");
          $(".modal-role").text(devData.role || "Rol no disponible");
          $(".modal-phoneNum").text(devData.phoneNum || "Rol no disponible");
          $(".modal-creation-date").text(devData.creationDate || "Fecha de creación no disponible");
          $(".modal-profile-img").attr("src", devData.imgProfile || "ruta/por/defecto.jpg");
          $(".modal-about").text(detailsData.profileDescription || "Este es un mensaje predeterminado que se mostrará en tu perfil. Puedes personalizar este mensaje en cualquier momento desde la sección 'Perfil/Editar/Descripcion'. Si no realizas cambios, este mensaje continuará siendo visible para otros usuarios en tu perfil. Este es un mensaje predeterminado que se mostrará en tu perfil. Puedes personalizar este mensaje en cualquier momento desde la sección 'Perfil/Editar/Descripcion'. Si no realizas cambios, este mensaje continuará siendo visible para otros usuarios en tu perfil. Este es un mensaje predeterminado que se mostrará en tu perfil. Puedes personalizar este mensaje en cualquier momento desde la sección 'Perfil/Editar/Descripcion'. Si no realizas cambios, este mensaje continuará siendo visible para otros usuarios en tu perfil. Este es un mensaje predeterminado que se mostrará en tu perfil. Puedes personalizar este mensaje en cualquier momento desde la sección 'Perfil/Editar/Descripcion'.");
          $(".modal-university").text(detailsData.university || "Sin estudios");
          $(".modal-career").text(detailsData.career || "Sin carrera");
          $(".modal-careerStartDate").text(detailsData.careerStartDate || "Sin carrera");
          $(".modal-careerEndDate").text(detailsData.careerEndDate || "Sin carrera");
          $(".modal-company").text(detailsData.company || "Sin estudios");
          $(".modal-charge").text(detailsData.charge || "Sin carrera");
          $(".modal-chargeStartDate").text(detailsData.chargeStartDate || "Sin carrera");
          $(".modal-chargeEndDate").text(detailsData.chargeEndDate || "Sin carrera");
          $(".modal-chargeDescription").text(detailsData.chargeDescription || "Este es un mensaje predeterminado que se mostrará en tu perfil. Puedes personalizar este mensaje en cualquier momento desde la sección 'Perfil/Editar/Descripcion del cargo'. Si no realizas cambios, este mensaje continuará siendo visible para otros usuarios en tu perfil. Este es un mensaje predeterminado que se mostrará en tu perfil. Puedes personalizar este mensaje en cualquier momento desde la sección 'Perfil/Editar/Descripcion del cargo'. Si no realizas cambios, este mensaje continuará siendo visible para otros usuarios en tu perfil. Este es un mensaje predeterminado que se mostrará en tu perfil. Puedes personalizar este mensaje en cualquier momento desde la sección 'Perfil/Editar/Descripcion del cargo'. Si no realizas cambios, este mensaje continuará siendo visible para otros usuarios en tu perfil. Este es un mensaje predeterminado que se mostrará en tu perfil. Puedes personalizar este mensaje en cualquier momento desde la sección 'Perfil/Editar/Descripcion del cargo'.");

          var imgSrc = devData.imgProfile ? "data:image/jpeg;base64," + devData.imgProfile : "";
          $(".modal-images").attr("src", imgSrc);

          // Mostrar el modal
          $(".overlay").show();
          $(".modal-container").show();
        },
        error: function () {
          console.error("Error al obtener los detalles adicionales del desarrollador.");
        }
      });
    },
    error: function () {
      console.error("Error al obtener los datos del usuario/desarrollador.");
    }
  });
}

// Asignar eventos a los botones de abrir modal para desarrolladores
function assignOpenModalEventsForDevs() {
  $(".openModal").on("click", function () {
    const devId = $(this).data("id");
    cargarDetallesDesarrollador(devId);
  });
}

// Asignar eventos a los botones de cerrar modal
function assignCloseModalEvents() {
  $(".closeModal, .overlay").on("click", function () {
    $(".overlay").hide(); 
    $(".modal-container").hide(); 
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

  // Agregar el evento de clic a las etiquetas
  tags.forEach((tag) => {
    tag.addEventListener("click", () => {
      tag.classList.toggle("tag-active");
      filtrarTarjetas(); // Llamar a la función de filtrado al hacer clic en una etiqueta
    });
  });
});

//Scroll Ventana modal
window.addEventListener("scroll", function () {
  var headerHeight = document.querySelector("header").offsetHeight;
  var scrollTop = window.scrollY || document.documentElement.scrollTop;
  var modal = document.querySelector(".modal-body");
  // var newTop = headerHeight + 30 - scrollTop;
  var newTop = headerHeight + 1100 - scrollTop;

  modal.style.top = newTop + "px";
});