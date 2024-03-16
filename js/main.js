let sliderInner = document.querySelector(".slider--inner");
let imagenes = document.querySelectorAll(".img-carrousel");

let index = 1
setInterval(()=>{
    let porcentaje = index * -100;
    sliderInner.style.transform = "translateX(" + porcentaje +"% )";
    index++;
    if(index > imagenes.length-1 ){
        index = 0;
    }

}, 2000);

// Aca no se como hacer para que queden todas las imagenes centradas, se me desfazan unos pixeles cada vez que gira el carrusel