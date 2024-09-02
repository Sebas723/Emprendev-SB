// // auth.js

// document.addEventListener('DOMContentLoaded', function() {
//     // Obtener el rol del usuario desde localStorage
//     const userRole = localStorage.getItem('userRole');

//     // Redirigir según el rol del usuario
//     if (userRole === 'MIPYME') {
//         window.location.href = '/perfil_mipyme.html';
//     } else if (userRole === 'DEV') {
//         window.location.href = '/perfil_dev.html'; // Asumiendo que tienes un perfil para DEV
//     } else {
//         window.location.href = '/login.html'; // Redirige a la página de login si no tiene rol o no está autenticado
//     }
// });

// // auth.js

// document.addEventListener('DOMContentLoaded', function() {
//     fetch('/api/getUserRole') // Asegúrate de que esta ruta sea la correcta para tu API
//         .then(response => response.json())
//         .then(data => {
//             const userRole = data.role; // Ajusta según cómo se devuelve el rol en la respuesta de la API

//             // Redirigir según el rol del usuario
//             if (userRole === 'MIPYME') {
//                 window.location.href = '/catalogo_devs.html';
//             } else if (userRole === 'DEV') {
//                 window.location.href = '/perfil_dev.html'; // Asumiendo que tienes un perfil para DEV
//             } else {
//                 window.location.href = '/catalogo.html'; // Redirige a la página de login si no tiene rol o no está autenticado
//             }
//         })
//         .catch(error => {
//             console.error('Error fetching user role:', error);
//             window.location.href = '/login.html'; // Redirige a la página de login en caso de error
//         });
// });

// $(document).ready(function () {
//     function cargarUsuarios() {
//       $.ajax({
//         type: "GET",
//         url: "http://localhost:8080/emprendev/v1/user/listOrderAccount",
//         dataType: "json",
//         xhrFields: {
//           withCredentials: true,
//         },
//         success: function (data) {
//           $("#tabla > tbody").empty();
//           data.forEach((item) => {
//             const fullName = `${item.firstName} ${item.secondName}`;
//             const fullLastName = `${item.lastName} ${item.lastName2}`;
//             const accountStateText =
//               item.accountState === 1 ? "Activo" : "Desactivado";
//             const stateClass =
//               item.accountState === 1 ? "" : 'class="deactivated_user"';
  
//             // Obtener los milisegundos de la fecha desde los datos
//             const birthDateMillis = item.birthDate;
  
//             // Creamos un objeto Date a partir de los milisegundos.
//             const birthDate = new Date(birthDateMillis);
  
//             // Extraemos el día, el mes y el año.
//             const day = String(birthDate.getDate()).padStart(2, "0");
//             const month = String(birthDate.getMonth() + 1).padStart(2, "0"); // Los meses empiezan en 0, por eso se suma 1
//             const year = birthDate.getFullYear();
  
//             // Formateamos la fecha en YYYY-MM-DD para el input de tipo date
//             const formattedDate = `${year}-${month}-${day}`;
  
//             const row = `
//                           <tr ${stateClass}>
//                               <td>${item.docNum}</td>
//                               <td>${item.role}</td>
//                               <td>${fullName}</td>
//                               <td>${fullLastName}</td>
//                               <td>${formattedDate}</td>
//                               <td>${item.phoneNum}</td>
//                               <td>${item.address}</td>
//                               <td>${item.email}</td>
//                               <td>${accountStateText}</td>
//                               <td>${item.creationDate}</td>
//                               <td>
//                                   <img id='user_icon' class='user_img' src='${
//                                     item.imgProfile
//                                 }' alt='Imagen de perfil' width='40' height='40'>
//                               </td>
//                               <td>
//                                   <button id ="idbtn" class='btn btn-primary btn-sm editarUser' 
//                                   data-id='${item.id}'>Editar</button>
//                                   <button class='btn btn-${
//                                     item.accountState === 1 ? "danger" : "success"
//                                 } btn-sm ${item.accountState === 1 ? "desactivarUser" : "reactivarUser"}' 
//                                 data-id='${item.id}'>
//                                       ${item.accountState === 1 ? "Desactivar" : "Reactivar"}
//                                   </button>
//                               </td>
//                           </tr>
//                       `;
//             $("#tabla > tbody").append(row);
//           });
//         },
//         error: function (xhr, status, error) {
//           console.error("Error al cargar Usuarios:", error);
//         },
//       });
//     }
  
//     $(document).on("click", ".desactivarUser, .reactivarUser", function () {
//       const id = $(this).data("id"); // Extraer el id del botón clicado
//       const isDeactivating = $(this).hasClass("desactivarUser"); // Verificar si la clase es desactivarUser
//       const accountState = isDeactivating ? 0 : 1;
  
//       if (confirm(`¿Desea ${isDeactivating ? "desactivar" : "reactivar"} este usuario?`)) {
//         $.ajax({
//           type: "PUT",
//           url: `http://localhost:8080/emprendev/v1/user/${id}`,
//           contentType: "application/json",
//           data: JSON.stringify({ accountState }),
//           xhrFields: {
//             withCredentials: true,
//           },
//           success: function () {
//             cargarUsuarios();
//           },
//           error: function (xhr, status, error) {
//             console.error(`Error al ${isDeactivating ? "desactivar" : "reactivar"} Usuario:`, error);
//           },
//         });
//       }
//     });
  
//     cargarUsuarios(); // Llamada inicial para cargar los usuarios
//   });
  
