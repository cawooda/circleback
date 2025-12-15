// create a context for auth state and methods
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { auth } from "../lib/firebase";

// define the shape of the auth context
type AuthContextType = {
  user: User | null;
  loading: boolean;
  signInError?: string;
  error: Record<string, string> | null;
  clearError: () => void;
  signUp: (
    first: string,
    last: string,
    email: string,
    password: string
  ) => Promise<User | { error: string } | null>;
  getUserClaims: () => Promise<Record<string, any> | null>;
  signIn: (
    email: string,
    password: string
  ) => Promise<User | { error: string } | null>;
  signOutUser: () => Promise<void>;
};

// create the auth context
const AuthContext = createContext({} as AuthContextType);

// create a provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<Record<string, string> | null>(null);
  const [loading, setLoading] = useState(true);

  const handleError = (firebaseError: { code: string }) => {
    // Map Firebase error codes to user-friendly messages
    const messages: Record<string, string> = {
      "auth/invalid-email": "Please enter a valid email address.",
      "auth/wrong-password": "Incorrect password. Please try again.",
      "auth/user-not-found": "No account found with that email.",
      "auth/too-many-requests":
        "Too many failed attempts. Please wait before trying again.",
      "auth/invalid-credential": "The credential is invalid. Please try again.",
    };
    console.log(firebaseError.code);
    setError({
      code: firebaseError.code,
      message:
        messages[firebaseError.code] ||
        "An unexpected error occurred. Please try again.",
    });
    throw new Error(firebaseError.code); // Optional: for internal logging
  };

  async function signUp(
    first: string,
    last: string,
    email: string,
    password: string
  ) {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        user.reload();
        setLoading(false);
        return user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        switch (true) {
          case errorMessage.includes("auth/email-already-in-use"):
            return { error: "This email address is already in use." };
          case errorMessage.includes("auth/invalid-email"):
            return { error: "The email address is not valid." };
        }
      })
      .finally(() => {
        setLoading(false);
      });
    return null;
  }

  async function signIn(
    email: string,
    password: string
  ): Promise<User | { error: string } | null> {
    setLoading(true);
    clearError(); // Clear previous errors before new attempt
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoading(false);
      console.log("user.getIdToken", await userCredential.user.getIdToken());
      return userCredential.user;
    } catch (err: any) {
      handleError(err); // err has `.code` in Firebase
      return null;
    }
  }

  async function signOutUser() {
    setLoading(true);
    await signOut(auth);
    setLoading(false);
  }
  async function getUserClaims() {
    const token = auth.currentUser?.getIdTokenResult() || null;
    const claims = token ? (await token).claims : null;
    return claims;
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const clearError = () => setError(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signUp,
        signIn,
        getUserClaims,
        error,
        clearError,
        signOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// create a custom hook to use the auth context. This simplifies the use of authContext in the app
export const useAuth = () => {
  return useContext(AuthContext);
};
