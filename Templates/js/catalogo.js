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
function assignOpenModalEvents() {
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


//Scroll Ventana modal
window.addEventListener('scroll', function() {
  var headerHeight = document.querySelector('header').offsetHeight;
  var scrollTop = window.scrollY || document.documentElement.scrollTop;
  var modal = document.querySelector('.modal-body');
  // var newTop = headerHeight + 30 - scrollTop;
  var newTop =  headerHeight  + 750 - scrollTop;

  modal.style.top = newTop + 'px';
});

//mostras desarrolladores en el catalogo
function cargarUsuarios() {
  assignOpenModalEvents();
  assignCloseModalEvents();
}

assignOpenModalEvents();
assignCloseModalEvents();