import throttle from 'lodash.throttle';

const throttle = require('lodash.throttle');

const STORAGE_KEY = 'feedback-form-state';

const formEl = document.querySelector('.feedback-form');

let formState = {};

formEl.addEventListener('input', onInput);
formEl.addEventListener('submit', onSubmit);

function onInput(e) {
  formState[e.target.name] = e.target.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formState));
}

function onSubmit(e) {
  e.preventDefault();
  console.log(formState);
  formState = {};
  e.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onLoad() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return;
    formState = JSON.parse(data);
    Object.entries(formState).forEach(([key, val]) => {
      formEl.elements[key].value = val;
    });
  } catch ({ message }) {
    console.log(message);
  }
}

window.addEventListener('load', onLoad);
