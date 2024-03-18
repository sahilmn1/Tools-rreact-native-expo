import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { useColorScheme } from "@/components/useColorScheme";
import Ram from "./api/PostOffice";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        <Stack.Screen
          name="api/PostOffice"
          options={{ title: "Post Office Details", presentation: "modal" }}
        />
           <Stack.Screen
          name="api/Notes"
          options={{ title: "Notes App", presentation: "modal" }}
        />
        {/* for the news headlines */}

        <Stack.Screen
          name="api/News"
          options={{ title: "Headlines", presentation: "modal" }}
        />
      {/* for the url shortner */}

      
      <Stack.Screen
          name="api/UrlShortner"
          options={{ title: "URL Shortner", presentation: "modal" }}
        />
      
      </Stack>
    </ThemeProvider>
  );
}
