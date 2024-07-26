import { View, Text } from "react-native";
import React from "react";
import UserIntro from "../../components/Profile/UserIntro";
import MenuList from "../../components/Profile/MenuList";

export default function profile() {
  return (
    <View
      style={{
        padding: 20,
        paddingTop: 50,
      }}
    >
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
        }}
      >
        profile
      </Text>

      {/* UserIntro */}
      <UserIntro />
      {/* MenuList  */}
      <MenuList />
    </View>
  );
}
