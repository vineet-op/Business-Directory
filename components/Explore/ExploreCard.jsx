import {
  View,
  Text,
  Image,
  ScrollView,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function ExploreCard({ Business }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push("/businessdetail/" + Business?.id)}
      style={{
        backgroundColor: "white",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        marginTop: 15,
        borderColor: Colors.PRIMARY,
        borderWidth: 1,
      }}
    >
      <Image
        source={{ uri: Business?.imageUrl }}
        style={{
          width: "100%",
          height: 200,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
      />

      <View
        style={{
          padding: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
          }}
        >
          {Business?.name}
        </Text>
        <Text>{Business?.address}</Text>
      </View>
    </TouchableOpacity>
  );
}
