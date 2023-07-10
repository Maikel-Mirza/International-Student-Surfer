import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import {
  Image,
  ScrollView,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import { Feather, MaterialIcons, Foundation } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";

export default function Users() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const markerRef = useRef(null);
  const Stack = createStackNavigator();

  const [fontsLoaded] = useFonts({
    Inter_400Regular: require("../../assets/fonts/static/Inter-Regular.ttf"),
  });
  if (!fontsLoaded) {
    console.log(null);
  }

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.showCallout();
    }
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
      setSelectedEvent(eventsArray[0]); // Select the first event
    }
    getEvents();
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

  const handleEventPress = () => {
    router.push("/(tabs)/events/oneEvent");
  };

  const renderEvents = ({ item }) => (
    <View style={styles.imageContainer}>
      <Stack.Screen
        options={{
          headerTitle: " ",
          headerShown: true,
          headerShadowVisible: false,
          headerTransparent: true,
        }}
      />
      <View style={styles.contentContainer}>
        <Pressable onPress={handleEventPress}>
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
        </Pressable>
      </View>
    </View>
  );

  const keyExtractor = (item) => item.key;

  // And here's the function that will be called when the marker is pressed:
  const handleMarkerPress = (title) => {
    const event = events.find((event) => event.title === title);
    setSelectedEvent(event);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
          <Text style={styles.title}>Events in Aarhus</Text>
          <View style={styles.mapContainer}>
            <View style={styles.mapWrapper}>
              <MapView
                style={styles.map}
                region={{
                  latitude: 56.16378569875331,
                  longitude: 10.202604339394776,
                  latitudeDelta: 0.5,
                  longitudeDelta: 0.7,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: 56.03730822071016,
                    longitude: 9.915939850923815,
                  }}
                  title={"SmukFest"}
                  description={"Birkevej 20, 8660 Skanderborg, Danemark"}
                  onPress={() => handleMarkerPress("SmukFest")}
                />
                <Marker
                  coordinate={{
                    latitude: 56.14014927716435,
                    longitude: 10.160649771252391,
                  }}
                  title={"NorthSide"}
                  description={"Studsgade 35B, 8000 Aarhus, Danemark"}
                  onPress={() => handleMarkerPress("NorthSide")}
                />
                <Marker
                  coordinate={{
                    latitude: 56.16907156140661,
                    longitude: 10.124847365219459,
                  }}
                  title={"GrimFest"}
                  description={"Grimhøjvej 20, 8220 Brabrand, Danemark"}
                  onPress={() => handleMarkerPress("GrimFest")}
                />
              </MapView>
              <View style={styles.contentContainer}>
                {selectedEvent && (
                  <View style={styles.mapImageContainer}>
                    <View style={styles.mapImageWrapper}>
                      <Image
                        src={selectedEvent.image}
                        style={styles.mapImage}
                      />
                    </View>
                    <View style={styles.mapTitleBox}>
                      <Text style={[styles.mapBoxText]}>
                        {selectedEvent.title}
                      </Text>
                      <Text style={[styles.mapSubtitle]}>
                        {selectedEvent.city}
                      </Text>
                    </View>
                    <View style={styles.mapSlideText}>
                      <Text>{selectedEvent.mapDescription}</Text>
                    </View>
                    <View style={styles.mapIconsEvent}>
                      <View style={styles.mapIconsPosts}>
                        <Feather name="calendar" size={24} color="black" />

                        <Text style={{ width: 45 }}>{selectedEvent.date}</Text>
                      </View>
                      <View style={styles.mapIconsPosts}>
                        <MaterialIcons name="group" size={24} color="black" />
                        <Text>{selectedEvent.groupCount}</Text>
                      </View>
                    </View>
                  </View>
                )}
              </View>
            </View>
          </View>

          <View>
            <TouchableOpacity
              style={[styles.buttonEvent, { alignContent: "center" }]}
            >
              <Text style={styles.buttonEventText}>Full Map View ></Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View>
            <Text style={styles.title}>Popular</Text>
            <View style={styles.styleCard}>
              <FlatList
                style={styles.wrapper}
                data={events}
                renderItem={renderEvents}
                keyExtractor={keyExtractor}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  subtitle: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    color: "gray",
    fontWeight: "normal",
    justifyContent: "center",
    alignItems: "baseline",
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
    height: 55,
    backgroundColor: "#47BABC",
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
  buttonEvent: {
    width: 207,
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
  map: {
    width: 228,
    height: 328,
  },
  mapContainer: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 20,
    borderRadius: 10,
    borderWidth: 0,
    overflow: "hidden",
    width: "95%",
    height: 328,
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
  eventContainer: {
    flex: 1,
    padding: 10, // Add some padding around the text
  },
  eventTitle: {
    fontSize: 24, // Make the title larger
    fontWeight: "bold",
  },
  mapImageWrapper: {
    borderWidth: 0,
    borderColor: "gray",
  },
  mapImageContainer: {
    //This is the container for the Images and text
    borderRadius: 10,
    overflow: "hidden",
    width: 145,
    height: 665,
    alignSelf: "flex-end",
    backgroundColor: "white",
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 3,
    borderTopRightRadius: 10,
  },
  mapImage: {
    width: 148,
    height: 115,
    borderTopRightRadius: 10,
  },
  mapTitleBox: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 0,
    paddingBottom: 5,
    flex: 1,
    flexDirection: "column",
    fontFamily: "Inter_400Regular",
  },
  mapBoxText: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Inter_400Regular",
    textAlign: "left",
  },
  mapSubtitle: {
    flex: 1,
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    textAlign: "left",
    color: "gray",
    fontWeight: "normal",
    justifyContent: "center",
    alignItems: "baseline",
  },
  mapSlideText: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
    fontFamily: "Inter_400Regular",
  },
  mapIconsEvent: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: 30,
    paddingTop: 15,
    paddingBottom: 15,
    fontFamily: "Inter_400Regular",
  },
  mapIconsPosts: {
    flex: 1,
    flexDirection: "row",
    gap: 1,
    alignItems: "center",
    fontFamily: "Inter_400Regular",
    justifyContent: "flex-start",
    columnGap: 10,
  },
  mapWrapper: {
    flex: 1,
  },
});
