/* let sliderInner = document.querySelector(".slider--inner");
let imagenes = document.querySelectorAll(".img-carrousel");

let index = 1
setInterval(()=>{
    let porcentaje = index * -100;
    sliderInner.style.transform = "translateX(" + porcentaje +"% )";
    index++;
    if(index > imagenes.length-1 ){
        index = 0;
    }

}, 3000); */


// creacion de clase constructora

class Producto {
    constructor(id, nombre, precio, cantidadEnStock) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidadEnStock = cantidadEnStock;
    }
    reduccionDeStock(cantidadRequerida) {
        return (this.cantidadEnStock - cantidadRequerida);
    }
}

class Compra {
    constructor(producto, cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;

    }
    valorDeCompra() {
        return this.producto.precio * this.cantidad
    }
}
//creacion del array contenedor de objetos producto,
const arrProductos = [];
arrProductos.push(new Producto(1, "soga de pvc", 2500, 50));
arrProductos.push(new Producto(2, "soga de acero", 7500, 27));
arrProductos.push(new Producto(3, "soga de freestyle", 9800, 12));
arrProductos.push(new Producto(4, "mancuernas", 22400, 16));
arrProductos.push(new Producto(5, "chaleco de lastre", 36500, 19));
arrProductos.push(new Producto(6, "barra de dominadas", 52500, 7));
arrProductos.push(new Producto(7, "magnesio por kg", 20000, 10));
arrProductos.push(new Producto(8, "anillas", 30000, 17));
//////////////////////////////////////////////
//jeje mira lo q parendiste zugordete
/* const barraBuscadora = document.querySelectorAll(".buscador--barra");
console.log(barraBuscadora[0]);

const inputLCDTM = barraBuscadora[0];

inputLCDTM.addEventListener("keyup", ()=>{
    
    let peruvian = arrProductos.filter((el)=>{
        return el.nombre.includes(inputLCDTM.value);
    })
    console.log(peruvian);
})
 */
