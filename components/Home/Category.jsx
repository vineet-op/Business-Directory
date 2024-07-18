import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../Config/FirebaseConfig";
import CategoryItem from "./CategoryItem";
import { useRouter } from "expo-router";

export default function Category() {
  const [CategoryList, setCategoryList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    setCategoryList([]);
    const q = query(collection(db, "Category"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setCategoryList((prev) => [...prev, doc.data()]);
    });
  };

  return (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 20,
          marginTop: 10,
        }}
      >
        <Text style={{ fontSize: 20 }}>Category</Text>
        <Text style={{ fontSize: 20, color: Colors.PRIMARY }}>View All</Text>
      </View>

      <FlatList
        showsHorizontalScrollIndicator={false}
        style={{ marginLeft: 20 }}
        horizontal={true}
        data={CategoryList}
        renderItem={({ index, item }) => (
          <CategoryItem
            key={index}
            category={item}
            onCategoryPress={(category) =>
              router.push("/BusinessList/" + item.name)
            }
          />
        )}
      />
    </View>
  );
}
