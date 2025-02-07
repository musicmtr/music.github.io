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