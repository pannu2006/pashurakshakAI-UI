import type { Lang } from './data'

export const LANG_LABELS: { id: Lang; label: string }[] = [
  { id: 'mr', label: 'मराठी' },
  { id: 'hi', label: 'हिंदी' },
  { id: 'en', label: 'English' },
]

// BCP-47 codes for the Web Speech API
export const SPEECH_LOCALE: Record<Lang, string> = {
  mr: 'mr-IN',
  hi: 'hi-IN',
  en: 'en-IN',
}

export const UI = {
  greetingLine1: {
    mr: 'नमस्कार शेतकरी मित्रा! 👋',
    hi: 'नमस्ते किसान मित्र! 👋',
    en: 'Hello, farmer friend! 👋',
  },
  greetingLine2: {
    mr: 'मी तुमचा पशू आरोग्य सहाय्यक आहे.',
    hi: 'मैं आपका पशु स्वास्थ्य सहायक हूँ।',
    en: 'I am your livestock health assistant.',
  },
  tapToSpeak: { mr: 'बोलण्यासाठी दाबा', hi: 'बोलने के लिए दबाएं', en: 'Tap to Speak' },
  listening: { mr: 'ऐकत आहे...', hi: 'सुन रहा हूँ...', en: 'Listening...' },
  speaking: { mr: 'बोलत आहे...', hi: 'बोल रहा हूँ...', en: 'Speaking...' },
  stop: { mr: 'थांबा', hi: 'रुकें', en: 'Stop' },
  askAnything: {
    mr: 'तुमच्या जनावरांबद्दल काहीही विचारा',
    hi: 'अपने पशुओं के बारे में कुछ भी पूछें',
    en: 'Ask anything about your animals',
  },
  you: { mr: 'तुम्ही', hi: 'आप', en: 'You' },
  assistant: { mr: 'सहाय्यक', hi: 'सहायक', en: 'Assistant' },
  quickHelp: { mr: 'पटकन विचारा', hi: 'जल्दी पूछें', en: 'Quick questions' },
  disclaimer: {
    mr: 'ही माहिती फक्त जागरूकतेसाठी आहे आणि पशुवैद्यकीय सल्ल्याला पर्याय नाही.',
    hi: 'यह जानकारी केवल जागरूकता के लिए है और पशु चिकित्सा सलाह का विकल्प नहीं है।',
    en: 'This guidance is for awareness only and does not replace professional veterinary advice.',
  },
  online: { mr: 'AI शी जोडलेले', hi: 'AI से जुड़ा हुआ', en: 'Connected to AI' },
  offline: { mr: 'ऑफलाइन AI उपलब्ध', hi: 'ऑफलाइन AI उपलब्ध', en: 'Offline AI Available' },
  offlineNote: {
    mr: 'इंटरनेटशिवाय सामान्य पशु मार्गदर्शन उपलब्ध आहे.',
    hi: 'इंटरनेट के बिना सामान्य पशु मार्गदर्शन उपलब्ध है।',
    en: 'Common livestock guidance is available without internet.',
  },
  animalType: { mr: 'जनावराचा प्रकार', hi: 'पशु का प्रकार', en: 'Animal Type' },
  symptoms: { mr: 'लक्षणे', hi: 'लक्षण', en: 'Symptoms' },
  symptomsPlaceholder: {
    mr: 'उदा. ताप, खात नाही, तोंडात फोड',
    hi: 'जैसे बुखार, खाना न खाना, मुंह में छाले',
    en: 'e.g. fever, not eating, mouth blisters',
  },
  checkHealth: { mr: 'तपासा', hi: 'जाँचें', en: 'Check Health' },
  possibleCauses: { mr: 'संभाव्य कारणे', hi: 'संभावित कारण', en: 'Possible Causes' },
  precautions: { mr: 'त्वरित काळजी', hi: 'तत्काल सावधानियाँ', en: 'Immediate Precautions' },
  recommendedFeed: { mr: 'शिफारस केलेला चारा', hi: 'अनुशंसित आहार', en: 'Recommended Feed' },
  emergencyLevel: { mr: 'आपत्कालीन पातळी', hi: 'आपातकालीन स्तर', en: 'Emergency Level' },
  contactVet: {
    mr: '🚨 त्वरित पशुवैद्यकाशी संपर्क साधा',
    hi: '🚨 तुरंत पशु चिकित्सक से संपर्क करें',
    en: '🚨 Contact Veterinarian Immediately',
  },
  bestPrice: { mr: 'सर्वोत्तम भाव', hi: 'सर्वोत्तम भाव', en: 'Best Price' },
  lastUpdated: { mr: 'शेवटचे अपडेट', hi: 'अंतिम अपडेट', en: 'Last Updated' },
  benefits: { mr: 'फायदे', hi: 'लाभ', en: 'Benefits' },
  eligibility: { mr: 'पात्रता', hi: 'पात्रता', en: 'Eligibility' },
  documents: { mr: 'आवश्यक कागदपत्रे', hi: 'आवश्यक दस्तावेज़', en: 'Required Documents' },
  apply: { mr: 'अर्ज करा', hi: 'आवेदन करें', en: 'Apply' },
  dueDate: { mr: 'नियोजित तारीख', hi: 'नियत तिथि', en: 'Due Date' },
  completed: { mr: 'पूर्ण', hi: 'पूर्ण', en: 'Completed' },
  upcoming: { mr: 'येणारे', hi: 'आगामी', en: 'Upcoming' },
  humidity: { mr: 'आर्द्रता', hi: 'नमी', en: 'Humidity' },
  livestockAdvice: {
    mr: 'जनावरांसाठी सल्ला',
    hi: 'पशुओं के लिए सलाह',
    en: 'Livestock Advice',
  },
} satisfies Record<string, Record<Lang, string>>

export const QUICK_PROMPTS: Record<Lang, string[]> = {
  mr: ['माझ्या गाईला ताप आहे', 'दूध कमी झाले आहे', 'चारा कोणता द्यावा?', 'लसीकरण कधी?'],
  hi: ['मेरी गाय को बुखार है', 'दूध कम हो गया है', 'कौन सा चारा दें?', 'टीकाकरण कब?'],
  en: ['My cow has fever', 'Milk yield has dropped', 'Which feed to give?', 'When to vaccinate?'],
}

type Reply = Record<Lang, string>

const REPLIES: { keywords: string[]; reply: Reply }[] = [
  {
    keywords: ['fever', 'ताप', 'बुखार', 'hot', 'temperature'],
    reply: {
      mr: 'तापाच्या जनावराला सावलीत ठेवा, भरपूर स्वच्छ पाणी द्या आणि तापमान नोंदवा. १२ तासांत सुधारणा नसेल तर पशुवैद्यकाशी संपर्क साधा.',
      hi: 'बुखार वाले पशु को छाँव में रखें, भरपूर साफ पानी दें और तापमान नोट करें। 12 घंटे में सुधार न हो तो पशु चिकित्सक से संपर्क करें।',
      en: 'Keep the feverish animal in shade, give plenty of clean water and record its temperature. If there is no improvement in 12 hours, contact a veterinarian.',
    },
  },
  {
    keywords: ['milk', 'दूध', 'yield', 'कमी'],
    reply: {
      mr: 'दूध कमी होण्याची कारणे म्हणजे कमी चारा, पाणी किंवा तणाव. संतुलित आहार, खनिज मिश्रण आणि नियमित दूध काढणे सुरू ठेवा.',
      hi: 'दूध कम होने के कारण कम चारा, पानी या तनाव हो सकते हैं। संतुलित आहार, खनिज मिश्रण और नियमित दूध निकालना जारी रखें।',
      en: 'Lower milk yield can be due to less fodder, water or stress. Continue a balanced ration, mineral mixture and milking at regular times.',
    },
  },
  {
    keywords: ['feed', 'चारा', 'खाणे', 'nutrition', 'पोषण'],
    reply: {
      mr: 'दररोज ३०-४० किलो हिरवा चारा, थोडा वाळलेला चारा आणि ५०-१०० ग्रॅम खनिज मिश्रण द्या. आहार अचानक बदलू नका.',
      hi: 'रोज़ 30-40 किलो हरा चारा, थोड़ा सूखा चारा और 50-100 ग्राम खनिज मिश्रण दें। आहार अचानक न बदलें।',
      en: 'Give 30-40 kg green fodder daily, some dry fodder and 50-100 g mineral mixture. Do not change the diet suddenly.',
    },
  },
  {
    keywords: ['vaccine', 'vaccinat', 'लस', 'टीका', 'लसीकरण'],
    reply: {
      mr: 'FMD लस दर ६ महिन्यांनी आणि HS लस पावसाळ्यापूर्वी द्या. तुमच्या लसीकरण स्मरणपत्रात पुढील तारखा पहा.',
      hi: 'FMD टीका हर 6 महीने और HS टीका बरसात से पहले लगवाएं। अपने टीकाकरण रिमाइंडर में अगली तिथियाँ देखें।',
      en: 'Give the FMD vaccine every 6 months and the HS vaccine before monsoon. Check your vaccination reminder for the next dates.',
    },
  },
  {
    keywords: ['diarrhea', 'loose', 'हगवण', 'दस्त', 'पातळ'],
    reply: {
      mr: 'जुलाबासाठी स्वच्छ पाणी आणि मीठ-गूळ पाणी द्या. वाळलेला चारा द्या. रक्त किंवा अशक्तपणा दिसल्यास त्वरित पशुवैद्यक.',
      hi: 'दस्त के लिए साफ पानी और नमक-गुड़ पानी दें। सूखा चारा दें। खून या कमजोरी दिखे तो तुरंत पशु चिकित्सक।',
      en: 'For diarrhea give clean water and salt-jaggery water, plus dry fodder. If you see blood or weakness, see a vet immediately.',
    },
  },
  {
    keywords: ['heat', 'summer', 'ऊन', 'गर्मी', 'उष्ण'],
    reply: {
      mr: 'उन्हाळ्यात सकाळी ११ ते ४ जनावरे सावलीत ठेवा, गोठ्यात हवा खेळती ठेवा आणि थंड पाणी सतत उपलब्ध ठेवा.',
      hi: 'गर्मी में सुबह 11 से 4 पशुओं को छाँव में रखें, गौशाला में हवा रखें और ठंडा पानी हमेशा उपलब्ध रखें।',
      en: 'In summer keep animals in shade from 11 AM to 4 PM, keep the shed ventilated and provide cool water at all times.',
    },
  },
  {
    keywords: ['scheme', 'योजना', 'loan', 'कर्ज', 'subsidy', 'अनुदान'],
    reply: {
      mr: 'पशु किसान क्रेडिट कार्ड आणि राष्ट्रीय गोकुळ मिशन सारख्या योजना उपलब्ध आहेत. सरकारी योजना विभागात तपशील पहा.',
      hi: 'पशु किसान क्रेडिट कार्ड और राष्ट्रीय गोकुल मिशन जैसी योजनाएं उपलब्ध हैं। सरकारी योजना अनुभाग में विवरण देखें।',
      en: 'Schemes like the Pashu Kisan Credit Card and Rashtriya Gokul Mission are available. Check the Government Schemes section for details.',
    },
  },
]

const FALLBACK: Reply = {
  mr: 'मी समजून घेण्याचा प्रयत्न करत आहे. कृपया जनावराचा प्रकार आणि लक्षणे थोडक्यात सांगा, जसे "गाईला ताप आहे".',
  hi: 'मैं समझने की कोशिश कर रहा हूँ। कृपया पशु का प्रकार और लक्षण संक्षेप में बताएं, जैसे "गाय को बुखार है"।',
  en: 'I am trying to understand. Please tell me the animal type and symptoms briefly, like "cow has fever".',
}

export function generateReply(text: string, lang: Lang): string {
  const t = text.toLowerCase()
  for (const item of REPLIES) {
    if (item.keywords.some((k) => t.includes(k.toLowerCase()))) {
      return item.reply[lang]
    }
  }
  return FALLBACK[lang]
}
