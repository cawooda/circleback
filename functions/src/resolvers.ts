// The Firebase Admin SDK to access Firestore.
const { initializeApp } = require("firebase-admin/app");
const { getFirestore, doc, getDoc } = require("firebase-admin/firestore");

initializeApp(); // Initialize the Admin SDK

const db = getFirestore(); // Get a Firestore instance

export const resolvers = {
  Query: {
    getUsers: async () => {
      const usersRef = db.collection("users");
      const snapshot = await usersRef.get();
      const users: any[] = [];
      snapshot.forEach((doc: any) => {
        users.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      return users;
    },
    getMe: async (_: any, args: { id: string }, context: any) => {
      console.log(context);
      console.log("Getting user with ID:", args.id);
      console.log(args);
      const userRef = doc(db, "users", args.id);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        return { id: userSnap.id, ...userSnap.data() };
      } else {
        return null;
      }
    },
  },
};
