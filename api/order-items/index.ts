import { supabase } from "@/supabase/supabase";
import { InsertTables } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useInsertOrderItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(items: InsertTables<"order_items">[]) {
      const { data: newProduct, error } = await supabase
        .from("order_items")
        .insert(items)
        .select();

      if (error) throw new Error(error.message);

      return newProduct;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["order_items"] });
    },
    onError(error: any) {
      console.error(error);
    },
  });
};
