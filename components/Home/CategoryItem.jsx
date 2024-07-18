import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

export default function CategoryItem({ category, onCategoryPress }) {
  return (
    <TouchableOpacity
      onPress={() => onCategoryPress(category)}
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
    </TouchableOpacity>
  );
}
