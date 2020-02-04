window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

const recognition = new window.SpeechRecognition();

recognition.onstart = () => {
    console.log("started")
    $(document.getElementById("input_mic")).addClass("mic_listen");
}

recognition.onend = () => {
    console.log("ended")
    $(document.getElementById("input_mic")).removeClass("mic_listen");
}

recognition.onresult = (event) => {
    const speechToText = event.results[0][0].transcript;
    console.log(speechToText);
    var speechToTextArr = speechToText.split(" ");
    document.getElementById("myInput").value = speechToTextArr[speechToTextArr.length-1];
    searchCourse();
}

function transcribe() {
    recognition.start();
}