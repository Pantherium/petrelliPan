"use strict";
// =====================================================
// Archivo: script.js
// Descripción: Backend de la landpage.
// Autor: Máximo Petrelli
// Fecha: Noviembre 2024
// =====================================================

/* ---------------------------INSERCIÓN DE CÓDIGO REUTILIZABLE--------------------------- */
document.addEventListener("DOMContentLoaded", function () {
    /* --------NAVBAR-------- */
    fetch('./navbar.xml')
        .then(response => response.text())
        .then(data => {
            document.getElementById('theNavbar').innerHTML = data;
            const toggleButton = document.getElementById("toggleButton");
            const menu = document.getElementById("menu");
            const logoDrop = document.getElementById("logoDrop");

            toggleButton.addEventListener("click", () => {
                if (menu.classList.contains("hidden")){

                    // Mostrar el menú con animación de entrada
                    logoDrop.classList.add("drop-shadow-activeLogoShadow")
                    menu.classList.remove("hidden");
                    menu.classList.add("animate-slideDown");
                    // Quitar la animación después de que termine
                    menu.addEventListener(
                        "animationend", () => {
                            menu.classList.remove("animate-slideDown");
                        },

                        { once: true } // Se ejecuta  solo una vez por evento
                    );
                } else {

                    // Animación de salida
                    menu.classList.add("animate-slideUp");
                    logoDrop.classList.remove("drop-shadow-activeLogoShadow")

                    // Esperar a que termine la animación antes de ocultar
                    menu.addEventListener(
                        "animationend", () => {
                            menu.classList.remove("animate-slideUp");
                            menu.classList.add("hidden"); // Oculta después de animar
                        },
                        { once: true }
            );}});
        });
    /* --------NAVBAR-------- */
    /* --------FOOTER-------- */
    fetch("./footer.xml")
        .then(response => response.text())
        .then(data => {
            document.getElementById("theFooter").innerHTML = data;
        });
    /* --------FOOTER-------- */
});
/* ---------------------------INSERCIÓN DE CÓDIGO REUTILIZABLE--------------------------- */

/* ---------------------------PARALLAX--------------------------- */
document.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY; // Desplazamiento actual
    const parallaxBg = document.querySelector('.banner-parallax');

    const speed = 0.4;

    parallaxBg.style.transform = `translateY(${scrollPosition * speed}px)`;
});
/* ---------------------------PARALLAX--------------------------- */

/* ---------------------------CAROUSEL--------------------------- */
document.querySelectorAll('.carousel').forEach(carousel => {
    const inner = carousel.querySelector(".carouselInner");
    const next = carousel.querySelector(".next");
    const prev = carousel.querySelector(".prev");

    const imgContArray = [...carousel.querySelectorAll(".carouselObject img")];

    const categoria = carousel.dataset.category;

    const imagenesPorCategoria = {        
        "Panificados": [
            "./recursos/carrusel/panificados/pan1.jpg",
            "./recursos/carrusel/panificados/pan2.jpg",
            "./recursos/carrusel/panificados/pan3.webp",
            "./recursos/carrusel/panificados/pan4.jpg",
        ],
        "Pastelería": [
            "./recursos/carrusel/pasteleria/pasteleria1.jpg",
            "./recursos/carrusel/pasteleria/pasteleria2.jpg",
            "./recursos/carrusel/pasteleria/pasteleria3.jpg",
            "./recursos/carrusel/pasteleria/pasteleria4.jpg"
        ],
        "Facturas": [
            "./recursos/carrusel/facturas/factura1.jpg",
            "./recursos/carrusel/facturas/factura2.jpg",
            "./recursos/carrusel/facturas/factura3.webp",
            "./recursos/carrusel/facturas/factura4.jpg",
        ], 
        "Pizzas": [
            "./recursos/carrusel/pizzas/pizza1.jpg",
            "./recursos/carrusel/pizzas/pizza2.jpg",
        ],};

    let imagenes = imagenesPorCategoria[categoria] || [];
    
    let index = 0;

    let isAnimating = false;

    function updateImg() {
        let prevIndex = (index - 1 + imagenes.length) % imagenes.length;
        let nextIndex = (index + 1) % imagenes.length;

        imgContArray[0].src = imagenes[prevIndex];
        imgContArray[1].src = imagenes[index];
        imgContArray[2].src = imagenes[nextIndex];
    }

    function moveCarousel(direction) {
        if (isAnimating) return;

        isAnimating = true;
        inner.style.transition = "transform 0.5s ease-in-out";


        inner.style.transform = direction === "next" 
            ? "translateX(-100%)" 
            : "translateX(100%)";

        inner.addEventListener("transitionend", () => {
            index = direction === "next"
                ? (index + 1) % imagenes.length
                : (index - 1 + imagenes.length) % imagenes.length;

            updateImg();

            inner.style.transition = "none";
            inner.style.transform = "translateX(0%)";

            isAnimating = false;

        }, { once: true });
    }

    updateImg();

    next.addEventListener("click", () => moveCarousel("next"));
    prev.addEventListener("click", () => moveCarousel("prev"));

});
/* ---------------------------CAROUSEL--------------------------- */
