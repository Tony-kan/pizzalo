import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  Text,
  Platform,
} from "react-native";

import { products } from "@/assets/data";
import { Colors } from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";

const product = products[0];
export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>{product.price.toFixed(2)}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    overflow: "hidden",
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
  },
});
