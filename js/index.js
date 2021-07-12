//Función Asincrona para consultar la API

//Opcion 1: HTTPRequest
//---------------------
const API_URL = "https://jsonplaceholder.typicode.com";
const xhr = new XMLHttpRequest();
function onRequestJHandler(){
    //Chequeamos la peticion
    // 0 - Unset, no se ha llamado al método Open 
    // 1 - Opened, se ha llamado al método Open 
    // 2 - Header_received, se esta llamadno al metodo send()
    // 3 - Loading, esta cargando, es decir, esta recibiendo la respuesta
    // 4 - Done, se ha completado la operacion
    if (this.readyState === 4 && this.status === 200){
        //console.log(this.response);
        const data = JSON.parse(this.response);
        //console.log(data);
        
        //Creamos una variable con el contenido de todos los usuarios recorridos con map
        const tpl = data.map((user) => `<li>${user.name} - ${user.email}</li>`);
        //Mostramos los datos en el div 'mensaje'
        const HTMLResponse = document.querySelector('#mensaje1');
        HTMLResponse.innerHTML = `<ul>${tpl}</ul>`;
    }
}
xhr.addEventListener("load", onRequestJHandler);
xhr.open('GET', `${API_URL}/users`);
xhr.send();

//Opcion 2: Fetch
//----------------

const HTMLResponse2 = document.querySelector('#mensaje2');
fetch(`${API_URL}/users`)
    .then((response) => response.json())
    .then((users) => {
        const tpl = users.map((user) => `<li>${user.name} - ${user.email}</li>`);
        HTMLResponse2.innerHTML = `<ul>${tpl}</ul>`;
    });



//Opcion 3: Fetch con Funciones
//-----------------------------

const HTMLResponse3 = document.querySelector('#mensaje3');

async function ConsultarApi(){
    const $respuesta = await fetch("https://jsonplaceholder.typicode.com/users");
    //if ( !$respuesta.OK ){
    //    let $error = "404 - no encontre resultados.";
    //    alert($error);
    //    throw new Error($error);
    //}
    const $nombre = $respuesta.json();
    return $nombre;
}

function MostrarDatos(d){
    //console.log(d);
    const tpl = d.map((user) => `<li>${user.name} - ${user.email}</li>`);
    HTMLResponse3.innerHTML = `<ul>${tpl}</ul>`;
}
//Cuando se ejecuta la función "ConsultarApi" ejecutaremos la Función "MostrarDatos"
ConsultarApi().then(MostrarDatos);