import { supabase } from "@/supabase/supabase";
import { ProductProps } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * Fetches a list of all products from the Supabase database, and stores it in the query cache.
 * The cache key is `["products"]`.
 *
 * @returns An array of `Product` objects, or an error if something went wrong.
 */
export const useProductList = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*,sizes(*)");
      if (error) throw new Error(error.message);
      return data;
    },
  });
};

/**
 * Fetches a single product from the Supabase database, and stores it in the query cache.
 * The cache key is `["product", id]`.
 *
 * @param id The ID of the product to fetch.
 * @returns A `Product` object, or an error if something went wrong.
 */
export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*,sizes(*)")
        .eq("id", id)
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
  });
};

/**
 * Custom hook to insert a new product into the Supabase database.
 *
 * This hook uses a mutation to insert a product into the "products" table
 * in Supabase. It takes product data (excluding "id") as input and attempts
 * to add it to the database. On successful insertion, it invalidates the
 * "products" query cache to ensure fresh data. If there's an error during
 * insertion, it logs the error to the console.
 *
 * @returns A mutation object from react-query's useMutation hook, which
 * provides methods to trigger the mutation and track its status.
 */

export const useInsertProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: any) {
      // const { error } = await supabase.from("products").insert({
      //   name: data.name,
      //   // price: data.price,
      //   image: data.image,
      //   sizes: data.sizes,
      // });
      const { error } = await supabase.rpc("product_sizes_chain_insert", {
        product_name: data.name,
        product_description: data.description,
        product_image: data.image,
        sizes_data: data.sizes,
      });
      console.log("submitted Data ::", JSON.stringify(data, null, 2));

      if (error) throw new Error(error.message);
    },

    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
    },

    onError(error: any) {
      console.error(error);
    },
  });
};

/**
 * Custom hook to update a product in the Supabase database.
 *
 * This hook uses a mutation to update a product in the "products" table
 * in Supabase. It takes product data (including "id") as input and attempts
 * to update the corresponding product in the database. On successful update,
 * it invalidates the "products" and "product" (for that specific product ID)
 * query caches to ensure fresh data. If there's an error during update,
 * it logs the error to the console.
 *
 * @returns A mutation object from react-query's useMutation hook, which
 * provides methods to trigger the mutation and track its status.
 */
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(data: any) {
      const { data: updatedProduct, error } = await supabase
        .from("products")
        .update({
          name: data.name,
          // price: data.price,
          image: data.image,
          sizes: data.sizes,
        })
        .eq("id", data.id)
        .select()
        .single();
      if (error) throw new Error(error.message);

      return data;
    },
    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      await queryClient.invalidateQueries({ queryKey: ["product", id] });
    },
    onError(error: any) {
      console.error(error);
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(id: string) {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw new Error(error.message);
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError(error: any) {
      console.error(error);
    },
  });
};
