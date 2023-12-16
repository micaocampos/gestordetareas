const perfil_fecha = document.getElementById('perfil_fecha');
// Variable para mantener un contador de identificadores únicos
let idContador = 1;

//creacion de fecha actualizada
const FECHA = new Date();
perfil_fecha.innerHTML = FECHA.toLocaleDateString('es-PY', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
const agregar = document.getElementById('agregar');

agregar.addEventListener('click', (event) => {
    event.preventDefault();//evita que se recargue la pagina
    const tarea = document.getElementById('input_tarea').value;
    const fecha = document.getElementById('input_date').value;
    const prioridad = document.getElementById('input_prioridad').value;
    const ACCESS_TOKEN =
  "ya29.a0AfB_byBwAlI4MMr4cwvHM0CxKBQFv4lv_95E5DblDPTBtEthdLFWfgfBrmrI3udQw7OdpTWai7rzZ0-4sphESaXDCSIvw5Kp7d-Z77X5urrOH3ydedE9kYgxkuL0j84p_b1O0cZryMcqRbAFoDF3rtOJmDyHU3UT2UDxaCgYKAQASARISFQHGX2MiP_GN1vtTI36TbgXDNdrSMQ0171";
 
    const SHEET_ID = '1ikIjZek9Muoj1Ft-K7McwDRhyt5d8Skx0mWktkjkF-o';


    // Validar que el campo de tarea no esté vacío
    if (!tarea) {
        alert('Debes agregar una tarea.');
        return;
    }

    //se crea el JSON que espera la API de Google Sheets
    let data = {};
    let values = [];
    let fila = [tarea, fecha, prioridad];

    values.push(fila);
    //Verificar que coincida con el nombre de la hoja
    data.range = "hojaTareas";
    data.majorDimension = "ROWS";
    data.values = values;

    fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/hojaTareas:append?valueInputOption=USER_ENTERED`,
        {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
          body: JSON.stringify(data)
        }
      ).then(function (response) {
        response.json().then(function (data) {
      
        });
      });

    // Crear un nuevo elemento para mostrar la tarea
    const nuevoElemento = document.createElement('div');
    const tareaId = `tarea${idContador++}`;//crea un id unico
    nuevoElemento.id = tareaId;//asigna el id al nuevo elemento
    nuevoElemento.className = 'alert alert-info'; // Bootstrap alerta azul por defecto
    nuevoElemento.innerHTML = `
      <strong>Tarea:</strong> ${tarea} <br>
        <strong>Fecha Limite:</strong> ${fecha ? fecha : 'Sin fecha limite'} <br>
        <strong>Prioridad:</strong> ${prioridad === 'Urgente' ? `${prioridad} <img class= "img_prioridad" src= img/urgente.png alt="Urgente">` : ''}
                                    ${prioridad === 'Importante' ? `${prioridad} <img class= "img_prioridad" src= img/importante.png alt="Importante"> ` : ''}
                                    ${prioridad === 'Normal' ? `${prioridad} <img class= "img_prioridad" src= img/normal.png alt="Normal"> ` : ''} <br>
                                    <i id="button_eliminar" class="fas fa-trash de" onclick="eliminarTarea('${tareaId}')"></i>

        `;

    // Agregar el nuevo elemento al contenedor_resultado
    const contenedorResultado = document.getElementById('contenedor_resultado');
    contenedorResultado.appendChild(nuevoElemento);
    limpiarFormulario();
    console.log(tarea, fecha, prioridad);
});


function limpiarFormulario() {
    document.getElementById('input_tarea').value = '';
    document.getElementById('input_date').value = '';
    document.getElementById('input_prioridad').value = '--Seleccione la prioridad--';
}

function eliminarTarea(idTarea){
    const tareaEliminar = document.getElementById(idTarea);
    tareaEliminar.parentNode.removeChild(tareaEliminar);//elimina el nodo
}

