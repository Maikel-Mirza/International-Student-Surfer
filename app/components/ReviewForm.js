import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import { ListItem } from "react-native-elements";

const StarRating = ({ rating }) => {
  const filledStars = Array.from({ length: rating }).fill("★");
  const emptyStars = Array.from({ length: 5 - rating }).fill("☆");

  return (
    <View style={styles.starContainer}>
      {filledStars.map((star, index) => (
        <Text key={index} style={styles.star}>
          {star}
        </Text>
      ))}
      {emptyStars.map((star, index) => (
        <Text key={index + filledStars.length} style={styles.grayStar}>
          {star}
        </Text>
      ))}
    </View>
  );
};

const App = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    async function getPosts() {
      const response = await fetch(
        "https://unisurf-de1e3-default-rtdb.europe-west1.firebasedatabase.app/reviews.json"
      ).then((res) => res.json());
      const dataObj = await response;
      console.log(dataObj);
      const postsArray = Object.keys(dataObj).map((key) => ({
        id: key,
        ...dataObj[key],
      })); // from object to array
      console.log(postsArray);
      postsArray.sort((postsA, postsB) => postsB.createdAt > postsA.createdAt);
      setReviews(postsArray);
    }
    getPosts();
  }, []);

  return (
    <FlatList
      style={styles.list}
      data={reviews}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ListItem style={styles.reviewContainer}>
          <ListItem.Content>
            <View style={styles.topContent}>
              <Image src={item.image} style={styles.profilePhoto}></Image>
              <ListItem.Title style={styles.name}>{item.name}</ListItem.Title>
              <StarRating rating={item.rating}></StarRating>
            </View>
            <Text style={styles.text}>{item.text}</Text>
          </ListItem.Content>
        </ListItem>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
  },
  frame: {
    width: "50%",
    height: "50%",
    borderWidth: 1,
    borderColor: "teal",
    borderRadius: "teal",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    margin: 5,
  },
  list: {
    flex: 1,
    paddingBottom: 50,
  },
  profilePhoto: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    borderRadius: 50,
  },
  profileName: {
    marginTop: 10,
    fontWeight: "bold",
  },
  starContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  star: {
    color: "teal",
    fontSize: 30,
  },
  grayStar: {
    color: "gray",
    fontSize: 30,
  },
  text: {
    marginTop: 10,
    textAlign: "left",
  },
  name: {
    marginLeft: 10,
    flex: 1,
  },
  reviewContainer: {
    //This is the container for the Images and text
    marginLeft: 10,
    marginRight: 20,
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "teal",
    overflow: "hidden",
    width: "90%",
    height: "auto",
    alignSelf: "center",
    backgroundColor: "white",
    elevation: 3,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    textAlign: "justify",
  },
  topContent: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
});

export default App;
