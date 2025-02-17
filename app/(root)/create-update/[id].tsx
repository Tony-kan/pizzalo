import { FontAwesome } from "@expo/vector-icons";
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
  Alert,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import Button from "@/components/Button";
import * as FileSystem from "expo-file-system";
import { Colors, defaultPizzaImage } from "@/constants";
import { supabase } from "@/supabase/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useDeleteProduct,
  useInsertProduct,
  useProduct,
  useUpdateProduct,
} from "@/api/products";
import { randomUUID } from "expo-crypto";
import { decode } from "base64-arraybuffer";

const CreateUpdate = () => {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceS, setPriceS] = useState("");
  const [priceM, setPriceM] = useState("");
  const [priceL, setPriceL] = useState("");
  const [priceXL, setPriceXL] = useState("");
  const [errors, setErrors] = useState("");

  const { id: idString } = useLocalSearchParams();
  // const id = parseFloat(
  //   typeof idString === "string" ? idString : idString?.[0]
  // );
  //   const isUpdating = !!idString;
  const isUpdating = idString === "new" ? false : true;

  const id = idString || "";
  //   console.log("id", id);
  //   console.log("isUpdating", isUpdating);

  const { mutate: insertProduct } = useInsertProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { data: updatingProduct } = useProduct(id as string);
  const { mutate: deleteProduct } = useDeleteProduct();

  useEffect(() => {
    if (updatingProduct) {
      setName(updatingProduct.name);
      // setPrice(updatingProduct.price.toString());
      setImage(updatingProduct.image);
      setPriceS(
        updatingProduct.sizes
          .find((size) => size.size === "S")
          ?.price.toString() || ""
      );
      setPriceM(
        updatingProduct.sizes
          .find((size) => size.size === "M")
          ?.price.toString() || ""
      );
      setPriceL(
        updatingProduct.sizes
          .find((size) => size.size === "L")
          ?.price.toString() || ""
      );
      setPriceXL(
        updatingProduct.sizes
          .find((size) => size.size === "XL")
          ?.price.toString() || ""
      );
    }
  }, [updatingProduct]);

  console.log("updatingProduct", JSON.stringify(updatingProduct, null, 2));

  const resetFields = () => {
    setName("");
    // setPrice("");
  };

  const validateInput = () => {
    setErrors("");
    if (!name) {
      setErrors("Name is required");
      return false;
    }
    // if (!price) {
    //   setErrors("Price is required");
    //   return false;
    // }
    // if (isNaN(parseFloat(price))) {
    //   setErrors("Price should be a number");
    //   return false;
    // }
    if (!priceS) {
      setErrors("Price (S) is required");
      return false;
    }
    if (!priceM) {
      setErrors("Price (M) is required");
      return false;
    }
    if (!priceL) {
      setErrors("Price (L) is required");
      return false;
    }
    if (!priceXL) {
      setErrors("Price (XL) is required");
      return false;
    }
    if (isNaN(parseFloat(priceS))) {
      setErrors("Price (S) should be a number");
      return false;
    }
    if (isNaN(parseFloat(priceM))) {
      setErrors("Price (M) should be a number");
      return false;
    }
    if (isNaN(parseFloat(priceL))) {
      setErrors("Price (L) should be a number");
      return false;
    }
    if (isNaN(parseFloat(priceXL))) {
      setErrors("Price (XL) should be a number");
      return false;
    }

    return true;
  };

  const onSubmit = () => {
    if (isUpdating) {
      // update
      onUpdate();
    } else {
      onCreate();
    }
  };

  const onCreate = () => {
    const sizes = [
      { size: "S", price: parseFloat(priceS) },
      { size: "M", price: parseFloat(priceM) },
      { size: "L", price: parseFloat(priceL) },
      { size: "XL", price: parseFloat(priceXL) },
    ];
    if (!validateInput()) {
      return;
    }

    insertProduct(
      {
        name,
        // price: parseFloat(price),
        description,
        image,
        sizes,
      },
      {
        onSuccess: () => {
          resetFields();
          router.back();
          console.warn("Product created");
          Alert.alert("Product created");
        },
      }
    );

    // console.warn("Creating dish");
    // setName("");
    // setPrice("");
    // setImage("");
  };

  const onUpdate = async () => {
    const sizes = [
      { size: "S", price: parseFloat(priceS) },
      { size: "M", price: parseFloat(priceM) },
      { size: "L", price: parseFloat(priceL) },
      { size: "XL", price: parseFloat(priceXL) },
    ];
    if (!validateInput()) {
      return;
    }
    const imagePath = await uploadImage();

    updateProduct(
      {
        id,
        name,
        // price: parseFloat(price),
        description,
        image: imagePath,
        sizes,
      },
      {
        onSuccess: () => {
          resetFields();
          router.back();
          console.warn("Updating pizza");
          Alert.alert("Product updated");
        },
      }
    );
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      // mediaTypes: ImagePicker.MediaTypeOptions.All,
      // mediaTypes:ImagePicker.MediaTypeOptions.
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const confirmDelete = () => {
    Alert.alert("Confirm", "Are you sure you want to delete this product", [
      {
        text: "Cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        // onPress: onDelete,
      },
    ]);
  };

  const uploadImage = async () => {
    if (!image?.startsWith("file://")) {
      return;
    }

    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: "base64",
    });
    const filePath = `${randomUUID()}.png`;
    const contentType = "image/png";

    const { data, error } = await supabase.storage
      .from("product-images")
      .upload(filePath, decode(base64), { contentType });

    console.log(error);

    if (data) {
      return data.path;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              {({ pressed }) => (
                <FontAwesome
                  name="arrow-left"
                  size={25}
                  color={Colors.light.tint}
                  style={{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          ),
          title: isUpdating ? "Update Product" : "Create Product",
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
      <Pressable onPress={pickImage}>
        <Image
          source={{ uri: image || defaultPizzaImage }}
          style={styles.image}
        />

        <Text style={styles.textButton}>Select Image</Text>
      </Pressable>

      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />

      {/* <Text style={styles.label}>Price ($)</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="9.99"
        style={styles.input}
        keyboardType="numeric"
      /> */}

      <Text style={styles.label}>Price (S)</Text>
      <TextInput
        value={priceS}
        onChangeText={setPriceS}
        placeholder="9.99"
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Price (M)</Text>
      <TextInput
        value={priceM}
        onChangeText={setPriceM}
        placeholder="12.99"
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Price (L)</Text>
      <TextInput
        value={priceL}
        onChangeText={setPriceL}
        placeholder="14.99"
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Price (XL)</Text>
      <TextInput
        value={priceXL}
        onChangeText={setPriceXL}
        placeholder="16.99"
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={{ color: "red" }}>{errors}</Text>
      <View>
        <Button onPress={onSubmit} text={isUpdating ? "Update" : "Create"} />
        {isUpdating && (
          <Text onPress={confirmDelete} style={styles.textButton}>
            Delete
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default CreateUpdate;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
  },
  label: {
    color: "gray",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 5,
  },
  error: {
    color: "red",
    textAlign: "center",
  },
});
