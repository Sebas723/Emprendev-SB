const PersonalInformationBtn = document.getElementById("datos-personales-btn");
const DescriptionBtn = document.getElementById("descripcion-btn");
const TituloInfo = document.getElementById("tituloinfo");

const DescriptionInformation = document.getElementById("descripcion-informacion");
const DatosPeronales = document.getElementById("datos-personales");

const userSubMenu = document.getElementById("user-sub-menu");

const TasksContainer = document.getElementById("task-container");
const guardarFotosBtn = document.getElementById("guardar-fotos-btn");

const fileInput = document.getElementById("foto");
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
fileInput.addEventListener('change', function(event) {
    const img = event.target.files[0];
    if (img) {
        const reader = new FileReader();

        reader.onload = function (e) {
            UserImgPerfil.src = e.target.result;
        };
        reader.readAsDataURL(img);
        guardarFotosBtn.removeAttribute('hidden');
    } else {
        UserImgPerfil = DefaultFile;
        guardarFotosBtn.setAttribute('hidden', true);
    }
});


async function checkSessionStatus() {
    try {
        const data = await $.ajax({
            url: "http://localhost:8080/emprendev/v1/user/sessionStatus",
            type: "GET",
            xhrFields: {
                withCredentials: true,
            },
        });

        if (data.sessionActive) {
            const id = data.userId;

            // Solicitar datos adicionales de Dev
            const mipymeData = await $.ajax({
                url: `http://localhost:8080/api/mipymes/${id}`,
                type: "GET",
                xhrFields: {
                    withCredentials: true,
                },
            });

            // Verifica los datos que recibes
            console.log("Datos de Mipyme:", mipymeData);

            // Actualiza el DOM con los datos de Dev
            $(".nameBusiness").text(mipymeData.nameBusiness || "Puedes agregar el nombre de tu negocio en Perfil/Editar/Nombre del negocio");
            $(".cityBusiness").text(mipymeData.cityBusiness || "Puedes agregar la ubicacion de tu negocio en Perfil/Editar/Ciudad del negocio");
            $(".addressBusiness").text(mipymeData.addressBusiness || "Puedes agregar la direccion de tu negocio en Perfil/Editar/Direccion del negocio");
            $(".descriptionBusiness").text(mipymeData.descriptionBusiness || "Este es un mensaje predeterminado que se mostrará en tu perfil. Puedes personalizar este mensaje en cualquier momento desde la sección 'Perfil/Editar/Descripcion del negocio'. Si no realizas cambios, este mensaje continuará siendo visible para otros usuarios en tu perfil. Este es un mensaje predeterminado que se mostrará en tu perfil. Puedes personalizar este mensaje en cualquier momento desde la sección 'Perfil/Editar'. Si no realizas cambios, este mensaje continuará siendo visible para otros usuarios en tu perfil. Este es un mensaje predeterminado que se mostrará en tu perfil. Puedes personalizar este mensaje en cualquier momento desde la sección 'Perfil/Editar/Descripcion del negocio'. Si no realizas cambios, este mensaje continuará siendo visible para otros usuarios en tu perfil. Este es un mensaje predeterminado que se mostrará en tu perfil. Puedes personalizar este mensaje en cualquier momento desde la sección 'Perfil/Editar/Descripcion del negocio");

        } else {
            console.log("No active session:", data.message);
        }
    } catch (error) {
        console.error("Error checking session status:", error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo verificar el estado de la sesión o cargar los datos del mipyme.",
        });
    }
}

async function putImg() {
    try {
        // Obtener datos del usuario
        const data = await $.ajax({
            url: "http://localhost:8080/emprendev/v1/user/sessionStatus",
            type: "GET",
            xhrFields: {
                withCredentials: true,
            },
        });

        const fileInput = document.getElementById('foto');
        if (fileInput.files.length === 0) {
            alert('Por favor, selecciona una imagen.');
            return;
        }

        const formData = new FormData();
        formData.append('imgProfile', fileInput.files[0]);

        // Enviar la solicitud AJAX para actualizar la imagen
        const response = await $.ajax({
            url: 'http://localhost:8080/emprendev/v1/user/' + data.userId + '/imgProfile',
            type: 'PUT',
            data: formData,
            contentType: false,
            processData: false,
        });

        alert('Imagen actualizada con éxito.');
        // Aquí puedes actualizar la vista para reflejar el nuevo perfil
        // Por ejemplo, actualizar la imagen en el DOM o redirigir a la página del perfil
        window.location.href ="perfil_mipyme.html"

    } catch (error) {
        alert('Error al actualizar la imagen.');
        console.error('Error:', error);
    }
}

// Llama a la función para verificar el estado de la sesión
checkSessionStatus();