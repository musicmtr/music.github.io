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
    const fadeElements = document.querySelectorAll('.fade-in'); // Все элементы с классом .fade-in

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Если элемент виден, показываем его
                entry.target.style.opacity = '1'; // Полная видимость
                entry.target.style.transform = 'translateY(0)'; // Возвращаем на место
                entry.target.classList.add('visible');
            } else {
                // Рассчитываем степень видимости
                const rect = entry.boundingClientRect;
                const topPosition = rect.top; // Расстояние от верха экрана до элемента
                const screenHeight = window.innerHeight; // Высота экрана

                // Начинаем скрывать элемент, когда он находится выше определённой точки
                if (topPosition < screenHeight * 0.8) { // 80% высоты экрана
                    const visibilityFactor = (screenHeight - topPosition) / (screenHeight * 0.3); // Пропорциональное исчезновение
                    const opacity = Math.max(0, visibilityFactor); // Ограничиваем значение между 0 и 1
                    entry.target.style.opacity = opacity.toString(); // Устанавливаем прозрачность
                    entry.target.style.transform = `translateY(${(1 - opacity) * 20}px)`; // Сдвигаем вверх
                }
            }
        });
    }, { threshold: [0, 1] }); // Отслеживаем полную видимость

    // Наблюдаем за каждым элементом
    fadeElements.forEach(element => {
        observer.observe(element);
    });
});

document.addEventListener('DOMContentLoaded', () => {
  const scrollArrow = document.querySelector('.scroll-arrow');
  let lastScrollPosition = 0; // Последняя позиция прокрутки
  let isAtBottom = false; // Флаг для проверки достижения конца страницы

  // Проверяем, достигнут ли конец страницы
  function checkScrollPosition() {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Если скроллим вниз или достигли конца страницы
      if (scrollTop > lastScrollPosition || scrollTop + windowHeight >= documentHeight) {
          scrollArrow.style.opacity = '0'; // Стрелка исчезает
          scrollArrow.style.pointerEvents = 'none'; // Отключаем взаимодействие
          isAtBottom = true;
      } else {
          scrollArrow.style.opacity = '0.8'; // Стрелка появляется
          scrollArrow.style.pointerEvents = 'auto';
          isAtBottom = false;
      }

      lastScrollPosition = scrollTop;
  }

  // Запускаем проверку при прокрутке
  window.addEventListener('scroll', () => {
      checkScrollPosition();
  });

  // Автоматическое исчезновение через 10 секунд без действия
  let timeoutId;
  function resetTimeout() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
          if (!isAtBottom) {
              scrollArrow.style.opacity = '0'; // Стрелка исчезает
              scrollArrow.style.pointerEvents = 'none';
          }
      }, 10000); // 10 секунд
  }

  // Сбрасываем таймер при прокрутке
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