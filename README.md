
# PromptGPT

  

Turn any text field into a ChatGPT prompt and get the response copied to your clipboard, + Speaking and Listening abilities with ChatGPT web

## Usage
- ### GPTifying any input
Start typing your prompt into any text field you see on any page *(Instagram/WhatsApp chat, search bars, Description text areas, Online tests etcetra )*
When your're done, just type `!#GPT` or `!#gpt` *(Case-insensitive)* at the end of your text prompt.
The response for your prompt will be sent to your clipboard within 2-3 seconds which you can then paste right there. (You need to give the site permission to allow copying to clipboard, when asked).

> Please make sure you have an active internet connection and the toggle has been switched on from the extension popup page, for it to work properly

- ### Speech Recognition and Text-to-Speech
On your ChatGPT Web, there will be a Speaker icon right next to the response that you can click for narration.
Similarly, You can tap the Microphone icon that displays in your ChatGPT's input box for Speech Recognition.

## Screenshots
![PromptGPT Popup Page](https://i.ibb.co/Lh5bt0X/prompt-gpt-1.jpg)

![ChatGPT Narrate Icon](https://i.ibb.co/Bn534Bd/prompt-gpt-2.jpg)

![Speech Recognition](https://i.ibb.co/GH5TNkh/prompt-gpt-3.jpg)



## Development
 - Clone the repository and `cd` into it. \
 `git clone https://github.com/raz0229/prompt-gpt-extension.git` \
  `cd prompt-gpt-extension`
 - Install all the dependencies \
 `npm install`

 > (  Tested on Google Chrome )

 - Launch the `start` script. \
 `npm run start`
- Your extension is built into `dist` directory in the source of your project. You can load that unpacked extension through Chrome's Extensions page.
Read more: [Chrome Development Basics](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/)
 
  
  

### Available Commands

  

| Commands | Description |

| --- | --- |

| `npm run start` | build extension, watch file changes |

| `npm run build` | generate release version |

| `npm run docs` | generate source code docs |

| `npm run clean` | remove temporary files |

| `npm run test` | run unit tests |

| `npm run sync` | update config files |

  

### Special Thanks
- [@nechlophomeriaa/chatgpt](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/)
- [SVGRepo](https://svgrepo.com)

## Learn More

  

**Extension Developer guides**

  

-  [Getting started with extension development](https://developer.chrome.com/extensions/getstarted)

- Manifest configuration: [version 2](https://developer.chrome.com/extensions/manifest) - [version 3](https://developer.chrome.com/docs/extensions/mv3/intro/)

-  [Permissions reference](https://developer.chrome.com/extensions/declare_permissions)

-  [Chrome API reference](https://developer.chrome.com/docs/extensions/reference/)

  

**Extension Publishing Guides**

  

-  [Publishing for Chrome](https://developer.chrome.com/webstore/publish)

-  [Publishing for Edge](https://docs.microsoft.com/en-us/microsoft-edge/extensions-chromium/publish/publish-extension)

-  [Publishing for Opera addons](https://dev.opera.com/extensions/publishing-guidelines/)

-  [Publishing for Firefox](https://extensionworkshop.com/documentation/publish/submitting-an-add-on/)
