import { View, Text, FlatList } from "react-native";
import React from "react";
import ExploreCard from "./ExploreCard";

export default function ExploreBusinessList({ BusinessList }) {
  return (
    <View>
      <FlatList
        data={BusinessList}
        renderItem={({ item, index }) => (
          <ExploreCard key={index} Business={item} />
        )}
      />

      <View
        style={{
          height: 100,
        }}
      ></View>
    </View>
  );
}
