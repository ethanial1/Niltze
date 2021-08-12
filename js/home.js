const nav = document.querySelector('.nav');

// Barra de navegación
window.addEventListener('scroll', function (){
    nav.classList.toggle('active', this.window.scrollY > 0);
});