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

    // ✅ Healthcare Keywords
    const healthcareKeywords = [
        "health", "doctor", "medicine", "symptoms", "diagnosis", "treatment", "hospital", "nurse", "therapy", 
        "infection", "mental health", "fever", "pain", "cough", "cancer", "diabetes", "cardiology", "dentist",
        "covid", "virus", "vaccine", "emergency", "nutrition", "diet", "blood pressure", "heart", "lungs", 
        "surgery", "skin", "allergy", "flu", "vaccination", "orthopedic", "pediatrics", "neurology", "depression", 
        "anxiety", "asthma", "eye", "hearing", "kidney", "urinary", "stomach", "digestion", "cholesterol", "bones",
        "arthritis", "pregnancy", "gynecology", "fertility", "hormones", "obesity", "exercise", "fitness", "workout", 
        "yoga", "meditation", "wellness", "sleep", "insomnia", "fatigue", "headache", "migraine", "stress", "immune",
        "blood sugar", "thyroid", "physiotherapy", "rehabilitation", "stroke", "brain", "spine", "paralysis", 
        "dementia", "alzheimer", "psychiatrist", "psychologist", "autism", "ADHD", "genetics", "bronchitis",
        "pneumonia", "hepatitis", "liver", "digestive", "colon", "gastric", "ulcer", "hernia", "muscles", "tendons",
        "ligaments", "radiology", "X-ray", "CT scan", "MRI", "blood test", "biopsy", "pharmacology", "antibiotics",
        "antiseptic", "immune system", "toxins", "dehydration", "first aid", "burns", "fracture", "sprain", "wound", 
        "bandage", "CPR", "defibrillator", "cataract", "glaucoma", "diarrhea", "constipation", "appendix", "tonsils",
        "hypertension", "hypotension", "anemia", "leukemia", "multiple sclerosis", "Parkinson’s disease", "epilepsy",
        "vertigo", "fibromyalgia", "celiac disease", "endometriosis", "lupus", "rheumatoid arthritis", "gout",
        "obstetrics", "dermatology", "oncology", "gastroenterology", "endocrinology", "urology", "nephrology",
        "pulmonology", "ophthalmology", "ENT", "hematology", "rheumatology", "pathology", "anesthesiology",
        "gerontology", "palliative care", "homeopathy", "naturopathy", "acupuncture", "chiropractic", "ayurveda",
        "alternative medicine", "occupational therapy", "speech therapy", "prosthetics", "organ transplant",
        "dialysis", "chemotherapy", "radiotherapy", "gene therapy", "stem cells", "plastic surgery", "cosmetic surgery",
        "liposuction", "rhinoplasty", "breast augmentation", "hair transplant", "botox", "fillers", "skin rejuvenation",
        "laser treatment", "scar removal", "skin grafting", "wound healing", "post-operative care", "pain management",
        "opioids", "NSAIDs", "corticosteroids", "insulin", "blood transfusion", "donor", "plasma therapy", "IV drip",
        "infusion therapy", "oxygen therapy", "ventilator", "ICU", "pediatrics", "neonatology", "prenatal care",
        "postnatal care", "lactation", "breastfeeding", "infant health", "child growth", "immunization schedule",
        "HPV vaccine", "MMR vaccine", "meningitis", "tuberculosis", "yellow fever", "typhoid", "malaria", "dengue",
        "chikungunya", "Zika virus", "Ebola", "SARS", "HIV", "AIDS", "STDs", "gonorrhea", "syphilis", "chlamydia",
        "hepatitis A", "hepatitis B", "hepatitis C", "cirrhosis", "fatty liver", "gallbladder", "pancreatitis",
        "gastroesophageal reflux", "colitis", "Crohn’s disease", "IBS", "diverticulitis", "prostate", "testosterone",
        "erectile dysfunction", "infertility", "PCOS", "menopause", "osteoporosis", "calcium deficiency",
        "vitamin D", "iron deficiency", "ketogenic diet", "intermittent fasting", "plant-based diet",
        "gluten-free", "vegan diet", "paleo diet", "low-carb diet", "cardio workout", "HIIT", "strength training",
        "mental resilience", "mindfulness", "stress management", "anxiety relief", "cognitive behavioral therapy",
        "CBT", "psychoanalysis", "hypnotherapy", "music therapy", "art therapy", "equine therapy", "pet therapy",
        "addiction", "substance abuse", "alcoholism", "rehab center", "detox", "smoking cessation",
        "nicotine patches", "counseling", "self-care", "sun protection", "sunscreen", "hydration", "skin hydration",
        "facial treatments", "anti-aging", "wrinkle prevention", "collagen", "elastin", "hair care",
        "dandruff treatment", "hair loss", "baldness", "alopecia", "scalp treatment", "dental hygiene",
        "teeth whitening", "braces", "invisible aligners", "root canal", "tooth extraction", "gum disease",
        "bad breath", "halitosis", "oral cancer", "toothache", "wisdom tooth", "dental implants", "TMJ disorder",
        "hearing loss", "hearing aids", "tinnitus", "cochlear implants", "sinusitis", "nasal congestion",
        "snoring treatment", "sleep apnea", "restless leg syndrome", "narcolepsy", "chronic fatigue syndrome",
        "fibroid", "ovarian cyst", "hysterectomy", "cervical cancer", "pap smear", "mammogram", "breast cancer",
        "prostate cancer", "colon cancer", "skin cancer", "melanoma", "lymphoma", "sarcoma", "bone marrow transplant",
        "IVF", "surrogacy", "neonatal ICU", "pediatric ICU", "critical care", "emergency room", "ambulance",
        "paramedics", "first responder", "trauma care", "CPR training", "wound dressing", "burn care",
        "disinfectants", "sanitizer", "hygiene", "handwashing", "sepsis", "ICU monitoring", "pulse oximeter",
        "blood glucose monitor", "telemedicine", "e-health", "online consultation", "wearable health devices",
        "smartwatch health tracking", "AI in healthcare", "robotic surgery", "3D printing in medicine",
        "personalized medicine", "genetic testing", "pharmacogenomics", "cancer screening", "early detection",
        "pandemic", "epidemic", "public health", "healthcare insurance", "universal healthcare", "affordable care",
        "medical billing", "health records", "electronic health records", "EHR", "nursing home", "palliative medicine",
        "hospice care", "elderly care", "geriatrics", "fall prevention", "mobility aids", "wheelchair", "crutches",
        "prosthetic limbs", "biomechanics", "bionics", "wearable ECG monitors", "diabetic foot care",
        "artificial organs", "gene editing", "nanomedicine", "biotechnology in medicine", "molecular biology",
        "lab tests", "clinical trials", "medical ethics", "patient rights", "doctor-patient confidentiality",
        "health policy", "mental wellness", "suicide prevention","hi","hello", "dizziness", "headache", "nausea", "fatigue", "shortness of breath", "palpitations", "chest pain", 
        "tingling", "blurry vision", "stroke", "numbness", "abdominal pain", "lightheadedness", "blood in urine", 
        "pressure", "diabetes", "weight loss", "joint pain", "loss of appetite", "exhaustion", "thyroid", "stomach cramps",
        "cough", "itchy skin", "night sweats", "ear blockage", "ear infection", "fainting", "yellow eyes", "cold hands", 
        "hypertension", "bloating", "metallic taste", "tinnitus", "nosebleed", "eye pain", "gas", "numb fingers", 
        "heart attack", "mouth ulcers", "muscle twitches", "sore throat", "dark urine", "swallowing difficulty", 
        "palpitations", "cold intolerance", "hair loss", "post-meal nausea", "back pain", "skin rash", "dehydration", 
        "bleeding gums", "bad breath", "chest tightness", "food poisoning", "leg cramps", "swollen feet", "burning stomach", 
        "blurry vision", "sleep exhaustion", "kidney problems", "diarrhea", "skin patches", "body weakness", "hair thinning",
        "red spots", "allergy", "anemia", "cancer", "fever", "constipation", "vomiting", "vertigo", "sinusitis", 
        "depression", "anxiety", "panic attack", "migraine", "bronchitis", "pneumonia", "hepatitis", "cirrhosis", 
        "liver disease", "ulcer", "hernia", "arthritis", "osteoporosis", "fibromyalgia", "epilepsy", "parkinson's", 
        "multiple sclerosis", "alzheimer's", "dementia", "autism", "ADHD", "gallbladder", "pancreatitis", "reflux", 
        "colitis", "prostate", "infertility", "menopause", "PCOS", "stroke", "tumor"
           
        
        
    ];
    

    // ✅ Booking Keywords
    const bookingKeywords = ["booking", "appointment", "schedule", "reservation"];

    // ✅ Function to check if a question is healthcare-related
    function isHealthcareQuestion(question) {
        question = question.toLowerCase();
        return healthcareKeywords.some(keyword => question.includes(keyword));
    }

    // ✅ Function to check if booking-related keywords exist
    function isBookingQuestion(question) {
        question = question.toLowerCase();
        return bookingKeywords.some(keyword => question.includes(keyword));
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

        // Add user message to chat
        messages.innerHTML += `<p><b>You:</b> ${userText}</p>`;
        messages.innerHTML += `<p id="loadingMessage" style="color: lightblue;">Healthcare AI Assistant is typing...</p>`; // Loading indicator
        userInput.value = "";
        messages.scrollTop = messages.scrollHeight;

        // ✅ Check if it's a booking-related question and redirect
        if (isBookingQuestion(userText)) {
            messages.innerHTML += `<p><b>Healthcare AI Assistant:</b> Redirecting you to our booking page... <a href="https://prince-hospital.dayschedule.com/" target="_blank">Click here</a> to schedule an appointment.</p>`;
            isProcessing = false;
            setTimeout(() => {
                window.location.href = "https://prince-hospital.dayschedule.com/";
            }, 2000); // Redirect after 2 seconds
            return;
        }

        // ✅ Check if the question is healthcare-related
        if (!isHealthcareQuestion(userText)) {
            messages.innerHTML += `<p><b>Healthcare AI Assistant:</b> I'm here to assist with healthcare-related queries. Please ask a question related to health, wellness, or medicine.</p>`;
            document.getElementById("loadingMessage").remove(); // Remove loading message
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
            document.getElementById("loadingMessage").remove(); // Remove loading message

            if (data.reply) {
                messages.innerHTML += `<p><b>Healthcare AI Assistant:</b> ${data.reply}</p>`;
            } else {
                messages.innerHTML += `<p style="color: red;"><b>Healthcare AI Assistant:</b> Error: No response received.</p>`;
            }
        } catch (error) {
            document.getElementById("loadingMessage").remove(); // Remove loading message
            messages.innerHTML += `<p style="color: red;"><b>Healthcare AI Assistant:</b> Error fetching response.</p>`;
        }

        isProcessing = false;
        messages.scrollTop = messages.scrollHeight; // Auto-scroll to latest message
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
