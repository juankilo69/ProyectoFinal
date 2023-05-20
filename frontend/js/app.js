const container = document.getElementById("ordenadores")

function createNode(element){
    return document.createElement(element)
}

function apend(parent, el){
    return parent.appendChild(el)
}


async function fetchOrdenadores(){
    fetch("http://localhost:3000/api/v1/ordenadores")
     .then((res) => res.json())
     .then((data) => {
            console.log(data);
            let ordenadores = data
 
            for(let o of ordenadores){
                let div = createNode("div")
                let p = createNode("p")
                let p2 = createNode("p")
                let imagen = createNode("img")
                let a = createNode("a")
                let textNom = document.createTextNode(o.nombre)
                let textPrec = document.createTextNode(o.precio+"€")
                imagen.src = o.img
                div.classList.add("pc")
                a.setAttribute('href',`index/mostrar/${o.id}`)
                apend(p,textNom)
                apend(p2,textPrec)
                apend(div,imagen)
                apend(div,p)
                apend(div,p2)
                apend(a,div)
                apend(container, a)
            }
    })
    .catch((err) => console.log(err))
}

fetchOrdenadores()

const login = document.getElementById("login")
const logout = document.getElementById("logout")
const crear = document.getElementById("crear")