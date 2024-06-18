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

