import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useRouter } from "expo-router";

export default function BusinessListCard({ business }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={{
        padding: 10,
        margin: 10,
        borderRadius: 10,
        borderColor: "white",
        display: "flex",
        flexDirection: "row",
        gap: 20,
        alignItems: "center",
      }}
      onPress={() => router.push("/businessdetail/" + business.id)}
    >
      <Image
        source={{ uri: business.imageUrl }}
        style={{
          width: 120,
          height: 120,
          borderRadius: 20,
        }}
      />

      <View style={{ gap: 5 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {business.name}
        </Text>
        <Text style={{ color: "gray" }}>{business.address}</Text>
        <View style={{ display: "flex", gap: 5, flexDirection: "row" }}>
          <Image
            source={require("../../assets/images/star.png")}
            style={{ width: 15, height: 15 }}
          />
          <Text>4.5</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
