import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function BusinessCard({ business }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push("/businessdetail/" + business?.id)}
      style={{
        marginLeft: 20,
        padding: 10,
        backgroundColor: "white",
        borderRadius: 20,
        marginTop: 10,
      }}
    >
      <Image
        source={{ uri: business?.imageUrl }}
        style={{ width: 200, height: 130, borderRadius: 20 }}
      />
      <View style={{ marginTop: 7, gap: 5 }}>
        <Text style={{ fontSize: 17, textAlign: "center", fontWeight: "bold" }}>
          {business.name}
        </Text>
        <Text style={{ fontSize: 15, textAlign: "center", paddingTop: 5 }}>
          {business.address}
        </Text>

        <View
          style={{
            marginTop: 4,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ display: "flex", gap: 5, flexDirection: "row" }}>
            <Image
              source={require("../../assets/images/star.png")}
              style={{ width: 15, height: 15 }}
            />
            <Text>4.5</Text>
          </View>
          <Text
            style={{
              backgroundColor: Colors.PRIMARY,
              padding: 5,
              borderRadius: 10,
              color: "white",
            }}
          >
            {business.category}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
