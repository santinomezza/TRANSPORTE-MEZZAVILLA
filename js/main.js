document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar ScrollTrigger de GSAP
    gsap.registerPlugin(ScrollTrigger);

    // 2. Animaciones de Entrada (Scroll Reveal)
    // Efecto de aparición fluido (Fade up) para elementos
    const revealElements = document.querySelectorAll('.gs-reveal');

    revealElements.forEach((element) => {
        gsap.fromTo(element,
            {
                y: 40,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%", // Ejecuta la animación cuando la parte de arriba del elemento está al 85% de la pantalla (casi visible)
                    toggleActions: "play none none none"
                }
            }
        );
    });

    // 3. Animación 360° del Modelo 3D Real ligada estrictamente al Scroll
    const modelViewer = document.querySelector('#maquina-3d');

    if (modelViewer) {
        // Enlaza la rotación de la cámara del modelo 3D con el progreso del scroll
        ScrollTrigger.create({
            trigger: ".interactive-visual",
            start: "top 80%",    // Inicia cuando entra en pantalla
            end: "bottom 20%",   // Termina cuando casi sale de la pantalla
            scrub: 1,            // Animación ultra suave atada a la rueda del mouse
            onUpdate: (self) => {
                // self.progress (0 a 1) * 360 para obtener la rotación completa de 360°
                const rotation = self.progress * 360;
                // Actualizamos la órbita de la cámara (Ángulo X, Ángulo Y, Zoom)
                modelViewer.setAttribute("camera-orbit", `${rotation}deg 75deg 100%`);
            }
        });
    }

    // 4. Parallax invertido en el texto del Hero section (Desaparece lentamente al scrollear hacia abajo)
    gsap.to(".hero-content", {
        y: 120,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // 5. Manejo básico del Nav para ponerle una sombra extra si el usuario scrollea
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.5)";
        } else {
            navbar.style.boxShadow = "none";
        }
    });

    // 6. Configuración del botón de Cotizar por WhatsApp
    const btnCotizar = document.getElementById('btn-cotizar');
    if (btnCotizar) {
        btnCotizar.addEventListener('click', () => {
            const material = document.getElementById('cotizar-material').value;

            const numeroWhatsApp = '5493834923567'; // Número extraído del footer y botones flotantes
            const mensaje = `Hola Transporte Mezzavilla, quisiera solicitar un presupuesto.%0A%0A*Material / Servicio:* ${material}%0A%0A¡Muchas gracias!`;

            window.open(`https://wa.me/${numeroWhatsApp}?text=${mensaje}`, '_blank');
        });
    }
});
