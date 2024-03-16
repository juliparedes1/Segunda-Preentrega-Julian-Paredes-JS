

// creacion de clase constructora

class Producto {
    constructor(id, nombre, precio, cantidadEnStock, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidadEnStock = cantidadEnStock;
        this.img = img
    }
    reduccionDeStock(cantidadRequerida) {
        return (this.cantidadEnStock - cantidadRequerida);
    }
}

class Compra {
    constructor(producto, precio) {
        this.producto = producto;
        this.precio = precio;

    }
    valorDeCompra() {
        return this.producto.precio * this.cantidad
    }
}
//creacion del array contenedor de objetos producto,
const arrProductos = [];
arrProductos.push(new Producto(1, "soga de pvc", 2500, 50, "../img/soga1.jpg"));
arrProductos.push(new Producto(2, "soga de acero", 7500, 27, "../img/soga acero.jpeg"));
arrProductos.push(new Producto(3, "soga de freestyle", 9800, 12, "../img/soga4.jpg"));
arrProductos.push(new Producto(4, "mancuernas", 22400, 16,"../img/mancuernas.jpg" ));
arrProductos.push(new Producto(5, "chaleco de lastre", 36500, 19,"../img/chaleco de lastre.png" ));
arrProductos.push(new Producto(6, "barra de dominadas", 52500, 7,"../img/barra.png"));
arrProductos.push(new Producto(7, "magnesio por kg", 20000, 10,"../img/IMG_20170428_185009web-600x600.png"));
arrProductos.push(new Producto(8, "anillas", 30000, 17,"../img/anillas.jpg"));


//asignacion de Constantes y variables


const buscar = document.querySelector(".buscador--barra");
const contenidoDinamicoTarjetas = document.querySelector(".cardContainer");
const contenedorAuxiliar = document.querySelector(".contenedorAuxiliar");
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const contenedorCarrito = document.getElementById("carrito");
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
        
        
    }
    
    botonBorrarCarrito.addEventListener("click",()=>{
        borrarCarrito();
    });

// la funcion funciona igual que la de abajo (mostrarContenidoCarrito) pero no la utilizo xq prefiero el if
/* function mostrarConTernario (){
    let precioTotal = 0;
    carrito.length==0
    ? precioTotal=0
    :carrito.forEach((element)=>{
    const {producto, precio} = element;
    articulosDelCarrito.innerHTML += 
    `<li>${producto} : ${precio}<li>`
    precioTotal+=precio
    PTotal.innerText= `$ ${precioTotal}`
})
} */



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
    })
    
}

botonFinalizarCompra.addEventListener("click",()=>{
    TerminarCompar();
    borrarCarrito();
})



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

    window.onload = mostrarProductos();
    window.onload = mostrarContenidoCarrito();
    
    
    //barra buscadora de articulos
    
    
    buscar.addEventListener("keyup", ()=>{
        contenidoDinamicoTarjetas.innerHTML = ""
        let html ="";
        let tarjetas = arrProductos.filter((el)=>{
            return el.nombre.includes(buscar.value);
        })
        if (tarjetas.length == 0) {
            contenidoDinamicoTarjetas.innerHTML = `<div> <h1>Lo Sentimos, No hemos encontrado ningun articulo con ese nombre</h1> </div>`
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
    
    //aca lo converti en funcion para que si doy click al boton de comprar me actualice el stock
    //Esta constante se crea aca abajo porque primero deben suceder los eventos de filtrado

    //Actualizacion: ya no es necesaria pero no la quiero borrar por miedo a q algo se buguee, en la proxima entrega lo modifico
    botoncitos= document.querySelectorAll(".boton-compra");

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
        }
    })
    
    
    


