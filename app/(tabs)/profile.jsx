import { View, Text } from "react-native";
import React from "react";
import UserIntro from "../../components/Profile/UserIntro";
import MenuList from "../../components/Profile/MenuList";

export default function profile() {
  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 15,
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
