import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { supabase } from "@/supabase/supabase";
import { Stack } from "expo-router";

const Profile = () => {
  const onLogout = async () => {
    await supabase.auth.signOut();
  };
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Menu",
          headerRight: () => <Text onPress={onLogout}>Logout</Text>,
        }}
      />
      <Text>Profile</Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
