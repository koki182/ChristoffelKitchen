import { Stack } from "expo-router";
import { MenuProvider } from "../context/MenuContext";

export default function RootLayout() {
  return (
    <MenuProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </MenuProvider>
  );
}