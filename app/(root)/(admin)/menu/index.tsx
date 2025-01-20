import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  Text,
  Platform,
  FlatList,
} from "react-native";

import { products } from "@/assets/data";
import { Colors } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProductListItem } from "@/components/ProductListItem";
import { Stack } from "expo-router";
import { supabase } from "@/supabase/supabase";

export default function HomeScreen() {
  const onLogout = async () => {
    await supabase.auth.signOut();
  };
  return (
    <View>
      <Stack.Screen
        options={{
          title: "Menu",
          headerRight: () => <Text onPress={onLogout}>Logout</Text>,
        }}
      />

      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </View>
  );
}
