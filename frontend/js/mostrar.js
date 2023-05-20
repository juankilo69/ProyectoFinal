function getCurrentURL () {
    return window.location.href
}
const url = getCurrentURL()
//console.log(url)

let arr = url.split("/")
//console.log(arr)

let id = arr[5]
//console.log(id);

async function get(){
    await fetch(`http://localhost:3000/api/v1/ordenadores/${id}`)
    .then((res) => res.json())
    .then((data) =>{
        console.log(data);
        let ordenador = data
        document.body.innerHTML = `
        <header>
            <div>
                <h1>Editar Ordenador</h1> 
                <img src="/asstes/images/logo.png" alt="">
            </div>
            <nav>
                <a href="/index">Inicio</a>
                <a href="/index/contact">Contacto</a>
                <a id="crear" href="/index/crear">Crear nuevo ordenador</a>
                <a id="login" href="/index/login">Login</a>
                <a id="logout" href="/index/logout">Logout</a>
                <a id="logout" href="/index/admin">Panel Admin</a>
            </nav>   
        </header>

        <main>
            <div>
                <h1>${ordenador.nombre}</h1>
                <div id="desc">
                    <img src="${ordenador.img}" />
                    <p><b>Caracteristicas: </b>${ordenador.caracteristicas}</p>
                    <h2>Precio: ${ordenador.precio} €</h2>
                </div>
                <form action="/index">
                    <button type="submit" id="actualizar"><a href="/index/editar/${id}">Actualizar</a></button>
                    <button type="submit" id="eliminar">Eliminar</button>
                </form>
            </div>
        </main>

        <footer>
            <div>
                <div>
                    <img src="/asstes/images/logo.png" alt="">
                </div>
                <div>
                    <p>Todos los derechos reservados</p>
                <a href="/index/contact"><p>Contacta con nosotros</p></a>
                </div>
                <div id="social">
                    <img src="/asstes/images/insta.png"" alt="">
                    <img src="/asstes/images/face.png"" alt="">
                </div>
            </div>
        </footer>
        
        `
    })
}

async function post(){
    const nombre = document.getElementById("nombre").value
    let precio = document.getElementById("precio").value
    precio = parseFloat(precio)
    
    console.log(nombre)
    console.log(precio)
    const data = {
        nombre:nombre,
        precio:precio
    }
    await fetch("http://localhost:3000/api/v1/ordenadores/"+id,{
        method: "PUT",
        body: JSON.stringify(data),
        headers:{
            Accept:"application/json","Content-Type":"application/json"
        }
    })
    .then(res =>{ res.json()
        console.log(res)}
    )
    .then(response => console.log('Success:', response))
    .catch(error => console.error('Error:', error))
}

async function delete1(){

    await fetch(`http://localhost:3000/api/v1/ordenadores/${id}`,{
        method: "DELETE",
        headers:{
            Accept:"application/json","Content-Type":"application/json"
        }
    })
    .then(res =>{ res.json()
        alert("Ordenador eliminado correctamente")
        console.log(res)
    })
    .then(response => console.log('Success:', response))
    .catch(error => console.error('Error:', error))
}

async function init(){
    await get()
    console.log(document.querySelector("button"))
    document.getElementById("eliminar").addEventListener("click",delete1)
}

init()