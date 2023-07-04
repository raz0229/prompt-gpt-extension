import EasySpeech from 'easy-speech'
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
let ref = 0;

// Iterate over the array and create options
EasySpeech.voices().forEach(function(option) {
  // Create option element
  let optionElement = document.createElement("option");

  // Set value and text of the option
  optionElement.value = ref++;
  optionElement.text = `${option.name} - ${option.lang}`;

  // Append option to the select element
  select.appendChild(optionElement);
});

document.querySelector('#speed').addEventListener('change', (event)=>{
    console.log(event.target.value)
})