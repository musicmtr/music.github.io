document.addEventListener('DOMContentLoaded', () => {
    // Таймер обратного отсчета
    const weddingDate = new Date("July 11, 2025 10:00:00").getTime();

    function updateTimers() {
        const now = new Date().getTime();
        const timeLeft = weddingDate - now;
    
        const timers = document.querySelectorAll('.countdown-output');
    
        if (timeLeft <= 0) {
            timers.forEach(timer => {
                timer.textContent = 'Сегодня день свадьбы! 🎉';
            });
            return;
        }
    
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    
        timers.forEach(timer => {
            timer.textContent = `${days} дней ${hours} часов ${minutes} минут`;
        });
    }
    
    // Обновление каждую секунду
    setInterval(updateTimers, 1000);
    updateTimers(); // Первичный вызов

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
    
    // Инициализация: запускаем первый таймер
    resetShowArrowTimer();

    // Это уже кнопка отправить в телеграмм
    document.getElementById('guest-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Предотвращаем стандартную отправку формы

            // Получаем значения из полей формы
    const name = document.getElementById('name').value;
    const plusName = document.getElementById('plus-name').value;

    // Проверяем, заполнены ли поля
    if (!name && !plusName) {
        alert('Пожалуйста, заполните хотя бы одно поле.');
        return;
    }

    // Формируем сообщение для Telegram
    const message = `
        📋 Новый ответ на форму:
        👤 ФИО: ${name || 'Не указано'}
        ➕ Гости: ${plusName || 'Не указано'}
    `;

    // Настройки для запроса к Telegram Bot API
    const botToken = '8012548911:AAGRU2C6MreFxHPcvX9ixzkhl40chkVlg-g'; // Замените на ваш токен
    const chatId = '429651615'; // Замените на ваш chat_id
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    // Отправляем данные через fetch
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message
        })
    })

    .then(response => {
        if (response.ok) {
            alert('Спасибо! Ваш ответ успешно отправлен.');
            document.getElementById('guest-form').reset(); // Очищаем форму
        } else {
            alert('Произошла ошибка при отправке. Попробуйте позже.');
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при отправке. Попробуйте позже.');
    });
});

});