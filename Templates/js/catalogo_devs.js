const userSubMenu = document.getElementById("user-sub-menu");
const tag = document.querySelectorAll(".tag");
const tags = document.querySelectorAll('.tag');
const cols = document.querySelectorAll('.cola');

const openModalButton = document.getElementById("openModal");
const closeModalButton = document.getElementById("closeModal");
const modalContainer = document.getElementById("modalContainer");
const overlay = document.getElementById("overlay");

modalContainer.classList.add("hiden");
  openModalButton.addEventListener("click", (e) => {
    e.preventDefault();
    modalContainer.style.display = "block";
    overlay.style.display = "block";
  });

  closeModalButton.addEventListener("click", (e) => {
    e.preventDefault();
    modalContainer.style.display = "none";
    overlay.style.display = "none";
  });

  function closeModal() {
    modalContainer.style.display = "none";
    overlay.style.display = "none";
  }

//buscador de ofertas
document.addEventListener("keyup", e => {
  if (e.target.matches("#buscador")) {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll(".cola").forEach(el => {
      const text = el.textContent || "";
      text.toLowerCase().includes(query)
        ? el.classList.remove("hiden")
        : el.classList.add("hiden");
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

    cols.forEach(cola => cola.classList.remove('hiden'));

    if (activeTags.length > 0) {
      cols.forEach(cola => {
        const colText = (cola.textContent || "").toLowerCase();
        const shouldShow = activeTags.some(activeTag => colText.includes(activeTag));
        if (!shouldShow) {
          cola.classList.add('hiden');
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
  var newTop =  headerHeight  + 60 - scrollTop;

  modal.style.top = newTop + 'px';
});
