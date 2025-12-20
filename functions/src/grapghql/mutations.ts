const { getFirestore, doc } = require("firebase-admin/firestore");
const db = getFirestore(); // Get a Firestore instance

export const mutations = {
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
};
