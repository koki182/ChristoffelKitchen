
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import AsyncStorage from
  '@react-native-async-storage/async-storage';

export type MenuItem = {
  id: string;
  dishName: string;
  description: string;
  course: string;
  price: number;
};

type MenuContextType = {
  menuItems: MenuItem[];
  isLoading: boolean;
  addMenuItem: (item: MenuItem) => void;
  updateMenuItem: (item: MenuItem) => void;
  removeMenuItem: (id: string) => void;
};

const MenuContext = createContext<
  MenuContextType | undefined
>(undefined);

const STORAGE_KEY = '@christoffel_menu_items';

export function MenuProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [menuItems, setMenuItems] =
    useState<MenuItem[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  // LOAD SAVED DISHES WHEN APP STARTS
  useEffect(() => {
    const loadMenu = async () => {
      try {
        const savedMenu =
          await AsyncStorage.getItem(STORAGE_KEY);

        if (savedMenu !== null) {
          const parsedMenu = JSON.parse(savedMenu);

          if (Array.isArray(parsedMenu)) {
            setMenuItems(parsedMenu);
          }
        }
      } catch (error) {
        console.error('Error loading menu:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMenu();
  }, []);

  // SAVE MENU WHEN ITEMS CHANGE
  useEffect(() => {

    // Avoid overwriting saved data before loading
    if (isLoading) {
      return;
    }

    const saveMenu = async () => {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(menuItems)
        );
      } catch (error) {
        console.error('Error saving menu:', error);
      }
    };

    saveMenu();

  }, [menuItems, isLoading]);

  // ADD NEW DISH
  const addMenuItem = (item: MenuItem) => {
    setMenuItems((currentItems) => [
      ...currentItems,
      item,
    ]);
  };

  // UPDATE EXISTING DISH
  const updateMenuItem = (updatedItem: MenuItem) => {
    setMenuItems((currentItems) =>
      currentItems.map((item) =>
        item.id === updatedItem.id
          ? updatedItem
          : item
      )
    );
  };

  // REMOVE DISH
  const removeMenuItem = (id: string) => {
    setMenuItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== id
      )
    );
  };

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        isLoading,
        addMenuItem,
        updateMenuItem,
        removeMenuItem,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error(
      'useMenu must be used inside MenuProvider'
    );
  }

  return context;
}
