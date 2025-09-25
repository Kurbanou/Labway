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

document.addEventListener("DOMContentLoaded", () => {
  let lastScrollTop = 0;
  const body = document.body;

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop < lastScrollTop && scrollTop > 110) {
      body.classList.add("scroll-up");
    } else {
      body.classList.remove("scroll-up");
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
});
