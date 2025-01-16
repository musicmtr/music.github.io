document.addEventListener("wheel", (event) => {
    const sections = document.querySelectorAll(".section");
    let currentSection = Math.round(window.scrollY / window.innerHeight);
    if (event.deltaY > 0 && currentSection < sections.length - 1) {
      window.scrollTo({ top: window.innerHeight * (currentSection + 1), behavior: "smooth" });
    } else if (event.deltaY < 0 && currentSection > 0) {
      window.scrollTo({ top: window.innerHeight * (currentSection - 1), behavior: "smooth" });
    }
  });
  