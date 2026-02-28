const rpContainer = document.getElementById("rpContainer");
const chatContainer = document.getElementById("chatContainer");
const sendBtn = document.getElementById("sendBtn");
const chatInput = document.getElementById("chatInput");
const messages = document.getElementById("messages");

// кнопка "ЧАТ С AI" из меню
document.getElementById("chatBtn").onclick = () => {
  rpContainer.style.display = "none";   // скрываем RP окно
  chatContainer.style.display = "flex"; // показываем чат
  loadHistory(); // подтягиваем историю
};

// отправка вопроса в Puter AI
sendBtn.onclick = async () => {
  const text = chatInput.value.trim();
  if (!text) return;

  // сообщение пользователя
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

    // сохраняем историю
    await puter.kv.set("chat_history", messages.innerHTML);

  } catch (err) {
    console.error(err);
  }
};

// загрузка истории при входе
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