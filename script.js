document.addEventListener('DOMContentLoaded', () => {
  // Устанавливаем дату свадьбы
  const weddingDate = new Date("July 11, 2025 10:00:00").getTime();

  // Обновляем таймер каждую секунду
  const countdownTimer = setInterval(function () {
      const now = new Date().getTime();
      const timeLeft = weddingDate - now;

      if (timeLeft <= 0) {
          document.getElementById("countdown").innerHTML = "Сегодня день свадьбы! 🎉";
          clearInterval(countdownTimer);
          return;
      }

      // Вычисляем дни, часы, минуты и секунды
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      document.getElementById("countdown").innerHTML = `
          До свадьбы осталось: 
          <strong>${days} дней ${hours} часов ${minutes} минут ${seconds} секунд</strong>
      `;
  }, 1000);

  // Анимация появления текста
  const fadeIns = document.querySelectorAll('.fade-in');
  const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
      entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('visible');
          appearOnScroll.unobserve(entry.target);
      });
  }, { threshold: 0.5 });

  fadeIns.forEach(fadeIn => {
      appearOnScroll.observe(fadeIn);
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    // Блок для анимации появления текста
    const fadeElements = document.querySelectorAll('.fade-in'); // Все элементы с классом .fade-in

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.classList.remove('fade-out');
            } else {
                const rect = entry.boundingClientRect;
                const screenHeight = window.innerHeight;

                if (rect.top < screenHeight * 0.7) {
                    const visibilityFactor = (screenHeight - rect.top) / (screenHeight * 0.3);
                    const opacity = Math.max(0, visibilityFactor);
                    entry.target.style.opacity = opacity.toString();
                    entry.target.style.transform = `translateY(${(1 - opacity) * 20}px)`;
                }
            }
        });
    }, { threshold: [0, 1] });

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Блок для стрелки скролла
    const scrollArrow = document.querySelector('.scroll-arrow');
    let lastScrollPosition = 0;
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

        lastScrollPosition = scrollTop;
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

    // Инициализация
    checkScrollPosition();
    resetTimeout();
});


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