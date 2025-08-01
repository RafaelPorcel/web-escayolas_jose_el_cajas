document.addEventListener('DOMContentLoaded', function () {
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(initCarousel);

    const modal = document.getElementById('imageModal');
    const modalCarouselContainer = document.querySelector('.modal-carousel');
    const closeBtn = document.querySelector('.modal .close');
    let modalInterval = null;

    function initCarousel(carousel) {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        let current = 0;
        let interval = null;
        const intervalTime = parseInt(carousel.getAttribute('data-interval')) || 4000;

        function showSlide(idx) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === idx);
            });
            current = idx;
        }

        function nextSlide() {
            showSlide((current + 1) % slides.length);
        }

        function prevSlide() {
            showSlide((current - 1 + slides.length) % slides.length);
        }

        // Botones
        if (nextBtn) nextBtn.onclick = nextSlide;
        if (prevBtn) prevBtn.onclick = prevSlide;

        // Auto avance
        function startAuto() {
            stopAuto();
            interval = setInterval(nextSlide, intervalTime);
        }
        function stopAuto() {
            if (interval) clearInterval(interval);
        }
        startAuto();
        carousel.addEventListener('mouseenter', stopAuto);
        carousel.addEventListener('mouseleave', startAuto);
        carousel.addEventListener('touchstart', stopAuto);
        carousel.addEventListener('touchend', startAuto);

        // Click en imagen para abrir modal
        slides.forEach((slide, idx) => {
            const img = slide.querySelector('img');
            if (img) {
                img.onclick = () => openModal(carousel, idx);
            }
        });
    }

    // Modal carrusel
    function openModal(carousel, startIdx) {
        modalCarouselContainer.innerHTML = '';
        const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
        const modalSlides = slides.map((slide, i) => {
            const clone = slide.cloneNode(true);
            clone.classList.remove('active');
            if (i === startIdx) clone.classList.add('active');
            return clone;
        });
        modalSlides.forEach(slide => modalCarouselContainer.appendChild(slide));

        let current = startIdx;
        function showModalSlide(idx) {
            modalSlides.forEach((slide, i) => {
                slide.classList.toggle('active', i === idx);
            });
            current = idx;
        }
        function nextModalSlide() {
            showModalSlide((current + 1) % modalSlides.length);
        }
        function prevModalSlide() {
            showModalSlide((current - 1 + modalSlides.length) % modalSlides.length);
        }
        let prevBtn = modalCarouselContainer.querySelector('.carousel-prev');
        let nextBtn = modalCarouselContainer.querySelector('.carousel-next');
        if (nextBtn) nextBtn.onclick = nextModalSlide;
        if (prevBtn) prevBtn.onclick = prevModalSlide;

        // Auto avance en modal
        function startModalAuto() {
            stopModalAuto();
            modalInterval = setInterval(nextModalSlide, 4000);
        }
        function stopModalAuto() {
            if (modalInterval) clearInterval(modalInterval);
        }
        startModalAuto();
        modalCarouselContainer.onmouseenter = stopModalAuto;
        modalCarouselContainer.onmouseleave = startModalAuto;
        modalCarouselContainer.ontouchstart = stopModalAuto;
        modalCarouselContainer.ontouchend = startModalAuto;

        showModalSlide(current);
        modal.style.display = 'block';
    }

    // Cerrar modal
    if (closeBtn) closeBtn.onclick = () => {
        modal.style.display = 'none';
        modalCarouselContainer.innerHTML = '';
        if (modalInterval) clearInterval(modalInterval);
    };
    window.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            modalCarouselContainer.innerHTML = '';
            if (modalInterval) clearInterval(modalInterval);
        }
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            modalCarouselContainer.innerHTML = '';
            if (modalInterval) clearInterval(modalInterval);
        }
    });
});
