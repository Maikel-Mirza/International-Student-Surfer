import { StyleSheet, Text, View, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { Image, ScrollView, FlatList, Pressable } from "react-native";
import { useRouter } from "expo-router";

import { Feather, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

export default function Users() {
  const router = useRouter();
  const [event, setEvents] = useState([]);

  useEffect(() => { 
    async function getEvents() {
      const response = await fetch(
        "https://unisurf-de1e3-default-rtdb.europe-west1.firebasedatabase.app/test.json"
      ).then((res) => res.json());
      const dataObj = await response;
      console.log(dataObj);
      const eventsArray = Object.keys(dataObj).map((key) => ({
        id: key,
        ...dataObj[key],
      })); // from object to array
      console.log(eventsArray);
      setEvents(eventsArray);
    }
    getEvents();
  }, []);

  const handleEventPress = () => {
    router.push("/oneEvent");
  };

  const renderSavedEvents = ({ item }) => (
    <View style={styles.imageContainer}>
      <Pressable onPress={handleEventPress}>
        <View style={styles.imageWrapper}>
          <Image source={item.image} style={styles.image} />
        </View>
        <View style={styles.titleBox}>
          <Text style={styles.boxText}>{item.title}</Text>
          <View style={styles.icons}>
            <Feather name="calendar" size={24} color="black" />
            <Text>{item.date}</Text>
          </View>
        </View>
        <View style={styles.slideText}>
          <Text>{item.description}</Text>
        </View>
        <View style={styles.iconsEvent}>
          <View style={styles.icons}>
            <MaterialIcons name="group" size={24} color="black" />
            <Text>{item.groupCount}</Text>
          </View>
          <View style={styles.icons}>
            <FontAwesome5 name="couch" size={24} color="black" />
            <Text>{item.couchCount}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );

  const keyExtractor = (item) => item.key;

  return (
    <View>
      <View>
        <View>
          <Text>Put the map here. Good luck</Text>
        </View>
        <View>
          <Button title="full Map View" color="#47BABC" />
        </View>
      </View>
      <View>
        <View>
          <Text style={styles.title}>Popular</Text>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    height: 350,
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
    paddingRight: 30,
    paddingTop: 15,
    paddingBottom: 5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 35,
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
    paddingTop: 15,
    paddingBottom: 15,
    fontFamily: "Inter_400Regular",
  },
});
