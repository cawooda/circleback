// The Firebase Admin SDK to access Firestore.
const { initializeApp } = require("firebase-admin/app");
const { getFirestore, doc } = require("firebase-admin/firestore");

initializeApp(); // Initialize the Admin SDK

const db = getFirestore(); // Get a Firestore instance

export const resolvers = {
  Mutation: {
    createUserProfile: async (
      _: any,
      args: { pid: string; first: string; last: string; preferredName: string }
    ) => {
      const userRef = doc(db, "UserProfiles", args.pid);
      await userRef.set({
        First: args.first,
        Last: args.last,
        PreferredName: args.preferredName,
      });
      return { userRef };
    },
  },
  Query: {
    getUsers: async () => {
      const usersRef = db.collection("UserProfiles");
      const snapshot = await usersRef.get();
      const users: any[] = [];
      snapshot.forEach((doc: any) => {
        users.push({
          pid: doc.id,
          ...doc.data(),
        });
      });
      console.log("users", users);
      return users;
    },
    getMe: async (_: any, args: { id: string }) => {
      const userRef = db.doc("UserProfiles/DOoPnI5tjlpq3oER9AHw");
      const userSnap = await userRef.get();
      if (userSnap.exists) {
        return { id: userSnap.id, ...userSnap.data() };
      } else {
        return null;
      }
    },
  },
};
