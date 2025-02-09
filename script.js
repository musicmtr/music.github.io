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
            <strong>${days} дней ${hours} часов ${minutes} минут</strong>
        `;
    }, 1000);

    // Анимация появления текста
    let lastScrollPosition = 0;
    const fadeElements = document.querySelectorAll('.fade-in');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3 // Элемент становится видимым, когда 30% находится в области видимости
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Прекратить наблюдение после появления
            }
        });
    }, observerOptions);
    
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

    // стрелка кнопки вверх
    const backToTopButton = document.querySelector('.back-to-top');

    // Функция для проверки видимости кнопки
    function toggleBackToTop() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
    
        // Если прокрученная часть больше половины высоты страницы, показываем кнопку
        if (scrollPosition > windowHeight * 0.5) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }
    
    // Обработчик события прокрутки
    window.addEventListener('scroll', () => {
        toggleBackToTop();
    });
    
    // Плавная прокрутка наверх при клике на кнопку
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault(); // Предотвращаем стандартное поведение ссылки
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Плавная прокрутка
        });
    });

    // Стрелка для скролла
    const scrollArrow = document.querySelector('.scroll-arrow');

    // Скрываем стрелку изначально
    scrollArrow.style.opacity = '0';
    scrollArrow.style.pointerEvents = 'none';
    
    // Функция для показа стрелки
    function showScrollArrow() {
        scrollArrow.style.opacity = '0.8';
        scrollArrow.style.pointerEvents = 'auto';
    }
    
    // Функция для скрытия стрелки
    function hideScrollArrow() {
        scrollArrow.style.opacity = '0';
        scrollArrow.style.pointerEvents = 'none';
    }
    
    // Таймер для автоматического показа стрелки
    let showArrowTimeout;
    
    // Сброс таймера при действиях пользователя (скролл или движение мыши)
    function resetShowArrowTimer() {
        clearTimeout(showArrowTimeout); // Очищаем предыдущий таймер
        showArrowTimeout = setTimeout(() => {
            showScrollArrow(); // Показываем стрелку через 5 секунд
        }, 5000);
    }
    
    // Слушатели событий для сброса таймера
    window.addEventListener('scroll', () => {
        hideScrollArrow(); // Сразу скрываем стрелку при скролле
        resetShowArrowTimer(); // Запускаем новый таймер
    });
    
    window.addEventListener('mousemove', () => {
        hideScrollArrow(); // Сразу скрываем стрелку при движении мыши
        resetShowArrowTimer(); // Запускаем новый таймер
    });
    
    // Инициализация: запускаем первый таймер
    resetShowArrowTimer();

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
    
        // Показать сообщение об успехе
        alert('Спасибо за вашу анкету! Мы ждем вас на свадьбе.');
    
        // Сбросить форму
        form.reset();
    });
});