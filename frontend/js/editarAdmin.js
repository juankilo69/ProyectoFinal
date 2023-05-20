function getCurrentURL () {
    return window.location.href
}
const url = getCurrentURL()
console.log(url)

let arr = url.split("/")
console.log(arr)

let ruta = arr[6]
let id = arr[8]
console.log(ruta + id);

function init(){
    if(ruta == "ordenadores"){
        document.body.innerHTML = `
            <main>
                <a href="/index/admin/panelAdmin">Volver al panel admin</a>
                <h1>Editar ordenador</h1>
                <form id="formulario" action="/index/admin/panelAdmin">
                    <label for="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" required>

                    <label for="precio">Precio:</label>
                    <input type="number" id="precio" name="precio" required>

                    <label for="caracteristicas">Caracteristicas:</label>
                    <input type="text" id="caracteristicas" name="caracteristicas" required>

                    <button type="submit" id="actualizar">Actualizar</button>
                </form>
            </main>
        `
    }else if(ruta == "usuarios"){
        document.body.innerHTML = `
            <a href="/index/admin/panelAdmin">Volver al panel admin</a>
            <h1>Solo puedes cambiar la contraseña del usuario ${id}</h1>
            <form id="formulario" action="/index/admin/panelAdmin">
                <label for="nombre">Contraseña:</label>
                <input type="password" id="pass" name="pass" required>
                <button type="submit" id="actualizar">Actualizar</button>
            </form>
    `
    }
}

async function post(){
    if(ruta == "ordenadores"){
        let nombre = document.getElementById("nombre").value
        let precio = document.getElementById("precio").value
        precio = parseFloat(precio)
        let caracteristicas = document.getElementById("caracteristicas").value
      
        console.log(nombre)
        console.log(nombre)
        console.log(precio)
        const data = {
            id:id,
            nombre:nombre,
            precio:precio,
            caracteristicas:caracteristicas
        }
        await fetch("http://localhost:3000/api/v1/ordenadores/"+id,{
            method: "PUT",
            body: JSON.stringify(data),
            headers:{
                Accept:"application/json","Content-Type":"application/json"
            }
        })
        .then(res =>{   
            alert("Ordenador actualizado correctamente")
            res.json()
            console.log(res)}
        )
        .then(response => console.log('Success:', response))
        .catch(error => console.error('Error:', error))

    }else if(ruta == "usuarios"){
        let pass = document.getElementById("pass").value
      
        console.log(pass)
        const data = {
            username:id,
            pass:pass,
            
        }
        await fetch("http://localhost:3000/api/v1/usuarios/"+id,{
            method: "PUT",
            body: JSON.stringify(data),
            headers:{
                Accept:"application/json","Content-Type":"application/json"
            }
        })
        .then(res =>{   
            alert("Usuario actualizado correctamente")
            res.json()
            console.log(res)}
        )
        .then(response => console.log('Success:', response))
        .catch(error => console.error('Error:', error))
    }
}
  
init()
let actualizar = document.getElementById("actualizar")
actualizar.addEventListener('click', post)
