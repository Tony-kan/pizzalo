import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { products } from "@/assets/data";
import { PizzaSize } from "@/types/types";
import { Colors, pizzaSizes } from "@/constants";
import Button from "@/components/Button";
import { useProduct } from "@/api/products";
import { useCart } from "@/providers/CartProvider";
import { FontAwesome } from "@expo/vector-icons";

// const product = products[0];

const ProductDetails = () => {
  const { id } = useLocalSearchParams();
  const [selectedSize, setSelectedSize] = useState<string | null>("M");

  const { data: product, isLoading, error } = useProduct(id as string);
  const { addItem } = useCart();

  // console.log("Fetched pizza products : ", JSON.stringify(product, null, 2));

  if (isLoading) return <ActivityIndicator />;

  if (error)
    return (
      <Text>
        Error : failed to fetch Product details for product with id : {id}
      </Text>
    );

  // const product = products.find((product) => product.id.toString() === id);
  const addToCart = () => {
    if (!product || !selectedSize) return;

    addItem(product, selectedSize);
    router.push("/cart");
    console.warn("Add to cart");
  };
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              {({ pressed }) => (
                <FontAwesome
                  name="arrow-left"
                  size={25}
                  // color={Colors.light.tint}
                  style={{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          ),
          title: product?.name,
          headerRight: () => (
            <Pressable onPress={() => router.push("/cart")}>
              {({ pressed }) => (
                <FontAwesome
                  name="shopping-cart"
                  size={25}
                  color={Colors.light.tint}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          ),
        }}
      />
      <Image
        source={{ uri: product?.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.subtitle}>Select Size</Text>
      <View style={styles.sizes}>
        {product?.sizes.map(
          (size: { id: string; size: string; price: number }) => (
            <Pressable
              key={size.id}
              onPress={() => setSelectedSize(size?.size)}
              style={[
                styles.size,
                {
                  backgroundColor:
                    size.size === selectedSize ? "gainsboro" : "white",
                },
              ]}
            >
              <Text
                style={[
                  styles.sizeText,
                  { color: size === selectedSize ? "black" : "gray" },
                ]}
              >
                {size?.size}
              </Text>
            </Pressable>
          )
        )}
      </View>
      {/* <Text style={styles.price}>Price : ${product?.price.toFixed(2)}</Text> */}
      <Text style={styles.price}>
        Price: $
        {product?.sizes.find((s) => s.size === selectedSize)?.price.toFixed(2)}
      </Text>
      <Button text="Add to Cart" onPress={addToCart} />
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    flex: 1,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  subtitle: {
    marginVertical: 10,
    fontWeight: "600",
    fontSize: 20,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 40,
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
  size: {
    width: 60,
    aspectRatio: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
    color: "black",
  },
});
