import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db, storage } from "./config";
import { handleFirebaseError } from "./errorHandle";
import toast from "react-hot-toast";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
import { setIsLoadingToRedux, setUserToRedux } from "../redux/auth/utils";
import { setUsersToRedux } from "../redux/users/utils";
import { store } from "../redux/store";
import { setChatRoms } from "../redux/chat/chatSlice";
import { resizeImage } from "../utils";

export const registerUserToFirebase = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    toast.success("You have successfully registered!");
    return userCredential?.user;
  } catch (error) {
    handleFirebaseError(error);
    return false;
  }
};

// export const updateProfileImageToFirebase = async (file) => {
//   if (!file) return null;
//   try {
//     const storageRef = ref(storage, "images/" + Date.now().toString());
//     const snapshot = await uploadBytes(storageRef, file);
//     const photoURL = await getDownloadURL(snapshot.ref);
//     return photoURL;
//   } catch (error) {
//     handleFirebaseError(error);
//     return false;
//   }
// };

export const updateProfileImageToFirebase = async (file) => {
  if (!file) return null;

  try {
    const resizedFile = await resizeImage(file, 800, 800);
    const storageRef = ref(storage, "images/" + Date.now().toString());

    const reader = new FileReader();

    reader.readAsArrayBuffer(resizedFile);

    return new Promise((resolve, reject) => {
      reader.onload = async () => {
        try {
          const arrayBuffer = reader.result;
          const uint8Array = new Uint8Array(arrayBuffer);

          const snapshot = await uploadBytes(storageRef, uint8Array);

          const photoURL = await getDownloadURL(snapshot.ref);

          resolve(photoURL);
        } catch (error) {
          handleFirebaseError(error);
          reject(error);
        }
      };

      reader.onerror = (error) => {
        console.log(error);
        reject(error);
      };
    });
  } catch (error) {
    handleFirebaseError(error);
    return null;
  }
};

export const updateUserProfileToFirebase = async (data) => {
  try {
    await updateProfile(auth.currentUser, data);
    return true;
  } catch (error) {
    handleFirebaseError(error);
    return false;
  }
};

export const setUserToFirebase = async (uid, data) => {
  try {
    await setDoc(doc(db, "users", uid), data);
    await setDoc(doc(db, "userChats", uid), {});
    setUserToRedux(data);
  } catch (error) {
    handleFirebaseError(error);
  }
};

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    setUserToRedux(undefined);
  } else {
    const { uid, displayName, email, photoURL } = user;
    setUserToRedux({ uid, displayName, email, photoURL });
  }

  setIsLoadingToRedux(false);
});

export const loginToFirebase = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    handleFirebaseError(error);
    return false;
  }
};

export const logOutFromFirebase = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    handleFirebaseError(error);
    return false;
  }
};

const usersQuery = query(collection(db, "users"));
onSnapshot(usersQuery, (querySnapshot) => {
  const usersArr = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
  }));
  setUsersToRedux(usersArr);
});

export const createChatRom = async (chatRomId, id1, id2) => {
  try {
    await setDoc(doc(db, "chatsRoms", chatRomId), {
      chatRomId,
      chatRomOwners: [id1, id2],
      chatList: [],
    });
  } catch (error) {
    handleFirebaseError(error);
  }
};

export const createChatRomIdToUserChats = async (uid, chatRomId) => {
  try {
    await addDoc(collection(db, "usersChats", uid, "chatRomIds"), {
      chatRomId,
      owners: [],
    });
  } catch (error) {
    handleFirebaseError(error);
  }
};

export const getUserChatRoms = async (uid) => {
  try {
    const chatRomDocs = await getDocs(
      collection(db, "usersChats", uid, "chatRomIds")
    );
    return chatRomDocs;
  } catch (error) {
    handleFirebaseError(error);
  }
};

onSnapshot(collection(db, "chatsRoms"), (snapshot) => {
  const chatsRoms = {};
  snapshot.forEach((doc) => {
    chatsRoms[doc.id] = doc.data();
  });
  store.dispatch(setChatRoms(chatsRoms));
});
