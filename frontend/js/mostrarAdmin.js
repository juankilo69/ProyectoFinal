function getCurrentURL () {
    return window.location.href
}
const url = getCurrentURL()
//console.log(url)

let arr = url.split("/")
//console.log(arr)

let ruta = arr[7]
let id = arr[8]
//console.log(ruta + id);

async function get(){
    if(ruta == "ordenadores"){
        await fetch(`http://localhost:3000/api/v1/ordenadores/${id}`)
        .then((res) => res.json())
        .then((data) =>{
            //console.log(data);
            let ordenador = data
            document.body.innerHTML = `
            <main>
            <a href="/index/admin/panelAdmin">Volver al panel admin</a>
                <div>
                    <h1>${ordenador.nombre}</h1>
                    <div id="desc">
                        <img src="${ordenador.img}" />
                        <p><b>Caracteristicas: </b>${ordenador.caracteristicas}</p>
                        <h2>Precio: ${ordenador.precio} €</h2>
                    </div>
                    <form action="/index/admin/panelAdmin">
                        <button type="submit" id="actualizar"><a href="/index/admin/panelAdmin/${ruta}/editar/${id}">Actualizar</a></button>
                        <button type="submit" id="eliminar">Eliminar</button>
                    </form>
                </div>
            
            `
        })
    }else if(ruta == "usuarios"){
        await fetch(`http://localhost:3000/api/v1/usuarios/${id}`)
        .then((res) => res.json())
        .then((data) =>{
            //console.log(data);
            let usuario = data
            document.body.innerHTML = `
            <main>
            <a href="/index/admin/panelAdmin">Volver al panel admin</a>
                <div>
                    <div id="desc">
                        <h1>${usuario.username}</h1>
                        <h2 id="pass">Contraseña: ${usuario.pass} </h2>
                    </div>
                    <form action="/index/admin/panelAdmin">
                        <button type="submit" id="actualizar"><a href="/index/admin/panelAdmin/${ruta}/editar/${id}">Actualizar</a></button>
                        <button type="submit" id="eliminar">Eliminar</button>
                    </form>
                </div>
            
            `
        })
    }
}

async function delete1(){
    if(ruta == "ordenadores"){
        await fetch(`http://localhost:3000/api/v1/ordenadores/${id}`,{
            method: "DELETE",
            headers:{
                Accept:"application/json","Content-Type":"application/json"
            }
        })
        .then(res =>{ 
            alert("Ordenador eliminado correctamente")
            res.json()
            console.log(res)
        })
        .then(response => console.log('Success:', response))
        .catch(error => console.error('Error:', error))
    }else if(ruta == "usuarios"){
        await fetch(`http://localhost:3000/api/v1/usuarios/${id}`,{
            method: "DELETE",
            headers:{
                Accept:"application/json","Content-Type":"application/json"
            }
        })
        .then(res =>{ 
            alert("Usuario eliminado correctamente")
            res.json()
            console.log(res)
        })
        .then(response => console.log('Success:', response))
        .catch(error => console.error('Error:', error))
    }
}

async function init(){
    await get()
    document.getElementById("eliminar").addEventListener("click",delete1)
}

init()
