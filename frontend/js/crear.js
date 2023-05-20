async function post(){
    let nombre = document.getElementById("nombre").value
    let precio = document.getElementById("precio").value
    precio = parseFloat(precio)
    let caracteristicas = document.getElementById("caracteristicas").value
    let img = document.getElementById("img").value
  
    console.log(nombre)
    console.log(precio)
    const data = {
        nombre:nombre,
        precio:precio,
        caracteristicas:caracteristicas,
        img:img
    }
    await fetch("http://localhost:3000/api/v1/ordenadores",{
        method: "POST",
        body: JSON.stringify(data),
        headers:{
            Accept:"application/json","Content-Type":"application/json"
        }
    })
    .then(res =>{   
        alert("Ordenador creado correctamente")
        res.json()
        console.log(res)}
    )
    .then(response => console.log('Success:', response))
    .catch(error => console.error('Error:', error))
}
  
document.getElementById("crear").addEventListener("click",post)