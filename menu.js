const rpContainer = document.getElementById("rpContainer");
const chatContainer = document.getElementById("chatContainer");
const sideMenu = document.getElementById("sideMenu");
const overlayMenu = document.getElementById("overlayMenu");
const logoBtn = document.getElementById("logoBtn");
const sendBtn = document.getElementById("sendBtn");
const chatInput = document.getElementById("chatInput");
const messages = document.getElementById("messages");

// открыть меню
logoBtn.onclick = () => {
  sideMenu.classList.add("open");
  overlayMenu.style.display = "block";
};

// закрыть меню при клике на фон
overlayMenu.onclick = () => {
  sideMenu.classList.remove("open");
  overlayMenu.style.display = "none";
};

// показать RP
document.getElementById("rpBtn").onclick = () => {
  rpContainer.style.display = "flex";
  chatContainer.style.display = "none";
  sideMenu.classList.remove("open");
  overlayMenu.style.display = "none";
};

// показать ЧАТ
document.getElementById("chatBtn").onclick = () => {
  rpContainer.style.display = "none";
  chatContainer.style.display = "flex";
  sideMenu.classList.remove("open");
  overlayMenu.style.display = "none";
  loadHistory();
};

// отправка вопроса в Puter AI
sendBtn.onclick = async () => {
  const text = chatInput.value.trim();
  if (!text) return;

  const userMsg = document.createElement("div");
  userMsg.className = "msg-user";
  userMsg.textContent = "Вы: " + text;
  messages.appendChild(userMsg);

  chatInput.value = "";

  try {
    const result = await puter.ai.chat(text);
    const aiMsg = document.createElement("div");
    aiMsg.className = "msg-ai";
    aiMsg.textContent = "VELVET: " + result;
    messages.appendChild(aiMsg);

    await puter.kv.set("chat_history", messages.innerHTML);
  } catch (err) {
    console.error(err);
  }
};

// загрузка истории
async function loadHistory() {
  try {
    const history = await puter.kv.get("chat_history");
    if (history) {
      messages.innerHTML = history;
    }
  } catch (err) {
    console.error("Ошибка загрузки истории:", err);
  }
}