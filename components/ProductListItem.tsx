import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// import { Product } from "@/types/types";
import { ProductProps } from "@/types/types";
import { Colors, defaultPizzaImage } from "@/constants";
import { router } from "expo-router";

type ProductListItemProps = {
  product: ProductProps;
};

export const ProductListItem = ({ product }: ProductListItemProps) => {
  const onPress = () => {
    // console.log(JSON.stringify(product, null, 2));
    router.push(`/product/${product.id}`);
  };
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image
        source={{
          uri: product.image || defaultPizzaImage,
        }}
        style={styles.image}
      />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>{`$ ${
        product.sizes ? product.sizes[1]?.price.toFixed(2) : "N/A"
      }`}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    overflow: "hidden",
    flex: 1,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    alignItems: "center",
  },
  title: {
    fontWeight: "600",
    fontSize: 18,
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
    marginTop: "auto",
    marginLeft: 10,
  },
});
