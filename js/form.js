'use strict';

var uploadFile = document.querySelector('#upload-file');
var uploadForm = document.querySelector('.upload-form');
var uploadOverlay = document.querySelector('.upload-overlay');

var formCancel = document.querySelector('.upload-form-cancel');

var filters = document.querySelectorAll('.upload-filter-label');

var imagePreview = document.querySelector('.filter-image-preview');

var buttonDec = document.querySelector('.upload-resize-controls-button-dec');
var buttonInc = document.querySelector('.upload-resize-controls-button-inc');

var resizeValue = document.querySelector('.upload-resize-controls-value');

var defaultZoom = 100;
var step = 25;

var changeZoom = function (direction) { // Изменение масштаба изображения на величину шага
  if (direction) { // к дефолтному значению прибавим величину шага
    defaultZoom += step;

    if (defaultZoom > 100) {
      defaultZoom = 100; // если сумма значение + шаг больше 100, то вернется 100
    }
  } else {
    defaultZoom -= step; // от дефолтного значения вычтем величину шага

    if (defaultZoom <= 25) {
      defaultZoom = 25; // если разница значение - шаг меньше 25, то вернется 25
    }
  }

  return defaultZoom; // дефолтное значение, которое будет отображаться при загрузке
};

// Показ формы кадрирования
uploadFile.addEventListener('change', function () {
  uploadOverlay.classList.remove('invisible'); // убрали класс
  uploadForm.classList.add('invisible'); // добавили класс

  resizeValue.value = defaultZoom + '%'; // выводится дефолтное значение в %
});

// Закрытие формы кадрирования
formCancel.addEventListener('click', function () {
  uploadOverlay.classList.add('invisible'); // добавили класс
  uploadForm.classList.remove('invisible'); // убрали класс
  uploadFile.value = ''; // обнулили значение
});

// Применение фильтра к изображению
for (var i = 0; i < filters.length; i++) { // цикл для i
  filters[i].addEventListener('click', function (e) {
    var currentFilter = 'filter-' + document.querySelector('#' + e.currentTarget.htmlFor).value;

    imagePreview.classList.add(currentFilter); // используем переменную, которая вычисляется по id и области нажатия '#' + e.currentTarget.htmlFor
  });
}

// Изменение масштаба изображения
buttonDec.addEventListener('click', function (e) {
  var zoom = changeZoom(false);
  resizeValue.value = zoom + '%'; // выводится значение в %
  imagePreview.style.transform = 'scale(' + (zoom / 100) + ')'; // добавляется соответствующий стиль CSS, который с помощью трансформации scale задает масштаб
});

buttonInc.addEventListener('click', function (e) {
  var zoom = changeZoom(true);
  resizeValue.value = zoom + '%'; // выводится значение в %
  imagePreview.style.transform = 'scale(' + (zoom / 100) + ')'; // добавляется соответствующий стиль CSS, который с помощью трансформации scale задает масштаб
});
