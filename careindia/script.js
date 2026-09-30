/* =====================================================
   CAREINDIA - JAVASCRIPT
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ===================================================
     ELEMENTS
     =================================================== */

  const navbar = document.getElementById("navbar");
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const scrollTop = document.getElementById("scrollTop");

  const appointmentModal =
    document.getElementById("appointmentModal");

  const serviceModal =
    document.getElementById("serviceModal");

  const appointmentForm =
    document.getElementById("appointmentForm");

  const appointmentSuccess =
    document.getElementById("appointmentSuccess");

  const appointmentDate =
    document.getElementById("appointmentDate");


  /* ===================================================
     NAVBAR SCROLL EFFECT
     =================================================== */

  function handleScroll() {

    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    if (window.scrollY > 500) {
      scrollTop.classList.add("show");
    } else {
      scrollTop.classList.remove("show");
    }

  }

  window.addEventListener("scroll", handleScroll);

  handleScroll();


  /* ===================================================
     MOBILE MENU
     =================================================== */

  menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("open");

    const icon = menuToggle.querySelector("i");

    if (navMenu.classList.contains("open")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-xmark");
    } else {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }

  });


  /* Close mobile menu after navigation */

  document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

      navMenu.classList.remove("open");

      const icon = menuToggle.querySelector("i");

      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");

    });

  });


  /* ===================================================
     ACTIVE NAVIGATION
     =================================================== */

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }

    });

    navLinks.forEach(link => {

      link.classList.remove("active");

      if (
        link.getAttribute("href") === "#" + currentSection
      ) {
        link.classList.add("active");
      }

    });

  });


  /* ===================================================
     SCROLL TO TOP
     =================================================== */

  scrollTop.addEventListener("click", () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });


  /* ===================================================
     SET MINIMUM APPOINTMENT DATE
     =================================================== */

  if (appointmentDate) {

    const today = new Date();

    const year = today.getFullYear();
    const month =
      String(today.getMonth() + 1).padStart(2, "0");
    const day =
      String(today.getDate()).padStart(2, "0");

    appointmentDate.min =
      `${year}-${month}-${day}`;

  }


  /* ===================================================
     SERVICE SEARCH
     =================================================== */

  const serviceSearch =
    document.getElementById("serviceSearch");

  const serviceCards =
    document.querySelectorAll(".service-card");

  if (serviceSearch) {

    serviceSearch.addEventListener("input", () => {

      const searchValue =
        serviceSearch.value.toLowerCase().trim();

      serviceCards.forEach(card => {

        const service =
          card.dataset.service.toLowerCase();

        if (service.includes(searchValue)) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }

      });

    });

  }


  /* ===================================================
     DOCTOR FILTER
     =================================================== */

  const filterButtons =
    document.querySelectorAll(".filter-btn");

  const doctorCards =
    document.querySelectorAll(".doctor-card");

  filterButtons.forEach(button => {

    button.addEventListener("click", () => {

      filterButtons.forEach(btn => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      const filter =
        button.dataset.filter;

      doctorCards.forEach(card => {

        const category =
          card.dataset.category;

        if (
          filter === "all" ||
          category === filter
        ) {
          card.classList.remove("hide");
        } else {
          card.classList.add("hide");
        }

      });

    });

  });


  /* ===================================================
     FAQ ACCORDION
     =================================================== */

  const faqItems =
    document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {

    const question =
      item.querySelector(".faq-question");

    const answer =
      item.querySelector(".faq-answer");

    question.addEventListener("click", () => {

      faqItems.forEach(otherItem => {

        if (otherItem !== item) {

          otherItem.classList.remove("open");

          const otherAnswer =
            otherItem.querySelector(".faq-answer");

          otherAnswer.style.maxHeight = null;

        }

      });


      item.classList.toggle("open");

      if (item.classList.contains("open")) {

        answer.style.maxHeight =
          answer.scrollHeight + "px";

      } else {

        answer.style.maxHeight = null;

      }

    });

  });


  /* ===================================================
     TESTIMONIALS
     =================================================== */

  const testimonials = [

    {
      name: "Anjali Kumar",
      initials: "AK",
      service: "General Consultation",
      text:
        "CAREINDIA made my appointment experience simple and comfortable. The doctors were professional and caring."
    },

    {
      name: "Ravi Menon",
      initials: "RM",
      service: "Cardiology",
      text:
        "The team was extremely helpful and professional. I felt comfortable throughout my consultation."
    },

    {
      name: "Meera Shah",
      initials: "MS",
      service: "Dental Care",
      text:
        "The dental care team was friendly, professional, and explained everything clearly. Highly recommended."
    },

    {
      name: "Arun Kumar",
      initials: "AK",
      service: "Mental Wellness",
      text:
        "CAREINDIA provided a comfortable and supportive environment. The experience was reassuring and positive."
    }

  ];

  let testimonialIndex = 0;

  const testimonialText =
    document.getElementById("testimonialText");

  const patientName =
    document.getElementById("patientName");

  const patientService =
    document.getElementById("patientService");

  const patientAvatar =
    document.getElementById("patientAvatar");

  const sliderDots =
    document.getElementById("sliderDots");

  const prevTestimonial =
    document.getElementById("prevTestimonial");

  const nextTestimonial =
    document.getElementById("nextTestimonial");


  function createDots() {

    testimonials.forEach((_, index) => {

      const dot =
        document.createElement("button");

      dot.classList.add("slider-dot");

      if (index === 0) {
        dot.classList.add("active");
      }

      dot.addEventListener("click", () => {

        testimonialIndex = index;

        updateTestimonial();

      });

      sliderDots.appendChild(dot);

    });

  }


  function updateTestimonial() {

    const testimonial =
      testimonials[testimonialIndex];

    testimonialText.textContent =
      `"${testimonial.text}"`;

    patientName.textContent =
      testimonial.name;

    patientService.textContent =
      testimonial.service;

    patientAvatar.textContent =
      testimonial.initials;

    document
      .querySelectorAll(".slider-dot")
      .forEach((dot, index) => {

        dot.classList.toggle(
          "active",
          index === testimonialIndex
        );

      });

  }


  if (sliderDots) {

    createDots();

  }


  if (nextTestimonial) {

    nextTestimonial.addEventListener("click", () => {

      testimonialIndex++;

      if (
        testimonialIndex >= testimonials.length
      ) {
        testimonialIndex = 0;
      }

      updateTestimonial();

    });

  }


  if (prevTestimonial) {

    prevTestimonial.addEventListener("click", () => {

      testimonialIndex--;

      if (testimonialIndex < 0) {
        testimonialIndex =
          testimonials.length - 1;
      }

      updateTestimonial();

    });

  }


  /* ===================================================
     AUTO TESTIMONIAL
     =================================================== */

  setInterval(() => {

    testimonialIndex++;

    if (
      testimonialIndex >= testimonials.length
    ) {
      testimonialIndex = 0;
    }

    updateTestimonial();

  }, 7000);


  /* ===================================================
     COUNTER ANIMATION
     =================================================== */

  const counters =
    document.querySelectorAll(".counter");

  let countersStarted = false;

  function animateCounters() {

    if (countersStarted) return;

    const statsSection =
      document.querySelector(".stats-section");

    if (!statsSection) return;

    const position =
      statsSection.getBoundingClientRect().top;

    if (
      position <
      window.innerHeight - 100
    ) {

      countersStarted = true;

      counters.forEach(counter => {

        const target =
          Number(counter.dataset.target);

        let current = 0;

        const increment =
          Math.max(1, Math.ceil(target / 70));

        const timer =
          setInterval(() => {

            current += increment;

            if (current >= target) {

              current = target;

              clearInterval(timer);

            }

            counter.textContent =
              current.toLocaleString();

          }, 20);

      });

    }

  }

  window.addEventListener(
    "scroll",
    animateCounters
  );

  animateCounters();


  /* ===================================================
     SCROLL REVEAL
     =================================================== */

  const revealElements =
    document.querySelectorAll(
      ".service-card, .why-card, .doctor-card, .contact-card, .faq-item"
    );

  revealElements.forEach(element => {
    element.classList.add("reveal");
  });


  const revealObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            revealObserver.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach(element => {
    revealObserver.observe(element);
  });


  /* ===================================================
     CONTACT FORM
     =================================================== */

  const contactForm =
    document.getElementById("contactForm");

  const contactSuccess =
    document.getElementById("contactSuccess");

  if (contactForm) {

    contactForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();

        const submitButton =
          contactForm.querySelector(
            ".form-submit"
          );

        submitButton.disabled = true;

        submitButton.innerHTML =
          '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';


        setTimeout(() => {

          contactSuccess.classList.add("show");

          submitButton.disabled = false;

          submitButton.innerHTML =
            'Submit Appointment Request <i class="fa-solid fa-arrow-right"></i>';

          contactForm.reset();

        }, 900);

      }
    );

  }


  /* ===================================================
     APPOINTMENT FORM
     =================================================== */

  if (appointmentForm) {

    appointmentForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();

        const submitButton =
          appointmentForm.querySelector(
            ".form-submit"
          );

        submitButton.disabled = true;

        submitButton.innerHTML =
          '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';


        setTimeout(() => {

          appointmentForm.classList.add("hidden");

          appointmentSuccess.classList.add("show");

          submitButton.disabled = false;

        }, 1000);

      }
    );

  }


  /* ===================================================
     ESC KEY CLOSE MODALS
     =================================================== */

  document.addEventListener(
    "keydown",
    event => {

      if (event.key === "Escape") {

        closeAppointment();

        closeService();

      }

    }
  );

});


/* =====================================================
   APPOINTMENT MODAL
   ===================================================== */

function openAppointment(doctorName = "") {

  const modal =
    document.getElementById(
      "appointmentModal"
    );

  const form =
    document.getElementById(
      "appointmentForm"
    );

  const success =
    document.getElementById(
      "appointmentSuccess"
    );

  const doctorSelect =
    document.getElementById(
      "doctorSelect"
    );


  modal.classList.add("show");

  document.body.classList.add("modal-open");

  form.classList.remove("hidden");

  success.classList.remove("show");


  if (doctorName && doctorSelect) {

    doctorSelect.value = doctorName;

  }

}


/* =====================================================
   CLOSE APPOINTMENT
   ===================================================== */

function closeAppointment() {

  const modal =
    document.getElementById(
      "appointmentModal"
    );

  modal.classList.remove("show");

  document.body.classList.remove("modal-open");

}


/* =====================================================
   SERVICE MODAL
   ===================================================== */

function openService(serviceName) {

  const modal =
    document.getElementById(
      "serviceModal"
    );

  const title =
    document.getElementById(
      "serviceModalTitle"
    );

  const text =
    document.getElementById(
      "serviceModalText"
    );


  const descriptions = {

    "General Consultation":
      "Our general consultation service provides professional medical evaluation, health advice, preventive care, and personalized treatment guidance.",

    "Cardiology":
      "Our cardiology service focuses on heart health, cardiovascular evaluation, monitoring, diagnosis, and personalized treatment planning.",

    "Dental Care":
      "Our dental care service focuses on preventive care, oral health, dental examinations, treatments, and maintaining a healthy smile.",

    "Mental Wellness":
      "Our mental wellness service provides compassionate support for emotional wellbeing, stress management, anxiety, and other mental health concerns."

  };


  title.textContent =
    serviceName;

  text.textContent =
    descriptions[serviceName] ||
    "CAREINDIA provides compassionate healthcare services designed around your individual needs.";


  modal.classList.add("show");

  document.body.classList.add("modal-open");

}


/* =====================================================
   CLOSE SERVICE MODAL
   ===================================================== */

function closeService() {

  const modal =
    document.getElementById(
      "serviceModal"
    );

  modal.classList.remove("show");

  document.body.classList.remove("modal-open");

}