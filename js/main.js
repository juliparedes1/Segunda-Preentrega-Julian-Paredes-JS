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
            //aca si presiono el cero, muestra los elementos y sus valores unitarios
            alert(mostrarMixto.join("\n"));
        }
        ingreso = prompt("Ingrese un nombre valido, si desea ver el nombre de los productos presione 0");
    }
    // tuve que usar un let para poder modificar el codigo de abajo
    let productosEncontrados = arrProductos.filter((el) => {
        return el.nombre.includes(ingreso);
    });
    // valida que si no se encontro ningun elemento dentro del array se escriba nuevamente otro nombre, por si se equivoco en el tipeo
    if (productosEncontrados.length == 0) {
        ingreso = prompt("Ingrese un nombre valido, no se encontraron productos con ese nombre");
        productosEncontrados = arrProductos.filter((el) => {
            return el.nombre.includes(ingreso);
        });
        
    }
    // muestra cuales son los elementos que coinciden con la busqueda y su cantidad en stock
    productosEncontrados.forEach((iterator, i = 0) => {
        alert(`Ustes ha encontrado: ${iterator.nombre} \n en stock: ${iterator.cantidadEnStock} \n digite  ${i + 1} para seleccionarlo`);
        i++;
    });

    //verifica que tanto el indice seleccionado sea logico y que la cantidad no supere el stock
    let indice = parseInt(prompt("Digite el numero el del objeto "));
    while(!(indice > 0 && indice <= productosEncontrados.length)) {
    indice = prompt("Usted ha ingresado un numero erroneo, pruebe nuevamente");
    }; 
    let cantidad = prompt("Digite la cantidad que quiere comprar")
    while (cantidad > productosEncontrados[(indice - 1)].cantidadEnStock) {
        alert("La cantidad que desea comprar es mayor al stock lo sentimos")
        cantidad = prompt("Digite la cantidad que quiere comprar")
    };

    //aca una vez seleccionado el producto, reduce su cantidad en stock para las siguientres compras, creo que en verdad deberia usar el metodo foreach, pero como funciona no lo toco jaja
    arrProductos.find((el) => {
        if (el.nombre == productosEncontrados[(indice - 1)].nombre) {
            el.cantidadEnStock = el.reduccionDeStock(cantidad);
        }
    });

    //aca crea las ordenes de compra
    ordenesDeCompra.push(new Compra(productosEncontrados[(indice - 1)], cantidad));
    ingreso = prompt("Si quiere realizar otra compra presione aceptar, si desea terminar presione cancelar");
    if (ingreso == null) {
        banderaCompras = true;
    }
}
// esta aprte del codigo crea un array con el valor de cada una de las ordenes de compra
const totalDeCompras = ordenesDeCompra.map((el) => {
    return el.valorDeCompra();
});
//aca se suman todos los valores para dar el precio total;
const precioTotal = totalDeCompras.reduce((acc, actual) => {
    return acc + actual
}, 0)

alert(`el precio total es de ${precioTotal}`);


