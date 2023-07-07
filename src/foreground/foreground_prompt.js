import ai from "@nechlophomeriaa/chatgpt"

const GPTISE_COMMAND = '!#gpt'

// async function getGPTResponse(prompt) {
//     const configuration = new Configuration({
//         apiKey: "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",
//       });
//     const openai = new OpenAIApi(configuration);
//     const completion = await openai.createCompletion({
//         model: "text-davinci-003",
//         prompt
//     });
    
//     const res = completion.data.choices[0].text;
//     return res;
// }


// Create the text box element
var textBox = document.createElement('div');
textBox.setAttribute('id', 'myTextBox');
textBox.style.position = 'fixed';
textBox.style.top = '50%';
textBox.style.left = '50%';
textBox.style.padding = '0.75em';
textBox.style.textAlign = 'center';
textBox.style.transform = 'translate(-50%, -50%)';
textBox.style.zIndex = '9999';
textBox.style.fontSize = '1.5rem';
textBox.style.opacity = '0'
textBox.style.transition = 'opacity 1s ease'
textBox.style.background = '#0088DC';
textBox.style.color = '#fff';
textBox.style.borderRadius = '5px';
textBox.innerText = 'This is a test text box';

// Add the text box to the body element
document.body.appendChild(textBox);


const showTextInToast = (text) => {
    textBox.innerText = text;
    textBox.style.opacity = '1';
    setTimeout(()=>{
        textBox.style.opacity = '0';
    }, 4000)
}

document.querySelector('body').addEventListener('keyup', async (e)=>{
    const elem = e.target;
    if (elem.value) {
        if (elem.value.toString().toLowerCase().endsWith(GPTISE_COMMAND)) {
            showTextInToast('⚙️ Thinking...');
            try {
                const prompt = elem.value.toString().trim().replace('!#gpt', '').replace('!#GPT', '');
                //const response = await getGPTResponse(prompt)
                const response = await ai(prompt)
                navigator.clipboard.writeText(response);
                showTextInToast('📋 Response copied to clipboard');
            } catch (e) {
                showTextInToast('❌ Something went wrong!')
            }
        }
    } else {
        if (elem.textContent.toString().toLowerCase().endsWith(GPTISE_COMMAND)) {
            try {
                showTextInToast('⚙️ Thinking...');
                const prompt = elem.textContent.toString().trim().replace('!#gpt', '').replace('!#GPT', '');
                //const response = await getGPTResponse(prompt)
                const response = await ai(prompt)
                navigator.clipboard.writeText(response);
                showTextInToast('📋 Response copied to clipboard');
            } catch (e) {
                showTextInToast('❌ Something went wrong!')
            }
        }
    }
})