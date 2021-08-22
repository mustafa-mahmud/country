'use strict';

const form = document.querySelector('form');
const inputEl = document.querySelector('input');
const h1i = document.querySelector('h1 i');
const mainCountry = document.querySelector('.main-country');

function getUserValue(e) {
  e.preventDefault();
  const str = inputEl.value;
  // inputEl.value = '';

  const pattern = /^[a-zA-Z]*$/g;
  if (pattern.test(str)) {
    inputEl.style.border = '1px solid transparent';
    fetchData(str);
  } else {
    wrongCtn();
  }
}

async function fetchData(ctn) {
  console.log(ctn);
  const url = `https://restcountries.com/v3/name/${ctn}`;
  const res = await fetch(url);
  const data = await res.json();

  if (data) {
    setTimeout(() => displayUI(data[0]), 2000);
  }
}

function displayUI(data) {
  console.log(data);
  const country = data.name.common;
  const capital = data.capital[0];
  const area = data.area;
  const currencies = Object.values(data.currencies)[0].name;
  const region = data.region;
  const language = Object.values(data.languages);

  const html = `
						<img
							src="${data.flags[1]}"
							alt="">

						<div>
							<p><span>Country: </span><span>${country}</span></p>
							<p><span>Capital: </span><span>${capital}</span></p>
							<p><span>Area: </span><span>${area}</span></p>
							<p><span>Currency: </span><span>${currencies}</span></p>
							<p><span>Region: </span><span>${region}</span></p>
							<p><span>Border: </span><span>${
                data.borders.length > 0 ? data.borders.join(',') : null
              }</span></p>
							<p><span>Languages: </span><span>${language}</span></p>
						</div>
					`;
  mainCountry.innerHTML = html;
}

function wrongCtn() {
  inputEl.style.border = '1px solid red';
}

function showText() {
  const str = inputEl.value;
  h1i.textContent = str ? str : 'Nothing';
}

//////////////////
form.addEventListener('submit', getUserValue);
inputEl.addEventListener('input', showText);
