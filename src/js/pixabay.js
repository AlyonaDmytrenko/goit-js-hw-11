// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

// Створення інстансу SimpleLightbox
const lightbox = new SimpleLightbox();

// Функція для відображення повідомлення про помилку
function showError(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
  });
}

// Функція для відображення повідомлення про незнайдені зображення
function showNoImagesFoundMessage() {
  showError(
    'Sorry, there are no images matching your search query. Please try again!'
  );
}

// Функція для відображення індикатора завантаження
function showLoader() {
  cssLoader.show(); // Показати індикатор завантаження
}

// Функція для приховування індикатора завантаження
function hideLoader() {
  cssLoader.hide(); // Приховати індикатор завантаження
}

// Функція для очищення галереї
function clearGallery() {
  // Очистити вміст галереї
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}

// Функція для отримання зображень з бекенду та відображення їх у галереї
function fetchAndDisplayImages(searchTerm) {
  // Перевірка на наявність порожнього рядка
  if (!searchTerm.trim()) {
    showError('Please enter a search term.'); // Показати помилку, якщо рядок порожній
    return;
  }

  // Очищення галереї перед новим пошуком
  clearGallery();

  // Показати індикатор завантаження
  showLoader();

  // Встановлення параметрів рядка запиту
  const params = new URLSearchParams({
    key: 'u_qzm76aazta',
    q: searchTerm,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  // Виконання HTTP-запиту до бекенду (використовуйте ваш URL)
  fetch(`https://api.pixabay.com/?${params.toString()}`)
    .then(response => {
      // Приховати індикатор завантаження після отримання відповіді
      hideLoader();

      // Перевірка статусу відповіді
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Перевірка наявності зображень у відповіді
      if (data.hits.length === 0) {
        showNoImagesFoundMessage(); // Відображення повідомлення про незнайдені зображення
        return;
      }

      // Додавання зображень у галерею
      const gallery = document.querySelector('.gallery');
      data.hits.forEach(image => {
        const img = document.createElement('img');
        img.src = image.webformatURL;
        img.alt = image.tags;
        img.dataset.source = image.largeImageURL;
        gallery.appendChild(img);
      });

      // Оновлення галереї SimpleLightbox
      lightbox.refresh();
    })
    .catch(error => {
      // Приховати індикатор завантаження у разі помилки
      hideLoader();
      showError('An error occurred while fetching images.'); // Показати помилку
      console.error('Error fetching images:', error);
    });
}

// Додати обробник подій для форми пошуку
const form = document.querySelector('form');
form.addEventListener('submit', function (event) {
  event.preventDefault(); // Заборонити стандартну поведінку форми

  const searchTerm = document.querySelector('#search').value;
  fetchAndDisplayImages(searchTerm); // Викликати функцію для отримання та відображення зображень
});
