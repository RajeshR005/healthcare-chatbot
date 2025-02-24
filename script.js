document.addEventListener("DOMContentLoaded", function () {
    const userInput = document.getElementById("userInput");
    const messages = document.getElementById("messages");
    const sendButton = document.getElementById("sendButton");
    const chatGif = document.getElementById("chatGif"); // GIF Element

    console.log("Checking elements:", userInput, messages, sendButton, chatGif);
    if (!userInput || !messages || !sendButton) {
        console.error("Some elements were not found in the DOM!");
        return;
    }

    let isProcessing = false;

    function hideGif() {
        if (chatGif && chatGif.style.display !== "none") {
            chatGif.style.display = "none"; // Hide GIF when user starts typing
        }
    }

    // ✅ 100+ Healthcare Keywords
    const healthcareKeywords = [
        "health", "doctor", "medicine", "symptoms", "diagnosis", "treatment", "hospital", "nurse", "therapy", 
        "infection", "mental health", "fever", "pain", "cough", "cancer", "diabetes", "cardiology", "dentist",
        "covid", "virus", "vaccine", "emergency", "nutrition", "diet", "blood pressure", "heart", "lungs", 
        "surgery", "skin", "allergy", "flu", "vaccination", "orthopedic", "pediatrics", "neurology", "depression", 
        "anxiety", "asthma", "eye", "hearing", "kidney", "urinary", "stomach", "digestion", "cholesterol", "bones",
        "arthritis", "pregnancy", "gynecology", "fertility", "hormones", "obesity", "exercise", "fitness", "workout", 
        "yoga", "meditation", "wellness", "sleep", "insomnia", "fatigue", "headache", "migraine", "stress", "immune",
        "blood sugar", "thyroid", "physiotherapy", "rehabilitation", "stroke", "brain", "spine", "paralysis", 
        "dementia", "alzheimer", "psychiatrist", "psychologist", "autism", "ADHD", "genetics", "lungs", "bronchitis",
        "pneumonia", "hepatitis", "liver", "digestive", "colon", "gastric", "ulcer", "hernia", "muscles", "tendons",
        "ligaments", "radiology", "X-ray", "CT scan", "MRI", "blood test", "biopsy", "pharmacology", "antibiotics",
        "antiseptic", "immune system", "toxins", "dehydration", "first aid", "burns", "fracture", "sprain", "wound", 
        "bandage", "CPR", "defibrillator", "cataract", "glaucoma", "diarrhea", "constipation", "appendix", "tonsils","sick","hi","hello"
    ];

    // ✅ Function to check if a question is healthcare-related
    function isHealthcareQuestion(question) {
        question = question.toLowerCase();
        return healthcareKeywords.some(keyword => question.includes(keyword));
    }

    async function sendMessage() {
        if (isProcessing) return;
        isProcessing = true;

        const userText = userInput.value.trim();
        if (!userText) {
            isProcessing = false;
            return;
        }

        hideGif();

        messages.innerHTML += `<p><b>You:</b> ${userText}</p>`;
        userInput.value = "";
        messages.scrollTop = messages.scrollHeight;

        // ✅ Check if the question is healthcare-related
        if (!isHealthcareQuestion(userText)) {
            messages.innerHTML += `<p><b>Healthcare AI Assistant:</b> I'm here to assist with healthcare-related queries. Please ask a question related to health, wellness, or medicine.</p>`;
            isProcessing = false;
            return;
        }

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

    sendButton.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    });

    userInput.addEventListener("input", hideGif);
});
