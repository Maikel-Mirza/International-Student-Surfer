import React, { useEffect, useState } from "react";
import {
  View,
  Button,
  Modal,
  Picker,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";

const Scroll = () => {
  const onSwipe = (gestureName) => {
    if (gestureName === "SWIPE_RIGHT") {
      console.log("You swiped right and are going to another screen");
    }
    if (gestureName === "SWIPE_LEFT") {
      console.log("You swiped left and are going to another screen");
    }
  };
};
export default function Events() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [events, setEvents] = useState([]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleValueChange = (itemValue) => {
    setSelectedValue(itemValue);
    toggleModal();
  };

  useEffect(() => {
    async function getEvents() {
      const dataObject = await fetch(
        "https://unisurf-de1e3-default-rtdb.europe-west1.firebasedatabase.app/events.json" //change to firebase database
      ).then((res) => res.json());
      const eventsArray = Object.keys(dataObject).map((key) => ({
        id: key,
        ...dataObject[key],
      })); // from object to array
      console.log(eventsArray);
      eventsArray.sort((a, b) => a.price - b.price);

      // eventsArray.filter((event) => event.caption.includes(captionFilter));
      // console.log(eventsArray);

      // postsArray.sort((postsA, postsB) => postsB.createdAt > postsA.createdAt);
      setEvents(eventsArray);
    }
    getEvents();
  }, []);

  return (
    <ScrollView>
      <Button title="Open Dropdown" onPress={toggleModal} />

      <Modal visible={isModalVisible} animationType="slide">
        <View>
          <Picker
            selectedValue={selectedValue}
            onValueChange={handleValueChange}
          >
            <Picker.Item label="Price" value="price" />
            <Picker.Item label="Location" value="location" />
            <Picker.Item label="Distance" value="distance" />
          </Picker>

          <Button title="Close" onPress={toggleModal} />
        </View>
      </Modal>
      <Text>Selected value: {selectedValue}</Text>

      <FlatList
        data={events}
        renderItem={({ item }) => (
          <Event image={item.image} caption={item.caption} />
        )}
        keyExtractor={(item) => item.id}
      />
      <Text>Events: {JSON.stringify(events, null, 2)}</Text>
    </ScrollView>
  );
}

function Event({ image, caption }) {
  return (
    <View>
      <Image source={{ uri: image }} style={styles.postImage} />
      <Text>{caption}</Text>
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
  postImage: {
    width: 300,
    height: 300,
  },
});
