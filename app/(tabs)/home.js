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
  TouchableOpacity,
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

export default function Home() {
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
        "https://unisurf-de1e3-default-rtdb.europe-west1.firebasedatabase.app/couch.json"
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

  const renderCouches = ({ item }) => (
    <View style={styles.imageContainerCouches}>
      <View style={styles.imageWrapperCouches}>
        <Image src={item.image} style={styles.imageCouches} />
      </View>
      <View style={styles.textHolderCouches}>
        <View style={styles.titleBoxCouches}>
          <Text style={[styles.boxTextCouches]}>{item.title}</Text>
          <Text style={[styles.subtitleCouches]}>{item.city}</Text>
        </View>
        <View style={styles.slideTextCouches}>
          <Text>{item.description}</Text>
        </View>
        <View style={styles.iconsEvent}>
          <View style={styles.iconsPostsCouches}>
            <Feather name="calendar" size={24} color="black" />
            <Text style={{ width: 45 }}>{item.date}</Text>
          </View>
          <View style={styles.iconsPostsCouches}>
            <MaterialIcons name="group" size={24} color="black" />
            <Text>{item.groupCount}</Text>
          </View>
          <View style={styles.iconsPostsCouches}>
            <FontAwesome5 name="euro-sign" size={24} color="black" />
            <Text>{item.price}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const keyExtractor = (item) => item.key;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.fillin}></View>

      <ScrollView style={{ flex: 1 }}>
        <View style={styles.header}>
          <View style={styles.profilePicContainer}>
            <Image
              source={require("../assets/img/user-placeholder.webp")}
              style={styles.profilePic}
            />
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>Hello, {user?.displayName}</Text>
          </View>
        </View>

        <View>
          <Text style={styles.title}>Events</Text>
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
        <TouchableOpacity style={styles.buttonEvent}>
          <Feather
            name="calendar"
            size={24}
            color="#fff"
            style={styles.iconEvent}
          />
          <Text style={styles.buttonEventText}>Event</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>Couch Offer</Text>
          <View style={styles.headerCouches}></View>
          <View>
            <View style={styles.styleCardCouches}>
              <FlatList
                style={styles.wrapperCouches}
                data={posts}
                renderItem={renderCouches}
                keyExtractor={keyExtractor}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.buttonEvent, { alignContent: "center" }]}
        >
          <Feather
            name="calendar"
            size={24}
            color="#fff"
            style={styles.iconEvent}
          />
          <Text style={styles.buttonEventText}>Event</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profilePicContainer: {
    position: "absolute",
    top: "30%",
    left: "60%",
    transform: [{ translateX: 80 }, { translateY: 0 }],
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#fff",
    overflow: "hidden",
  },
  profilePic: {
    width: 55,
    height: 55,
    borderRadius: 50,
  },
  nameText: {
    marginTop: 25,
    fontSize: 20,
    fontFamily: "Inter_400Regular",
    fontWeight: "bold",
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
    flex: 1,
    marginTop: 5,
    paddingLeft: 29,
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
  fillin: {
    height: 30,
    backgroundColor: "#47BABC",
  },
  titleCouches: {
    fontSize: 20,
    fontFamily: "Inter_400Regular",
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 29,
  },
  styleCardCouches: {
    marginRight: 0,
    marginTop: 4,
    marginBottom: 10,
    borderColor: "#E8E8E8",
    borderRadius: 50,
    marginBottom: 20,
  },
  wrapperCouches: {
    height: "100%",
  },
  imageContainerCouches: {
    //This is the container for the Images and text
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    borderWidth: 0,
    overflow: "hidden",
    width: "95%",
    height: 180,
    alignSelf: "center",
    backgroundColor: "white",
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 10,
    marginBottom: 10,
  },
  imageWrapperCouches: {
    borderWidth: 0,
    borderColor: "gray",
  },
  imageCouches: {
    width: 133,
    height: 180,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  titleBoxCouches: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "baseline",
    gap: 15,
    fontFamily: "Inter_400Regular",
  },
  boxTextCouches: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Inter_400Regular",
    textAlign: "left",
  },
  iconsCouches: {
    flex: 1,
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    fontFamily: "Inter_400Regular",
  },
  slideTextCouches: {
    paddingLeft: 10,
    paddingRight: 10,
    gap: 10,
    fontFamily: "Inter_400Regular",
  },
  iconsEventCouches: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: 30,
    alignContent: "center",
    alignItems: "baseline",
    paddingTop: 15,
    paddingBottom: 15,
    fontFamily: "Inter_400Regular",
    gap: 35,
  },
  inputCouches: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    paddingLeft: 10,
    width: 120,
    paddingRight: 10,
  },
  textContainerCouches: {
    flex: 1,
    paddingLeft: 10,
  },
  textHolderCouches: {
    flex: 1,
  },
  subtitleCouches: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    textAlign: "left",
    color: "gray",
    fontWeight: "normal",
    justifyContent: "center",
  },
  headerCouches: {
    flexDirection: "row",
  },
  iconsPostsCouches: {
    flex: 1,
    flexDirection: "row",
    gap: 1,
    alignItems: "center",
    fontFamily: "Inter_400Regular",
    justifyContent: "space-evenly",
    columnGap: 5,
  },
  buttonEvent: {
    width: 142,
    backgroundColor: "#47BABC",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    fontFamily: "Inter_400Regular",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  buttonEventText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 6,
  },
  iconEvent: {
    marginRight: 6,
  },
});
