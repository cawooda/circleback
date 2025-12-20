import { getFirestore } from "firebase-admin/firestore";
const db = getFirestore();

export const UserQueries = {
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
  getMe: async (
    _: any,
    args: any,
    context: { user?: { uid: string } | null }
  ) => {
    const user = context.user;
    if (!user || !user.uid) {
      throw new Error("Unauthenticated");
    }

    const userRef = db.doc("UserProfiles/" + user.uid);
    const userSnap = await userRef.get();
    if (userSnap.exists) {
      return { id: userSnap.id, ...userSnap.data() };
    } else {
      return null;
    }
  },
};
