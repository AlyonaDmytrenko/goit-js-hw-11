import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function someFunction() {
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');
  const loader = document.getElementById('loader');
  const gallery = document.getElementById('gallery');

  searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const query = searchInput.value.trim();
    if (query === '') {
      iziToast.error({
        title: 'Error',
        message: 'Please enter a search query',
      });
      return;
    }
    loader.style.display = 'block';
    gallery.innerHTML = '';
    fetchImages(query);
  });

  function fetchImages(query) {
    const apiKey = '42375067-5abc1b4a099550ffbb458c60e';

    const url = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        loader.style.display = 'none';
        if (data.hits.length === 0) {
          iziToast.info({
            title: 'Info',
            message:
              'Sorry, there are no images matching your search query. Please try again!',
          });
        } else {
          showImages(data.hits);
        }
      })
      .catch(error => {
        loader.style.display = 'none';
        iziToast.error({
          title: 'Error',
          message: error.message,
        });
      });
  }

  function showImages(images) {
    const galleryContent = images
      .map(
        image => `
    <a href="${image.largeImageURL}" data-lightbox="gallery">
      <img src="${image.webformatURL}" alt="${image.tags}">
    </a>
  `
      )
      .join('');
    gallery.innerHTML = galleryContent;

    const lightbox = new SimpleLightbox('.gallery a');
    lightbox.refresh();
  }
}

someFunction(); // Викликаємо функцію для початку роботи
