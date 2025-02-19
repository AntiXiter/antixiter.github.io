document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll(".section");
    const navLinks = document.querySelectorAll(".sidebar ul li a");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });

    // Smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: "smooth"
            });
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const textElement = document.getElementById("animated-text");
    const text = "Desenvolvedor de Softwares e Soluções";
    let index = 0;
    let isDeleting = false;

    function typeEffect() {
        if (isDeleting) {
            textElement.innerText = text.substring(0, index--);
        } else {
            textElement.innerText = text.substring(0, index++);
        }

        if (index > text.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1000); // Tempo antes de apagar
        } else if (index < 0) {
            isDeleting = false;
            setTimeout(typeEffect, 500); // Tempo antes de recomeçar
        } else {
            setTimeout(typeEffect, isDeleting ? 50 : 100); // Velocidade da digitação
        }
    }

    typeEffect();
});
