import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useCart } from "@/providers/CartProvider";
import CartListItem from "@/components/CartListItem";
import Button from "@/components/Button";
import { StatusBar } from "expo-status-bar";

const cart = () => {
  const { items, total, checkout } = useCart();
  console.log("cart items", JSON.stringify(items, null, 2));
  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ gap: 10 }}
      />

      <Text style={{ marginTop: 20, fontSize: 20, fontWeight: "500" }}>
        Total: ${total.toFixed(2)}
      </Text>
      {/* <Button onPress={checkout} text="Checkout" /> */}
      <Button text="Checkout" onPress={checkout} />

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default cart;

const styles = StyleSheet.create({});
