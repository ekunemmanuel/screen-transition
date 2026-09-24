import { View, StyleSheet, Dimensions, Image } from "react-native";
import { router } from "expo-router";
import Transition from "react-native-screen-transitions";

const { width } = Dimensions.get("window");
const IMAGE_SIZE = width / 2 - 24;

const IMAGES = [
  "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&q=80",
  "https://images.unsplash.com/photo-1682687982501-1e58f813f228?w=800&q=80",
  "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?w=800&q=80",
  "https://images.unsplash.com/photo-1682687982134-2ac563b2228b?w=800&q=80",
  "https://images.unsplash.com/photo-1682687218147-980313e0c034?w=800&q=80",
  "https://images.unsplash.com/photo-1682687982093-4773cb0cbc47?w=800&q=80",
];

export default function Gallery() {
  return (
    <Transition.ScrollView contentContainerStyle={styles.container}>
      <View style={styles.grid}>
        {IMAGES.map((url, index) => {
          const boundaryId = `image-${index}`;

          return (
            <Transition.Boundary.Trigger
              key={index}
              id={boundaryId}
              onPress={() => {
                router.push({
                  pathname: "/image-detail",
                  params: { url, boundaryId },
                });
              }}
            >
              <Image source={{ uri: url }} style={styles.image} />
            </Transition.Boundary.Trigger>
          );
        })}
      </View>
    </Transition.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 60,
    backgroundColor: "white",
    minHeight: "100%",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: "red",
  },
});
