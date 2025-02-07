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
  
      // Вычисляем дни, часы и минуты
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  
      document.getElementById("countdown").innerHTML = `
          <span>До свадьбы осталось:</span>
          <strong>${days} дней ${hours} часов ${minutes} минут</strong>
      `;
  }, 1000);

  // Анимация появления текста
  const fadeIns = document.querySelectorAll('.fade-in');
  const appearOnScroll = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              appearOnScroll.unobserve(entry.target);
          }
      });
  }, { threshold: 0.5 });

  fadeIns.forEach(fadeIn => {
      appearOnScroll.observe(fadeIn);
  });

  // Блок для анимации исчезновения текста
  const fadeElements = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              // Если элемент виден, показываем его
              entry.target.classList.add('visible'); // Добавляем класс visible
              entry.target.classList.remove('fade-out'); // Убираем класс fade-out
              entry.target.style.opacity = ''; // Сбрасываем инлайн-стили
              entry.target.style.transform = ''; // Сбрасываем инлайн-стили
          } else {
              // Если элемент выходит за пределы экрана
              const rect = entry.boundingClientRect;
              const screenHeight = window.innerHeight;
  
              if (rect.top < screenHeight * 0.7) {
                  // Рассчитываем степень видимости
                  const visibilityFactor = (screenHeight - rect.top) / (screenHeight * 0.3);
                  const opacity = Math.max(0, visibilityFactor);
  
                  // Применяем стили пропорционально видимости
                  entry.target.style.opacity = opacity.toString();
                  entry.target.style.transform = `translateY(${(1 - opacity) * 20}px)`;
              } else {
                  // Если элемент полностью вне видимости, сбрасываем стили
                  entry.target.style.opacity = '';
                  entry.target.style.transform = '';
              }
          }
      });
  }, { threshold: [0, 1] }); // Отслеживаем полную видимость
  
  // Наблюдаем за каждым элементом
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