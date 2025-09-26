# ShikshaMitra - AI Teaching Assistant

**Empowering teachers in multi-grade, under-resourced classrooms with AI.**

---

## Problem Statement & Market Need
In countless under-resourced schools across India, a single teacher often manages multiple grades in one classroom. These educators are stretched thin, lacking time and tools to create localized teaching aids, address diverse learning levels, and personalize education for every child.  

**The challenge:** Build a true AI companion that lessens this burden and amplifies teachers' impact.

---

## Solution Overview
**ShikshaMitra** is an AI-powered teaching assistant that empowers teachers in multi-grade, low-resource environments. It provides a versatile platform for:

- Creating hyper-local content in regional languages.
- Generating visual aids like diagrams, charts, and illustrations.
- Answering student queries with simple explanations.
- Designing differentiated worksheets for multiple grade levels.
- Automating lesson planning and educational activities.

ShikshaMitra combines AI content generation, multimodal visual outputs, and real-time Q&A to make classroom management easier and more effective.

---

## Features & Functionality

### ✅ Implemented Features (MVP)
- **Ask Questions (Text-based AI):** Teachers can type a question and receive AI-generated answers with simple explanations.
- **Visual Aid Generation (Images/Diagrams):** Teachers can enter a topic and get diagrams or charts as base64 images generated via AI.

### 🚀 Planned Features (Scalable)
- **Multilingual Content Generation:** Create stories, explanations, and exercises in local languages.
- **Differentiated Worksheets:** Upload textbook pages and generate worksheets tailored to multiple grades.
- **Lesson Planning:** AI-generated weekly or daily lesson plans.
- **Audio-based assessments:** Speech-to-text reading evaluations using AI.
- **Gamified Educational Activities:** Auto-generate small educational games to engage students.
- **Offline Mode:** Caching visuals and text for schools with low internet connectivity.

---

## Tech Stack
- **Frontend:** React.js, Tailwind CSS, React Markdown
- **Backend:** Node.js, Express.js
- **AI Integration:** Hugging Face Inference API (Stable Diffusion for visuals), Google Gemini AI (for text generation)
- **Database:**  MongoDB login/signup
- **Deployment:** Vercel (Frontend), Render/Heroku (Backend)

---

## Business Model & Monetization
- **Target Audience:** Schools, NGOs, EdTech platforms in India and emerging markets.
- **Pricing Strategy:** 
  - Freemium: Free basic features for small schools.
  - Subscription Plans:
    - ₹499/month: Access to AI text answers and basic visuals.
    - ₹999/month: Full visual generation, differentiated worksheets, lesson plans.
    - ₹1999/month: Enterprise-level access for multiple classrooms with analytics and reports.
- **Revenue Streams:**
  - Monthly subscriptions
  - Licensing to EdTech companies
  - Partnerships with government school programs
  - Premium add-ons for advanced AI features

---

## How to Use (MVP)
1. **Ask a Question:** Type a question in the input box → AI generates simple answers.
2. **Generate Visuals:** Enter a topic → AI generates charts, diagrams, or easy-to-draw visuals.
3. **Download & Share:** Teachers can download visuals or copy textual explanations to use in class.

---

## Scalability & Future Scope
- Integration with voice assistants for hands-free operation.
- Advanced AI multimodal inputs: allow uploading textbook images for content generation.
- Adaptive AI: tracks student performance and adjusts generated content.
- Mobile-first design for accessibility in remote areas.
- API for third-party EdTech integration.

---

## AI usages
- **Text Generation:** Google Gemini AI (used for Ask Question answers and lesson planning content)
- **Visual Generation:** Hugging Face Stable Diffusion (used for diagrams, charts, and visual aids)
- **AI-assisted Development:** Code snippets and UI suggestions were enhanced using AI tools
- cursor/ lovable
---

- Deploy link: https://shiksha-mitra-ai.vercel.app/
