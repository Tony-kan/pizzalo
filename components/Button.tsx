import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { ComponentPropsWithoutRef, forwardRef } from "react";
import { Colors } from "@/constants";

type ButtonProps = {
  text: string;
} & ComponentPropsWithoutRef<typeof Pressable>;

const Button = forwardRef<View | null, ButtonProps>(
  ({ text, ...pressableProps }, ref) => {
    return (
      <Pressable style={styles.container} ref={ref} {...pressableProps}>
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    );
  }
);
export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.tint,
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});
