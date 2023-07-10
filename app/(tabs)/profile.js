import React, { useState, useEffect } from "react";
import ReviewForm from "../components/ReviewForm";
import {
  View,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  Button,
  FlatList,
  Pressable,
} from "react-native";
import { useFonts } from "expo-font";
import { Feather, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { auth } from "../../firebase-config";
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "expo-router";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function ProfilePage() {
  const router = useRouter();
  const [event, setEvents] = useState([]);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  const [fontsLoaded] = useFonts({
    Inter_400Regular: require("../assets/fonts/static/Inter-Regular.ttf"),
  });
  if (!fontsLoaded) {
    console.log(null);
  }

  function handleSignOut() {
    signOut(auth); // sign out from firebase/auth
    router.push("/"); // redirect to login page
  }

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    async function getEvents() {
      const response = await fetch(
        "https://unisurf-de1e3-default-rtdb.europe-west1.firebasedatabase.app/events.json"
      ).then((res) => res.json());
      const dataObj = await response;
      const eventsArray = Object.keys(dataObj).map((key) => ({
        id: key,
        ...dataObj[key],
      })); // from object to array
      setEvents(eventsArray);
    }
    getEvents();
  }, []);

  useEffect(() => {
    async function getPosts() {
      const response = await fetch(
        "https://unisurf-de1e3-default-rtdb.europe-west1.firebasedatabase.app/posts.json"
      ).then((res) => res.json());
      const dataObj = await response;
      const postsArray = Object.keys(dataObj).map((key) => ({
        id: key,
        ...dataObj[key],
      })); // from object to array
      setPosts(postsArray);
    }
    getPosts();
  }, []);

  const handleEventPress = () => {
    router.push("/(tabs)/oneEvent");
  };

  const renderSavedEvents = ({ item }) => (
    <View style={styles.imageContainer}>
      <View style={styles.imageWrapper}>
        <Image src={item.image} style={styles.image} />
      </View>
      <View style={styles.titleBox}>
        <Text style={[styles.boxText]}>{item.title}</Text>
        <Text style={[styles.subtitle]}>{item.city}</Text>
      </View>
      <View style={styles.slideText}>
        <Text>{item.description}</Text>
      </View>
      <View style={styles.iconsEvent}>
        <View style={styles.iconsPosts}>
          <Feather name="calendar" size={24} color="black" />

          <Text style={{ width: 45 }}>{item.date}</Text>
        </View>
        <View style={styles.iconsPosts}>
          <MaterialIcons name="group" size={24} color="black" />
          <Text>{item.groupCount}</Text>
        </View>
      </View>
    </View>
  );

  const renderSavedPosts = ({ item }) => (
    <View style={styles.imageContainer}>
      <View style={styles.imageWrapper}>
        <Image src={item.image} style={styles.image} />
      </View>
      <View style={styles.titleBox}>
        <Text style={[styles.boxText]}>{item.title}</Text>
        <Text style={[styles.subtitle]}>{item.city}</Text>
      </View>
      <View style={styles.slideText}>
        <Text>{item.description}</Text>
      </View>
      <View style={styles.iconsEvent}>
        <View style={styles.iconsPosts}>
          <Feather name="calendar" size={24} color="black" />
          <Text style={{ width: 45 }}>{item.date}</Text>
        </View>
        <View style={styles.iconsPosts}>
          <MaterialIcons name="group" size={24} color="black" />
          <Text>{item.groupCount}</Text>
        </View>
      </View>
    </View>
  );

  const keyExtractor = (item) => item.key;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.coverContainer}>
          <Image
            source={require("../assets/img/profile-cover.jpg")}
            style={styles.coverImage}
          />
          <View style={styles.profilePicContainer}>
            <Image
              source={require("../assets/img/user-placeholder.webp")}
              style={styles.profilePic}
            />
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>{user?.displayName}</Text>
            <Text style={styles.subtitle}>10 Followers</Text>
          </View>
        </View>
        <View>
          <Text style={styles.title}>Bio</Text>
          <View>
            <Text style={styles.contentText}>
              Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis.
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.title}>Saved</Text>
          <View style={styles.styleCard}>
            <FlatList
              style={styles.wrapper}
              data={event}
              renderItem={renderSavedEvents}
              keyExtractor={keyExtractor}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
        <View>
          <Text style={styles.title}>Your Posts</Text>
          <View style={styles.styleCard}>
            <FlatList
              style={styles.wrapper}
              data={posts}
              renderItem={renderSavedPosts}
              keyExtractor={keyExtractor}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
        <View>
          <ReviewForm />
        </View>

        <Button title="Sign Out" onPress={handleSignOut} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  coverContainer: {
    position: "relative",
  },
  coverImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  profilePicContainer: {
    position: "absolute",
    top: "52%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#fff",
    overflow: "hidden",
    alignItems: "center",
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  nameText: {
    marginTop: 25,
    fontSize: 25,
    fontFamily: "Inter_400Regular",
    fontWeight: "normal",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    color: "gray",
    fontWeight: "normal",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  nameContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  checkIcon: {
    marginRight: 5,
  },
  title: {
    fontSize: 20,
    fontFamily: "Inter_400Regular",
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 29,
  },
  contentText: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    fontWeight: "normal",
    textAlign: "left",
    marginLeft: 29,
    marginRight: 14,
    marginTop: 4,
    marginBottom: 10,
  },
  wrapper: {
    height: 350,
  },

  styleCard: {
    marginLeft: 29,
    marginRight: 0,
    marginTop: 4,
    marginBottom: 10,
    borderColor: "#E8E8E8",
    borderRadius: 50,
  },
  imageContainer: {
    //This is the container for the Images and text
    marginLeft: 10,
    marginRight: 20,
    borderRadius: 10,
    borderWidth: 0,
    overflow: "hidden",
    width: 219,
    height: 340,
    alignSelf: "center",
    backgroundColor: "white",
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 3,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  imageWrapper: {
    borderWidth: 0,
    borderColor: "gray",
  },
  image: {
    width: 219,
    height: 180,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  titleBox: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 35,
    fontFamily: "Inter_400Regular",
  },
  slideText: {
    paddingLeft: 10,
    paddingRight: 10,
    gap: 10,
    fontFamily: "Inter_400Regular",
  },
  icons: {
    flex: 1,
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    fontFamily: "Inter_400Regular",
  },
  iconsEvent: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: 30,
    paddingTop: 15,
    paddingBottom: 15,
    fontFamily: "Inter_400Regular",
  },
  iconsPosts: {
    flex: 1,
    flexDirection: "row",
    gap: 1,
    alignItems: "center",
    fontFamily: "Inter_400Regular",
    justifyContent: "flex-start",
    columnGap: 10,
  },
  boxText: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Inter_400Regular",
    textAlign: "left",
  },
});
