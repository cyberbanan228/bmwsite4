// === GLOBAL THEME CHANGE FUNCTION ===
function changeTheme(theme) {
  console.log('🎨 changeTheme called with:', theme);
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  
  // Update active button
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-theme') === theme) {
      btn.classList.add('active');
    }
  });
  
  console.log('✅ Theme changed successfully to:', theme);
}

// === INITIALIZE THEME IMMEDIATELY ===
console.log('✅ Script loaded - initializing theme system');
(function() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  console.log('✅ Theme applied on page load:', savedTheme);
})();

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ DOMContentLoaded event fired');
  
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('nav');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }

  // Close menu when link is clicked
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
    });
  });

  // === THEME SELECTOR (5 THEMES) ===
  const themeButtons = document.querySelectorAll('.theme-btn');
  console.log('🔘 Theme buttons found:', themeButtons.length);
  
  if (themeButtons.length > 0) {
    // Загружаем сохраненную тему
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    console.log('📍 Applied theme:', savedTheme);
    
    // Устанавливаем активную кнопку
    themeButtons.forEach(btn => {
      const btnTheme = btn.getAttribute('data-theme');
      if (btnTheme === savedTheme) {
        btn.classList.add('active');
        console.log('✅ Activated button for theme:', btnTheme);
      }
    });
  }

  // Обработчик клика - на document level для гарантии
  document.addEventListener('click', (e) => {
    if (e.target.classList && e.target.classList.contains('theme-btn')) {
      e.stopPropagation();
      e.preventDefault();
      const theme = e.target.getAttribute('data-theme');
      console.log('🎨 Clicked theme button:', theme);
      
      // Обновляем тему в HTML
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      console.log('✨ Theme changed to:', theme);
      
      // Обновляем активную кнопку
      document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
    }
  }, true);  // Capture phase для гарантии

  // === GALLERY FILTER (с document event listener) ===
  document.addEventListener('click', (e) => {
    if (e.target.classList && e.target.classList.contains('filter-btn')) {
      const filter = e.target.getAttribute('data-filter');
      console.log('🔍 Filter clicked:', filter);
      
      // Обновляем активную кнопку фильтра
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      
      // Фильтруем галерею
      const galleryItems = document.querySelectorAll('.gallery-item');
      galleryItems.forEach(item => {
        if (filter === 'all') {
          item.style.display = 'block';
          setTimeout(() => item.style.opacity = '1', 10);
          item.style.transition = 'opacity 0.3s ease';
        } else {
          const categories = item.getAttribute('data-category').split(',');
          if (categories.includes(filter)) {
            item.style.display = 'block';
            setTimeout(() => item.style.opacity = '1', 10);
            item.style.transition = 'opacity 0.3s ease';
          } else {
            item.style.opacity = '0';
            setTimeout(() => item.style.display = 'none', 300);
          }
        }
      });
    }
  }, true);  // Capture phase

  // Scroll to top button
  const scrollBtn = document.querySelector('.scroll-to-top');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        scrollBtn.classList.add('show');
      } else {
        scrollBtn.classList.remove('show');
      }
    });

    scrollBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Intersection Observer для анимации элементов
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Различные анимации для разных элементов
        const animationTypes = ['fade-in', 'slide-up', 'zoom-in', 'rotate-in', 'bounce-in', 'fade-scale'];
        const animationType = animationTypes[index % animationTypes.length];
        entry.target.classList.add(animationType);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all cards
  document.querySelectorAll('.card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
  });

  // Observe timeline items
  document.querySelectorAll('.timeline-item').forEach((item, index) => {
    const animationTypes = ['slide-in-left', 'slide-in-right'];
    item.classList.add(animationTypes[index % 2]);
    observer.observe(item);
  });

  // Observe gallery items
  document.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.15}s`;
    item.classList.add('fade-scale');
    item.style.animation = 'fadeScale 0.8s ease-out';
    item.style.animationDelay = `${index * 0.15}s`;
    item.style.animationFillMode = 'both';
    observer.observe(item);
  });

  // Observe other sections
  document.querySelectorAll('section').forEach(section => {
    if (!section.classList.contains('hero')) {
      observer.observe(section);
    }
  });

  // Search functionality
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const cards = document.querySelectorAll('.card');
      
      cards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const text = card.querySelector('.card-text').textContent.toLowerCase();
        
        if (title.includes(query) || text.includes(query)) {
          card.style.display = 'block';
          card.style.animation = 'cardSlide 0.6s ease-out';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // Filter by year
  const filterButtons = document.querySelectorAll('.filter-btn');
  if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        const cards = document.querySelectorAll('.card');
        
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        cards.forEach(card => {
          if (filter === 'all' || card.dataset.year === filter) {
            card.style.display = 'block';
            card.style.animation = 'cardSlide 0.6s ease-out';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Image gallery lightbox
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length > 0) {
    galleryItems.forEach(item => {
      item.addEventListener('mouseover', () => {
        item.style.animation = 'glow 0.6s ease';
      });
      
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const modal = createModal(img.src);
        document.body.appendChild(modal);
      });
    });
  }

  // Smooth page transitions
  const links = document.querySelectorAll('a[href^="./"]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      if (!link.target || link.target === '_self') {
        e.preventDefault();
        fadeOutPage(() => {
          window.location.href = link.href;
        });
      }
    });
  });

  // Counter animation
  animateCounters();

  // Parallax effect
  window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    parallaxElements.forEach(el => {
      const scrollPosition = window.scrollY;
      el.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    });
  });
});

// Create modal for gallery
function createModal(src) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <img src="${src}" alt="Gallery image">
    </div>
  `;
  
  modal.style.cssText = `
    position: fixed;
    z-index: 2000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s ease;
    backdrop-filter: blur(4px);
  `;

  const closeBtn = modal.querySelector('.close');
  closeBtn.style.cssText = `
    position: absolute;
    top: 20px;
    right: 30px;
    color: #dc0000;
    font-size: 40px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-shadow: 0 0 10px rgba(220, 0, 0, 0.5);
  `;

  closeBtn.addEventListener('click', () => {
    modal.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => modal.remove(), 300);
  });
  closeBtn.addEventListener('mouseover', () => {
    closeBtn.style.color = '#ff3333';
    closeBtn.style.transform = 'scale(1.2) rotate(90deg)';
    closeBtn.style.textShadow = '0 0 20px rgba(220, 0, 0, 0.8)';
  });
  closeBtn.addEventListener('mouseout', () => {
    closeBtn.style.color = '#dc0000';
    closeBtn.style.transform = 'scale(1) rotate(0deg)';
    closeBtn.style.textShadow = '0 0 10px rgba(220, 0, 0, 0.5)';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.animation = 'fadeOut 0.3s ease';
      setTimeout(() => modal.remove(), 300);
    }
  });

  return modal;
}

// Animate counters
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target);
    const increment = target / 50;
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current);
        setTimeout(updateCounter, 30);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  });
}

// Page fade out transition
function fadeOutPage(callback) {
  const fadeOut = document.createElement('div');
  fadeOut.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--primary-blue);
    animation: fadeInOut 0.5s ease-in-out;
    z-index: 9999;
  `;
  
  document.body.appendChild(fadeOut);
  
  setTimeout(callback, 250);
}

// Add CSS for fadeInOut animation if not present
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInOut {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
