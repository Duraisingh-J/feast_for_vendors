import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'hi' | 'mr' | 'gu' | 'ta' | 'te' | 'kn' | 'ml';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.profile': 'Profile',
    'nav.tagline': 'Food Essentials Access & Supply Tracking',
    
    // Dashboard
    'dashboard.title': 'FEAST Dashboard',
    'dashboard.subtitle': 'Your complete vendor management platform',
    'dashboard.vendorTools': 'Vendor Tools',
    'dashboard.aiInsights': 'AI Insights',
    'dashboard.marketTools': 'Market Tools',
    'dashboard.logistics': 'Logistics',
    
    // Features
    'feature.vptVerification': 'VPT Verification',
    'feature.vptDescription': 'Your vendor verification status',
    'feature.emergencyBoard': 'Emergency Board',
    'feature.emergencyDescription': 'Urgent supply requests',
    'feature.aiPriceWhisperer': 'AI Price Whisperer',
    'feature.aiPriceDescription': 'AI-powered price predictions',
    'feature.aiQuantityOptimizer': 'AI Quantity Optimizer',
    'feature.aiQuantityDescription': 'Optimize purchase quantities',
    'feature.mandiPrices': 'Mandi Prices',
    'feature.mandiDescription': 'Crowd-verified market prices',
    'feature.supplierQuotes': 'Supplier Quotes',
    'feature.supplierDescription': 'Compare prices across suppliers',
    'feature.surplusExchange': 'Surplus Exchange',
    'feature.surplusDescription': 'Buy/sell surplus inventory',
    'feature.splitLogistics': 'Split Logistics',
    'feature.splitDescription': 'Share delivery costs',
    'feature.deliverySlots': 'Delivery Slots',
    'feature.deliveryDescription': 'Join delivery pools',
    
    // Status
    'status.verified': 'Verified Vendor',
    'status.pending': 'Pending Verification',
    'status.verificationRequired': 'Verification Required',
    
    // Buttons
    'button.getPrediction': 'Get AI Prediction',
    'button.getRecommendation': 'Get AI Recommendation',
    'button.addPrice': 'Add New Price',
    'button.postSurplus': 'Post Surplus',
    'button.postEmergency': 'Post Emergency Request',
    'button.join': 'Join',
    'button.analyzing': 'Analyzing...',
    'button.optimizing': 'Optimizing...',
    
    // Profile
    'profile.title': 'Vendor Profile',
    'profile.subtitle': 'Manage your profile and verification status',
    'profile.information': 'Profile Information',
    'profile.editProfile': 'Edit Profile',
    'profile.saveChanges': 'Save Changes',
    'profile.cancel': 'Cancel',
    'profile.fullName': 'Full Name',
    'profile.shopName': 'Shop Name',
    'profile.phoneNumber': 'Phone Number',
    'profile.location': 'Location',
    'profile.verificationStatus': 'Verification Status',
    'profile.vptVerification': 'VPT Verification',
    'profile.businessLicense': 'Business License',
    'profile.shopPhoto': 'Shop Photo',
    'profile.locationProof': 'Location Proof',
    'profile.upload': 'Upload',
    'profile.submitVerification': 'Submit for Verification',
    
    // Forms
    'form.productName': 'Product name',
    'form.pricePerKg': 'Price per kg',
    'form.marketLocation': 'Market location',
    'form.availableQuantity': 'Available quantity',
    'form.pricePerUnit': 'Price per unit',
    'form.contactNumber': 'Contact number',
    'form.productNeeded': 'Product needed',
    'form.requiredQuantity': 'Required quantity',
    'form.selectUrgency': 'Select urgency',
    'form.additionalDetails': 'Additional details',
    
    // Messages
    'message.verificationComplete': 'Please complete vendor verification in your profile to access this feature.',
    'message.profileUpdated': 'Profile updated successfully!',
    'message.verificationSubmitted': 'Verification submitted! You will be verified within 24 hours.',
    'message.photoUploaded': 'Photo uploaded successfully!',
    'message.priceAdded': 'Price added successfully!',
    'message.surplusPosted': 'Surplus posted successfully!',
    'message.emergencyPosted': 'Emergency request posted!',
    'message.predictionFailed': 'Failed to get price prediction',
    'message.quantityFailed': 'Failed to get quantity recommendation',
  },
  
  hi: {
    // Navigation
    'nav.dashboard': 'डैशबोर्ड',
    'nav.profile': 'प्रोफाइल',
    'nav.tagline': 'खाद्य आवश्यक पहुंच और आपूर्ति ट्रैकिंग',
    
    // Dashboard
    'dashboard.title': 'FEAST डैशबोर्ड',
    'dashboard.subtitle': 'आपका संपूर्ण विक्रेता प्रबंधन प्लेटफॉर्म',
    'dashboard.vendorTools': 'विक्रेता उपकरण',
    'dashboard.aiInsights': 'AI अंतर्दृष्टि',
    'dashboard.marketTools': 'बाजार उपकरण',
    'dashboard.logistics': 'रसद',
    
    // Features
    'feature.vptVerification': 'VPT सत्यापन',
    'feature.vptDescription': 'आपकी विक्रेता सत्यापन स्थिति',
    'feature.emergencyBoard': 'आपातकालीन बोर्ड',
    'feature.emergencyDescription': 'तत्काल आपूर्ति अनुरोध',
    'feature.aiPriceWhisperer': 'AI मूल्य भविष्यवक्ता',
    'feature.aiPriceDescription': 'AI-संचालित मूल्य भविष्यवाणी',
    'feature.aiQuantityOptimizer': 'AI मात्रा अनुकूलक',
    'feature.aiQuantityDescription': 'खरीद मात्रा अनुकूलित करें',
    'feature.mandiPrices': 'मंडी मूल्य',
    'feature.mandiDescription': 'भीड़-सत्यापित बाजार मूल्य',
    'feature.supplierQuotes': 'आपूर्तिकर्ता उद्धरण',
    'feature.supplierDescription': 'आपूर्तिकर्ताओं में मूल्य तुलना',
    'feature.surplusExchange': 'अतिरिक्त एक्सचेंज',
    'feature.surplusDescription': 'अतिरिक्त इन्वेंटरी खरीदें/बेचें',
    'feature.splitLogistics': 'विभाजित रसद',
    'feature.splitDescription': 'डिलीवरी लागत साझा करें',
    'feature.deliverySlots': 'डिलीवरी स्लॉट',
    'feature.deliveryDescription': 'डिलीवरी पूल में शामिल हों',
    
    // Status
    'status.verified': 'सत्यापित विक्रेता',
    'status.pending': 'सत्यापन लंबित',
    'status.verificationRequired': 'सत्यापन आवश्यक',
    
    // Buttons
    'button.getPrediction': 'AI भविष्यवाणी प्राप्त करें',
    'button.getRecommendation': 'AI सिफारिश प्राप्त करें',
    'button.addPrice': 'नया मूल्य जोड़ें',
    'button.postSurplus': 'अतिरिक्त पोस्ट करें',
    'button.postEmergency': 'आपातकालीन अनुरोध पोस्ट करें',
    'button.join': 'शामिल हों',
    'button.analyzing': 'विश्लेषण कर रहे हैं...',
    'button.optimizing': 'अनुकूलन कर रहे हैं...',
    
    // Profile
    'profile.title': 'विक्रेता प्रोफाइल',
    'profile.subtitle': 'अपनी प्रोफाइल और सत्यापन स्थिति प्रबंधित करें',
    'profile.information': 'प्रोफाइल जानकारी',
    'profile.editProfile': 'प्रोफाइल संपादित करें',
    'profile.saveChanges': 'परिवर्तन सहेजें',
    'profile.cancel': 'रद्द करें',
    'profile.fullName': 'पूरा नाम',
    'profile.shopName': 'दुकान का नाम',
    'profile.phoneNumber': 'फोन नंबर',
    'profile.location': 'स्थान',
    'profile.verificationStatus': 'सत्यापन स्थिति',
    'profile.vptVerification': 'VPT सत्यापन',
    'profile.businessLicense': 'व्यापार लाइसेंस',
    'profile.shopPhoto': 'दुकान की फोटो',
    'profile.locationProof': 'स्थान प्रमाण',
    'profile.upload': 'अपलोड',
    'profile.submitVerification': 'सत्यापन के लिए जमा करें',
    
    // Forms
    'form.productName': 'उत्पाद का नाम',
    'form.pricePerKg': 'प्रति किलो मूल्य',
    'form.marketLocation': 'बाजार स्थान',
    'form.availableQuantity': 'उपलब्ध मात्रा',
    'form.pricePerUnit': 'प्रति यूनिट मूल्य',
    'form.contactNumber': 'संपर्क नंबर',
    'form.productNeeded': 'आवश्यक उत्पाद',
    'form.requiredQuantity': 'आवश्यक मात्रा',
    'form.selectUrgency': 'तात्कालिकता चुनें',
    'form.additionalDetails': 'अतिरिक्त विवरण',
    
    // Messages
    'message.verificationComplete': 'इस सुविधा का उपयोग करने के लिए कृपया अपनी प्रोफाइल में विक्रेता सत्यापन पूरा करें।',
    'message.profileUpdated': 'प्रोफाइल सफलतापूर्वक अपडेट हो गया!',
    'message.verificationSubmitted': 'सत्यापन जमा किया गया! आप 24 घंटों के भीतर सत्यापित हो जाएंगे।',
    'message.photoUploaded': 'फोटो सफलतापूर्वक अपलोड हो गई!',
    'message.priceAdded': 'मूल्य सफलतापूर्वक जोड़ा गया!',
    'message.surplusPosted': 'अतिरिक्त सफलतापूर्वक पोस्ट किया गया!',
    'message.emergencyPosted': 'आपातकालीन अनुरोध पोस्ट किया गया!',
    'message.predictionFailed': 'मूल्य भविष्यवाणी प्राप्त करने में विफल',
    'message.quantityFailed': 'मात्रा सिफारिश प्राप्त करने में विफल',
  }
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('feast-language') as Language;
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('feast-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};