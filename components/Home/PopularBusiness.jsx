import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../../Config/FirebaseConfig";
import BusinessCard from "./BusinessCard";

export default function PopularBusiness() {
  const [PopularBusiness, setPopularBusiness] = useState([]);

  useEffect(() => {
    getPopularBusiness();
  }, []);

  const getPopularBusiness = async () => {
    setPopularBusiness([]);
    const q = query(collection(db, "BusinessList"));
    const querySnapShot = await getDocs(q);

    querySnapShot.forEach((doc) => {
      setPopularBusiness((prev) => [...prev, doc.data()]);
    });
  };

  return (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingLeft: 15,
          paddingRight: 15,
          marginTop: 6,
        }}
      >
        <Text style={{ fontSize: 20 }}>Popular Business</Text>
        <Text style={{ fontSize: 20, color: Colors.PRIMARY }}>View All</Text>
      </View>

      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={PopularBusiness}
        renderItem={({ item, index }) => (
          <BusinessCard key={index} business={item} />
        )}
      />
    </View>
  );
}
