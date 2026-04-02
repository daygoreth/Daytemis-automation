/* ============================================
   DAYTEMIS.COM - Futuristic Interactions
   Compatible con Woodmart Theme + Elementor
   ============================================ */

(function () {
  'use strict';

  // Esperar a que el DOM esté listo
  document.addEventListener('DOMContentLoaded', function () {
    // Añadir clase al body
    document.body.classList.add('daytemis-futuristic');

    initPreloader();
    initScrollAnimations();
    initParticleBackground();
    initCustomCursor();
    initMagneticButtons();
    initSmoothCounters();
    initTiltCards();
    initTextTyping();
  });

  /* ---- PRELOADER ---- */
  function initPreloader() {
    var preloader = document.createElement('div');
    preloader.className = 'dt-preloader';
    preloader.innerHTML = '<div class="dt-preloader-ring"></div>';
    document.body.prepend(preloader);

    window.addEventListener('load', function () {
      setTimeout(function () {
        preloader.classList.add('dt-loaded');
        setTimeout(function () {
          preloader.remove();
        }, 600);
      }, 500);
    });
  }

  /* ---- SCROLL ANIMATIONS (Intersection Observer) ---- */
  function initScrollAnimations() {
    // Auto-detectar elementos para animar
    var selectors = [
      '.product-grid-item',
      '.woodmart-info-box',
      '.woodmart-banner',
      '.elementor-widget-heading',
      '.elementor-widget-image',
      '.elementor-widget-text-editor',
      '.elementor-widget-button',
      '.category-grid-item',
      '.woodmart-title-wrapper',
      '.footer-widget-area .widget'
    ];

    var elements = document.querySelectorAll(selectors.join(','));

    elements.forEach(function (el, i) {
      if (!el.classList.contains('dt-fade-up') &&
          !el.classList.contains('dt-fade-left') &&
          !el.classList.contains('dt-fade-right') &&
          !el.classList.contains('dt-scale-in')) {
        el.classList.add('dt-fade-up');
        // Escalonar las animaciones
        var delay = (i % 5) + 1;
        el.classList.add('dt-delay-' + delay);
      }
    });

    // Observer
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('dt-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.dt-fade-up, .dt-fade-left, .dt-fade-right, .dt-scale-in').forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---- PARTICLE BACKGROUND ---- */
  function initParticleBackground() {
    var canvas = document.createElement('canvas');
    canvas.id = 'dt-particles';
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;pointer-events:none;opacity:0.6;';
    document.body.prepend(canvas);

    var ctx = canvas.getContext('2d');
    var particles = [];
    var connections = [];
    var mouse = { x: -1000, y: -1000 };
    var particleCount = window.innerWidth < 768 ? 30 : 60;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Crear partículas
    for (var i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        color: i % 3 === 0 ? '0, 240, 255' : i % 3 === 1 ? '123, 47, 255' : '255, 45, 149',
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    document.addEventListener('mousemove', function (e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(function (p, idx) {
        // Movimiento
        p.x += p.vx;
        p.y += p.vy;

        // Rebote en bordes
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Atracción suave al mouse
        var dx = mouse.x - p.x;
        var dy = mouse.y - p.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          p.vx += dx * 0.00005;
          p.vy += dy * 0.00005;
        }

        // Limitar velocidad
        var speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1) {
          p.vx *= 0.99;
          p.vy *= 0.99;
        }

        // Dibujar partícula
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + p.color + ', ' + p.alpha + ')';
        ctx.fill();

        // Conexiones entre partículas cercanas
        for (var j = idx + 1; j < particles.length; j++) {
          var p2 = particles[j];
          var d = Math.sqrt((p.x - p2.x) * (p.x - p2.x) + (p.y - p2.y) * (p.y - p2.y));
          if (d < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = 'rgba(0, 240, 255, ' + (0.1 * (1 - d / 150)) + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animate);
    }

    animate();
  }

  /* ---- CUSTOM CURSOR ---- */
  function initCustomCursor() {
    if (window.innerWidth < 768) return; // No cursor custom en móvil

    var cursor = document.createElement('div');
    cursor.className = 'dt-cursor';
    document.body.appendChild(cursor);

    var dot = document.createElement('div');
    dot.className = 'dt-cursor-dot';
    document.body.appendChild(dot);

    var cursorX = 0, cursorY = 0;
    var dotX = 0, dotY = 0;

    document.addEventListener('mousemove', function (e) {
      cursorX = e.clientX;
      cursorY = e.clientY;
      dot.style.left = cursorX - 3 + 'px';
      dot.style.top = cursorY - 3 + 'px';
    });

    function animateCursor() {
      var dx = cursorX - parseFloat(cursor.style.left || cursorX);
      var dy = cursorY - parseFloat(cursor.style.top || cursorY);

      cursor.style.left = (parseFloat(cursor.style.left || cursorX) + dx * 0.15) - 10 + 'px';
      cursor.style.top = (parseFloat(cursor.style.top || cursorY) + dy * 0.15) - 10 + 'px';

      requestAnimationFrame(animateCursor);
    }

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    animateCursor();

    // Hover effects
    var hoverTargets = document.querySelectorAll('a, button, .product-grid-item, .woodmart-banner, input, .elementor-button');
    hoverTargets.forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        cursor.classList.add('dt-cursor-hover');
      });
      el.addEventListener('mouseleave', function () {
        cursor.classList.remove('dt-cursor-hover');
      });
    });

    // Ocultar cursor por defecto
    document.body.style.cursor = 'none';
    document.querySelectorAll('a, button').forEach(function (el) {
      el.style.cursor = 'none';
    });
  }

  /* ---- MAGNETIC BUTTONS ---- */
  function initMagneticButtons() {
    if (window.innerWidth < 768) return;

    var buttons = document.querySelectorAll('.elementor-button, .btn-color-primary, .single_add_to_cart_button, .dt-btn');

    buttons.forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = 'translate(' + (x * 0.2) + 'px, ' + (y * 0.2) + 'px)';
      });

      btn.addEventListener('mouseleave', function () {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  }

  /* ---- SMOOTH COUNTERS ---- */
  function initSmoothCounters() {
    var counters = document.querySelectorAll('.elementor-counter-number');

    if (counters.length === 0) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.getAttribute('data-to-value') || el.textContent);
          var duration = 2000;
          var start = 0;
          var startTime = null;

          function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out cubic
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);
            if (progress < 1) {
              requestAnimationFrame(step);
            }
          }

          requestAnimationFrame(step);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (c) { observer.observe(c); });
  }

  /* ---- TILT CARDS (3D hover) ---- */
  function initTiltCards() {
    if (window.innerWidth < 768) return;

    var cards = document.querySelectorAll('.product-grid-item, .woodmart-info-box');

    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width;
        var y = (e.clientY - rect.top) / rect.height;
        var tiltX = (y - 0.5) * 10;
        var tiltY = (x - 0.5) * -10;

        card.style.transform = 'perspective(1000px) rotateX(' + tiltX + 'deg) rotateY(' + tiltY + 'deg) translateY(-4px)';
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        card.style.transition = 'transform 0.5s ease';
      });

      card.addEventListener('mouseenter', function () {
        card.style.transition = 'transform 0.1s ease';
      });
    });
  }

  /* ---- TEXT TYPING EFFECT ---- */
  function initTextTyping() {
    var elements = document.querySelectorAll('.dt-typing');

    elements.forEach(function (el) {
      var texts = (el.getAttribute('data-texts') || el.textContent).split('|');
      var currentIndex = 0;
      var currentText = '';
      var charIndex = 0;
      var isDeleting = false;
      var typingSpeed = 80;

      function type() {
        var fullText = texts[currentIndex];

        if (isDeleting) {
          currentText = fullText.substring(0, charIndex - 1);
          charIndex--;
          typingSpeed = 40;
        } else {
          currentText = fullText.substring(0, charIndex + 1);
          charIndex++;
          typingSpeed = 80;
        }

        el.textContent = currentText;

        if (!isDeleting && charIndex === fullText.length) {
          typingSpeed = 2000; // Pausa
          isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          currentIndex = (currentIndex + 1) % texts.length;
          typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
      }

      type();
    });
  }

})();
