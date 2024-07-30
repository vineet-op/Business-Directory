import { View, Text, FlatList, StyleSheet } from "react-native";
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
    const q = query(
      collection(db, "BusinessList"),
      where("userName", "==", user?.fullName)
    );
    const SnapShot = await getDocs(q);

    const businesses = SnapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMyBusinessList(businesses);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {MyBusinessList.length === 0 ? (
        <View style={styles.noBusinessContainer}>
          <Text style={styles.noBusinessText}>No Business Found</Text>
        </View>
      ) : (
        <FlatList
          data={MyBusinessList}
          keyExtractor={(item) => item.id}
          onRefresh={GetUserBusiness}
          refreshing={Loading}
          renderItem={({ item }) => <ExploreCard Business={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 25,
  },
  noBusinessContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  noBusinessText: {
    fontSize: 20,
  },
});
