import * as Font from "expo-font";

export default useFonts = async () => {
  await Font.loadAsync({
    Inter_400Regular: require("../assets/fonts/static/Inter-Regular.ttf"),
    // All other fonts here
  });
};
