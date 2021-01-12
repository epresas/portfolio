$(window).on('load', initialize);

$(document).ready(function () {
    
    /* Configuración de carousel */

    $('.owl-carousel').owlCarousel({
        autoplay: true,
        autoplayTimeout: 5000,
        loop: true,
        autoplayHoverPause: false,
        items: 1,
        margin:20
    });

    /* Animación scroll menú de navegación */

    $('[data-navigation]').on('click', function () {
        var navTarget = $(this).data('level');
        var targetDepth = $(navTarget).offset().top;
        $('html').animate({
            scrollTop: targetDepth
        }, 1000);
        if($(this).parents('.menu').hasClass('menu--open')){
            $(this).parents('.menu').removeClass('menu--open');
        }
    });

    /* Aplicación de retardos reveal */

    $('.reveal.delayed').each(function () {
        var objDelay = $(this).data('delay');
        $(this).css('transition-delay', objDelay + 'ms');
    });


    /*  Validación formulario */

    $('form').on('submit', function (e) {
        e.preventDefault();
        var name = $('#contactName').val();
        var email = $('#contactEmail').val();
        var message = $('#contactMessage').val();

        if (name.length < 2) {
            showMessage("Por favor, introduce un nombre. Debe tener mínimo 2 caracteres.");
            e.preventDefault();
        } else if (email.includes('@') == false || email.includes('.') == false) {
            showMessage("Por favor, introduce un email válido. Debe ser de la forma \"xxxx@xxxx.xxx\"");
            e.preventDefault();
        } else if (message.length < 20) {
            showMessage("El mensaje es demasiado corto. Mínimo 20 caracteres.");
            e.preventDefault();
        } else {
            showMessage("¡Mensaje enviado con exito!.");
            name = "";
            email = "";
            message= "";
        }
    });

    function showMessage(text) {

        $('#formMessage>p').text(text);
        $('#formMessage').addClass('visible');

        setTimeout(function() {
            $('#formMessage').removeClass('visible');   
        }, 3000);
        
    }
    
    // Aparición de modal
    $('.frame').on('click', openModal );
    $('#modalClose').on( 'click', closeModal );
    
    // Efecto hover proyectos
   
    $('.frame').on('mouseenter', function () {
        $(this).find('.veil').addClass('visible');
        $(this).find('.showModal').fadeIn(500);
    });
    
    $('.frame').on('mouseleave', function () {

        $(this).find('.showModal').fadeOut(500);
        $(this).find('.veil').removeClass('visible');
    });
    toggleMenu();
});

$(window).on('scroll', throttle(scrollCallback, 200));

// ###################### DECLARACION DE FUNCIONES ##############################

// Pantalla de carga
function initialize() {
    $('.spinner__overlay').fadeOut(2000);
}

/* Abrir-cerrar el menú */
function toggleMenu() {
    $('.toggle-btn').on('click', ()=> {
        $('.menu-responsive .menu').toggleClass('menu--open');
        $('body').toggleClass('no-scroll');
    }
    );
}

// Plugin para abrir modal
function openModal () {
    let projectId = $(this).data('project') -1 ;
    let modalTitle = projectData[projectId].title;
    let modalText = projectData[projectId].text;
    $('#modalTitle').text(modalTitle);
    $('#modalText').html(modalText);
    $('#modalBg').fadeIn(200,function () {
       $('#modalContent').fadeIn(300); 
    });
}

function closeModal(){
    $('#modalBg,#modalContent').fadeOut(300);
}

/* Throthle of scroll event */

function throttle(fn, wait) {
    var time = Date.now();
    return function() {
        if ((time + wait - Date.now()) < 0) {
        fn();
        time = Date.now();
        }
    }
}

function scrollCallback(){
    let userDepth = $(window).scrollTop();
    $('.reveal').each(function () {
        var targetDepth = $(this).offset().top - $(window).innerHeight() / 1.5;
        if (userDepth >= targetDepth) {
            $(this).addClass('visible');
        }
    });
    
    $('section').each(function(){
        let self = $(this);
        var sectionDepth = $(this).offset().top;
        if (userDepth >= sectionDepth) {
            if(self.hasClass('section--light')){
                $('.menu-desktop,.menu-responsive').addClass('menu--dark');
                $('.menu__btn').addClass('menu__btn--dark');
            } else {
                $('.menu-desktop,.menu-responsive').removeClass('menu--dark');
                $('.menu__btn').removeClass('menu__btn--dark');
            }
          /*   if(userDepth >= (sectionDepth + $(this).innerHeight()) || userDepth < sectionDepth) {
            } */
        }
    });
}

/* ###################### INFORMACIÓN DE MODALES ############################## */
let projectData = [
    {
        id:1,
        title:"Elegra Landing",
        text: "Boceto de Landing page para la empresa Elegra. Tecnologías utilizadas: HTML5, CSS3 (SASS), Javascript (Angular)."

    },
    {
        id:2,
        title:"Microsite Telefónica",
        text: "Microsite hecho para la empresa Telefónica por medio del cual se personalizan y envian felicitaciones navideñas corporativas. Dotado de un escenario 360 y acceso a redes sociales.<br>Duración: 2 meses.<br>Rol: Creación de contenido.<br>Tecnología utilizada: HTML5, CSS3, Javascript, frameworks para el lado de cliente (AngularJs, Sass)."

    },
    {
        id:3,
        title:"Profuturo",
        text: "Proyecto educativo online, que consta de unidades relativas a un tópico particular, visualizado como una presentación dinámica, tiene slides explicativos y actividades interactivas.<br>Duración: 1 año y medio.<br>Rol: Responsable de producción / Desarrollador front.<br>Tecnología utilizada: HTML5, CSS3, Javascript, frameworks para el lado de cliente (AngularJs, Sass)."

    },
    {
        id:4,
        title:"Proyecto final formación javascript",
        text: "Proyecto final del curso de programación en Javascript. Es un juego donde se tiene que construir un parque de atracciones.<br>Rol: Programador.<br>Tecnología utilizada: HTML5, CSS3 y Javascript."

    }
];