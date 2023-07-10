import {
  Text,
  View,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { Feather, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { ScrollViewBase } from "react-native";

export default function Event() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  function handleGoBack() {
    router.replace("/events");
  }

  useEffect(() => {
    async function getPosts() {
      const response = await fetch(
        "https://unisurf-de1e3-default-rtdb.europe-west1.firebasedatabase.app/couch.json"
      ).then((res) => res.json());
      const dataObj = await response;
      console.log(dataObj);
      const postsArray = Object.keys(dataObj).map((key) => ({
        id: key,
        ...dataObj[key],
      })); // from object to array
      console.log(postsArray);
      setPosts(postsArray);
    }
    getPosts();
  }, []);

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
        <View style={styles.iconsEventCouches}>
          <View style={styles.iconsPostsCouches}>
            <Feather name="calendar" size={24} color="black" />
            <Text style={{ width: 45, paddingLeft: 8 }}>{item.date}</Text>
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
      <Stack.Screen
        options={{
          headerTitle: " ",
          headerStyle: {
            backgroundColor: "#47BABC",
            headerShown: true,
          },
        }}
      />
      <ScrollView>
        <Image
          style={styles.cover}
          source={require("../../assets/img/coverevent.png")}
        />
        <View style={styles.titleBox}>
          <Text style={styles.title}>SmukFest</Text>
          <View style={styles.icons}>
            <Feather name="calendar" size={24} color="black" />
            <Text style={styles.subtitleCouches}>Jun 10 </Text>
          </View>
        </View>
        <View style={styles.contentText}>
          <Text style={[styles.subtitleCouches, { paddingBottom: 15 }]}>
            Aarhus
          </Text>
        </View>
        <View style={styles.contentText}>
          <Text>
            Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis. Class
            aptent taciti sociosqu ad litora torquent per conubia nostra, per
            inceptos himenaeos.
          </Text>
          <Text>
            Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis. Class
            aptent taciti sociosqu ad litora torquent per conubia nostra, per
            inceptos himenaeos.
          </Text>
        </View>
        <View style={styles.iconsEvent}>
          <View style={styles.icons}>
            <MaterialIcons name="group" size={24} color="black" />
            <Text>300+</Text>
          </View>
          <View style={styles.icons}>
            <FontAwesome5 name="couch" size={24} color="black" />
            <Text>60</Text>
          </View>
        </View>

        <Button color="#47BABC" title={"Save"} />
        <View>
          <View style={styles.titleCouch}>
            <Text style={styles.title}>Couch Offers</Text>
          </View>

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
          <View>
            <Text>Posts</Text>
          </View>

          <Button color="#47BABC" title={"Offer Your Couch"} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cover: {
    width: "100%",
    marginTop: 55,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  titleBox: {
    paddingLeft: 30,
    paddingRight: 0,
    paddingTop: 27,
    paddingBottom: 5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 150,
  },

  contentText: {
    paddingLeft: 30,
    paddingRight: 30,
    gap: 10,
  },
  titleCouch: {
    paddingLeft: 30,
    paddingTop: 45,
    paddingBottom: 15,
  },
  icons: {
    flex: 1,
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  iconsEvent: {
    flex: 1,
    flexDirection: "row",
    gap: -150,
    paddingLeft: 30,
    paddingTop: 15,
    paddingBottom: 15,
  },
  city: {
    fontSize: 18,
    color: "gray",
    fontWeight: "light",
    paddingLeft: 30,
    paddingBottom: 10,
  },
  titleCouches: {
    fontSize: 20,
    fontFamily: "Inter_400Regular",
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 10,
  },
  styleCardCouches: {
    marginRight: 0,
    marginTop: 4,
    marginBottom: 10,
    borderColor: "#E8E8E8",
    borderRadius: 50,
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
    marginBottom: 20,
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
    paddingLeft: 25,
    paddingRight: 30,
    alignContent: "center",
    alignItems: "baseline",
    paddingTop: 15,
    paddingBottom: 15,
    fontFamily: "Inter_400Regular",
    gap: 15,
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
});
