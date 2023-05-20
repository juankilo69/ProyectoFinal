window.onload = function(){
    pintarU.style.display = "none"
    pintarO.style.display = "none"
}

function createNode(element){
    return document.createElement(element)
}


let select = document.getElementById("select")


const pintarO = document.getElementById("pintarO")
const pintarU = document.getElementById("pintarU")
let pintadoO = false
let pintadoU = false

document.querySelector("button").addEventListener("click",async ()=>{
    if(select.value == "ordenadores"){
        pintarU.style.display = "none"
        if(pintadoO != true){
            fetch("http://localhost:3000/api/v1/ordenadores")
            .then((res) => res.json())
            .then((data) => {
                    contO = 1
                    console.log(data);
                    let ordenadores = data
    
                    r(ordenadores)
                    pintadoO = true
            })
            .catch((err) => console.log(err))
        }else{
            pintarO.style.display = "block"
        }
    }else if(select.value == "usuarios" ){
        pintarO.style.display = "none"
        if(pintadoU != true){
            fetch("http://localhost:3000/api/v1/usuarios")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                let usuarios = data
    
                re(usuarios)
                pintadoU = true
            })
            .catch((err) => console.log(err))
        } else{
            pintarU.style.display = "block"
        }
    }
})

function r(ordenadores){
    pintarU.style.display = "none"
    let h1 = createNode("h1")
    let textH1 = document.createTextNode("Ordenadores")
    h1.appendChild(textH1)
    pintarO.appendChild(h1)
    for(let o of ordenadores){
        let p = createNode("p")
        let a1 = createNode("a")
        let img = createNode("img")
        img.setAttribute("src","/asstes/images/edit.png")
        a1.setAttribute('href', "panelAdmin/mostrarAdmin/ordenadores/"+o.id);
        let text = document.createTextNode("+ "+o.nombre+" - "+o.precio+"€")
        
        a1.appendChild(img)
        p.appendChild(text)
        p.appendChild(a1)
        pintarO.appendChild(p)
    }
}

function re(usuarios){
    pintarO.style.display = "none"
    let h1 = createNode("h1")
    let textH1 = document.createTextNode("Usuarios")
    h1.appendChild(textH1)
    pintarU.appendChild(h1)
    for(let u of usuarios){
        let p = createNode("p")
        let a1 = createNode("a")
        let img = createNode("img")
        img.setAttribute("src","/asstes/images/edit.png")
        a1.setAttribute('href', "panelAdmin/mostrarAdmin/usuarios/"+u.username);
        let text = document.createTextNode("+ "+u.username+" +")
        
        a1.appendChild(img)
        p.appendChild(text)
        p.appendChild(a1)
        pintarU.appendChild(p)
    }
}
