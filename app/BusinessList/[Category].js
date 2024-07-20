import { View, Text, FlatList } from "react-native";
import React from "react";
import { useEffect } from "react";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Config/FirebaseConfig";
import { useState } from "react";
import BusinessListCard from "../../components/BusinessList/BusinessListCard";

export default function BusinessListByCategory() {
  const navigation = useNavigation();
  const { Category } = useLocalSearchParams();

  const [BusinessList, setBusinessList] = useState([]);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: Category,
    });

    getBusinessList();
  }, [Category, navigation]);

  const getBusinessList = async () => {
    setBusinessList([]);
    setLoading(true);
    const q = query(
      collection(db, "BusinessList"),
      where("category", "==", Category)
    );
    const querySnapShot = await getDocs(q);

    querySnapShot.forEach((doc) => {
      console.log(doc.data());
      setBusinessList((prev) => [...prev, { id: doc?.id, ...doc.data() }]);
    });

    setLoading(false);
  };

  return (
    <View>
      {BusinessList.length > 0 && Loading === false ? (
        <FlatList
          data={BusinessList}
          onRefresh={getBusinessList}
          refreshing={Loading}
          renderItem={({ item, index }) => (
            <BusinessListCard key={index} business={item} />
          )}
        />
      ) : (
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 100,
          }}
        >
          <Text style={{ fontSize: 20 }}>No Business Found</Text>
        </View>
      )}
    </View>
  );
}
