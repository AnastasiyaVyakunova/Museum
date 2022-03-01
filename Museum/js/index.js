//progress-bar
const progress = document.querySelector('.progress');
  
progress.addEventListener('input', function() {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`
})

const progressVolume = document.querySelector('.progress-volume');
  
progressVolume.addEventListener('input', function() {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`
})

//explore-slider
function beforeAfter() {  
  document.getElementById('exp-pic').style.width = document.getElementById('exp-slide').value + "%";
}


//SLIDER
let slider = document.getElementById('welcome-section'),
    sliderItems = document.getElementById('welcome-slides'),
    prev = document.getElementById('control-prev'),
    next = document.getElementById('control-next'),
    squares = document.querySelectorAll('.square'),
    indexContainer = document.getElementById('changer-index');
    

function slide(wrapper, items, prev, next) {
  let posX1 = 0,
      posX2 = 0,
      posInitial,
      posFinal,
      threshold = 100,
      slides = items.getElementsByClassName('welcome-slide'),
      slidesLength = slides.length,
      slideSize = items.getElementsByClassName('welcome-slide')[0].clientWidth,
      firstSlide = slides[0],
      lastSlide = slides[slidesLength - 1],
      cloneFirst = firstSlide.cloneNode(true),
      cloneLast = lastSlide.cloneNode(true),
      index = 0,
      allowShift = true;
      
  
  // Clone first and last slide
  items.appendChild(cloneFirst);
  items.insertBefore(cloneLast, firstSlide);
  wrapper.classList.add('wrapper');
  // Mouse events
  items.onmousedown = dragStart;
  // Touch events
  items.addEventListener('touchstart', dragStart);
  items.addEventListener('touchend', dragEnd);
  items.addEventListener('touchmove', dragAction);
  // Click events
  prev.addEventListener('click', function () { shiftSlide(-1) });
  next.addEventListener('click', function () { shiftSlide(1) });
  squares[0].addEventListener('click', function () { indexShift(0)});
  squares[1].addEventListener('click', function () { indexShift(1)});
  squares[2].addEventListener('click', function () { indexShift(2)});
  squares[3].addEventListener('click', function () { indexShift(3)});
  squares[4].addEventListener('click', function () { indexShift(4)});
  
  
  function indexShift(n)
  {
    let goto = n - index;
    if(goto == 0) return;
    shiftSlide(goto);
  }

  // Transition events
  items.addEventListener('transitionend', checkIndex);
  function dragStart (e) {
    e = e || window.event;
    e.preventDefault();
    posInitial = items.offsetLeft;
    if (e.type == 'touchstart') {
      posX1 = e.touches[0].clientX;
    } else {
      posX1 = e.clientX;
      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;
    }
  }
  function dragAction (e) {
    e = e || window.event;
    if (e.type == 'touchmove') {
      posX2 = posX1 - e.touches[0].clientX;
      posX1 = e.touches[0].clientX;
    } else {
      posX2 = posX1 - e.clientX;
      posX1 = e.clientX;
    }
    items.style.left = (items.offsetLeft - posX2) + "px";
  }
  function dragEnd (e) {
    posFinal = items.offsetLeft;
    if (posFinal - posInitial < -threshold) {
      shiftSlide(1, 'drag');
    } else if (posFinal - posInitial > threshold) {
      shiftSlide(-1, 'drag');
    } else {
      items.style.left = (posInitial) + "px";
    }
    document.onmouseup = null;
    document.onmousemove = null;
  }
  
  function shiftSlide(dir, action) {
    items.classList.add('shifting');
    if (allowShift) {
      if (!action) { posInitial = items.offsetLeft; }
      items.style.left = (posInitial - dir * slideSize) + "px";
      index += dir;
    };
    
    allowShift = false;
  }
  function checkIndex (){
    items.classList.remove('shifting');
    if (index == -1) {
      items.style.left = -(slidesLength * slideSize) + "px";
      index = slidesLength - 1;
    }
    if (index == slidesLength) {
      items.style.left = -(1 * slideSize) + "px";
      index = 0;
    }
    allowShift = true;
    indexContainer.textContent = `0${index + 1}`;
    squares[index].focus();
  }

 
}
slide(slider, sliderItems, prev, next);

//overlay
let screenWidth =  window.screen.availWidth;
function on() {
  document.getElementsByClassName("overlay")[0].style.left = "0";
  document.getElementsByClassName("booking-container")[0].style.left = `calc(50% - ${screenWidth/2}px)`;
  document.getElementsByClassName("booking-wrapper")[0].style.left = "0";

}

function off() {
  document.getElementsByClassName("overlay")[0].style.left = "-100%";
  document.getElementsByClassName("booking-container")[0].style.left = "-100%";
  document.getElementsByClassName("booking-wrapper")[0].style.left = "-100%";
}


//ripple
var buttons = document.getElementsByClassName('book'),
    forEach = Array.prototype.forEach;

forEach.call(buttons, function (b) {
    b.addEventListener('click', addElement);
});

function addElement(e) {
    var addDiv  = document.createElement('div'),
        mValue  = Math.max(this.clientWidth, this.clientHeight),
        rect    = this.getBoundingClientRect();
        sDiv    = addDiv.style,
        px      = 'px';

    sDiv.width  = sDiv.height = mValue + px;
    sDiv.left  = e.clientX - rect.left - (mValue / 2) + px;
    sDiv.top   = e.clientY - rect.top - (mValue / 2) + px;

    addDiv.classList.add('pulse');
    this.appendChild(addDiv);
}


//burger menu
const burgerIcon = document.querySelector('.hamburger-menu');
const navMenu = document.querySelector('.menu');
const h2 = document.querySelector('.welcome-text h2');
const p = document.querySelector('.welcome-text p');
const btn = document.querySelector('.welcome-btn');
const minMenu = document.querySelector('.menu-768');
burgerIcon.addEventListener('click', () => {
  burgerIcon.classList.toggle('open');
  navMenu.classList.toggle('open');
  h2.classList.toggle('open');
  p.classList.toggle('open');
  btn.classList.toggle('open');
  minMenu.classList.toggle('open');

});

if (screenWidth < 320 || screenWidth < 1440) {
  viewport = document.querySelector("meta[name=viewport]");
  viewport.removeAttribute('initial-scale=1.0');
}



//tickets
document.querySelector('.basic-minus').onclick = function(){calculator(-1, true)};
document.querySelector('.basic-plus').onclick = function(){calculator(1, true)};
document.querySelector('.senior-minus').onclick = function(){calculator(-1, false)};
document.querySelector('.senior-plus').onclick = function(){calculator(1, false)};
document.querySelector('.temporary-exhibition').onchange = function(){calculator(0, false)};
document.querySelector('.combined-admission').onchange = function(){calculator(0, false)};
document.querySelector('.permanent-exhibition').onchange = function(){calculator(0, false)};

function calculator(value, isBasic)
{
  var bsnValue = 20;
  if(document.querySelector('.temporary-exhibition').checked) {
    bsnValue = 25;
  } else if (document.querySelector('.combined-admission').checked) {
    bsnValue = 40;
  }
  let ssnValue = bsnValue / 2;
  if(isBasic) {
    if(value < 0) {
      document.querySelector('.basic-nums').stepDown();
    } else if(value > 0) {
      document.querySelector('.basic-nums').stepUp();
    }
  }
  else {
    if(value < 0) {
      document.querySelector('.senior-nums').stepDown();
    } else if(value > 0) { 
      document.querySelector('.senior-nums').stepUp();
    }
  }
  let bsn = document.querySelector('.basic-nums').value
  let snn = document.querySelector('.senior-nums').value
  let total = bsn * bsnValue + snn * ssnValue;
  document.querySelector('.calculator-output').textContent = `Total €${total}`
}



//VALIDATION
const nameRegExp = new RegExp('^[а-яёa-zi]{3,15}$','ui');


//VIDEO-SWIPER
const swiper = new Swiper(".carousel", {
  slidesPerView: 3,
  loop: true,
  loopedSlides: 3,
  spaceBetween: 30,
  pagination: {
    el: ".sw-pagination",
    clickable: true,
    bulletClass: "ellipse",
    bulletElement: 'button',
    bulletActiveClass: 'ellipse-active',
  },
  navigation: {
    nextEl: '.carousel-btn-next',
    prevEl: '.carousel-btn-prev',
  },
});
 
//MAP
mapboxgl.accessToken = 'pk.eyJ1IjoiYWxlc2hhdiIsImEiOiJja3VuM3I0OWgwcGhhMnV0aDNmb2dxMjhmIn0.dhnVnTugmeoODhNNAVzZcQ';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    center: [2.3364, 48.86091], // starting position [lng, lat]
    zoom: 15.7 // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());

const marker1 = new mapboxgl.Marker({color: '#000000'}).setLngLat([2.3364, 48.86091]).addTo(map);
const marker2 = new mapboxgl.Marker({color: '#757575'}).setLngLat([2.3333, 48.8602]).addTo(map);
const marker3 = new mapboxgl.Marker({color: '#757575'}).setLngLat([2.3397, 48.8607]).addTo(map);
const marker4 = new mapboxgl.Marker({color: '#757575'}).setLngLat([2.3330, 48.8619]).addTo(map);
const marker5 = new mapboxgl.Marker({color: '#757575'}).setLngLat([2.3365, 48.8625]).addTo(map);
map.resize()


console.log('Score: 100/150 \n -Слайдер в секции Welcome +24 \n -Слайдер в секции Video (в слайдах - видео с YouTube) +12 \n -Кастомный видеоплеер, созданный на основе тега video +34 \n -Управление плеером с клавиатуры +10 \n -Слайдер сравнения изображений в секции Explore +10 \n -Калькулятор продажи билетов в секции Tiskets +8 \n -Интерактивная карта в секции Contacts +12')