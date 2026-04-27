# 🌍 Air Wear — Intelligent Lifestyle Recommendation System

Air Wear is a **real-time decision-support dashboard** that transforms environmental data into actionable lifestyle insights.
Instead of displaying raw values like temperature or AQI, it interprets them to guide users on **health, fashion, and skincare decisions**.

### 🔗 Live Demo
**[Play with the live dashboard here!](https://md-abidhussain.github.io/air-wear/)**

---

## 🚀 Problem Statement

Traditional weather apps provide raw data (e.g., AQI = 350), but users struggle to interpret:

* Should I wear a mask?
* What clothes are suitable?
* Is UV harmful today?

Air Wear bridges this gap by converting environmental data into **human-centric recommendations**.

---

## 💡 Solution

Air Wear integrates multiple environmental parameters and applies a **rule-based intelligence engine** to generate:

* 🫁 Health advice (mask, hydration, outdoor exposure)
* 👕 Fashion suggestions (fabric, layering)
* 🧴 Skincare protocols (SPF, hydration)

---

## ⚙️ Features

* 📊 Real-time Environmental Data:

  * Temperature
  * AQI (Air Quality Index)
  * Humidity
  * UV Index (API-based / simulated fallback)

* 🧠 Intelligent Recommendation Engine:

  * Rule-based decision logic
  * Multi-condition evaluation

* 🤖 AI Simulation Layer:

  * Generates contextual lifestyle summaries
  * Mimics AI-driven advisory systems

* 🔐 User System:

  * Google login (simulated)
  * Guest mode
  * Newsletter preference (localStorage)

* 🎨 Modern Dashboard UI:

  * Sidebar navigation
  * Card-based layout
  * Clean SaaS-style design

---

## 🛠 Tech Stack

### Frontend

* HTML5
* CSS3
* Bootstrap 5
* JavaScript (ES6)

### APIs

* OpenWeatherMap → Temperature, Humidity
* WAQI (World Air Quality Index) → AQI, UV

### Storage

* localStorage (session & preferences)

---

## 🧠 System Architecture

1. Fetch data from APIs
2. Store in centralized object (`globalWeatherData`)
3. Apply rule-based conditions
4. Generate recommendations
5. Update UI dynamically via DOM

---

## ⚠️ Limitations

* AI system is simulated (not real ML model)
* Authentication is frontend-based (not secure for production)
* API keys managed client-side (future backend required)

---

## 🔮 Future Scope

* Backend integration (Node.js + Express)
* Secure authentication (OAuth / Firebase)
* Real AI integration (Gemini / OpenAI)
* Personalized recommendations using ML
* Email notification system

---

## 📌 Key Learning Outcomes

* API integration & asynchronous programming
* DOM manipulation & dynamic UI updates
* Rule-based system design
* Frontend architecture & UX design

---

## 👨‍💻 Author

**Mohd Abid Hussain**
B.Tech CSE — 6th Semester

---

## ⭐ Final Note

> Air Wear is not just a weather dashboard — it is a step toward **context-aware intelligent systems** that help users make better daily decisions.
