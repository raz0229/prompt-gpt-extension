import EasySpeech from 'easy-speech'
import { locales } from './data/locales';

// If offline
if (window.navigator.onLine === false) {
  document.querySelector('.lower-container').style.display = 'none';
  document.querySelector('.error-container').style.display = 'block';
}

// Get reference to select element
const select = document.getElementById("voices");
const speedRange = document.querySelector('#speed')
const toggleSwitch = document.querySelector('#toggleSwitch')
let ref = 0;

try {
  EasySpeech.detect()
  await EasySpeech.init({ maxTimeout: 5000, interval: 250 })
			.then(() => console.debug('EasySpeech load complete'))
			.catch((e) => console.log(e));

// Iterate over the voices array and create options
  EasySpeech.voices().forEach(function(option) {
    // Create option element
    let optionElement = document.createElement("option");
  
    // Set value and text of the option
    optionElement.value = ref++;
    optionElement.text = `${option.name.substring(0,20)} - ${option.lang}`;
  
    // Append option to the select element
    select.appendChild(optionElement);
  });
} catch (e) {
  console.log('Internet connection error')
}

// Iterate over the locales array and create options
const localeSelection = document.querySelector('#locales');
locales.forEach(option => {
  let elem = document.createElement("option")

  elem.value = option.code;
  elem.text = `${option.name.substring(0,20)} - ${option.code}`

  localeSelection.appendChild(elem)
})

// value change for speed range
speedRange.addEventListener('change', (event)=>{
  //document.querySelector('#rangeText').innerHTML = event.target.value
  chrome.storage.sync.set({ "PROMPTGPT_SPEAK_SPEED": event.target.value }, function () {
    //console.log('value changed for PROMPTGPT_SPEAK_SPEED: ', event.target.value)
  });
})

// value change for select voices
select.addEventListener('change', (event)=>{
  chrome.storage.sync.set({ "PROMPTGPT_SPEAK_VOICE": event.target.value }, function () {
    //console.log('value changed for PROMPTGPT_SPEAK_VOICE: ', event.target.value)
  });
})

// value change for select locales
localeSelection.addEventListener('change', (event)=>{
  chrome.storage.sync.set({ "PROMPTGPT_LOCALE": event.target.value }, () => {
    //('value changed for PROMPTGPT_LOCALE: ', event.target.value)
  })
})

// value change for toggle switch
toggleSwitch.addEventListener('change', (event)=>{
  chrome.storage.sync.set({ "PROMPTGPT_CHECKED": event.target.checked }, () => {
    //console.log('value changed for PROMPTGPT_CHECKED: ', event.target.checked)
  })
})

// set default values for speedRange and voices selection
chrome.storage.sync.get(["PROMPTGPT_SPEAK_SPEED"], function (items) {
  if (items['PROMPTGPT_SPEAK_SPEED']) {
    speedRange.value = items['PROMPTGPT_SPEAK_SPEED']
  } else {
    speedRange.value = 5; // default speed
  }
})

chrome.storage.sync.get(["PROMPTGPT_SPEAK_VOICE"], async function (items) {
  if (items['PROMPTGPT_SPEAK_VOICE']) {
    select.value = items['PROMPTGPT_SPEAK_VOICE']
  } else {
    select.value = 4; // default voice
  }
})

chrome.storage.sync.get(["PROMPTGPT_LOCALE"], (items) => {
  if (items['PROMPTGPT_LOCALE']) {
    localeSelection.value = items['PROMPTGPT_LOCALE']
  } else {
    localeSelection.value = 'en-US'
  }
})

chrome.storage.sync.get(["PROMPTGPT_CHECKED"], async function (items) {
  if (items['PROMPTGPT_CHECKED']) {
    toggleSwitch.checked = true;
  } else {
    toggleSwitch.checked = false;
  }
})

// event listeners for social icons
document.querySelector('#github').addEventListener('click', ()=> window.open('https://github.com/raz0229/prompt-gpt-extension', '_blank').focus())
document.querySelector('#instagram').addEventListener('click', ()=> window.open('https://instagram.com/raz0229', '_blank').focus())