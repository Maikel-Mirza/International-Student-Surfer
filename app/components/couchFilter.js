import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TextInput,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import { set } from "react-native-reanimated";

export default function Users() {
  const [events, setEvents] = useState([]);
  const [priceFilter, setPriceFilter] = useState(100000);
  const [captionFilter, setCaptionFilter] = useState([]);
  const [dropDownValue, setDropDownValue] = useState("location");
  const [searchText, setSearchText] = useState("");

  const onSwipe = (gestureName) => {
    if (gestureName === "SWIPE_RIGHT") {
      console.log("You swiped right and are going to another screen");
    }
    if (gestureName === "SWIPE_LEFT") {
      console.log("You swiped left and are going to another screen");
    }
  };

  console.log("Events:", events);
  console.log(events);
  const filteredEvents = events.filter((event) =>
    event.caption.includes(captionFilter)
  );

  useEffect(() => {
    async function getEvents() {
      const response = await fetch(
        "https://unisurf-de1e3-default-rtdb.europe-west1.firebasedatabase.app/events.json" //change to firebase database
      ).then((res) => res.json());
      const dataObj = await response;
      console.log(dataObj);
      const eventsArray = Object.keys(dataObj).map((key) => ({
        id: key,
        ...dataObj[key],
      })); // from object to array
      console.log(eventsArray);

      // eventsArray.filter((event) => event.caption.includes(captionFilter));
      // console.log(eventsArray);

      // postsArray.sort((postsA, postsB) => postsB.createdAt > postsA.createdAt);
      setEvents(eventsArray);
    }
    getEvents();
  }, [searchText]);

  const handleSearch = () => {
    console.log("Searching for:", searchText);
    // Implement your search logic here
    setSearchText(searchText);
  };

  function handlePriceSearch() {
    console.log("Searching for:", priceFilter);

    setPriceFilter(10);
  }

  function pageScroll() {
    console.log("Scrolling");
  }

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TextInput
            placeholder="Enter search text"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
            onSubmitEditing={handleSearch}
          />
          <Button title="Search" onPress={handleSearch} />
          <Text>{captionFilter}</Text>
          <Text style={styles.title}>Users</Text>
          <Text style={styles.subtitle}>
            Couch Surfing is a great way to meet new people and travel
          </Text>
        </View>
      </View>
      <ScrollView>
        <Text style={{ fontSize: 40 }}>
          This is a scrollable content. This is a scrollable content. This is a
          scrollable content. This is a scrollable content. This is a scrollable
          content. This is a scrollable content. This is a scrollable content.
          This is a scrollable content. This is a scrollable content. This is a
          scrollable content. This is a scrollable content. This is a scrollable
          content. This is a scrollable content. This is a scrollable content.
          This is a scrollable content. This is a scrollable content. This is a
          scrollable content. This is a scrollable content. This is a scrollable
          content. This is a scrollable content. This is a scrollable content.
          This is a scrollable content. This is a scrollable content. This is a
          scrollable content. This is a scrollable content. This is a scrollable
          content. This is a scrollable content. This is a scrollable content.
          This is a scrollable content. This is a scrollable content. This is a
          scrollable content. This is a scrollable content. This is a scrollable
          content. This is a scrollable content. This is a scrollable content.
          This is a scrollable content. This is a scrollable content. This is a
          scrollable content. This is a scrollable content. This is a scrollable
          content. This is a scrollable content. This is a scrollable content.
          This is a scrollable content. This is a scrollable content.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
