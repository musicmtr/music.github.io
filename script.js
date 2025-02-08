document.addEventListener('DOMContentLoaded', () => {
    // Таймер обратного отсчета
    const weddingDate = new Date("July 11, 2025 10:00:00").getTime();
    const countdownTimer = setInterval(() => {
        const now = new Date().getTime();
        const timeLeft = weddingDate - now;

        if (timeLeft <= 0) {
            document.getElementById("countdown").innerHTML = `
                <span>Сегодня день свадьбы!</span>
                <strong>🎉</strong>
            `;
            clearInterval(countdownTimer);
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById("countdown").innerHTML = `
            <span>До свадьбы осталось:</span>
            <strong>${days} дней ${hours} часов ${minutes} минут</strong>
        `;
    }, 1000);

    // Анимация появления текста
    let lastScrollPosition = 0;
    const fadeElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.classList.remove('fade-in-top', 'fade-in-bottom');
            } else {
                const rect = entry.boundingClientRect;
                const screenHeight = window.innerHeight;

                if (rect.top < screenHeight * 0.6) {
                    entry.target.classList.add('fade-in-top');
                    entry.target.classList.remove('fade-in-bottom');
                } else if (rect.bottom > screenHeight * 0.3) {
                    entry.target.classList.add('fade-in-bottom');
                    entry.target.classList.remove('fade-in-top');
                }
            }
        });
    }, { threshold: [0, 1] });

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Направление прокрутки
    window.addEventListener('scroll', () => {
        const currentScrollPosition = window.scrollY;

        if (currentScrollPosition > lastScrollPosition) {
            fadeElements.forEach(element => {
                if (!element.classList.contains('visible')) {
                    element.classList.add('fade-in-bottom');
                    element.classList.remove('fade-in-top');
                }
            });
        } else {
            fadeElements.forEach(element => {
                if (!element.classList.contains('visible')) {
                    element.classList.add('fade-in-top');
                    element.classList.remove('fade-in-bottom');
                }
            });
        }

        lastScrollPosition = currentScrollPosition;
    });

    // Стрелка для скролла
    const scrollArrow = document.querySelector('.scroll-arrow');
    let isAtBottom = false;

    function checkScrollPosition() {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if (scrollTop + windowHeight >= documentHeight - 10) {
            scrollArrow.style.opacity = '0';
            scrollArrow.style.pointerEvents = 'none';
            isAtBottom = true;
        } else {
            scrollArrow.style.opacity = '0.8';
            scrollArrow.style.pointerEvents = 'auto';
            isAtBottom = false;
        }
    }

    window.addEventListener('scroll', () => {
        checkScrollPosition();
    });

    let timeoutId;
    function resetTimeout() {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            if (!isAtBottom) {
                scrollArrow.style.opacity = '0';
                scrollArrow.style.pointerEvents = 'none';
            }
        }, 10000);
    }

    window.addEventListener('scroll', resetTimeout);
    window.addEventListener('mousemove', resetTimeout);

    checkScrollPosition();
    resetTimeout();

    // Обработчик формы
    const form = document.getElementById('guest-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = form.querySelector('#name').value.trim();
        const attendance = form.querySelector('input[name="attendance"]:checked');
        const food = form.querySelector('input[name="food"]:checked');

        if (!name || !attendance || !food) {
            alert('Пожалуйста, заполните все обязательные поля!');
            return;
        }

        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        console.log(data); // Здесь можно отправить данные на сервер
        alert('Спасибо за вашу анкету!');
        form.reset();
    });
});