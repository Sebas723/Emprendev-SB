// document.addEventListener("DOMContentLoaded", function () {
//     // Llamada a la función para cargar la información
//     cargarInformacion();
// });

// async function cargarInformacion() {
//     try {
//         const response = await fetch("http://localhost:8080/emprendev/v1/user/listOrderAccount", {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             credentials: "include" // Asegúrate de que las credenciales se envíen
//         });

//         if (!response.ok) {
//             throw new Error("Network response was not ok");
//         }

//         const data = await response.json();

//         // Recorre los datos y actualiza el DOM
//         data.forEach(item => {
//             if (item.accountState == 1 && item.role == "dev") {
//                 // Actualizar los elementos con las clases correspondientes
//                 updateElements(".primer-nombre", item.firstName);
//                 updateElements(".segundo-nombre", item.secondName);
//                 updateElements(".primer-apellido", item.lastName);
//                 updateElements(".segundo-apellido", item.lastName2);
//                 updateElements(".tipo-documento", item.docType);
//                 updateElements(".numero-documento", item.docNum);
//                 updateElements(".fecha-nacimiento", formatDate(new Date(item.birthDate)));
//                 updateElements(".rol", item.role);
//                 updateElements(".telefono", item.phoneNum);
//                 updateElements(".direccion", item.address);
//                 updateElements(".correo", item.email);
//                 updateElements(".nombre-negocio", item.businessName);
//                 updateElements(".direccion-negocio", item.businessAddress);
//                 updateElements(".ubicacion-negocio", item.businessLocation);
//                 updateElements(".descripcion-negocio", item.businessDescription || "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus iure omnis a praesentium laboriosam assumenda. Cum velit libero laudantium aliquam, impedit illum ratione quaerat alias magni dolores, sit maiores voluptatem error vero. Dolores non, minima impedit consequatur voluptas quia quod odio rem, expedita accusantium, corporis excepturi modi cumque cum. Aperiam quos ducimus eius laudantium fuga illo nulla! Dicta culpa non laboriosam laborum ipsum, aspernatur veritatis quae, alias modi consequatur eveniet dolor, exercitationem voluptatem error dolorem rem placeat perspiciatis assumenda! Mollitia, ipsum. Ratione ipsam enim, quod dolores consectetur optio minus consequatur unde aperiam deserunt incidunt aliquam, magnam sequi natus consequuntur quia?");
//             }
//         });
//     } catch (error) {
//         console.error("Error al cargar la información:", error);
//     }
// }

// Función para actualizar elementos con una clase dada
function updateElements(selector, value) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
        el.textContent = value || 'No disponible';
    });
}

// Función para formatear la fecha
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
}




const PersonalInformationBtn = document.getElementById("datos-personales-btn");
const DescriptionBtn = document.getElementById("descripcion-btn");
const TituloInfo = document.getElementById("tituloinfo");

const DescriptionInformation = document.getElementById("descripcion-informacion");
const DatosPeronales = document.getElementById("datos-personales");

const userSubMenu = document.getElementById("user-sub-menu");

const TasksContainer = document.getElementById("task-container");

const File = document.getElementById("foto");
const DefaultFile = "img/Gato1.jpg";
const UserImgPerfil = document.getElementById("user-img-perfil");


function ButtonDataSelected(){
    PersonalInformationBtn.style.display="";
    PersonalInformationBtn.style.backgroundColor="gray";
    PersonalInformationBtn.style.transitionDuration="0.5s";
    PersonalInformationBtn.style.color="white";  
    TituloInfo.textContent="Informacion General";

    DescriptionBtn.style.display="";
    DescriptionBtn.style.backgroundColor="white";
    DescriptionBtn.style.color="black";

    DescriptionInformation.style.display="none";
    DatosPeronales.style.display="block";
}

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



//Desde aqui incia el script del cambio de foto de perfil del usuario
File.addEventListener('change', e => {
    if(e.target.files[0]){
        const reader = new FileReader();
        reader.onload = function(e){
        UserImgPerfil.src=e.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
    }else{
        UserImgPerfil = DefaultFile;
    }
});

