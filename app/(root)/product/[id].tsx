import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { products } from "@/assets/data";
import { PizzaSize } from "@/types/types";
import { pizzaSizes } from "@/constants";
import Button from "@/components/Button";

// const product = products[0];

const ProductDetails = () => {
  const { id } = useLocalSearchParams();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");

  const product = products.find((product) => product.id.toString() === id);
  const addToCart = () => {
    if (!product) return;
    console.warn("Add to cart");
  };
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product?.name }} />
      <Image
        source={{ uri: product?.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.subtitle}>Select Size</Text>
      <View style={styles.sizes}>
        {pizzaSizes.map((size) => (
          <Pressable
            key={size}
            onPress={() => setSelectedSize(size)}
            style={[
              styles.size,
              {
                backgroundColor: size === selectedSize ? "gainsboro" : "white",
              },
            ]}
          >
            <Text
              style={[
                styles.sizeText,
                { color: size === selectedSize ? "black" : "gray" },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.price}>Price : ${product?.price.toFixed(2)}</Text>
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
