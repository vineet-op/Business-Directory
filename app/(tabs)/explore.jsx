import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import Category from "../../components/Home/Category";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Config/FirebaseConfig";
import ExploreBusinessList from "../../components/Explore/ExploreBusinessList";

export default function explore() {
  const [BusinessList, setBusinessList] = useState([]);
  const GetBusinessByCategory = async (category) => {
    setBusinessList([]);
    const q = query(
      collection(db, "BusinessList"),
      where("category", "==", category)
    );
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      // console.log(doc.data());
      setBusinessList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
  };

  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          marginTop: 30,
          fontSize: 30,
        }}
      >
        Explore More
      </Text>
      {/* SearchBar       */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          backgroundColor: "white",
          padding: 10,
          marginTop: 10,
          marginVertical: 10,
          borderRadius: 20,
          borderWidth: 2,
          borderColor: Colors.PRIMARY,
        }}
      >
        <Ionicons name="search" size={24} color={Colors.PRIMARY} />
        <TextInput placeholder="Search here" />
      </View>
      {/* Category */}
      <Category
        explore={true}
        onCategoryselect={(category) => GetBusinessByCategory(category)}
      />

      {/* Explore BusinessLisT Componenet  */}

      <ExploreBusinessList BusinessList={BusinessList} />
    </View>
  );
}
