import { withLayoutContext } from "expo-router";
import Transition from "react-native-screen-transitions";
import {
  createBlankStackNavigator,
  type BlankStackNavigationOptions,
} from "react-native-screen-transitions/blank-stack";

const { Navigator } = createBlankStackNavigator();

export const Stack = withLayoutContext<
  BlankStackNavigationOptions,
  typeof Navigator,
  any,
  any
>(Navigator);

export default function RootLayout() {
  return (
    <Stack>
      {/* Home Screen */}
      <Stack.Screen name="index" />

      {/* Dynamic Stacked Bottom Sheets */}
      <Stack.Screen
        name="bottom-sheet/[depth]"
        options={{
          gestureEnabled: true,
          gestureDirection: "vertical",
          snapPoints: [0.6], // Stays at 60% of the screen height
          initialSnapIndex: 0,
          backdropBehavior: "dismiss",
          ...Transition.Presets.SlideFromBottom(),
        }}
      />

      {/* Gallery Screen */}
      <Stack.Screen name="gallery" />

      {/* Image Detail Screen (Shared Bounds) */}
      <Stack.Screen
        name="image-detail"
        options={({ route }) => {
          const boundaryId = (route.params as any)?.boundaryId;

          return {
            gestureEnabled: true,
            gestureDirection: "vertical",
            screenStyleInterpolator: ({ bounds }) => {
              "worklet";
              if (!boundaryId) return null;

              return bounds({ id: boundaryId }).navigation.zoom({
                target: "fullscreen",
              }) as any;
            },
          };
        }}
      />
    </Stack>
  );
}
