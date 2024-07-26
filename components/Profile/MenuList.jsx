import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function MenuList() {
  const menuList = [
    {
      id: 1,
      name: "Add Business",
      icon: require("../../assets/images/add-button.png"),
      path: "/business/AddBusiness",
    },
    {
      id: 2,
      name: "My Business",
      icon: require("../../assets/images/online-shop.png"),
      path: "",
    },
    {
      id: 3,
      name: "Share",
      icon: require("../../assets/images/next.png"),
      path: "",
    },
    {
      id: 4,
      name: "Logout",
      icon: require("../../assets/images/logout.png"),
      path: "",
    },
  ];

  const router = useRouter();

  const onMenuClick = (item) => {
    router.navigate(item?.path);
  };

  return (
    <View
      style={{
        marginTop: 50,
      }}
    >
      <FlatList
        data={menuList}
        numColumns={2}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            onPress={() => onMenuClick(item)}
            // onPress={() => router.push(item?.path)}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
              padding: 10,
              borderRadius: 15,
              borderWidth: 2,
              margin: 10,
              borderColor: "white",
            }}
          >
            <Image
              source={item.icon}
              style={{
                width: 50,
                height: 50,
              }}
            />
            <Text
              style={{
                fontSize: 20,
                flex: 1,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      <Text
        style={{
          textAlign: "center",
          marginTop: 50,
          color: "gray",
        }}
      >
        Developed By Vineet Jadhav @2024
      </Text>
    </View>
  );
}
