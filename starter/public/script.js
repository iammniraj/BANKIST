'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');

const section1 = document.querySelector('#section--1');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const nav = document.querySelector('.nav');

const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabContent = document.querySelectorAll('.operations__content');

const modalPopup = function () {
  const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  };

  const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
  };
  btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

  // for (let i = 0; i < btnsOpenModal.length; i++)
  //   btnsOpenModal[i].addEventListener('click', openModal);

  btnCloseModal.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
};
modalPopup();

document.querySelector('.btn-login').addEventListener('click', function () {
  document.querySelector('.modal1').classList.remove('hidden');
  overlay.classList.remove('hidden');

  console.log('hii');
});
document
  .querySelector('.btn--close-modal1')
  .addEventListener('click', function () {
    document.querySelector('.modal1').classList.add('hidden');
    overlay.classList.add('hidden');
    // console.log('hii');
  });
/* -------------------------------------------------------------------------- */
/*                             SECTION NAVIGATION                             */
/* -------------------------------------------------------------------------- */

/* -------------------------- Adding smooth scroll -------------------------- */
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // console.log(e.target);
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    // console.log(id);

    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

/* ------------------------ Fading out link on hover ------------------------ */

document.querySelectorAll('.nav__item');

const handelEvent = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
      logo.style.opacity = this;
    });
  }
};

nav.addEventListener('mouseover', handelEvent.bind(0.5));

nav.addEventListener('mouseout', handelEvent.bind(1));

/* -------------------------------------------------------------------------- */
/*                              LEARN MORE BUTTON                             */
/* -------------------------------------------------------------------------- */
btnScrollTo.addEventListener('click', function () {
  // const s1cords = section1.getBoundingClientRect();
  // console.log(s1cords);
  // console.log('Cureent scrolll (x/y) ', window.pageXOffset, window.pageYOffset);
  // window.scrollTo(s1cords.left, s1cords.top + window.pageYOffset);

  section1.scrollIntoView({ behavior: 'smooth' });
});

/* -------------------------------------------------------------------------- */
/*                     SECTION    TAB CONTAINER                               */
/* -------------------------------------------------------------------------- */

tabsContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');
  //Guard clause
  if (!clicked) return;

  //  removing active classes
  tabs.forEach(elm => elm.classList.remove('operations__tab--active'));
  tabContent.forEach(t => t.classList.remove('operations__content--active'));

  // Adding current active tab
  clicked.classList.add('operations__tab--active');

  // Displaying content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

/* -------------------------------------------------------------------------- */
/*                             SECTION STICKY NAV                             */
/* -------------------------------------------------------------------------- */
const header = document.querySelector('.header');

const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);
const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};
const options = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};
const navObserver = new IntersectionObserver(stickyNav, options);
navObserver.observe(header);

/* -------------------------------------------------------------------------- */
/*                     SECTION REVEALING SECTION ON SCROLL                    */
/* -------------------------------------------------------------------------- */
const allSection = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const option = {
  root: null,
  threshold: 0.2,
};

const sectionObserver = new IntersectionObserver(revealSection, option);
allSection.forEach(sec => {
  sectionObserver.observe(sec);
  sec.classList.add('section--hidden');
});

/* -------------------------------------------------------------------------- */
/*                          SECTION LAZY LOADED IMAGE                         */
/* -------------------------------------------------------------------------- */

const imageTarget = document.querySelectorAll('img[data-src]');
// console.log(imageTarget);
const lazyImage = function (entries, observer) {
  // console.log(entries);
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(lazyImage, {
  root: null,
  threshold: 0.1,
  rootMargin: '-190px',
});
imageTarget.forEach(img => imageObserver.observe(img));

/* -------------------------------------------------------------------------- */
/*                               SECTION SLIDER                               */
/* -------------------------------------------------------------------------- */
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const left = document.querySelector('.slider__btn--left');
  const right = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');
  console.log(slides);
  // const slider = document.querySelector('.slider');
  // slider.style.transform = `scale(0.3) translateX(-1700px)`;
  // slider.style.overflow = 'visible';
  let currentSlide = 0;
  const maxSlide = slides.length - 1;
  // slides.forEach((img, i) => (img.style.transform = `translateX(${i * 100}%)`));
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const gotoSlide = function (slide) {
    slides.forEach((img, i) => {
      console.log(i, currentSlide);
      return (img.style.transform = `translateX(${100 * (i - slide)}%)`);
    });
  };

  /* ------------------------------- Next Slide ------------------------------- */
  const nextSlide = function () {
    if (currentSlide === maxSlide) {
      currentSlide = 0;
    } else {
      currentSlide += 1;
    }
    gotoSlide(currentSlide);
    activateDot(currentSlide);
  };
  /* ----------------------------- Previous Slide ----------------------------- */
  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide;
    } else {
      currentSlide--;
    }
    gotoSlide(currentSlide);
    activateDot(currentSlide);
  };

  const init = function () {
    gotoSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  right.addEventListener('click', nextSlide);
  left.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    console.log(e.key);
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      console.log(e);
      const { slide } = e.target.dataset;
      gotoSlide(slide);
      activateDot(currentSlide);
    }
  });
};
slider();
/*
const header = document.querySelector('.header');
const message = document.createElement('div');
message.classList.add('cookie-message');

message.innerHTML =
  'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// header.append(message);
// header.prepend(message);

// header.before(message);
header.after(message);

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

const h1 = document.querySelector('h1');

const aletr1 = function () {
  // alert('Hii');
  // h1.removeEventListener('mouseenter', aletr1);
};

h1.addEventListener('mouseenter', aletr1);

setTimeout(() => {
  h1.removeEventListener('mouseenter', aletr1);
}, 6000);

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  console.log('Link', e.target, e.currentTarget);
  this.style.backgroundColor = randomColor();
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log('conatainer', e.target, e.currentTarget);
  this.style.backgroundColor = randomColor();
});
document.querySelector('.nav').addEventListener('click', function (e) {
  console.log('nav', e.target, e.currentTarget);
  this.style.backgroundColor = randomColor();
});

// document.documentElement.addEventListener('click', function () {
//   this.style.backgroundColor = randomColor();
// });
*/
