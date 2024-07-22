import { View, Text } from "react-native";
import React from "react";

export default function About({ business }) {
  return (
    <View
      style={{
        display: "flex",
        flex: 1,
        padding: 20,
        backgroundColor: "white",
        gap: 10,
        height: "100%",
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        Abouts
      </Text>
      <Text>{business?.about}</Text>
    </View>
  );
}
