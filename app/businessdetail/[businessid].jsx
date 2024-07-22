import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Config/FirebaseConfig";
import { Colors } from "../../constants/Colors";
import Intro from "../../components/BusinessDetail/Intro";
import ActionBtn from "../../components/BusinessDetail/ActionBtn";
import About from "../../components/BusinessDetail/About";
import Reviews from "../../components/BusinessDetail/Reviews";

export default function BusinessDetail() {
  const { businessid } = useLocalSearchParams();

  const [BusinessDetail, setBusinessDetail] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    getBusinessDetailById();
  }, []);

  //Get Details By Id
  const getBusinessDetailById = async () => {
    // setBusinessDetail([]);
    setloading(true);
    const docRef = doc(db, "BusinessList", businessid);
    const docSnap = await getDoc(docRef);
    setBusinessDetail({ id: docSnap.id, ...docSnap.data() });
    console.log("This is Business ", BusinessDetail);
    setloading(false);
  };

  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator
          style={{ marginTop: "70%" }}
          size={"large"}
          color={Colors.PRIMARY}
        />
      ) : (
        <View>
          {/* Intro */}
          <Intro business={BusinessDetail} />
          {/* //Action Buttons */}
          <ActionBtn business={BusinessDetail} />
          {/* About US */}
          <About business={BusinessDetail} />
          {/* Ratings */}
          <Reviews business={BusinessDetail} />
        </View>
      )}
    </ScrollView>
  );
}
