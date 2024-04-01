
class Compra {
    constructor(producto, precio) {
        this.producto = producto;
        this.precio = precio;

    }
    valorDeCompra() {
        return this.producto.precio * this.cantidad
    }
}

const arrProductos= [];

const recibirProductos = async ()=>{

    try{
        const prods = await fetch("../fakeDB/productos.json");
        const data = await prods.json();
        data.forEach(producto =>{
            arrProductos.push(producto);
        })
    }
    catch{
        console.log(err);
    }

    
}
recibirProductos();


//asignacion de Constantes y variables


const buscar = document.querySelector(".buscador--barra");
const contenidoDinamicoTarjetas = document.querySelector(".cardContainer");
const contenedorAuxiliar = document.querySelector(".contenedorAuxiliar");
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const contenedorCarrito = document.getElementById("carrito");
const iconoCarrito = document.querySelector(".carrito");
let botoncitos = document.querySelectorAll(".boton-compra");
const PTotal = document.querySelector(".precio-total-articulos");
const articulosDelCarrito = document.querySelector(".articulos-añadidos");
const botonBorrarCarrito = document.createElement('button');
        botonBorrarCarrito.textContent = "Vaciar Carrito";
        botonBorrarCarrito.classList.add("boton-borrar");
        contenedorCarrito.append(botonBorrarCarrito);
const botonFinalizarCompra = document.createElement("button");
        botonFinalizarCompra.textContent = "FinalizarCompra";
        botonFinalizarCompra.classList.add("boton-borrar");
        contenedorCarrito.append(botonFinalizarCompra)

        


//Vaciar Carrito
function borrarCarrito() {
    
        carrito.splice(0);
        localStorage.removeItem("carrito");
        articulosDelCarrito.innerHTML="";
        PTotal.innerText="El carrito esta Vacio";
        iconoCarrito.classList.remove("coloreado");
        
        
    }
    
    botonBorrarCarrito.addEventListener("click",()=>{
        borrarCarrito();
        Toastify({
            text: "El carrito esta vacio",
            duration: 2000,
            gravity: "bottom", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            style: {
            background: "linear-gradient(to right, #c11100, #ffce00)",
            },
            onClick: function(){} // Callback after click
        }).showToast();
    });

    //esto pinta todas las tarjetas al inicio ya que estan de forma dinamica

function mostrarContenidoCarrito (){
        let precioTotal = 0;
        if (carrito.length==0) {
            
        }
        else{
        carrito.forEach((element)=>{
        const {producto, precio} = element;
        articulosDelCarrito.innerHTML += 
        `<li>${producto} : ${precio}<li>`
        precioTotal+=precio
        PTotal.innerText= `$ ${precioTotal}`
    })
    }
    
}

//funcionalidad para terminar la compra

function TerminarCompar(){
    let arrPrecios = [];
    carrito.map((element)=>{
        arrPrecios.push(element.precio);
    })
    let ValorFinal = arrPrecios.reduce((acc,actual)=>{
        return acc + actual;
        
    },0)
    carrito.length !=0 
    ? Swal.fire(`Compra Realizada, Precio total: ${ValorFinal} `)
    :Swal.fire({
        title: "<strong>El carrito esta vacio</strong>",
        icon: "warning",
        html: `
        `,
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText: `
        Volver a la tienda
        `,
    });
    iconoCarrito.classList.remove("coloreado");
    
}




//mostrar todos los articulos cuando se cargue la pagina

function mostrarProductos() {
    let productos = "";
    arrProductos.forEach((element) => {
        const {nombre, precio, img} = element;
        productos+=(
            `<div class="card1">
            <div><img src="${img}" alt="${nombre}"></div>
            <p class="nombre">${nombre}</p>
            <button class="boton-compra" data-valor="${precio}" data-producto="${nombre}">Añadir al carrito</button >
            <p>Precio: $${precio}</p>
            </div>`)
        });
        contenidoDinamicoTarjetas.innerHTML += productos;
        
    }

    function colorearCarrito() {
        iconoCarrito.classList.add("coloreado")
    }
    
    // esto verifica que si hay elementos en el carrito se ponga de color rojo mostrando que hay elementos dentro
    setTimeout(()=>{
        if (carrito.length!=0) {
            colorearCarrito();
        }
    },50)
    
    // Este bloque espera que este todo cargado para luego poder pintar las tarjetas
    setTimeout(()=>{
        window.onload = mostrarProductos();
        window.onload = mostrarContenidoCarrito();
    }, 300)
    

    //eventos
    
    //barra buscadora de articulos
    
    
    buscar.addEventListener("keyup", ()=>{
        contenidoDinamicoTarjetas.innerHTML = ""
        let html ="";
        let tarjetas = arrProductos.filter((el)=>{
            return el.nombre.includes(buscar.value);
        })
        if (tarjetas.length == 0) {
            contenidoDinamicoTarjetas.innerHTML = `<div> <h2>Lo Sentimos, No hemos encontrado ningun articulo con ese nombre</h2></div>`
            contenidoDinamicoTarjetas.classList.add("noEncontrado")
        }
        tarjetas.forEach(element => {
            const {nombre, precio, img} = element;
            html +=(`<div class="card1">
            <div><img src="${img}" alt="${nombre}"></div>
            <p class="nombre">${nombre}</p>
            <button class="boton-compra" data-valor="${precio}" data-producto="${nombre}">Añadir al carrito</button >
            <p>Precio: $${precio}</p>
            </div>`)
        });
        contenidoDinamicoTarjetas.innerHTML += html;
        contenedorAuxiliar.appendChild(contenidoDinamicoTarjetas)
        
    });
    
    botonFinalizarCompra.addEventListener("click",()=>{
        TerminarCompar();
        borrarCarrito();
    })
    

    // agregar a carrito
    contenedorAuxiliar.addEventListener("click",(e)=>{
        if (e.target.classList.contains("boton-compra")) {
            const precio = e.target.getAttribute("data-valor");
            const precioNumero = parseFloat(precio);
            const nombre =e.target.getAttribute("data-producto");
            const compra = new Compra(nombre, precioNumero);
            carrito.push(compra);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            articulosDelCarrito.innerHTML=""
            let precioTotal = 0;
            carrito.forEach((element)=>{
                const {producto, precio} = element;
                articulosDelCarrito.innerHTML += 
                `<li>${producto} : ${precio}<li>`
                precioTotal+=precio
            })
            PTotal.innerText= `$ ${precioTotal}`
            colorearCarrito();
            Toastify({
                text: `Se ha agregado ${nombre}` ,
                duration: 2000,
                gravity: "bottom", // `top` or `bottom`
                position: "left", // `left`, `center` or `right`
                style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                onClick: function(){} // Callback after click
            }).showToast();
        }
    })
    
