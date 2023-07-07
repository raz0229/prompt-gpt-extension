import EasySpeech from 'easy-speech'
import { locales } from './data/locales';

EasySpeech.detect()
await EasySpeech.init({ maxTimeout: 5000, interval: 250 })
			.then(() => console.debug('EasySpeech load complete'))
			.catch((e) => console.error(e));

console.log('hello')
document.querySelector('.special-text').style.color = '#000'

// for (let voice of EasySpeech.voices()) {
//     console.log(voice.name, voice.lang)
// }

// Get reference to select element
const select = document.getElementById("voices");
const speedRange = document.querySelector('#speed')
let ref = 0;

// Iterate over the voices array and create options
EasySpeech.voices().forEach(function(option) {
  // Create option element
  let optionElement = document.createElement("option");

  // Set value and text of the option
  optionElement.value = ref++;
  optionElement.text = `${option.name} - ${option.lang}`;

  // Append option to the select element
  select.appendChild(optionElement);
});

// Iterate over the locales array and create options
const localeSelection = document.querySelector('#locales');
locales.forEach(option => {
  let elem = document.createElement("option")

  elem.value = option.code;
  elem.text = `${option.name} - ${option.code}`

  localeSelection.appendChild(elem)
})

// value change for speed range
speedRange.addEventListener('change', (event)=>{
  document.querySelector('#rangeText').innerHTML = event.target.value
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
    console.log('value changed for PROMPTGPT_LOCALE: ', event.target.value)
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