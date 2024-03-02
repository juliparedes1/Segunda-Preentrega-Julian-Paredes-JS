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
    valorDeCompra(){
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

const ordenesDeCompra = [];
const mostrarMixto = [];
let banderaCompras = false;



//la bandera compras indica si la persona termino de elegir todas las cosas que queria comprar

while (!banderaCompras) {
    
    let ingreso = prompt("Ingrese el producto que desea, si desea ver el nombre de los productos presione 0");
//si el ingreso no contiene nada entonces pide que ingrese correctamente el nombre de un elemento
    while (ingreso == "" || ingreso == "0") {
        if (ingreso == "0") {
            const rta = [], valores = [];
            arrProductos.forEach((el) => {
                rta.push(el.nombre);
                valores.push(el.precio);
            });
            for (let i = 0; i < rta.length; i++) {
                mostrarMixto.push(rta[i]);
                mostrarMixto.push(valores[i]);
            }
            alert(mostrarMixto.join("\n"));
        }
        ingreso = prompt("Ingrese un nombre valido, si desea ver el nombre de los productos presione 0");

    }

    let productosEncontrados = arrProductos.filter((el) => {
        return el.nombre.includes(ingreso);
    });
    

    

    productosEncontrados.forEach((iterator, i = 0) => {
        alert(`Ustes ha encontrado: ${iterator.nombre} \n en stock: ${iterator.cantidadEnStock} \n digite  ${i + 1} para seleccionarlo`);
        i++;
    });
    let indice = prompt("Digite el numero el del objeto ");
    // no se como validar que si por ejemplo escribo soga, y me salen los 3 tipos de soga que tengo, como hago para que el indice tenga que estar entre esos 3, y si se equivoca y pone 4 le pida que lo reescriba
    let cantidad = prompt("Digite la cantidad que quiere comprar")
    while (cantidad > productosEncontrados[(indice - 1)].cantidadEnStock) {
        alert("La cantidad que desea comprar es mayor al stock lo sentimos")
        cantidad = prompt("Digite la cantidad que quiere comprar")

    }
    arrProductos.find((el) => {
        if (el.nombre == productosEncontrados[(indice - 1)].nombre) {
            el.cantidadEnStock = el.reduccionDeStock(cantidad);
        }
    });
    ordenesDeCompra.push(new Compra(productosEncontrados[(indice - 1)], cantidad));
    ingreso = prompt("Si quiere realizar otra compra presione aceptar, si desea terminar presione cancelar");
    if (ingreso == null) {
        banderaCompras = true;
    }
}

const totalDeCompras = ordenesDeCompra.map((el)=>{
    return el.valorDeCompra();
});

const precioTotal = totalDeCompras.reduce((acc, actual) => {
return acc+actual
}, 0)

alert(`el precio total es de ${precioTotal}`);


