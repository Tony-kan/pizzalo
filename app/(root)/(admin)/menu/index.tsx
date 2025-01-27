import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  Text,
  Platform,
  FlatList,
  ActivityIndicator,
  Pressable,
} from "react-native";

import { products } from "@/assets/data";
import { Colors } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProductListItem } from "@/components/ProductListItem";
import { router, Stack } from "expo-router";
import { supabase } from "@/supabase/supabase";
import { useProductList } from "@/api/products";
import { FontAwesome } from "@expo/vector-icons";

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
          headerLeft: () => (
            <Pressable onPress={() => router.push(`/cart`)}>
              {({ pressed }) => (
                <FontAwesome
                  name="shopping-cart"
                  size={25}
                  color={Colors.light.tint}
                  style={{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          ),
          title: "Menu",
          headerRight: () => (
            <Pressable onPress={() => router.push(`/create-update/new`)}>
              {({ pressed }) => (
                <FontAwesome
                  name="plus"
                  size={25}
                  color={Colors.light.tint}
                  style={{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          ),
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
