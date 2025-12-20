// The Firebase Admin SDK to access Firestore.
const { initializeApp } = require("firebase-admin/app");
initializeApp(); // Initialize the Admin SDK

const { queries } = require("./queries");
const { mutations } = require("./mutations");

export const resolvers = {
  Mutation: {
    ...mutations,
  },
  Query: {
    ...queries,
  },
};
