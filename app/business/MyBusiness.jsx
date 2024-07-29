import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Config/FirebaseConfig";
import ExploreCard from "../../components/Explore/ExploreCard";
import { useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";

export default function MyBusiness() {
  const { user } = useUser();
  const navigation = useNavigation();

  const [MyBusinessList, setMyBusinessList] = useState([]);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "My Business",
      headerStyle: {
        backgroundColor: Colors.PRIMARY,
      },
    });
    if (user) {
      GetUserBusiness();
    }
  }, [user]);

  const GetUserBusiness = async () => {
    setLoading(true);
    setMyBusinessList([]);
    const q = query(
      collection(db, "BusinessList"),
      where("userName", "==", user?.fullName)
    );
    const SnapShot = await getDocs(q);

    SnapShot.forEach((doc) => {
      setMyBusinessList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
    setLoading(false);
  };

  return (
    <View
      style={{
        padding: 20,
        marginTop: 25,
      }}
    >
      <Text
        style={{
          fontSize: 30,
        }}
      >
        My Business
      </Text>

      <FlatList
        data={MyBusinessList}
        onRefresh={GetUserBusiness}
        refreshing={Loading}
        renderItem={({ item, index }) => (
          <ExploreCard Business={item} key={index} />
        )}
      />
    </View>
  );
}
