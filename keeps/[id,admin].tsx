// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Pressable,
//   ActivityIndicator,
// } from "react-native";
// import { Stack, useLocalSearchParams } from "expo-router";
// import { orders } from "@/assets/data";
// import OrderListItem from "@/components/OrderListItem";
// import OrderItemListItem from "@/components/OrderItemListItem";
// import { Colors } from "@/constants";
// import React from "react";
// import { OrderStatusList } from "@/types/types";
// import { useOrderDetails, useUpdateOrder } from "@/api/orders";
// import { notifyUserAboutOrderUpdate } from "@/lib/notification";

// const OrderDetail = () => {
//   const { id } = useLocalSearchParams();

//   // const order = orders.find((o) => o.id.toString() === id);
//   const { data: order, isLoading, error } = useOrderDetails(id as string);
//   const { mutate: updateOrder } = useUpdateOrder();

//   const updateStatus = async (status: string) => {
//     await updateOrder({
//       id: id as string,
//       updatedFields: { status },
//     });
//     if (order) {
//       await notifyUserAboutOrderUpdate({ ...order, status });
//     }
//   };

//   if (isLoading) return <ActivityIndicator />;

//   if (error) return <Text>{error.message}</Text>;

//   if (!order) {
//     return <Text>Order not found!</Text>;
//   }

//   console.log("selected Order id: ", id);

//   console.log("selected Order: ", order);

//   return (
//     <>
//       <View style={{ padding: 10, gap: 20, flex: 1 }}>
//         <Stack.Screen options={{ title: `Order #${id}` }} />

//         <FlatList
//           data={order.order_items}
//           renderItem={({ item }) => <OrderItemListItem item={item} />}
//           contentContainerStyle={{ gap: 10 }}
//           ListHeaderComponent={() => <OrderListItem order={order} />}
//           ListFooterComponent={() => (
//             <>
//               <Text style={{ fontWeight: "bold" }}>Status</Text>
//               <View style={{ flexDirection: "row", gap: 5 }}>
//                 {OrderStatusList.map((status) => (
//                   <Pressable
//                     key={status}
//                     onPress={() => updateStatus(status)}
//                     style={{
//                       borderColor: Colors.light.tint,
//                       borderWidth: 1,
//                       padding: 10,
//                       borderRadius: 5,
//                       marginVertical: 10,
//                       backgroundColor:
//                         order.status === status
//                           ? Colors.light.tint
//                           : "transparent",
//                     }}
//                   >
//                     <Text
//                       style={{
//                         color:
//                           order.status === status ? "white" : Colors.light.tint,
//                       }}
//                     >
//                       {status}
//                     </Text>
//                   </Pressable>
//                 ))}
//               </View>
//             </>
//           )}
//         />
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//     flex: 1,
//     gap: 10,
//   },
// });

// export default OrderDetail;
