const logoBtn = document.getElementById("logoBtn");
const sideMenu = document.getElementById("sideMenu");
const overlayMenu = document.getElementById("overlayMenu");
const sendBtn = document.getElementById("sendBtn");
const chatInput = document.getElementById("chatInput");
const messages = document.getElementById("messages");

// открыть меню
logoBtn.onclick = () => {
  sideMenu.classList.add("open");
  overlayMenu.style.display = "block";
  loadHistory();
};

// закрыть меню при клике на фон
overlayMenu.onclick = () => {
  sideMenu.classList.remove("open");
  overlayMenu.style.display = "none";
};

// отправка сообщения
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