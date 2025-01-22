import AuthProvider from "@/providers/AuthProvider";
import { CartProvider } from "@/providers/CartProvider";
import NotificationProvider from "@/providers/NotificationProvider";
import Queryprovider from "@/providers/QueryProvider";
import { StripeProvider } from "@stripe/stripe-react-native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <>
      <StripeProvider
        publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""}
      >
        <AuthProvider>
          <Queryprovider>
            <NotificationProvider>
              <CartProvider>
                <Stack>
                  <Stack.Screen
                    name="(root)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="(auth)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen name="+not-found" />
                </Stack>
                <StatusBar style="auto" />
              </CartProvider>
            </NotificationProvider>
          </Queryprovider>
        </AuthProvider>
      </StripeProvider>
    </>
  );
}
