import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { Link, router, useSegments } from "expo-router";
import { Order } from "@/types/types";
import { useAuth } from "@/providers/AuthProvider";

dayjs.extend(relativeTime);

type OrderListItemProps = {
  order: Order;
};

const OrderListItem = ({ order }: OrderListItemProps) => {
  const segments = useSegments();
  const {isAdmin} = useAuth()

  const onPress = () => {

    if (isAdmin){
      router.push(`/order/${order.id}`);
    }
    router.push(`/order/${order.id}`);

    


  };

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Order #{order.id}</Text>
        <View style={styles.innerContainer}>
          <Text style={styles.time}>{dayjs(order.created_at).fromNow()}</Text>
          <Text style={styles.status}>{order.status}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    marginVertical: 5,
    marginTop: 16,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
    marginBottom: 4,
    paddingRight: 16,
    paddingLeft: 16,
  },
  time: {
    color: "gray",
  },
  status: {
    fontWeight: "500",
  },
});

export default OrderListItem;
