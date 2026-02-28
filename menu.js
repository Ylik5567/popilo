const logoBtn = document.getElementById("logoBtn");
const sideMenu = document.getElementById("sideMenu");
const overlayMenu = document.getElementById("overlayMenu");
const chatBtn = document.getElementById("chatBtn");
const chatBox = document.getElementById("chatBox");
const sendBtn = document.getElementById("sendBtn");
const chatInput = document.getElementById("chatInput");
const messages = document.getElementById("messages");


logoBtn.onclick = () => {
  sideMenu.classList.add("open");
  overlayMenu.style.display = "block";
};


overlayMenu.onclick = () => {
  sideMenu.classList.remove("open");
  overlayMenu.style.display = "none";
};


chatBtn.onclick = () => {
  sideMenu.classList.remove("open");
  overlayMenu.style.display = "none";
  chatBox.style.display = "flex";
};


sendBtn.onclick = async () => {
  const text = chatInput.value;
  if (!text) return;

 
  const userMsg = document.createElement("div");
  userMsg.textContent = "Вы: " + text;
  messages.appendChild(userMsg);

  chatInput.value = "";

  try {
    const result = await puter.ai.chat(text);
    const aiMsg = document.createElement("div");
    aiMsg.textContent = "VELVET: " + result;
    messages.appendChild(aiMsg);

    
    await puter.kv.set("chat_history", messages.innerHTML);

  } catch (err) {
    console.error(err);
  }
};