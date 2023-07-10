import { useState } from "react";
import {
  View,
  StyleSheet,
  Platform,
  Text,
  Pressable,
  Image,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { Stack, useRouter } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const auth = getAuth();

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

  function handleLogin() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        console.log(user.uid);
        router.replace("/home");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  function goToSignUp() {
    router.replace("/signup");
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Image
        style={styles.logo}
        source={require("./assets/img/white-logo.png")}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={styles.input}
        underlineColor="transparent" // Set the underline color based on focus state
        theme={{
          colors: {
            primary: Platform.OS === "ios" ? "blue" : "green",
          },
          roundness: 50,
        }}
        underlineStyle={{ backgroundColor: "transparent" }}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        underlineColor="transparent" // Set the underline color based on focus state
        theme={{
          colors: {
            primary: Platform.OS === "ios" ? "blue" : "green",
          },
          roundness: 50,
        }}
        underlineStyle={{ backgroundColor: "transparent" }}
      />
      <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.button}
        underlineColor="transparent"
        buttonColor={Platform.OS === "ios" ? "blue" : "green"}
      >
        Login
      </Button>
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don't have an account? </Text>
        <Pressable onPress={goToSignUp}>
          <Text style={styles.signUpLink}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#5ed3d4",
  },
  input: {
    width: "90%", // Decrease width to 60% in landscape mode
    marginBottom: 12,
    borderRadius: 50,
  },
  button: {
    width: "40%",
    marginTop: 12,
  },
  signUpContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  signUpText: {
    fontSize: 16,
  },
  signUpLink: {
    fontSize: 16,
    fontWeight: "bold",
    color: Platform.OS === "ios" ? "blue" : "green",
  },
  logo: {
    resizeMode: "contain",
    width: "100%",
    height: 150,
    marginBottom: 100,
  },
});
