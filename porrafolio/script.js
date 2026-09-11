// MENÚ HAMBURGUESA
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');

hamburger.addEventListener('click', () => {
  navList.classList.toggle('active');
});

// CERRAR MENÚ AL HACER CLICK EN UN ENLACE
document.querySelectorAll('.nav-list a').forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('active');
  });
});

// ANIMACIÓN DE BARRAS DE HABILIDADES
const skillsSection = document.querySelector('#habilidades');
const progressBars = document.querySelectorAll('.skill-progress');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

observer.observe(skillsSection);

// VALIDACIÓN DE FORMULARIO EN TIEMPO REAL
const form = document.getElementById('contact-form');
const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const mensaje = document.getElementById('mensaje');

function showError(input, message) {
  const group = input.closest('.form-group');
  const error = group.querySelector('.error-msg');
  error.textContent = message;
  input.style.borderColor = '#ef4444';
}

function clearError(input) {
  const group = input.closest('.form-group');
  const error = group.querySelector('.error-msg');
  error.textContent = '';
  input.style.borderColor = '#e5e7eb';
}

// Validaciones en tiempo real
nombre.addEventListener('input', () => {
  if (nombre.value.trim().length < 2) {
    showError(nombre, 'El nombre debe tener al menos 2 caracteres.');
  } else {
    clearError(nombre);
  }
});

email.addEventListener('input', () => {
  const emailRegex = /^[^s@]+@[^s@]+.[^s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    showError(email, 'Ingresa un email válido (ej: tu@correo.com).');
  } else {
    clearError(email);
  }
});

mensaje.addEventListener('input', () => {
  if (mensaje.value.trim().length < 10) {
    showError(mensaje, 'El mensaje debe tener al menos 10 caracteres.');
  } else {
    clearError(mensaje);
  }
});

// VALIDACIÓN AL ENVIAR
form.addEventListener('submit', e => {
  e.preventDefault();

  let isValid = true;

  if (nombre.value.trim().length < 2) {
    showError(nombre, 'El nombre debe tener al menos 2 caracteres.');
    isValid = false;
  }

  const emailRegex = /^[^s@]+@[^s@]+.[^s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    showError(email, 'Ingresa un email válido.');
    isValid = false;
  }

  if (mensaje.value.trim().length < 10) {
    showError(mensaje, 'El mensaje debe tener al menos 10 caracteres.');
    isValid = false;
  }

  if (isValid) {
    alert('¡Formulario enviado con éxito! (demo)');
    form.reset();
    [nombre, email, mensaje].forEach(input => clearError(input));
  }
});