import gallery from './gallery-items.js';
const galleryRef = document.querySelector('.js-gallery');
const modal = document.querySelector('.js-lightbox');
const modalImg = document.querySelector('.lightbox__image');

//----------------------- 1 вариант рендеринга (небезопасный, но простой)----

// const fullGallery = gallery
//   .map(
//     item =>
//       `<li class="gallery__item">
//      <a class="gallery__link" href="${item.original}">
//      <img class="gallery__image" src="${item.preview}"
//      data-source="${item.original}" alt="${item.description}"/></a></li>`,
//   )
//   .join('');
// galleryRef.insertAdjacentHTML('beforeend', fullGallery);

//---------------------- 2 вариант рендеринга-------------------------------

const fullGallery = ({ original, preview, description }) => {
  const itemLi = document.createElement('li');
  const itemA = document.createElement('a');
  const itemImg = document.createElement('img');

  itemImg.className = 'gallery__image';
  itemLi.className = 'gallery__item';
  itemA.className = 'gallery__link';
  itemA.href = original;
  itemImg.src = preview;
  itemImg.setAttribute('data-source', original);
  itemImg.alt = description;

  itemA.appendChild(itemImg);
  itemLi.appendChild(itemA);

  return itemLi;
};

const renderGallery = galleryList => {
  const list = galleryList.map(item => fullGallery(item));
  galleryRef.append(...list);
};

renderGallery(gallery);

galleryRef.addEventListener('click', onImgClick);
let currentIndex = 0;

function onImgClick(e) {
  e.preventDefault();
  if (e.target.nodeName === 'IMG') {
    modal.classList.add('is-open');
    modalImg.src = e.target.dataset.source;
    currentIndex = imgArray.indexOf(modalImg.src);
  }
}

modal.addEventListener('click', onBtnClick);

function onBtnClick(e) {
  if (e.target.nodeName === 'BUTTON' || e.target.nodeName !== 'IMG') {
    modal.classList.remove('is-open');
    modalImg.src = '';
  }
}

window.addEventListener('keydown', onEscKeyDown);

function onEscKeyDown(e) {
  if (modal.classList.contains('is-open') && e.code === 'Escape') {
    modal.classList.remove('is-open');
    modalImg.src = '';
  }
}

window.addEventListener('keydown', onArrowsPush);

const imgArray = gallery.map(item => item.original);

function onArrowsPush(e) {
  if (e.code === 'ArrowRight') {
    if (currentIndex === 8) {
      currentIndex = 0;
    } else {
      currentIndex += 1;
    }
    modalImg.src = imgArray[currentIndex];
  }
  if (e.code === 'ArrowLeft') {
    if (currentIndex === 0) {
      currentIndex = imgArray.length - 1;
    } else {
      currentIndex -= 1;
    }
    modalImg.src = imgArray[currentIndex];
  }
}
