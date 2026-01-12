import '../scss/style.scss'

// Swiper framework
const swiper = new Swiper('.swiper', {
  slidesPerView: 'auto',
  freeMode: true,
  direction: 'horizontal',

  breakpoints: {
    768: {
      enabled: false,
    },
  },

  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
});

//asides

document.addEventListener('DOMContentLoaded', function() {
  const body = document.body;
  const aside = document.querySelector('.aside');
  const burgerButton = document.querySelector('.header__icon-button--burger');
  const burgerBackButton = document.querySelector('.aside__header-icon-button--back');

  const feedback = document.querySelector('.feedback');
  const feedbackButtonAside = document.querySelector('.aside__icon-button--chat');
  const feedbackButtonHeader = document.querySelector('.header__icon-button--chat');
  const feedbackBackButton = document.querySelector('.feedback__button--back');

  const call = document.querySelector('.call');
  const callButtonAside = document.querySelector('.aside__icon-button--call');
  const callButtonHeader = document.querySelector('.header__icon-button--call');
  const callBackButton = document.querySelector('.call__button--back');

  let isAsideOpen = false;
  let isFeedbackOpen = false;
  let isCallOpen = false;

  function closeAside() {
    aside.style.transform = 'translateX(-100%)';
    isAsideOpen = false;
    body.classList.remove('aside-open');
  }

  function closeFeedback() {
    feedback.style.transform = 'translateX(100%)';
    isFeedbackOpen = false;
    body.classList.remove('feedback-open');
    feedback.style.display = 'none';
  }

  function closeCall() {
    call.style.transform = 'translateX(100%)';
    isCallOpen = false;
    body.classList.remove('call-open');
    call.style.display = 'none';
  }

  function toggleAside() {
    if (!isAsideOpen) {
      aside.style.transform = 'translateX(0)';
      aside.style.display = 'flex';
      isAsideOpen = true;
      body.classList.add('aside-open');

      if (isFeedbackOpen) closeFeedback();
      if (isCallOpen) closeCall();
    } else {
      closeAside();
    }
  }

  function toggleFeedback() {
    if (!isFeedbackOpen) {
      feedback.style.display = 'block';
      feedback.style.transform = 'translateX(0)';
      isFeedbackOpen = true;
      body.classList.add('feedback-open');

      if (isAsideOpen) closeAside();
      if (isCallOpen) closeCall();
    } else {
      closeFeedback();
    }
  }

  function toggleCall() {
    if (!isCallOpen) {
      call.style.display = 'block';
      call.style.transform = 'translateX(0)';
      isCallOpen = true;
      body.classList.add('call-open');

      if (isAsideOpen) closeAside();
      if (isFeedbackOpen) closeFeedback();
    } else {
      closeCall();
    }
  }

  if (burgerButton && aside) {
    aside.style.transition = 'transform 0.3s ease';
    aside.style.transform = 'translateX(-100%)';

    burgerButton.addEventListener('click', function(event) {
      event.stopPropagation();
      toggleAside();
    });

    if (burgerBackButton) {
      burgerBackButton.addEventListener('click', function(event) {
        event.stopPropagation();
        toggleAside();
      });
    }
  }

  if (feedback) {
    feedback.style.transition = 'transform 0.3s ease';
    feedback.style.transform = 'translateX(100%)';
    feedback.style.display = 'none';

    if (feedbackButtonAside) {
      feedbackButtonAside.addEventListener('click', toggleFeedback);
    }
    if (feedbackButtonHeader) {
      feedbackButtonHeader.addEventListener('click', toggleFeedback);
    }
    if (feedbackBackButton) {
      feedbackBackButton.addEventListener('click', toggleFeedback);
    }
  }

  if (call) {
    call.style.transition = 'transform 0.3s ease';
    call.style.transform = 'translateX(100%)';
    call.style.display = 'none';

    if (callButtonAside) {
      callButtonAside.addEventListener('click', toggleCall);
    }
    if (callButtonHeader) {
      callButtonHeader.addEventListener('click', toggleCall);
    }
    if (callBackButton) {
      callBackButton.addEventListener('click', toggleCall);
    }
  }

  //CLOSE ON CLOCK OR ESC

  document.addEventListener('click', function(event) {
    if (isAsideOpen) {
      const clickedOnAside = aside && aside.contains(event.target);
      const clickedOnBurgerButton = burgerButton && burgerButton.contains(event.target);
      const clickedOnBurgerBackButton = burgerBackButton && burgerBackButton.contains(event.target);

      if (!clickedOnAside && !clickedOnBurgerButton && !clickedOnBurgerBackButton) {
        closeAside();
      }
    }

    if (isFeedbackOpen) {
      const clickedOnFeedback = feedback && feedback.contains(event.target);
      const clickedOnFeedbackButtonAside = feedbackButtonAside && feedbackButtonAside.contains(event.target);
      const clickedOnFeedbackButtonHeader = feedbackButtonHeader && feedbackButtonHeader.contains(event.target);
      const clickedOnFeedbackBackButton = feedbackBackButton && feedbackBackButton.contains(event.target);

      if (!clickedOnFeedback && !clickedOnFeedbackButtonAside &&
        !clickedOnFeedbackButtonHeader && !clickedOnFeedbackBackButton) {
        closeFeedback();
      }
    }

    if (isCallOpen) {
      const clickedOnCall = call && call.contains(event.target);
      const clickedOnCallButtonAside = callButtonAside && callButtonAside.contains(event.target);
      const clickedOnCallButtonHeader = callButtonHeader && callButtonHeader.contains(event.target);
      const clickedOnCallBackButton = callBackButton && callBackButton.contains(event.target);

      if (!clickedOnCall && !clickedOnCallButtonAside &&
        !clickedOnCallButtonHeader && !clickedOnCallBackButton) {
        closeCall();
      }
    }
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      if (isAsideOpen) {
        closeAside();
      }
      if (isFeedbackOpen) {
        closeFeedback();
      }
      if (isCallOpen) {
        closeCall();
      }
    }
  });
});

//BRANDS

const brandsShowAll = document.querySelector('.brands__button--show-all');
const brandsLength = document.querySelectorAll('.brands__item').length;
let brandsItems = window.innerWidth >= 1366 ? 8 : 6;
let brandsIsExpanded = false;

const updateBrandsVisibleItems = () => {
  const array = Array.from(document.querySelector('.brands__list').children);
  array.forEach((el, index) => {
    if (index < brandsItems) {
      el.classList.add('is-visible');
    } else {
      el.classList.remove('is-visible');
    }
  });
};

if (brandsShowAll) {
  brandsShowAll.addEventListener('click', () => {
    if (brandsIsExpanded) {
      brandsItems = window.innerWidth >= 1366 ? 8 : 6;
      brandsShowAll.textContent = 'Показать все';
    } else {
      brandsItems += 5;
      if (brandsItems >= brandsLength) {
        brandsItems = brandsLength;
        brandsShowAll.textContent = 'Скрыть';
      } else {
        brandsShowAll.textContent = 'Показать все';
      }
    }
    updateBrandsVisibleItems();
    brandsIsExpanded = !brandsIsExpanded;
  });

  updateBrandsVisibleItems();
}

// TECH

const techShowAll = document.querySelector('.tech__button--show-all');
const techLength = document.querySelectorAll('.tech__item').length;
let techItems = window.innerWidth >= 1366 ? 4 : 3;
let techIsExpanded = false;

const updateTechVisibleItems = () => {
  const array = Array.from(document.querySelector('.tech__list').children);
  array.forEach((el, index) => {
    if (index < techItems) {
      el.classList.add('is-visible');
    } else {
      el.classList.remove('is-visible');
    }
  });
};

if (techShowAll) {
  techShowAll.addEventListener('click', () => {
    if (techIsExpanded) {
      techItems = window.innerWidth >= 1366 ? 4 : 3;
      techShowAll.textContent = 'Показать все';
    } else {
      techItems += 3;
      if (techItems >= techLength) {
        techItems = techLength;
        techShowAll.textContent = 'Скрыть';
      } else {
        techShowAll.textContent = 'Показать все';
      }
    }
    updateTechVisibleItems();
    techIsExpanded = !techIsExpanded;
  });

  updateTechVisibleItems();
}
