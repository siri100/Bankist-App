'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');


///////////////////////////////////////
// Modal window

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

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
//ScrollintoView(Learn More button)
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();

  console.log(s1coords);
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
//Page navigation

// document.querySelectorAll('.nav__link').forEach(function(el){
//   el.addEventListener('click' , function(e){
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({behavior : 'smooth'});
//   })
// });

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
})

//Tabbed component

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  //Guard Clause
  if (!clicked) return;

  //Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //Active tab
  clicked.classList.add('operations__tab--active');

  //Activate content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
})

//Menu fade animation
const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
}

nav.addEventListener('mouseover', handleHover.bind(0.5))
nav.addEventListener('mouseout', handleHover.bind(1))

//Sticky navigation
// const initialCoords = section1.getBoundingClientRect();


// window.addEventListener('scroll' , function(){
//   if(window.scrollY > initialCoords.top){
//       nav.classList.add('sticky');
//   }else{
//     nav.classList.remove('sticky');
//   }
// })

//Sticky navigation : Intersection observer API

// const obsCallBack = function(entries, observer){
//   entries.forEach(entry => {
//     console.log(entry);
//   })
// }

// const obsOptions = {
//   root : null,
//   threshold : 0.1,
// }

// const observer = new IntersectionObserver(obsCallBack,obsOptions);
// observer.observe(section1);

//Sticky navigation : Intersection observer API
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}


const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
});
headerObserver.observe(header)


//Reveal sections

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
})

//lazy lodaing images

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {

  const [entry] = entries;
  if (!entry.isIntersecting) return;

  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  })
  observer.unobserve(entry.target)
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px'
});

imgTargets.forEach(img => imgObserver.observe(img));

// //Slider
// const slides = document.querySelectorAll('.slide');
// const btnLeft = document.querySelector('.slider__btn--left');
// const btnRight = document.querySelector('.slider__btn--right');
// let currSlide = 0;
// const maxSlide = slide.length;

// slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));

// btnRight.addEventListener('click', function () {
//   if (currSlide === maxSlide - 1) {
//     currSlide = 0;
//   } else {
//     currSlide++;
//   }
//   slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (1 - currSlide)}%)`));

// })

///////////////////////////////////////////////allSections

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);
// console.log(document.querySelector('.header'));
// const allSections = document.querySelectorAll('.section');
// console.log(allSections);
//Creating elements

//Cookie message
// const header = document.querySelector('.header');
// const message = document.createElement('div');
// message.classList.add('cookie-message');

// message.innerHTML = 'We have used cookies for improved funtionality. <button class="btn btn--close--cookie">Got it!</button>';

// header.append(message)

// document.querySelector('.btn--close--cookie').addEventListener('click', function () {
//   message.remove();
// });


//Styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';
// message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary' , 'blue');

// //Arrtibutes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);

// logo.alt = 'Beautiful minimalist logo';
// console.log(logo.getAttribute('designer'));
// logo.setAttribute('company' , 'Bankist');
// console.log(logo.dataset.versionNumber);




//Scrolling
// window.scrollTo(s1coords.left + window.pageXOffset , s1coords.top + window.pageYOffset);

// window.scrollTo({
//   left : s1coords.left + window.pageXOffset , 
//   top : s1coords.top + window.pageYOffset,
//   behavior : 'smooth'
// });

//Event listeners

// const h1 = document.querySelector('h1');

// const alertH1 = function (e) {
//   alert('addEventListense : Hey great job');

// };

// h1.addEventListener('mouseenter', alertH1);
// setTimeout(() => h1.removeEventListener('mouseenter', alertH1) , 3000);

// h1.onmouseenter = function(e){
//   alert('onmouseenter : Hey great job');
// };


  // const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
  // const randomColor = () => `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`;


// const h1 = document.querySelector('h1');
// console.log(h1);

// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = 'red';




document.addEventListener('DOMContentLoaded' , function(e){
  console.log(e);
})

window.addEventListener('load' , function(e){
  console.log(e);
})

window.addEventListener('beforeunloaded' ,function(e){
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
})