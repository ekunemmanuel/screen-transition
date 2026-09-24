import { StyleSheet, Text, useWindowDimensions, View, TouchableOpacity } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import Transition from "react-native-screen-transitions";
import Animated from "react-native-reanimated"; // CRITICAL: Animated must be imported from react-native-reanimated to fix the crash!

export default function BottomSheet() {
  const { depth } = useLocalSearchParams<{ depth: string }>();
  const currentDepth = parseInt(depth ?? "1", 10);
  const { height: screenHeight } = useWindowDimensions();

  return (
    // 1. The wrapper anchors the bottom sheet to the absolute bottom of the screen
    <View style={styles.wrapper}>
      {/* 
        2. The sheet occupies exactly 60% of the screen height, perfectly matching 
           the snapPoints: [0.6] defined in _layout.tsx. This prevents visual gaps!
      */}
      <Animated.View style={[styles.container, { height: screenHeight * 0.6 }]}>
        <View style={styles.handle} />
        
        <Text style={styles.title}>Action Sheet {currentDepth}</Text>
        <Text style={styles.description}>
          This is layered bottom sheet level {currentDepth}. Tapping the button below will stack another sheet seamlessly on top of this one!
        </Text>

        {/* Button to stack the next sheet level */}
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push({ pathname: "/bottom-sheet/[depth]", params: { depth: String(currentDepth + 1) } })}
        >
          <Text style={styles.buttonText}>Open Next Sheet</Text>
        </TouchableOpacity>

        {/* Button to pop only the current sheet */}
        <TouchableOpacity 
          style={[styles.button, styles.closeButton]}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Close Current Sheet</Text>
        </TouchableOpacity>

        {/* Scrollable area inside the sheet */}
        <Transition.ScrollView style={styles.scrollArea}>
          {[1, 2, 3, 4, 5].map((i) => (
            <View key={i} style={styles.item}>
              <Text style={styles.itemText}>List Item {i} (Sheet {currentDepth})</Text>
            </View>
          ))}
        </Transition.ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "flex-end", // Aligns the card sheet to the very bottom
  },
  container: {
    backgroundColor: "rgba(30, 30, 30, 0.96)", // Dark card aesthetic
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 24,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: "#666",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "white",
  },
  description: {
    fontSize: 15,
    color: "#aaa",
    marginBottom: 20,
    lineHeight: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  closeButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  scrollArea: {
    flexShrink: 1,
    marginTop: 10,
  },
  item: {
    padding: 14,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 8,
    marginBottom: 8,
  },
  itemText: {
    color: "#ccc",
  }
});
