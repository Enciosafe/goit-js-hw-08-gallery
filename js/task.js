import gallery from '/js/gallery-items.js';
const galleryRef = document.querySelector('.js-gallery');

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
  itemImg.dataSource = original;
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
