import { Searchbar } from "react-native-paper";
import React, { useState, useEffect } from "react";
import {
  Image,
  ScrollView,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  Feather,
  MaterialIcons,
  FontAwesome5,
  Foundation,
} from "@expo/vector-icons";

export default function Users() {
  const router = useRouter();
  const [event, setEvents] = useState([]);

  const [fontsLoaded] = useFonts({
    Inter_400Regular: require("../assets/fonts/static/Inter-Regular.ttf"),
  });
  if (!fontsLoaded) {
    console.log(null);
  }

  useEffect(() => {
    async function getEvents() {
      const response = await fetch(
        "https://unisurf-de1e3-default-rtdb.europe-west1.firebasedatabase.app/couch.json"
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

  const handleEventPress = () => {
    router.push("/oneEvent");
  };

  const renderSavedEvents = ({ item }) => (
    <View style={styles.imageContainer}>
      <View style={styles.imageWrapper}>
        <Image src={item.image} style={styles.image} />
      </View>
      <View style={styles.textHolder}>
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
          <View style={styles.iconsPosts}>
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
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search"
            placeholderTextColor="#888"
            style={styles.input}
          />
          <MaterialIcons
            name="search"
            size={20}
            color="#888"
            style={styles.icon}
          />
        </View>
        <View style={styles.filterContainer}>
          <Foundation name="filter" size={24} color="#47BABC" />
          <Text style={styles.filterText}>Filter</Text>
        </View>
      </View>
      <View>
        <Text style={styles.title}>Popular</Text>
        <View style={styles.styleCard}>
          <FlatList
            style={styles.wrapper}
            data={event}
            renderItem={renderSavedEvents}
            keyExtractor={keyExtractor}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: 150,
  },
  title: {
    fontSize: 20,
    fontFamily: "Inter_400Regular",
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 29,
  },
  styleCard: {
    marginRight: 0,
    marginTop: 4,
    marginBottom: 10,
    borderColor: "#E8E8E8",
    borderRadius: 50,
  },
  wrapper: {
    height: "100%",
  },
  imageContainer: {
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
    marginBottom: 20,
  },
  imageWrapper: {
    borderWidth: 0,
    borderColor: "gray",
  },
  image: {
    width: 133,
    height: 180,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  titleBox: {
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
  boxText: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Inter_400Regular",
    textAlign: "left",
  },
  icons: {
    flex: 1,
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    fontFamily: "Inter_400Regular",
  },
  slideText: {
    paddingLeft: 10,
    paddingRight: 10,
    gap: 10,
    fontFamily: "Inter_400Regular",
  },
  iconsEvent: {
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

  searchContainer: {
    flexDirection: "row",
    width: 175,
    height: 40,
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
    margin: 10,
    borderWidth: 2,
    backgroundColor: "#fff",
    borderColor: "#4E9D9E",
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    paddingLeft: 10,
    width: 120,
    paddingRight: 10,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  textHolder: {
    flex: 1,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    textAlign: "left",
    color: "gray",
    fontWeight: "normal",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
  },
  filterContainer: {
    flexDirection: "row",
    paddingLeft: "30%",
    paddingTop: "5%",
  },
  filterText: {
    fontFamily: "Inter_400Regular",
    paddingLeft: 7,
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
  fillin: {
    height: 55,
    backgroundColor: "#47BABC",
  },
});
