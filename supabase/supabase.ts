import "react-native-url-polyfill/auto";
import * as SecureStore from "expo-secure-store";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string;

const ExpoSecureStoreAdapter = {
  getItem: (Key: string) => {
    return SecureStore.getItemAsync(Key);
  },
  setItem: (Key: string, Value: string) => {
    SecureStore.setItemAsync(Key, Value);
  },
  removeItem: (Key: string) => {
    SecureStore.deleteItemAsync(Key);
  },
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
