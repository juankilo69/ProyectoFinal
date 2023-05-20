function obtenerId() {
  const url = window.location.href
  const partes = url.split('/');
  return partes[partes.length - 1]
}

async function post(){
  let id = obtenerId()
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
}

let actualizar = document.getElementById("actualizar")
actualizar.addEventListener('click', post)


