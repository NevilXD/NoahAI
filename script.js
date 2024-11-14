let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    window.speechSynthesis.speak(text_speak);
}

function wishMe(){
    let day=new Date()
    let hours=day.getHours()
    
    if(hours>=0 && hours<12){
        speak("Good Morning!");
    }
    
    else if(hours>=12 && hours <16){
        speak("Good Afternoon!");
    }
    
    else{
        speak("Good Evening!");
    }
}

window.addEventListener('load',()=>{
    wishMe()
})

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();
recognition.onresult=(event)=>{
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
}

btn.addEventListener("click", ()=>{
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
})

function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";
    if(message.includes("hello") || message.includes("hi")) {
        speak("Hello, How can I help you?");
    }
    
    else if(message.includes("who are you")) {
        speak("I'am a virtual artificial intelligence, made to help people's.");
    }
    
    else if(message.includes("open youtube")) {
        speak("Opening Youtube...");
        window.open("https://www.youtube.com", "_blank");
    }
    
    else if(message.includes("open facebook")) {
        speak("Opening Facebook...");
        window.open("https://www.facebook.com", "_blank");
    }
    
    else if(message.includes("open instagram")) {
        speak("Opening Instagram...");
        window.open("https://www.instagram.com", "_blank");
    }
    
    else if(message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://www.google.com", "_blank");
    }
    
    else if(message.includes("open whatsapp")) {
        speak("Opening Whatsapp...");
        window.open("https://www.whatsapp.com", "_blank");
    }
    
    else if(message.includes("time")) {
        let time = new Date().toLocaleString(undefined, {hour:"numeric", minute:"numeric"});
        speak(time);
    }
    
    else if(message.includes("date")) {
        let date = new Date().toLocaleString(undefined, {day:"numeric", month:"short"});
        speak(date);
    }
    
    else{
        let finalText = "This is what I found on internet regarding" + message.replace("noah", "") || message.replace("no", "");
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message.replace("no", "")}`, "_blank");
    }
}