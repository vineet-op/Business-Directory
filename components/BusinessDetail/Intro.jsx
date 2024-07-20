import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
// import { useRouter } from "@react-navigation/native";

export default function Intro({ business }) {
  const router = useRouter();

  return (
    <View>
      <View
        style={{
          position: "absolute",
          zIndex: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          padding: 25,
          marginTop: 15,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle" size={40} color="white" />
        </TouchableOpacity>
        <Ionicons name="heart-outline" size={40} color="white" />
      </View>
      <Image
        source={{ uri: business?.imageUrl }}
        style={{
          width: "100%",
          height: 340,
        }}
      />

      <View
        style={{
          padding: 20,
          marginTop: -20,
          borderRadius: 20,
          backgroundColor: "white",
        }}
      >
        <Text
          style={{
            fontSize: 26,
            fontWeight: "bold",
          }}
        >
          {business?.name}
        </Text>
        <Text
          style={{
            fontSize: 20,
          }}
        >
          {business?.address}
        </Text>
      </View>
    </View>
  );
}
