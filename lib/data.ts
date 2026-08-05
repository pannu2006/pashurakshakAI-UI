export type ScreenId =
  | 'home'
  | 'voice'
  | 'health'
  | 'dairy'
  | 'weather'
  | 'prices'
  | 'schemes'
  | 'vaccination'
  | 'emergency'
  | 'offline'

export type Lang = 'mr' | 'hi' | 'en'

export type Feature = {
  id: ScreenId
  emoji: string
  labels: Record<Lang, string>
  color: string // tailwind classes for the icon tile background
}

export const FEATURES: Feature[] = [
  {
    id: 'health',
    emoji: '🐄',
    labels: { mr: 'पशू आरोग्य', hi: 'पशु स्वास्थ्य', en: 'Animal Health' },
    color: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: 'dairy',
    emoji: '🥛',
    labels: { mr: 'दूध व डेअरी', hi: 'दूध व डेयरी', en: 'Dairy & Milk' },
    color: 'bg-sky-100 text-sky-700',
  },
  {
    id: 'dairy',
    emoji: '🌾',
    labels: { mr: 'चारा सल्ला', hi: 'चारा सलाह', en: 'Feed Advice' },
    color: 'bg-amber-100 text-amber-700',
  },
  {
    id: 'schemes',
    emoji: '🏛',
    labels: { mr: 'सरकारी योजना', hi: 'सरकारी योजना', en: 'Govt Schemes' },
    color: 'bg-indigo-100 text-indigo-700',
  },
  {
    id: 'weather',
    emoji: '🌦',
    labels: { mr: 'हवामान अलर्ट', hi: 'मौसम अलर्ट', en: 'Weather Alerts' },
    color: 'bg-cyan-100 text-cyan-700',
  },
  {
    id: 'prices',
    emoji: '💰',
    labels: { mr: 'दूध व बाजारभाव', hi: 'दूध व मंडी भाव', en: 'Milk & Mandi' },
    color: 'bg-green-100 text-green-700',
  },
  {
    id: 'vaccination',
    emoji: '🔔',
    labels: { mr: 'लसीकरण', hi: 'टीकाकरण', en: 'Vaccination' },
    color: 'bg-orange-100 text-orange-700',
  },
  {
    id: 'emergency',
    emoji: '📞',
    labels: { mr: 'आपत्कालीन डॉक्टर', hi: 'आपातकालीन डॉक्टर', en: 'Emergency Vet' },
    color: 'bg-rose-100 text-rose-700',
  },
  {
    id: 'offline',
    emoji: '📴',
    labels: { mr: 'ऑफलाइन मोड', hi: 'ऑफलाइन मोड', en: 'Offline Mode' },
    color: 'bg-slate-100 text-slate-700',
  },
]

export const SCREEN_TITLES: Record<ScreenId, Record<Lang, string>> = {
  home: { mr: 'मुख्यपृष्ठ', hi: 'होम', en: 'Home' },
  voice: { mr: 'आवाज सहाय्यक', hi: 'आवाज सहायक', en: 'Voice Assistant' },
  health: { mr: 'पशू आरोग्य', hi: 'पशु स्वास्थ्य', en: 'Animal Health' },
  dairy: { mr: 'दूध व चारा', hi: 'दूध व चारा', en: 'Dairy & Feed' },
  weather: { mr: 'हवामान', hi: 'मौसम', en: 'Weather' },
  prices: { mr: 'दूध व बाजारभाव', hi: 'दूध व मंडी भाव', en: 'Milk & Mandi Prices' },
  schemes: { mr: 'सरकारी योजना', hi: 'सरकारी योजना', en: 'Government Schemes' },
  vaccination: { mr: 'लसीकरण', hi: 'टीकाकरण', en: 'Vaccination Reminder' },
  emergency: { mr: 'आपत्कालीन मदत', hi: 'आपातकालीन मदद', en: 'Emergency' },
  offline: { mr: 'ऑफलाइन मोड', hi: 'ऑफलाइन मोड', en: 'Offline Mode' },
}

/* ---------------------- Animal Health knowledge base ---------------------- */

export type EmergencyLevel = 'low' | 'medium' | 'high'

export type HealthResult = {
  causes: string[]
  precautions: string[]
  feed: string[]
  level: EmergencyLevel
}

export const ANIMAL_TYPES = ['Cow', 'Buffalo', 'Goat', 'Sheep', 'Poultry']

export const COMMON_SYMPTOMS = [
  'Fever',
  'Loss of appetite',
  'Diarrhea',
  'Mouth blisters',
  'Limping',
  'Reduced milk',
  'Coughing',
  'Bloating',
]

// Simple keyword-driven guidance engine (awareness only, not a diagnosis).
export function analyzeSymptoms(animal: string, symptoms: string): HealthResult {
  const s = symptoms.toLowerCase()
  const has = (...k: string[]) => k.some((x) => s.includes(x))

  let level: EmergencyLevel = 'low'
  const causes: string[] = []
  const precautions: string[] = []
  const feed: string[] = []

  if (has('blister', 'mouth', 'foot', 'lame', 'limp', 'drool')) {
    level = 'high'
    causes.push('Possible Foot-and-Mouth Disease (FMD)')
    precautions.push('Isolate the animal from the herd immediately')
    precautions.push('Wash mouth/hooves with mild antiseptic and keep bedding dry')
    feed.push('Soft, easy-to-chew feed like soaked gram and green fodder')
  }
  if (has('bloat', 'swollen stomach', 'gas')) {
    level = level === 'high' ? 'high' : 'medium'
    causes.push('Bloat from excess green fodder or grain')
    precautions.push('Walk the animal slowly and avoid fresh legume fodder')
    feed.push('Dry roughage such as straw; avoid wet lush grass for a day')
  }
  if (has('diarrhea', 'loose', 'dung')) {
    level = level === 'high' ? 'high' : 'medium'
    causes.push('Digestive infection or contaminated water')
    precautions.push('Provide clean water and oral rehydration (salt + jaggery water)')
    feed.push('Boiled rice water and dry fodder until stool firms up')
  }
  if (has('fever', 'hot', 'temperature')) {
    level = level === 'high' ? 'high' : 'medium'
    causes.push('Infection or tick-borne fever')
    precautions.push('Keep the animal in shade with plenty of clean water')
    feed.push('Light green fodder and mineral mixture in water')
  }
  if (has('cough', 'breath', 'nasal', 'pneumonia')) {
    level = level === 'high' ? 'high' : 'medium'
    causes.push('Respiratory infection')
    precautions.push('Move to a warm, dry, well-ventilated shed away from drafts')
    feed.push('Warm mash with jaggery to encourage intake')
  }
  if (has('milk', 'udder', 'mastitis', 'lump')) {
    level = level === 'high' ? 'high' : 'medium'
    causes.push('Possible mastitis or nutritional stress')
    precautions.push('Milk out fully, keep udder clean and dry, apply warm compress')
    feed.push('Balanced ration with calcium and mineral mixture')
  }
  if (has('appetite', 'not eating', 'weak')) {
    causes.push('General weakness or early illness')
    precautions.push('Observe closely for 12 hours and record temperature')
    feed.push('Palatable green fodder, jaggery water and mineral mixture')
  }

  if (causes.length === 0) {
    causes.push('Symptoms are unclear from the description')
    precautions.push('Keep the animal comfortable, hydrated and observe closely')
    feed.push('Normal balanced feed with clean water and mineral mixture')
  }

  return { causes, precautions, feed, level }
}

/* ---------------------------- Dairy & Feed data --------------------------- */

export type DairyCard = {
  emoji: string
  title: Record<Lang, string>
  body: Record<Lang, string>
  color: string
}

export const DAIRY_CARDS: DairyCard[] = [
  {
    emoji: '🥛',
    color: 'bg-sky-50',
    title: { mr: 'दूध वाढवण्याचे उपाय', hi: 'दूध बढ़ाने के उपाय', en: 'Boost Milk Production' },
    body: {
      mr: 'दिवसातून दोन वेळा नियमित दूध काढा आणि संतुलित आहार द्या. गाभण जनावरांना जास्त काळजी.',
      hi: 'दिन में दो बार नियमित दूध निकालें और संतुलित आहार दें। गाभिन पशुओं का विशेष ध्यान रखें।',
      en: 'Milk at regular times twice a day and feed a balanced ration. Give extra care to pregnant animals.',
    },
  },
  {
    emoji: '🌾',
    color: 'bg-amber-50',
    title: { mr: 'चारा सल्ला', hi: 'चारा सलाह', en: 'Feed Recommendation' },
    body: {
      mr: 'हिरवा चारा, वाळलेला चारा आणि थोडा खुराक यांचे प्रमाण ठेवा. दररोज ३०-४० किलो हिरवा चारा.',
      hi: 'हरा चारा, सूखा चारा और थोड़ा दाना संतुलित रखें। रोज़ 30-40 किलो हरा चारा दें।',
      en: 'Balance green fodder, dry fodder and a little concentrate. Give 30-40 kg green fodder daily.',
    },
  },
  {
    emoji: '💧',
    color: 'bg-cyan-50',
    title: { mr: 'पाणी', hi: 'पानी', en: 'Water Intake' },
    body: {
      mr: 'स्वच्छ पाणी नेहमी उपलब्ध ठेवा. एका गाईला दररोज ४०-८० लिटर पाणी लागते.',
      hi: 'साफ पानी हमेशा उपलब्ध रखें। एक गाय को रोज़ 40-80 लिटर पानी चाहिए।',
      en: 'Keep clean water always available. A cow needs 40-80 litres of water per day.',
    },
  },
  {
    emoji: '🧂',
    color: 'bg-orange-50',
    title: { mr: 'खनिज मिश्रण', hi: 'खनिज मिश्रण', en: 'Mineral Mixture' },
    body: {
      mr: 'दररोज ५०-१०० ग्रॅम खनिज मिश्रण खुराकात मिसळा. यामुळे प्रजनन व दूध सुधारते.',
      hi: 'रोज़ 50-100 ग्राम खनिज मिश्रण दाने में मिलाएं। इससे प्रजनन व दूध सुधरता है।',
      en: 'Mix 50-100 g mineral mixture in feed daily. It improves fertility and milk yield.',
    },
  },
  {
    emoji: '🍃',
    color: 'bg-emerald-50',
    title: { mr: 'पोषण मार्गदर्शन', hi: 'पोषण मार्गदर्शन', en: 'Nutrition Guidance' },
    body: {
      mr: 'दूध देणाऱ्या जनावरांना प्रथिनयुक्त आहार व कॅल्शियम द्या. अचानक आहार बदलू नका.',
      hi: 'दूध देने वाले पशुओं को प्रोटीनयुक्त आहार व कैल्शियम दें। अचानक आहार न बदलें।',
      en: 'Give lactating animals protein-rich feed and calcium. Never change the diet suddenly.',
    },
  },
]

/* -------------------------------- Weather --------------------------------- */

export const WEATHER = {
  place: 'Ahmednagar, Maharashtra',
  temp: 38,
  humidity: 62,
  condition: { mr: 'ऊन व दमट', hi: 'धूप व उमस', en: 'Sunny & Humid' },
  alertTitle: { mr: 'तीव्र उष्णता अलर्ट', hi: 'तेज़ गर्मी अलर्ट', en: 'High Heat Alert' },
  advice: {
    mr: 'सकाळी ११ ते दुपारी ४ या वेळेत जनावरांना सावलीत ठेवा आणि भरपूर पाणी द्या.',
    hi: 'सुबह 11 से दोपहर 4 बजे तक पशुओं को छाँव में रखें और भरपूर पानी दें।',
    en: 'Keep cattle under shade between 11 AM and 4 PM and give plenty of water.',
  },
}

/* ------------------------------ Mandi prices ------------------------------ */

export type PriceCard = {
  dairy: string
  price: number
  updated: string
  best?: boolean
}

export const MILK_PRICES: PriceCard[] = [
  { dairy: 'Amul Collection Center', price: 38, updated: 'Today 6:00 AM' },
  { dairy: 'Gokul Dairy', price: 42, updated: 'Today 7:30 AM', best: true },
  { dairy: 'Mahanand Dairy', price: 40, updated: 'Today 6:15 AM' },
  { dairy: 'Local Cooperative', price: 36, updated: 'Yesterday 8:00 PM' },
]

/* --------------------------- Government schemes --------------------------- */

export type Scheme = {
  name: Record<Lang, string>
  benefit: Record<Lang, string>
  eligibility: Record<Lang, string>
  documents: string[]
}

export const SCHEMES: Scheme[] = [
  {
    name: {
      mr: 'राष्ट्रीय गोकुळ मिशन',
      hi: 'राष्ट्रीय गोकुल मिशन',
      en: 'Rashtriya Gokul Mission',
    },
    benefit: {
      mr: 'देशी गोवंश संवर्धन व दुग्ध उत्पादन वाढीसाठी अनुदान.',
      hi: 'देशी गौवंश संवर्धन व दुग्ध उत्पादन वृद्धि हेतु अनुदान।',
      en: 'Subsidy for indigenous breed development and higher milk output.',
    },
    eligibility: {
      mr: 'नोंदणीकृत पशुपालक व दूध उत्पादक शेतकरी.',
      hi: 'पंजीकृत पशुपालक व दूध उत्पादक किसान।',
      en: 'Registered cattle owners and milk-producing farmers.',
    },
    documents: ['Aadhaar Card', 'Land Record (7/12)', 'Bank Passbook', 'Animal Photo'],
  },
  {
    name: {
      mr: 'पशु किसान क्रेडिट कार्ड',
      hi: 'पशु किसान क्रेडिट कार्ड',
      en: 'Pashu Kisan Credit Card',
    },
    benefit: {
      mr: 'कमी व्याजदरात जनावरांच्या पालनासाठी कर्ज.',
      hi: 'कम ब्याज दर पर पशुपालन हेतु ऋण।',
      en: 'Low-interest loan for cattle rearing and dairy needs.',
    },
    eligibility: {
      mr: 'जनावरे असलेले कोणतेही शेतकरी.',
      hi: 'पशु रखने वाले कोई भी किसान।',
      en: 'Any farmer who owns milch or draught animals.',
    },
    documents: ['Aadhaar Card', 'PAN Card', 'Bank Passbook', 'Cattle Ownership Proof'],
  },
  {
    name: {
      mr: 'पशुधन विमा योजना',
      hi: 'पशुधन बीमा योजना',
      en: 'Livestock Insurance Scheme',
    },
    benefit: {
      mr: 'जनावराच्या मृत्यूवर विमा संरक्षण, हप्त्यावर अनुदान.',
      hi: 'पशु की मृत्यु पर बीमा सुरक्षा, प्रीमियम पर अनुदान।',
      en: 'Insurance cover on animal death with subsidy on premium.',
    },
    eligibility: {
      mr: 'गाय, म्हैस असलेले शेतकरी.',
      hi: 'गाय, भैंस रखने वाले किसान।',
      en: 'Farmers owning cows or buffaloes.',
    },
    documents: ['Aadhaar Card', 'Bank Passbook', 'Animal Health Certificate'],
  },
]

/* ---------------------------- Vaccination data ---------------------------- */

export type VaccineStatus = 'done' | 'upcoming'

export type VaccineItem = {
  animal: string
  vaccine: string
  date: string
  status: VaccineStatus
}

export const VACCINES: VaccineItem[] = [
  { animal: 'Ganga (Cow)', vaccine: 'FMD Vaccine', date: '10 Jan 2026', status: 'done' },
  { animal: 'Bholu (Buffalo)', vaccine: 'HS Vaccine', date: '02 Feb 2026', status: 'done' },
  { animal: 'Ganga (Cow)', vaccine: 'Brucellosis', date: '18 Aug 2026', status: 'upcoming' },
  { animal: 'Moti (Goat)', vaccine: 'PPR Vaccine', date: '25 Aug 2026', status: 'upcoming' },
  { animal: 'Bholu (Buffalo)', vaccine: 'Deworming', date: '05 Sep 2026', status: 'upcoming' },
]

/* --------------------------- Emergency contacts --------------------------- */

export type EmergencyContact = {
  emoji: string
  label: Record<Lang, string>
  phone: string
  color: string
}

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    emoji: '📞',
    label: { mr: 'पशुवैद्यकाला कॉल करा', hi: 'पशु चिकित्सक को कॉल करें', en: 'Call Veterinarian' },
    phone: '18002330418',
    color: 'bg-primary text-primary-foreground',
  },
  {
    emoji: '🚑',
    label: { mr: 'पशु रुग्णवाहिका', hi: 'पशु एम्बुलेंस', en: 'Animal Ambulance' },
    phone: '1962',
    color: 'bg-rose-600 text-white',
  },
  {
    emoji: '☎',
    label: { mr: 'सरकारी हेल्पलाइन', hi: 'सरकारी हेल्पलाइन', en: 'Government Helpline' },
    phone: '18001801551',
    color: 'bg-indigo-600 text-white',
  },
]
