import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";

export default function AppRoot() {
  const router = useRouter();

  onAuthStateChanged(auth, (user) => {
    console.log(user);
    if (user) {
      // User is signed in
      router.push("/home");
    } else {
      // User is signed out
      router.push("/login");
    }
  });
}
