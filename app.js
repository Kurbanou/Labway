document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".main_nav");
  const body = document.body;

  const toggleMenu = () => {
    const isActive = burger.classList.toggle("active");
    nav.classList.toggle("active");
    burger.setAttribute("aria-expanded", isActive);

    body.style.overflow = isActive ? "hidden" : "";
  };

  burger.addEventListener("click", toggleMenu);

  // Закрытие меню при клике по ссылке
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (burger.classList.contains("active")) {
        burger.classList.remove("active");
        nav.classList.remove("active");
        burger.setAttribute("aria-expanded", false);
        body.style.overflow = "";
      }
    });
  });
});

// document.addEventListener("DOMContentLoaded", () => {
//   let lastScrollTop = 0;
//   const body = document.body;

//   window.addEventListener("scroll", () => {
//     const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

//     if (scrollTop < lastScrollTop && scrollTop > 110) {
//       body.classList.add("scroll-up");
//     } else {
//       body.classList.remove("scroll-up");
//     }

//     lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
//   });
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const cards = document.querySelectorAll(".service-card");

//   const observer = new IntersectionObserver(
//     (entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add("visible");
//           observer.unobserve(entry.target); // отключаем после появления
//         }
//       });
//     },
//     {
//       threshold: 1, // можно настроить чувствительность
//     }
//   );

//   cards.forEach((card) => observer.observe(card));
// });

document
  .querySelector(".contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const form = this;
    const formData = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: formData,
    })
      .then((response) => response.text())
      .then((text) => {
        if (text.includes("Спасибо")) {
          showPopup();
          form.reset();
        } else {
          alert("Ошибка: " + text);
        }
      })
      .catch((error) => {
        alert("Ошибка отправки: " + error);
      });
  });

function showPopup() {
  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}
