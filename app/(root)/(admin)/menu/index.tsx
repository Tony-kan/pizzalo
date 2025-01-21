import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  Text,
  Platform,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { products } from "@/assets/data";
import { Colors } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProductListItem } from "@/components/ProductListItem";
import { Stack } from "expo-router";
import { supabase } from "@/supabase/supabase";
import { useProductList } from "@/api/products";

export default function HomeScreen() {
  const { data, isLoading, error } = useProductList();

  if (isLoading) return <ActivityIndicator />;

  if (error) return <Text>Failed to fetch products</Text>;
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
        data={data}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </View>
  );
}
