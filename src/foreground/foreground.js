// This script gets injected into any opened page
// whose URL matches the pattern defined in the manifest
// (see "content_script" key).
// Several foreground scripts can be declared
// and injected into the same or different pages.
import EasySpeech from 'easy-speech'

try {
  EasySpeech.detect()
  EasySpeech.init({ maxTimeout: 5000, interval: 250 })
    .then(() => console.debug('EasySpeech load complete'))
    .catch((e) => console.error(e));
} catch (e) {
  console.log('Please check your connection')
}

let IS_RECORDING = false;

async function textToSpeech(text, parentButton) {

  parentButton.lastChild.classList.toggle('hidden') // hide play button
  parentButton.childNodes[parentButton.childElementCount - 2].classList.toggle('hidden') // show stop button

  let voice = 0;
  let rate = 1.0;

  chrome.storage.sync.get(["PROMPTGPT_SPEAK_SPEED"], function (items) {
    if (items['PROMPTGPT_SPEAK_SPEED']) {
      rate = items['PROMPTGPT_SPEAK_SPEED']
    }
    chrome.storage.sync.get(["PROMPTGPT_SPEAK_VOICE"], async function (items) {
      if (items['PROMPTGPT_SPEAK_VOICE']) {
        voice = parseInt(items['PROMPTGPT_SPEAK_VOICE'])
      }

      try {
        await EasySpeech.speak({
          text,
          voice: EasySpeech.voices()[voice],
          pitch: 1,
          rate,
          volume: 1,
          boundary: (e) => console.log('boundary reached'),
          error: (e) => {
            console.log('Error during speech: ', e)
          },
          mark: (e) => {
            console.log('marked');
            console.log(e);
          }
        });

        parentButton.lastChild.classList.toggle('hidden') // show play button
        parentButton.childNodes[parentButton.childElementCount - 2].classList.toggle('hidden') // hide stop button

      } catch (e) {
        console.log('Speech interrupted: ', e)
      }
    })
  })


}

// Start the speech recognition when the user clicks a button or triggers an event
function startSpeechRecognition(recognition, inputField) {
  if (IS_RECORDING) {
    // stop recognition is already recording
    recognition.stop()
    inputField.placeholder = 'Type something or press the Mic icon to speak';
    inputField.parentElement.lastChild.classList.toggle('animate-spin')
    //console.log('Speech recognition stopped.');
    IS_RECORDING = false;
  } else {
    let lang = 'en-US'
    inputField.placeholder = 'Listening...' // CSS magic
    inputField.parentElement.lastChild.classList.toggle('animate-spin')
    IS_RECORDING = true;

    // Set the language for speech recognition (Fallbacks to 'en-US' for US English)
    chrome.storage.sync.get(["PROMPTGPT_LOCALE"], async function (items) {
      if (items['PROMPTGPT_LOCALE']) {
        lang = items['PROMPTGPT_LOCALE']
      }
      recognition.lang = lang;
      recognition.start();
      //('Speech recognition started.', recognition.lang);

      // Event handler for when speech is recognized
      recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;

        // updating an input field
        inputField.value = transcript;
        inputField.placeholder = 'Type something or press the Mic icon to speak';
        inputField.parentElement.lastChild.classList.toggle('animate-spin')
        //inputField.dispatchEvent(enterEvent) // automatically send prompt
        IS_RECORDING = false;
      };

      // Event handler for errors
      recognition.onerror = function (event) {
        console.log('Speech recognition error:', event.error);
        IS_RECORDING = false;
      };

    })


  }
}

const textField = document.querySelector('textarea');

if (textField) {
  textField.placeholder = 'Type something or press the Mic icon to speak'

  // Check if the browser supports the Web Speech API
  if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const recordButton = document.createRange().createContextualFragment('<button class="absolute p-1 rounded-full md:bottom-3 md:p-2 md:right-6 right-12 disabled:text-gray-400 enabled:bg-brand-purple text-white bottom-1.5 transition-colors disabled:opacity-40"><span class="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#fff" class="h-4 w-4 m-1 md:m-0" stroke="currentColor" stroke-width="2" height="22" width="22"><path d="M480-423q-43 0-72-30.917-29-30.916-29-75.083v-251q0-41.667 29.441-70.833Q437.882-880 479.941-880t71.559 29.167Q581-821.667 581-780v251q0 44.167-29 75.083Q523-423 480-423Zm0-228Zm-30 531v-136q-106-11-178-89t-72-184h60q0 91 64.288 153t155.5 62Q571-314 635.5-376 700-438 700-529h60q0 106-72 184t-178 89v136h-60Zm30-363q18 0 29.5-13.5T521-529v-251q0-17-11.788-28.5Q497.425-820 480-820q-17.425 0-29.212 11.5Q439-797 439-780v251q0 19 11.5 32.5T480-483Z"></path></svg></span></button>');
    textField.parentElement.appendChild(recordButton)
    // Create a new instance of the SpeechRecognition object
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    textField.parentElement.lastChild.addEventListener('click', () => startSpeechRecognition(recognition, textField));

  } else {
    console.error('Speech recognition not supported in this browser.');
  }

  let w;
  if (typeof (Worker) !== "undefined") {
    console.log('Worker is supported by browser')
    if (typeof (w) == "undefined") {
      w = new Worker(chrome.runtime.getURL("worker.js"));
      //console.log('Worker found, ', w)
    }
    w.onmessage = function (event) {
      let copyButtonList = document.querySelectorAll('path[d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"]')

      for (let elem of copyButtonList) {
        const parent = elem.parentNode.parentElement.parentNode;
        if (parent.childElementCount < 3) {
          const button = document.createRange().createContextualFragment('<button class="flex ml-auto gap-2 rounded-md p-1 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400"><svg style="font-size: larger;" xmlns="http://www.w3.org/2000/svg" height="1em" width="1em" fill="#acacbe" viewBox="0 -960 960 960"><path d="M655-452v-60h145v60H655Zm33 292-119-88 34-47 119 88-34 47Zm-85-505-34-47 119-88 34 47-119 88ZM120-361v-240h160l200-200v640L280-361H120Zm300-288L307-541H180v120h127l113 109v-337Zm-94 168Z"/></svg></button>')

          const stopButton = document.createRange().createContextualFragment('<button class="hidden flex ml-auto gap-2 rounded-md p-1 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400"><svg style="font-size: larger;" xmlns="http://www.w3.org/2000/svg" height="1em" width="1em" fill="#acacbe" viewBox="0 -960 960 960"><path d="M300-660v360-360Zm-60 420v-480h480v480H240Zm60-60h360v-360H300v360Z"/></svg></button>')

          parent.appendChild(stopButton)
          parent.appendChild(button)

          // click event for play button
          parent.lastChild.addEventListener('click', async () => {
            const text = parent.parentElement.parentNode.firstChild.textContent
            await textToSpeech(text, parent);
          })

          // click event for stop button
          parent.childNodes[parent.childElementCount - 2].addEventListener('click', () => {
            try {
              parent.lastChild.classList.toggle('hidden') // show play button
              parent.childNodes[parent.childElementCount - 2].classList.toggle('hidden') // hide stop button
              EasySpeech.cancel()
            } catch (e) {
              console.log('Error: Speech Interrupted: ', e)
            }
          })
        }
      }
    };
  } else {
    console.log("Sorry! No Web Worker support.");
  }
}
else
  console.log('Text area not found')
