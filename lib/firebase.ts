// Import required Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import {  collection, getDocs, updateDoc } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);

// Create a new user with email and password
export const createUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('User created:', userCredential.user);
  
    return userCredential.user;
    
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};
export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userId = userCredential.user.uid;

    // Initialize the user's Firestore structure
    await initializeUserStructure(userId);

    console.log('User signed up and structure initialized');
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

// Sign in an existing user with email and password
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('User signed in:', userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

// Sign out the current user
export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log('User signed out');
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Get user data from Firestore
export const getUserFromDatabase = async (userId: string) => {
  try {
    const userDocRef = doc(firestore, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.error("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

// Save user data to Firestore
export const saveUserToDatabase = async (userId: string, userData: any) => {
  try {
    await setDoc(doc(firestore, 'users', userId), userData);
    console.log('User data saved');
    // await initializeUserStructure(userId);

    // console.log('User signed up and structure initialized');
  } catch (error) {
    console.error("Error saving user data:", error);
    throw error;
  }
};

export const initializeUserStructure = async (userId: string) => {
  try {
    // Create a user document in the 'users' collection
    const userDocRef = doc(firestore, 'users', userId);
    
    // Set initial data for the user document, e.g., empty inventory
    await setDoc(userDocRef, {
      createdAt: new Date(),
      // Add any other default user data here
    });

    // Optionally, create an initial empty inventory or other collections
    // Here, we just set up an empty document to show structure
    const inventoryDocRef = doc(firestore, 'users', userId, 'inventory', 'exampleItem');
    await setDoc(inventoryDocRef, {
      name: 'Initial Item',
      quantity: 0,
      description: 'Example item to show structure'
    });

    console.log('User structure initialized');
  } catch (error) {
    console.error('Error initializing user structure:', error);
    throw error;
  }
};