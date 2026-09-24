import { View, StyleSheet, Image, Dimensions } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Transition from "react-native-screen-transitions";

const { width } = Dimensions.get("window");

export default function ImageDetail() {
  const { url, boundaryId } = useLocalSearchParams<{ url: string; boundaryId: string }>();

  return (
    <View style={styles.container}>
      {/* Target for the shared element bounds transition */}
      <Transition.Boundary.View id={boundaryId}>
        <Image 
          source={{ uri: url }} 
          style={styles.image} 
          resizeMode="cover"
        />
      </Transition.Boundary.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: width,
    height: width * 1.5,
    borderRadius: 0, // Images usually lose border radius in full screen view
  },
});
