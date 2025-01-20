import { supabase } from "@/supabase/supabase";
import { Product } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * Fetches a list of all products from the Supabase database, and stores it in the query cache.
 * The cache key is `["products"]`.
 *
 * @returns An array of `Product` objects, or an error if something went wrong.
 */
export const useProductList = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*");
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
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
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
    async mutationFn(data: Omit<Product, "id">) {
      const { error } = await supabase.from("products").insert({
        name: data.name,
        price: data.price,
        image: data.image,
      });

      if (error) throw new Error(error.message);
    },

    async onSuccess() {
      await queryClient.invalidateQueries(["products"]);
    },

    onError(error: any) {
      console.error(error);
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn({ id, ...update }: Product) {
      const { data, error } = await supabase
        .from("products")
        .update(update)
        .eq("id", id)
        .select();
      if (error) throw new Error(error.message);

      return data;
    },
    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries(["products"]);
      await queryClient.invalidateQueries(["product", id]);
    },
    onError(error: any) {
      console.error(error);
    },
  });
};
