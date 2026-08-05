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

/** A single string translated into every supported language. */
export type LangText = Record<Lang, string>

export type Feature = {
  id: ScreenId
  emoji: string
  labels: LangText
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

export const SCREEN_TITLES: Record<ScreenId, LangText> = {
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
  causes: LangText[]
  precautions: LangText[]
  feed: LangText[]
  level: EmergencyLevel
}

export type AnimalType = { key: string; labels: LangText }

export const ANIMAL_TYPES: AnimalType[] = [
  { key: 'Cow', labels: { mr: 'गाय', hi: 'गाय', en: 'Cow' } },
  { key: 'Buffalo', labels: { mr: 'म्हैस', hi: 'भैंस', en: 'Buffalo' } },
  { key: 'Goat', labels: { mr: 'शेळी', hi: 'बकरी', en: 'Goat' } },
  { key: 'Sheep', labels: { mr: 'मेंढी', hi: 'भेड़', en: 'Sheep' } },
  { key: 'Poultry', labels: { mr: 'कोंबडी', hi: 'मुर्गी', en: 'Poultry' } },
]

export type SymptomChip = { key: string; labels: LangText }

// Each label is worded so its keywords are matched by analyzeSymptoms in any language.
export const COMMON_SYMPTOMS: SymptomChip[] = [
  { key: 'fever', labels: { mr: 'ताप', hi: 'बुखार', en: 'Fever' } },
  { key: 'appetite', labels: { mr: 'भूक मंदावली', hi: 'भूख न लगना', en: 'Loss of appetite' } },
  { key: 'diarrhea', labels: { mr: 'जुलाब', hi: 'दस्त', en: 'Diarrhea' } },
  { key: 'blister', labels: { mr: 'तोंडात फोड', hi: 'मुंह में छाले', en: 'Mouth blisters' } },
  { key: 'limp', labels: { mr: 'लंगडणे', hi: 'लंगड़ाना', en: 'Limping' } },
  { key: 'milk', labels: { mr: 'दूध कमी', hi: 'दूध कम', en: 'Reduced milk' } },
  { key: 'cough', labels: { mr: 'खोकला', hi: 'खांसी', en: 'Coughing' } },
  { key: 'bloat', labels: { mr: 'पोट फुगणे', hi: 'पेट फूलना', en: 'Bloating' } },
]

// Simple keyword-driven guidance engine (awareness only, not a diagnosis).
// Matches keywords across Marathi, Hindi and English so results follow the
// language the farmer selected the symptoms in.
export function analyzeSymptoms(_animal: string, symptoms: string): HealthResult {
  const s = symptoms.toLowerCase()
  const has = (...k: string[]) => k.some((x) => s.includes(x.toLowerCase()))

  let level: EmergencyLevel = 'low'
  const causes: LangText[] = []
  const precautions: LangText[] = []
  const feed: LangText[] = []

  if (
    has(
      'blister', 'mouth', 'foot', 'lame', 'limp', 'drool',
      'फोड', 'तोंड', 'खूर', 'लंगड', 'लाळ',
      'छाले', 'मुंह', 'खुर', 'लंगड़',
    )
  ) {
    level = 'high'
    causes.push({
      mr: 'लाळ्या खुरकूत (FMD) असण्याची शक्यता',
      hi: 'खुरपका-मुंहपका रोग (FMD) की संभावना',
      en: 'Possible Foot-and-Mouth Disease (FMD)',
    })
    precautions.push({
      mr: 'जनावराला ताबडतोब कळपापासून वेगळे करा',
      hi: 'पशु को तुरंत झुंड से अलग करें',
      en: 'Isolate the animal from the herd immediately',
    })
    precautions.push({
      mr: 'तोंड व खूर सौम्य जंतुनाशकाने धुवा आणि जागा कोरडी ठेवा',
      hi: 'मुंह व खुर को हल्के एंटीसेप्टिक से धोएं और जगह सूखी रखें',
      en: 'Wash mouth and hooves with mild antiseptic and keep bedding dry',
    })
    feed.push({
      mr: 'भिजवलेली हरभरा व हिरवा चारा असा मऊ, सहज चावता येणारा आहार',
      hi: 'भिगोया चना व हरा चारा जैसा नरम, आसानी से चबाने वाला आहार',
      en: 'Soft, easy-to-chew feed like soaked gram and green fodder',
    })
  }
  if (has('bloat', 'swollen stomach', 'gas', 'फुग', 'पोट फुग', 'फूल', 'पेट फूल', 'गॅस')) {
    level = level === 'high' ? 'high' : 'medium'
    causes.push({
      mr: 'जास्त हिरवा चारा किंवा धान्यामुळे पोट फुगणे',
      hi: 'अधिक हरा चारा या अनाज से पेट फूलना',
      en: 'Bloat from excess green fodder or grain',
    })
    precautions.push({
      mr: 'जनावराला हळू चालवा आणि ताजा द्विदल चारा टाळा',
      hi: 'पशु को धीरे चलाएं और ताज़ा फलीदार चारा न दें',
      en: 'Walk the animal slowly and avoid fresh legume fodder',
    })
    feed.push({
      mr: 'गवत/कडबा असा कोरडा चारा; एक दिवस ओला हिरवा चारा टाळा',
      hi: 'पुआल जैसा सूखा चारा; एक दिन गीली हरी घास न दें',
      en: 'Dry roughage such as straw; avoid wet lush grass for a day',
    })
  }
  if (has('diarrhea', 'loose', 'dung', 'जुलाब', 'हगवण', 'शेण', 'दस्त', 'पातळ')) {
    level = level === 'high' ? 'high' : 'medium'
    causes.push({
      mr: 'पचनसंस्थेचा संसर्ग किंवा दूषित पाणी',
      hi: 'पाचन संक्रमण या दूषित पानी',
      en: 'Digestive infection or contaminated water',
    })
    precautions.push({
      mr: 'स्वच्छ पाणी व मीठ-गूळ पाणी (जलसंजीवनी) द्या',
      hi: 'साफ पानी व नमक-गुड़ पानी (ओआरएस) दें',
      en: 'Provide clean water and oral rehydration (salt + jaggery water)',
    })
    feed.push({
      mr: 'शेण घट्ट होईपर्यंत भाताची पेज व कोरडा चारा द्या',
      hi: 'गोबर सामान्य होने तक चावल का पानी व सूखा चारा दें',
      en: 'Boiled rice water and dry fodder until stool firms up',
    })
  }
  if (has('fever', 'hot', 'temperature', 'ताप', 'बुखार')) {
    level = level === 'high' ? 'high' : 'medium'
    causes.push({
      mr: 'संसर्ग किंवा गोचिडांमुळे येणारा ताप',
      hi: 'संक्रमण या किलनी से होने वाला बुखार',
      en: 'Infection or tick-borne fever',
    })
    precautions.push({
      mr: 'जनावराला सावलीत ठेवा व भरपूर स्वच्छ पाणी द्या',
      hi: 'पशु को छाँव में रखें व भरपूर साफ पानी दें',
      en: 'Keep the animal in shade with plenty of clean water',
    })
    feed.push({
      mr: 'हलका हिरवा चारा व पाण्यात खनिज मिश्रण',
      hi: 'हल्का हरा चारा व पानी में खनिज मिश्रण',
      en: 'Light green fodder and mineral mixture in water',
    })
  }
  if (has('cough', 'breath', 'nasal', 'pneumonia', 'खोकला', 'श्वास', 'खांसी', 'सांस')) {
    level = level === 'high' ? 'high' : 'medium'
    causes.push({
      mr: 'श्वसनसंस्थेचा संसर्ग',
      hi: 'श्वसन संक्रमण',
      en: 'Respiratory infection',
    })
    precautions.push({
      mr: 'उबदार, कोरड्या व हवेशीर गोठ्यात वाऱ्यापासून दूर ठेवा',
      hi: 'गर्म, सूखे व हवादार शेड में सीधी हवा से दूर रखें',
      en: 'Move to a warm, dry, well-ventilated shed away from drafts',
    })
    feed.push({
      mr: 'खाण्यास प्रोत्साहन देण्यासाठी गुळासह कोमट मॅश',
      hi: 'खाने के लिए गुड़ के साथ गुनगुना मैश',
      en: 'Warm mash with jaggery to encourage intake',
    })
  }
  if (has('milk', 'udder', 'mastitis', 'lump', 'दूध', 'कास', 'स्तनदाह', 'थन', 'गाठ')) {
    level = level === 'high' ? 'high' : 'medium'
    causes.push({
      mr: 'स्तनदाह (मस्टायटिस) किंवा पोषणाचा ताण असण्याची शक्यता',
      hi: 'थनैला (मस्टाइटिस) या पोषण तनाव की संभावना',
      en: 'Possible mastitis or nutritional stress',
    })
    precautions.push({
      mr: 'पूर्ण दूध काढा, कास स्वच्छ व कोरडी ठेवा, कोमट शेक द्या',
      hi: 'पूरा दूध निकालें, थन साफ व सूखा रखें, गर्म सेंक दें',
      en: 'Milk out fully, keep the udder clean and dry, apply a warm compress',
    })
    feed.push({
      mr: 'कॅल्शियम व खनिज मिश्रणासह संतुलित आहार',
      hi: 'कैल्शियम व खनिज मिश्रण सहित संतुलित आहार',
      en: 'Balanced ration with calcium and mineral mixture',
    })
  }
  if (has('appetite', 'not eating', 'weak', 'भूक', 'खात नाही', 'अशक्त', 'भूख', 'खा नहीं', 'कमजोर')) {
    causes.push({
      mr: 'सामान्य अशक्तपणा किंवा आजाराची सुरुवात',
      hi: 'सामान्य कमजोरी या बीमारी की शुरुआत',
      en: 'General weakness or early illness',
    })
    precautions.push({
      mr: '१२ तास बारकाईने निरीक्षण करा व तापमान नोंदवा',
      hi: '12 घंटे ध्यान से देखें व तापमान नोट करें',
      en: 'Observe closely for 12 hours and record the temperature',
    })
    feed.push({
      mr: 'रुचकर हिरवा चारा, गूळ पाणी व खनिज मिश्रण',
      hi: 'स्वादिष्ट हरा चारा, गुड़ पानी व खनिज मिश्रण',
      en: 'Palatable green fodder, jaggery water and mineral mixture',
    })
  }

  if (causes.length === 0) {
    causes.push({
      mr: 'वर्णनावरून लक्षणे स्पष्ट होत नाहीत',
      hi: 'विवरण से लक्षण स्पष्ट नहीं हैं',
      en: 'Symptoms are unclear from the description',
    })
    precautions.push({
      mr: 'जनावराला आराम व पुरेसे पाणी द्या आणि बारकाईने निरीक्षण करा',
      hi: 'पशु को आराम व पर्याप्त पानी दें और ध्यान से देखें',
      en: 'Keep the animal comfortable, hydrated and observe closely',
    })
    feed.push({
      mr: 'स्वच्छ पाणी व खनिज मिश्रणासह नेहमीचा संतुलित आहार',
      hi: 'साफ पानी व खनिज मिश्रण सहित सामान्य संतुलित आहार',
      en: 'Normal balanced feed with clean water and mineral mixture',
    })
  }

  return { causes, precautions, feed, level }
}

/* ---------------------------- Dairy & Feed data --------------------------- */

export type DairyCard = {
  emoji: string
  title: LangText
  body: LangText
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
  place: {
    mr: 'अहमदनगर, महाराष्ट्र',
    hi: 'अहमदनगर, महाराष्ट्र',
    en: 'Ahmednagar, Maharashtra',
  } as LangText,
  temp: 38,
  humidity: 62,
  condition: { mr: 'ऊन व दमट', hi: 'धूप व उमस', en: 'Sunny & Humid' } as LangText,
  alertTitle: { mr: 'तीव्र उष्णता अलर्ट', hi: 'तेज़ गर्मी अलर्ट', en: 'High Heat Alert' } as LangText,
  advice: {
    mr: 'सकाळी ११ ते दुपारी ४ या वेळेत जनावरांना सावलीत ठेवा आणि भरपूर पाणी द्या.',
    hi: 'सुबह 11 से दोपहर 4 बजे तक पशुओं को छाँव में रखें और भरपूर पानी दें।',
    en: 'Keep cattle under shade between 11 AM and 4 PM and give plenty of water.',
  } as LangText,
}

/* ------------------------------ Mandi prices ------------------------------ */

export type PriceCard = {
  dairy: LangText
  price: number
  updated: LangText
  best?: boolean
}

export const MILK_PRICES: PriceCard[] = [
  {
    dairy: { mr: 'अमूल संकलन केंद्र', hi: 'अमूल संग्रह केंद्र', en: 'Amul Collection Center' },
    price: 38,
    updated: { mr: 'आज सकाळी ६:००', hi: 'आज सुबह 6:00', en: 'Today 6:00 AM' },
  },
  {
    dairy: { mr: 'गोकुळ डेअरी', hi: 'गोकुल डेयरी', en: 'Gokul Dairy' },
    price: 42,
    updated: { mr: 'आज सकाळी ७:३०', hi: 'आज सुबह 7:30', en: 'Today 7:30 AM' },
    best: true,
  },
  {
    dairy: { mr: 'महानंद डेअरी', hi: 'महानंद डेयरी', en: 'Mahanand Dairy' },
    price: 40,
    updated: { mr: 'आज सकाळी ६:१५', hi: 'आज सुबह 6:15', en: 'Today 6:15 AM' },
  },
  {
    dairy: { mr: 'स्थानिक सहकारी संस्था', hi: 'स्थानीय सहकारी संस्था', en: 'Local Cooperative' },
    price: 36,
    updated: { mr: 'काल रात्री ८:००', hi: 'कल रात 8:00', en: 'Yesterday 8:00 PM' },
  },
]

/* --------------------------- Government schemes --------------------------- */

export type Scheme = {
  name: LangText
  benefit: LangText
  eligibility: LangText
  documents: LangText[]
}

const DOC_AADHAAR: LangText = { mr: 'आधार कार्ड', hi: 'आधार कार्ड', en: 'Aadhaar Card' }
const DOC_BANK: LangText = { mr: 'बँक पासबुक', hi: 'बैंक पासबुक', en: 'Bank Passbook' }

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
    documents: [
      DOC_AADHAAR,
      { mr: '७/१२ उतारा', hi: 'भूमि रिकॉर्ड (7/12)', en: 'Land Record (7/12)' },
      DOC_BANK,
      { mr: 'जनावराचा फोटो', hi: 'पशु का फोटो', en: 'Animal Photo' },
    ],
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
    documents: [
      DOC_AADHAAR,
      { mr: 'PAN कार्ड', hi: 'PAN कार्ड', en: 'PAN Card' },
      DOC_BANK,
      { mr: 'जनावर मालकीचा पुरावा', hi: 'पशु स्वामित्व प्रमाण', en: 'Cattle Ownership Proof' },
    ],
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
    documents: [
      DOC_AADHAAR,
      DOC_BANK,
      { mr: 'जनावर आरोग्य प्रमाणपत्र', hi: 'पशु स्वास्थ्य प्रमाणपत्र', en: 'Animal Health Certificate' },
    ],
  },
]

/* ---------------------------- Vaccination data ---------------------------- */

export type VaccineStatus = 'done' | 'upcoming'

export type VaccineItem = {
  animal: LangText
  vaccine: LangText
  date: LangText
  status: VaccineStatus
}

export const VACCINES: VaccineItem[] = [
  {
    animal: { mr: 'गंगा (गाय)', hi: 'गंगा (गाय)', en: 'Ganga (Cow)' },
    vaccine: { mr: 'FMD लस', hi: 'FMD टीका', en: 'FMD Vaccine' },
    date: { mr: '१० जाने २०२६', hi: '10 जन 2026', en: '10 Jan 2026' },
    status: 'done',
  },
  {
    animal: { mr: 'भोलू (म्हैस)', hi: 'भोलू (भैंस)', en: 'Bholu (Buffalo)' },
    vaccine: { mr: 'HS लस', hi: 'HS टीका', en: 'HS Vaccine' },
    date: { mr: '०२ फेब्रु २०२६', hi: '02 फर 2026', en: '02 Feb 2026' },
    status: 'done',
  },
  {
    animal: { mr: 'गंगा (गाय)', hi: 'गंगा (गाय)', en: 'Ganga (Cow)' },
    vaccine: { mr: 'ब्रुसेलोसिस', hi: 'ब्रुसेलोसिस', en: 'Brucellosis' },
    date: { mr: '१८ ऑग २०२६', hi: '18 अग 2026', en: '18 Aug 2026' },
    status: 'upcoming',
  },
  {
    animal: { mr: 'मोती (शेळी)', hi: 'मोती (बकरी)', en: 'Moti (Goat)' },
    vaccine: { mr: 'PPR लस', hi: 'PPR टीका', en: 'PPR Vaccine' },
    date: { mr: '२५ ऑग २०२६', hi: '25 अग 2026', en: '25 Aug 2026' },
    status: 'upcoming',
  },
  {
    animal: { mr: 'भोलू (म्हैस)', hi: 'भोलू (भैंस)', en: 'Bholu (Buffalo)' },
    vaccine: { mr: 'जंतनाशक', hi: 'कृमिनाशक', en: 'Deworming' },
    date: { mr: '०५ सप्टें २०२६', hi: '05 सित 2026', en: '05 Sep 2026' },
    status: 'upcoming',
  },
]

/* --------------------------- Emergency contacts --------------------------- */

export type EmergencyContact = {
  emoji: string
  label: LangText
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
