function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function randomGallery() {
  let arrPicture = [];
  for (let i = 0; i < 14; i++) {
    arrPicture.push(`assets/img/gallery/gallery${i + 1}.jpg`);
  }
  shuffle(arrPicture);

  const pictureInnerContainer = document.querySelector('.picture-inner-container');
  let resultArr = arrPicture.map(function(arrItem, i) {
    const img = document.createElement('img');
    img.classList.add('gallery-img')
    img.src = arrItem;
    img.alt = `gallery${i}`;
    pictureInnerContainer.append(img);
  } )
}

randomGallery();