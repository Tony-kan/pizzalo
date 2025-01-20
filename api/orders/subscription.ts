import { supabase } from "@/supabase/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useInsertOrderSubscription = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const ordersSubscription = supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "orders",
        },
        (payload) => {
          console.log("change received", payload);
          queryClient.invalidateQueries({ queryKey: ["orders"] });
        }
      )
      .subscribe();

    return () => {
      ordersSubscription.unsubscribe();
    };
  }, []);
};

export const useUpdateOrderSubscription = (id: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const orders = supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
        },
        (payload) => {
          console.log("change received", payload);
          queryClient.invalidateQueries({ queryKey: ["orders", id] });
        }
      )
      .subscribe();

    return () => {
      orders.unsubscribe();
    };
  }, []);
};
