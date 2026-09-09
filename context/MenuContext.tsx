import React, { createContext, useContext, useState } from 'react';

export type MenuItem = {
  id: string;
  dishName: string;
  description: string;
  course: string;
  price: number;
};

type MenuContextType = {
  menuItems: MenuItem[];
  addMenuItem: (item: MenuItem) => void;
  removeMenuItem: (id: string) => void;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function MenuProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: '1',
      dishName: 'Garlic Bread',
      description: 'Fresh garlic bread',
      course: 'Starter',
      price: 45,
    },
    {
      id: '2',
      dishName: 'Tomato Soup',
      description: 'Creamy tomato soup',
      course: 'Starter',
      price: 60,
    },
    {
      id: '3',
      dishName: 'Grilled Steak',
      description: 'Served with vegetables',
      course: 'Main Course',
      price: 180,
    },
    {
      id: '4',
      dishName: 'Chicken Alfredo',
      description: 'Creamy pasta',
      course: 'Main Course',
      price: 150,
    },
    {
      id: '5',
      dishName: 'Chocolate Cake',
      description: 'Rich chocolate cake',
      course: 'Dessert',
      price: 70,
    },
    {
      id: '6',
      dishName: 'Ice Cream',
      description: 'Vanilla ice cream',
      course: 'Dessert',
      price: 50,
    },
  ]);

  const addMenuItem = (item: MenuItem) => {
    setMenuItems((currentItems) => [...currentItems, item]);
  };

  const removeMenuItem = (id: string) => {
    setMenuItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  };

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        addMenuItem,
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
    throw new Error('useMenu must be used inside MenuProvider');
  }

  return context;
}