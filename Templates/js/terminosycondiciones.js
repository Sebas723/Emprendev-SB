const AcuerdosBtn = document.getElementById("acuerdos-btn");
const DefinicionesBtn = document.getElementById("definiciones-btn");
const InformacionContactoBtn = document.getElementById("informacion-btn");
const DescripcionProductoBtn = document.getElementById("descripcion-producto-btn");
const ManejoDatosBtn = document.getElementById("manejo-de-datos-btn");
const PoliticasPrivacidadBtn = document.getElementById("politicas-privacidad-btn");
const CondicionesUsoBtn = document.getElementById("condiciones-uso-btn");
const PropiedadIntelectualBtn = document.getElementById("propiedad-intelectual-btn");
const TarifasPagosBtn = document.getElementById("tarifas-pagos-btn");
const LimitResponsabilidadBtn = document.getElementById("limitaciones-responsabilidad-btn");
const MarcasComercialesBtn = document.getElementById("marcas-comerciales-btn");
const DerechosComercialesBtn = document.getElementById("derechos-autor-btn");

const TituloTerm = document.getElementById("titulo-term");

const Acuerdos = document.getElementById("acuerdos");
const Definiciones = document.getElementById("definiciones");
const InformacionContacto = document.getElementById("informacion-contacto");
const DescripcionProducto = document.getElementById("descripcion-producto");
const ManejoDatos = document.getElementById("manejo-de-datos");
const PoliticasPrivacidad = document.getElementById("politicas-privacidad");
const CondicionesUso = document.getElementById("condiciones-uso");
const PropiedadIntelectual = document.getElementById("propiedad-intelectual");
const TarifasPagos = document.getElementById("tarifas-pagos");
const LimitResponsabilidad = document.getElementById("limitaciones-responsabilidad");
const MarcasComerciales = document.getElementById("marcas-comerciales");
const DerechosComerciales = document.getElementById("derechos-autor");

const botones = document.querySelectorAll('.perfil-btn');

AcuerdosBtn.classList.add("selected");


botones.forEach((boton) => {
    boton.addEventListener('click', () => {
    botones.forEach((btn) => {
        btn.classList.remove('selected');
    });
    boton.classList.add('selected');
    });
});

function AcuerdosSelected(){
    TituloTerm.textContent="Acuerdos";

    Acuerdos.classList.remove("hidden");
    Definiciones.classList.add("hidden");
    InformacionContacto.classList.add("hidden");
    DescripcionProducto.classList.add("hidden");
    ManejoDatos.classList.add("hidden");
    PoliticasPrivacidad.classList.add("hidden");
    CondicionesUso.classList.add("hidden");
    PropiedadIntelectual.classList.add("hidden");
    TarifasPagos.classList.add("hidden");
    LimitResponsabilidad.classList.add("hidden");
    MarcasComerciales.classList.add("hidden");
    DerechosComerciales.classList.add("hidden");
}

function DefinicionesSelected(){
    TituloTerm.textContent="Definiciones";

    Acuerdos.classList.add("hidden");
    Definiciones.classList.remove("hidden");
    InformacionContacto.classList.add("hidden");
    DescripcionProducto.classList.add("hidden");
    ManejoDatos.classList.add("hidden");
    PoliticasPrivacidad.classList.add("hidden");
    CondicionesUso.classList.add("hidden");
    PropiedadIntelectual.classList.add("hidden");
    TarifasPagos.classList.add("hidden");
    LimitResponsabilidad.classList.add("hidden");
    MarcasComerciales.classList.add("hidden");
    DerechosComerciales.classList.add("hidden");
}

function InformacionSelected(){
    TituloTerm.textContent="Informacion de Contacto";

    Acuerdos.classList.add("hidden");
    Definiciones.classList.add("hidden");
    InformacionContacto.classList.remove("hidden");
    DescripcionProducto.classList.add("hidden");
    ManejoDatos.classList.add("hidden");
    PoliticasPrivacidad.classList.add("hidden");
    CondicionesUso.classList.add("hidden");
    PropiedadIntelectual.classList.add("hidden");
    TarifasPagos.classList.add("hidden");
    LimitResponsabilidad.classList.add("hidden");
    MarcasComerciales.classList.add("hidden");
    DerechosComerciales.classList.add("hidden");
}

function DescripcionProductoSelected(){
    TituloTerm.textContent="Descripcion del Producto";

    Acuerdos.classList.add("hidden");
    Definiciones.classList.add("hidden");
    InformacionContacto.classList.add("hidden");
    DescripcionProducto.classList.remove("hidden");
    ManejoDatos.classList.add("hidden");
    PoliticasPrivacidad.classList.add("hidden");
    CondicionesUso.classList.add("hidden");
    PropiedadIntelectual.classList.add("hidden");
    TarifasPagos.classList.add("hidden");
    LimitResponsabilidad.classList.add("hidden");
    MarcasComerciales.classList.add("hidden");
    DerechosComerciales.classList.add("hidden");
}

function ManejoDatosSelected(){
    TituloTerm.textContent="Manejo de Datos Personales";

    Acuerdos.classList.add("hidden");
    Definiciones.classList.add("hidden");
    InformacionContacto.classList.add("hidden");
    DescripcionProducto.classList.add("hidden");
    ManejoDatos.classList.remove("hidden");
    PoliticasPrivacidad.classList.add("hidden");
    CondicionesUso.classList.add("hidden");
    PropiedadIntelectual.classList.add("hidden");
    TarifasPagos.classList.add("hidden");
    LimitResponsabilidad.classList.add("hidden");
    MarcasComerciales.classList.add("hidden");
    DerechosComerciales.classList.add("hidden");
}

function PoliticasPrivacidadSelected(){
    TituloTerm.textContent="Politicas de Privacidad";

    Acuerdos.classList.add("hidden");
    Definiciones.classList.add("hidden");
    InformacionContacto.classList.add("hidden");
    DescripcionProducto.classList.add("hidden");
    ManejoDatos.classList.add("hidden");
    PoliticasPrivacidad.classList.remove("hidden");
    CondicionesUso.classList.add("hidden");
    PropiedadIntelectual.classList.add("hidden");
    TarifasPagos.classList.add("hidden");
    LimitResponsabilidad.classList.add("hidden");
    MarcasComerciales.classList.add("hidden");
    DerechosComerciales.classList.add("hidden");
}

function CondicionesUsoSelected(){
    TituloTerm.textContent="Condiciones de Uso";

    Acuerdos.classList.add("hidden");
    Definiciones.classList.add("hidden");
    InformacionContacto.classList.add("hidden");
    DescripcionProducto.classList.add("hidden");
    ManejoDatos.classList.add("hidden");
    PoliticasPrivacidad.classList.add("hidden");
    CondicionesUso.classList.remove("hidden");
    PropiedadIntelectual.classList.add("hidden");
    TarifasPagos.classList.add("hidden");
    LimitResponsabilidad.classList.add("hidden");
    MarcasComerciales.classList.add("hidden");
    DerechosComerciales.classList.add("hidden");
}

function PropiedadIntelectualSelected(){
    TituloTerm.textContent="Propiedad Intelectual";

    Acuerdos.classList.add("hidden");
    Definiciones.classList.add("hidden");
    InformacionContacto.classList.add("hidden");
    DescripcionProducto.classList.add("hidden");
    ManejoDatos.classList.add("hidden");
    PoliticasPrivacidad.classList.add("hidden");
    CondicionesUso.classList.add("hidden");
    PropiedadIntelectual.classList.remove("hidden");
    TarifasPagos.classList.add("hidden");
    LimitResponsabilidad.classList.add("hidden");
    MarcasComerciales.classList.add("hidden");
    DerechosComerciales.classList.add("hidden");
}

function TarifasPagosSelected(){
    TituloTerm.textContent="Tarifas y Pagos";

    Acuerdos.classList.add("hidden");
    Definiciones.classList.add("hidden");
    InformacionContacto.classList.add("hidden");
    DescripcionProducto.classList.add("hidden");
    ManejoDatos.classList.add("hidden");
    PoliticasPrivacidad.classList.add("hidden");
    CondicionesUso.classList.add("hidden");
    PropiedadIntelectual.classList.add("hidden");
    TarifasPagos.classList.remove("hidden");
    LimitResponsabilidad.classList.add("hidden");
    MarcasComerciales.classList.add("hidden");
    DerechosComerciales.classList.add("hidden");
}

function LimitResponsabilidadSelected(){
    TituloTerm.textContent="Limitaciones de Responsabilidad";

    Acuerdos.classList.add("hidden");
    Definiciones.classList.add("hidden");
    InformacionContacto.classList.add("hidden");
    DescripcionProducto.classList.add("hidden");
    ManejoDatos.classList.add("hidden");
    PoliticasPrivacidad.classList.add("hidden");
    CondicionesUso.classList.add("hidden");
    PropiedadIntelectual.classList.add("hidden");
    TarifasPagos.classList.add("hidden");
    LimitResponsabilidad.classList.remove("hidden");
    MarcasComerciales.classList.add("hidden");
    DerechosComerciales.classList.add("hidden");
}

function MarcasComercialesSelected(){
    TituloTerm.textContent="Marcas Comerciales";

    Acuerdos.classList.add("hidden");
    Definiciones.classList.add("hidden");
    InformacionContacto.classList.add("hidden");
    DescripcionProducto.classList.add("hidden");
    ManejoDatos.classList.add("hidden");
    PoliticasPrivacidad.classList.add("hidden");
    CondicionesUso.classList.add("hidden");
    PropiedadIntelectual.classList.add("hidden");
    TarifasPagos.classList.add("hidden");
    LimitResponsabilidad.classList.add("hidden");
    MarcasComerciales.classList.remove("hidden");
    DerechosComerciales.classList.add("hidden");
}

function DerechosAutorSelected(){
    TituloTerm.textContent="Derechos de Autor";

    Acuerdos.classList.add("hidden");
    Definiciones.classList.add("hidden");
    InformacionContacto.classList.add("hidden");
    DescripcionProducto.classList.add("hidden");
    ManejoDatos.classList.add("hidden");
    PoliticasPrivacidad.classList.add("hidden");
    CondicionesUso.classList.add("hidden");
    PropiedadIntelectual.classList.add("hidden");
    TarifasPagos.classList.add("hidden");
    LimitResponsabilidad.classList.add("hidden");
    MarcasComerciales.classList.add("hidden");
    DerechosComerciales.classList.remove("hidden");
}
