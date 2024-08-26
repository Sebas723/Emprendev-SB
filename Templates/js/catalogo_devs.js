const userSubMenu = document.getElementById("user-sub-menu");
const tag = document.querySelectorAll(".tag");
const tags = document.querySelectorAll('.tag');
const cols = document.querySelectorAll('.cola');

const openModalButtons = document.querySelectorAll(".openModal");
const closeModalButtons = document.querySelectorAll(".closeModal");
const modalContainers = document.querySelectorAll(".modalContainer");
const overlay = document.querySelector(".overlay");

cargarUsuarios();

modalContainers.forEach(modal => modal.classList.add("hidden"));
overlay.classList.add("hidden");

// Asignar eventos a los botones de abrir modal
async function assignOpenModalEvents() {
  openModalButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      // Muestra el primer modal y el overlay
      modalContainers[0].classList.remove("hidden");
      overlay.classList.remove("hidden");
    });
  });
}

// Asignar eventos a los botones de cerrar modal
function assignCloseModalEvents() {
  closeModalButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      closeModal();
    });
  });
}

function closeModal() {
  modalContainers.forEach(modal => modal.classList.add("hidden"));
  overlay.classList.add("hidden");
}

//buscador de ofertas
document.addEventListener("keyup", e => {
  if (e.target.matches("#buscador")) {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll(".cola").forEach(el => {
      const text = el.textContent || "";
      text.toLowerCase().includes(query)
        ? el.classList.remove("hidden")
        : el.classList.add("hidden");
    });
  }
});

// Seleccionar múltiples tags

tags.forEach(tag => {
  tag.addEventListener('click', () => {
    tag.classList.toggle('tag-active');

    const activeTags = Array.from(tags)
      .filter(t => t.classList.contains('tag-active'))
      .map(t => t.textContent.toLowerCase());

    cols.forEach(cola => cola.classList.remove('hidden'));

    if (activeTags.length > 0) {
      cols.forEach(cola => {
        const colText = (cola.textContent || "").toLowerCase();
        const shouldShow = activeTags.some(activeTag => colText.includes(activeTag));
        if (!shouldShow) {
          cola.classList.add('hidden');
        }
      });
    }
  });
});


//Submenu del perfil del usuario (imagen arriba a la izquierda)

userSubMenu.style.display = "none";

SubmenuPerfilBtn_isShowing = false;
function OpenPerfilSubMenu(){
    if (!SubmenuPerfilBtn_isShowing){
        userSubMenu.style.display="block";
    }
    else{
        userSubMenu.style.display="none";
    }
    SubmenuPerfilBtn_isShowing = !SubmenuPerfilBtn_isShowing;
};

window.addEventListener('scroll', function() {
  var headerHeight = document.querySelector('header').offsetHeight;
  var scrollTop = window.scrollY || document.documentElement.scrollTop;
  var modal = document.querySelector('.modal-body');
  // var newTop = headerHeight + 30 - scrollTop;
  var newTop =  headerHeight  + 430 - scrollTop;

  modal.style.top = newTop + 'px';
});

//mostras desarrolladores en el catalogo
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
      allCards = filteredData.map(item => {
        return {
          id: item.id,
          imgProfile: item.imgProfile,
          firstName: item.firstName,
          lastName: item.lastName,
          role: item.role,
          // Otros campos necesarios
        };
      });

      mostrarTarjetas(allCards); // Mostrar todas las tarjetas
      asignarEventosTags(); // Asignar eventos a los tags después de cargar los usuarios
    },
    error: function (xhr, status, error) {
      console.error("Error al cargar Usuarios:", error);
      $(".cards_container").html('<p>Error al cargar usuarios. Inténtelo de nuevo más tarde.</p>'); // Mensaje de error
    }
  });
}

function mostrarTarjetas(cards) {
  const cardsHtml = cards.map(item => `
    <div class='cola' data-role='${item.role.toLowerCase()}'>
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
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate quod repudiandae natus asperiores, eveniet autem officia. Vel, illum nostrum laborum molestiae, modi id vitae qui nesciunt magni in odit illo ea et. Ullam adipisci, consequuntur laborum dolorum nostrum voluptas inventore quae explicabo vero omnis necessitatibus quasi ut blanditiis labore cum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, temporibus. Repellat fugit vel esse, voluptatum doloribus ut aliquid quam dolorum.</p>
          </div>
          <div class='button b1'>
            <button class='about-me openModal' data-id='${item.id}'>Ver más</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
  $(".cards_container").html(cardsHtml);
  assignOpenModalEvents();
  assignCloseModalEvents();
}

function asignarEventosTags() {
  $(".tag").on("click", function() {
    $(this).toggleClass("tag-active");
    filtrarTarjetas();
  });
}

function filtrarTarjetas() {
  const activeTags = $(".tag.tag-active").map(function() {
    return $(this).text().trim().toLowerCase();
  }).get();

  const filteredCards = allCards.filter(card => {
    // Filtra las tarjetas basándose en los tags activos
    return activeTags.length === 0 || activeTags.includes(card.role.toLowerCase());
  });

  mostrarTarjetas(filteredCards); // Muestra las tarjetas filtradas
}

// Llamar a la función para cargar usuarios al cargar la página
$(document).ready(function() {
  cargarUsuarios();
});

  //Mostrar Modal
  $(document).on('click', '.openModal', function () {
    $(".overlay").show(); 
    $(".modal-container").show(); 
  });
  
  // Ocultar modal
  $(document).on('click', '.closeModal, .overlay', function () {
    $(".overlay").hide(); 
    $(".modal-container").hide(); 
  });
