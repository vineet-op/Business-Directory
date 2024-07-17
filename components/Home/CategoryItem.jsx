import { View, Text, Image } from "react-native";
import React from "react";

export default function CategoryItem({ category }) {
  return (
    <View
      style={{
        padding: 15,
        borderRadius: 99,
        marginRight: 20,
      }}
    >
      <View>
        <Image
          source={{ uri: category.icon }}
          style={{
            width: 40,
            height: 40,
          }}
        />
      </View>
      <Text style={{ fontSize: 12, textAlign: "center", marginTop: 5 }}>
        {category.name}
      </Text>
    </View>
  );
}
