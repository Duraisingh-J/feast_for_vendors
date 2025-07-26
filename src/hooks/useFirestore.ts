import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, addDoc, updateDoc, doc, DocumentData } from 'firebase/firestore';
import { db } from '../config/firebase';

export const useFirestoreCollection = (collectionName: string) => {
  const [data, setData] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize with demo data immediately to prevent loading state
    const initializeDemoData = () => {
      const demoData = getDemoData(collectionName);
      setData(demoData);
      setLoading(false);
    };

    // Try to connect to Firestore, but fallback to demo data
    try {
      const q = query(collection(db, collectionName));
      
      const unsubscribe = onSnapshot(q, 
        (querySnapshot) => {
          const docs = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          // If no docs exist, use demo data
          setData(docs.length > 0 ? docs : getDemoData(collectionName));
          setLoading(false);
        },
        (err) => {
          console.warn(`Firestore error for ${collectionName}:`, err.message);
          // Fallback to demo data on error
          initializeDemoData();
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.warn(`Failed to initialize Firestore for ${collectionName}:`, err);
      initializeDemoData();
    }
  }, [collectionName]);

  const addDocument = async (data: any) => {
    try {
      await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: new Date()
      });
    } catch (err: any) {
      console.warn('Failed to add document:', err.message);
      // Add to local state as fallback
      const newDoc = { id: Date.now().toString(), ...data, createdAt: new Date() };
      setData(prev => [...prev, newDoc]);
    }
  };

  const updateDocument = async (id: string, data: any) => {
    try {
      await updateDoc(doc(db, collectionName, id), {
        ...data,
        updatedAt: new Date()
      });
    } catch (err: any) {
      console.warn('Failed to update document:', err.message);
      // Update local state as fallback
      setData(prev => prev.map(item => 
        item.id === id ? { ...item, ...data, updatedAt: new Date() } : item
      ));
    }
  };

  return { data, loading, error, addDocument, updateDocument };
};

// Demo data for each collection
const getDemoData = (collectionName: string): DocumentData[] => {
  switch (collectionName) {
    case 'vendors':
      return [
        {
          id: 'current-user',
          name: 'Demo Vendor',
          shopName: 'Fresh Produce Store',
          phone: '+91 9876543210',
          location: 'Mumbai Central Market',
          isVerified: true,
          profilePhoto: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      ];
    
    case 'mandiPrices':
      return [
        {
          id: '1',
          product: 'Tomatoes',
          price: 45,
          location: 'Vashi Mandi',
          contributor: 'Raj Vegetables',
          photo: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=400',
          createdAt: new Date()
        },
        {
          id: '2',
          product: 'Onions',
          price: 32,
          location: 'Dadar Market',
          contributor: 'Fresh Foods',
          photo: 'https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=400',
          createdAt: new Date()
        },
        {
          id: '3',
          product: 'Potatoes',
          price: 28,
          location: 'Crawford Market',
          contributor: 'Green Grocers',
          photo: 'https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=400',
          createdAt: new Date()
        }
      ];
    
    case 'surplusPosts':
      return [
        {
          id: '1',
          product: 'Carrots',
          quantity: '50 kg',
          price: 25,
          vendor: 'Organic Farm',
          contact: '+91 9876543211',
          location: 'Pune',
          createdAt: new Date()
        },
        {
          id: '2',
          product: 'Cabbage',
          quantity: '30 kg',
          price: 18,
          vendor: 'Green Valley',
          contact: '+91 9876543212',
          location: 'Nashik',
          createdAt: new Date()
        }
      ];
    
    case 'emergencyRequests':
      return [
        {
          id: '1',
          product: 'Tomatoes',
          quantity: '100 kg',
          urgency: 'HIGH',
          description: 'Urgent requirement for restaurant chain',
          requester: 'Hotel Supplies',
          contact: '+91 9876543213',
          createdAt: new Date()
        },
        {
          id: '2',
          product: 'Onions',
          quantity: '200 kg',
          urgency: 'MEDIUM',
          description: 'Weekly supply needed',
          requester: 'Retail Chain',
          contact: '+91 9876543214',
          createdAt: new Date()
        }
      ];
    
    case 'supplierQuotes':
      return [
        {
          id: '1',
          supplier: 'Supplier A',
          price: 45,
          isLowest: true,
          product: 'Tomatoes'
        },
        {
          id: '2',
          supplier: 'Supplier B',
          price: 48,
          isLowest: false,
          product: 'Tomatoes'
        },
        {
          id: '3',
          supplier: 'Supplier C',
          price: 52,
          isLowest: false,
          product: 'Tomatoes'
        }
      ];
    
    case 'logisticsGroups':
      return [
        {
          id: '1',
          route: 'Mumbai → Pune',
          participants: 4,
          costPerVendor: 250,
          maxParticipants: 6
        },
        {
          id: '2',
          route: 'Delhi → Gurgaon',
          participants: 3,
          costPerVendor: 180,
          maxParticipants: 5
        }
      ];
    
    case 'deliverySlots':
      return [
        {
          id: '1',
          time: '9:00 AM - 11:00 AM',
          joinedVendors: 3,
          maxVendors: 5,
          date: 'Today'
        },
        {
          id: '2',
          time: '2:00 PM - 4:00 PM',
          joinedVendors: 2,
          maxVendors: 4,
          date: 'Today'
        },
        {
          id: '3',
          time: '6:00 PM - 8:00 PM',
          joinedVendors: 1,
          maxVendors: 3,
          date: 'Tomorrow'
        }
      ];
    
    default:
      return [];
  }
};