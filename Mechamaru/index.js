window.onload = function () {
  editTimestamp();
};

const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

const BOT_MSGS = [
  "Gomen nasai~",
  "Yamete kudasai senpai"
];

const BOT_IMG = "assets/mechamaru.png";
const PERSON_IMG = "assets/user.png"; 
const BOT_NAME = "Mechamaru";
const PERSON_NAME = "You";

msgerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const msgText = msgerInput.value;
  if (!msgText) {
    const inputBox = document.getElementsByClassName('msger-input')[0]
    inputBox.placeholder = "Can't send an empty message"
    inputBox.classList.toggle('warn')
    setTimeout(() => { 
      inputBox.placeholder = "Enter your message ..." 
      inputBox.classList.remove('warn')
    }, 2000)
    return
  };
  appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
  msgerInput.value = "";

  botResponse();
});

function appendMessage(name, img, side, text) {
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>

        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

function botResponse() {
  const r = random(0, BOT_MSGS.length - 1);
  const splt = msgerInput.value.split(" "); 
  const msgText = () => {
    if(splt.includes("hi")){
      msgText = "hi";
   }
  }


  const delay = msgText.split(" ").length * 400;

  setTimeout(() => {
    appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
  }, delay);
}

// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

function editTimestamp() {
  const timeStamps = document.querySelectorAll(".msg-info-time");
  timeStamps.forEach((element) => (element.innerHTML = formatDate(new Date())));
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
