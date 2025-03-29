
import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut, 
  onAuthStateChanged,
  User,
  sendEmailVerification,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  updateProfile
} from "firebase/auth";
import { auth } from "../config/firebase";

interface AuthContextProps {
  currentUser: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  signInWithGithub: () => Promise<void>;
  setupRecaptcha: (phoneNumber: string) => Promise<ConfirmationResult>;
  confirmOtp: (confirmationResult: ConfirmationResult, otp: string) => Promise<void>;
  updateUserProfile: (displayName: string, photoURL?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function signUp(email: string, password: string): Promise<void> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created:", userCredential.user);
      return sendVerificationEmail();
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async function login(email: string, password: string): Promise<void> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Check if email is verified for email/password login
      if (!userCredential.user.emailVerified && 
          userCredential.user.providerData.some(provider => provider.providerId === 'password')) {
        await logout();
        throw new Error("Please verify your email before logging in");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }

  async function logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  }

  async function sendVerificationEmail(): Promise<void> {
    if (!auth.currentUser) {
      throw new Error("No user is currently signed in");
    }
    
    try {
      await sendEmailVerification(auth.currentUser);
    } catch (error) {
      console.error("Error sending verification email:", error);
      throw error;
    }
  }

  async function resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error("Error resetting password:", error);
      throw error;
    }
  }

  async function signInWithGithub(): Promise<void> {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with GitHub:", error);
      throw error;
    }
  }

  function setupRecaptcha(phoneNumber: string): Promise<ConfirmationResult> {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'normal',
        callback: () => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
        'expired-callback': () => {
          // Response expired. Ask user to solve reCAPTCHA again.
        }
      });
    }
    
    return signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
  }

  async function confirmOtp(confirmationResult: ConfirmationResult, otp: string): Promise<void> {
    try {
      await confirmationResult.confirm(otp);
    } catch (error) {
      console.error("Error confirming OTP:", error);
      throw error;
    }
  }

  async function updateUserProfile(displayName: string, photoURL?: string): Promise<void> {
    if (!auth.currentUser) {
      throw new Error("No user is currently signed in");
    }
    
    try {
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL: photoURL || null
      });
      
      // Force refresh the user to get the updated profile
      setCurrentUser({ ...auth.currentUser });
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    signUp,
    login,
    logout,
    sendVerificationEmail,
    resetPassword,
    signInWithGithub,
    setupRecaptcha,
    confirmOtp,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Define RecaptchaVerifier on the Window interface
declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
  }
}
