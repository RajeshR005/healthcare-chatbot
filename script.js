document.addEventListener("DOMContentLoaded", function () {
    const userInput = document.getElementById("userInput");
    const messages = document.getElementById("messages");
    const sendButton = document.getElementById("sendButton");
    const chatGif = document.getElementById("chatGif"); // GIF Element

    // ✅ Debugging: Check if Elements Exist
    console.log("Checking elements:", userInput, messages, sendButton, chatGif);
    if (!userInput || !messages || !sendButton) {
        console.error("Some elements were not found in the DOM!");
        return;
    }

    let isProcessing = false;

    function hideGif() {
        if (chatGif && chatGif.style.display !== "none") {
            chatGif.style.display = "none"; // Completely hide GIF when user starts typing
        }
    }

    async function sendMessage() {
        if (isProcessing) return;
        isProcessing = true;

        const userText = userInput.value.trim();
        if (!userText) {
            isProcessing = false;
            return;
        }

        hideGif(); // Hide GIF when the first message is sent

        messages.innerHTML += `<p><b>You:</b> ${userText}</p>`;
        userInput.value = "";
        messages.scrollTop = messages.scrollHeight;

        try {
            const response = await fetch("https://healthcare-chatbot-69ix.onrender.com/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userText })
            });

            const data = await response.json();
            messages.innerHTML += `<p><b>Healthcare AI Assistant:</b> ${data.reply}</p>`;
        } catch (error) {
            messages.innerHTML += `<p style="color: red;"><b>Healthcare AI Assistant:</b> Error fetching response.</p>`;
        }

        isProcessing = false;
    }

    // ✅ Attach Event Listeners Once
    console.log("Attaching event listeners...");
    sendButton.addEventListener("click", sendMessage);

    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    });

    userInput.addEventListener("input", hideGif); // Hide GIF when typing starts
});
