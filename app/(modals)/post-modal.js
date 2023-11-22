import * as ImagePicker from "expo-image-picker";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Button,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function PostModal() {
  const { id } = useSearchParams();
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();

  const API_URL = "https://controller-47601-default-rtdb.firebaseio.com/";

  useEffect(() => {
    async function getPost() {
      const response = await fetch(`${API_URL}/posts/${id}.json`);
      const data = await response.json();
      setImage(data.image);
      setCaption(data.caption);
    }
    if (id) {
      getPost();
    }
  }, [id]);

  function handleSave() {
    if (id) {
      updatePost();
    } else {
      createPost();
    }
  }

  async function updatePost() {
    const post = { caption: caption, image: image };
    const response = await fetch(`${API_URL}/posts/${id}.json`, {
      method: "PATCH",
      body: JSON.stringify(post),
    });
    if (response.ok) {
      router.back();
    }
  }
  async function createPost() {
    const createdAt = new Date().getTime();
    const post = {
      caption: caption,
      image: image,
      createdAt: createdAt,
      uid: "fTs84KRoYw5pRZEWCq2Z",
    };
    const response = await fetch(`${API_URL}/posts.json`, {
      method: "POST",
      body: JSON.stringify(post),
    });
    if (response.ok) {
      router.back();
    }
  }

  async function chooseImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      allowsEditing: true,
      quality: 0.3,
    });

    if (!result.canceled) {
      const base64 = "data:image/jpeg;base64," + result.assets[0].base64;
      setImage(base64);
    }
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: id ? "Update Post" : "Create Post",
          headerLeft: () => (
            <Button
              title="Cancel"
              color={Platform.OS === "ios" ? "#fff" : "#264c59"}
              onPress={() => router.back()}
            />
          ),
          headerRight: () => (
            <Button
              title={id ? "Update" : "Create"}
              color={Platform.OS === "ios" ? "#fff" : "#264c59"}
              onPress={handleSave}
            />
          ),
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Text style={styles.label}>Image</Text>
        <TouchableOpacity onPress={chooseImage}>
          <Image
            style={styles.image}
            source={{
              uri:
                image ||
                "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg",
            }}
          />
        </TouchableOpacity>
        <Text style={styles.label}>Caption</Text>
        <TextInput
          style={styles.input}
          onChangeText={setCaption}
          value={caption}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#acc6c9",
  },
  main: {
    flex: 1,
  },
  image: {
    aspectRatio: 1,
  },
  label: {
    fontSize: 25,
    color: "#264c59",
    marginTop: 30,
    marginBottom: 5,
  },
  input: {
    height: 50,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 20,
  },
});
