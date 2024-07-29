import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../Config/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";

export default function Intro({ business }) {
  const router = useRouter();

  const { user } = useUser();

  const onDelete = () => {
    Alert.alert(
      "Are you sure",
      "You want to Delete this Business ?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => DeleteBusiness(),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const DeleteBusiness = async () => {
    console.log("Delete Business");
    await deleteDoc(doc(db, "BusinessList", business?.id));
    router.back();
    ToastAndroid.show("Business Deleted Succesfully", ToastAndroid.LONG);
  };

  return (
    <View>
      <View
        style={{
          position: "absolute",
          zIndex: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          padding: 25,
          marginTop: 15,
          width: "100%",
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle" size={40} color="white" />
        </TouchableOpacity>
        <Ionicons name="heart-outline" size={40} color="white" />
      </View>
      <Image
        source={{ uri: business?.imageUrl }}
        style={{
          width: "100%",
          height: 340,
        }}
      />

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 20,
          marginTop: -30,
          borderRadius: 20,
          // alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            padding: 20,
            marginTop: -20,
            borderRadius: 20,
            backgroundColor: "white",
          }}
        >
          <Text
            style={{
              fontSize: 26,
              fontWeight: "bold",
            }}
          >
            {business?.name}
          </Text>
          <Text
            style={{
              fontSize: 20,
            }}
          >
            {business?.address}
          </Text>
        </View>
        {user?.fullName == business?.userName && (
          <TouchableOpacity onPress={onDelete}>
            <Ionicons name="trash" size={24} color="red" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
