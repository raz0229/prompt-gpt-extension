// This script gets injected into any opened page
// whose URL matches the pattern defined in the manifest
// (see "content_script" key).
// Several foreground scripts can be declared
// and injected into the same or different pages.
import EasySpeech from 'easy-speech'

EasySpeech.detect()
EasySpeech.init({ maxTimeout: 5000, interval: 250 })
			.then(() => console.debug('EasySpeech load complete'))
			.catch((e) => console.error(e));

console.log("ChatGPT Detected! (2)")

async function textToSpeech(text, parentButton) {
  // if ('speechSynthesis' in window) {
  //   let utterance = new SpeechSynthesisUtterance(text);
  //   window.speechSynthesis.speak(utterance);
  // } else {
  //   console.log('Speech synthesis is not supported in this browser.');
  // }

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


if (document.querySelector('textarea')) {
    document.querySelector('textarea').placeholder = 'I am in charge'
    
    let w;
    if (typeof(Worker) !== "undefined") {
        console.log('Worker is supported by browser')
        if (typeof(w) == "undefined") {
          w = new Worker(chrome.runtime.getURL("worker.js"));
          console.log('Worker found, ', w)
        }
        w.onmessage = function(event) {
          let copyButtonList = document.querySelectorAll('path[d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"]')
          
          for (let elem of copyButtonList) {
              const parent = elem.parentNode.parentElement.parentNode;
              if (parent.childElementCount < 3) {
                const button = document.createRange().createContextualFragment('<button class="flex ml-auto gap-2 rounded-md p-1 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400"><svg style="font-size: larger;" xmlns="http://www.w3.org/2000/svg" height="1em" width="1em" fill="#acacbe" viewBox="0 -960 960 960"><path d="M655-452v-60h145v60H655Zm33 292-119-88 34-47 119 88-34 47Zm-85-505-34-47 119-88 34 47-119 88ZM120-361v-240h160l200-200v640L280-361H120Zm300-288L307-541H180v120h127l113 109v-337Zm-94 168Z"/></svg></button>')
                
                const stopButton = document.createRange().createContextualFragment('<button class="hidden flex ml-auto gap-2 rounded-md p-1 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400"><svg style="font-size: larger;" xmlns="http://www.w3.org/2000/svg" height="1em" width="1em" fill="#acacbe" viewBox="0 -960 960 960"><path d="M300-660v360-360Zm-60 420v-480h480v480H240Zm60-60h360v-360H300v360Z"/></svg></button>')
                
                parent.appendChild(stopButton)
                parent.appendChild(button)

                // click event for play button
                parent.lastChild.addEventListener('click', async ()=>{
                  const text = parent.parentElement.parentNode.firstChild.textContent
                  await textToSpeech(text, parent);
                })

                // click event for stop button
                parent.childNodes[parent.childElementCount - 2].addEventListener('click', ()=>{
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
