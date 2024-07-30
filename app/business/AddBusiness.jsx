import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useNavigation } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Colors } from "../../constants/Colors";
import { db, storage } from "../../Config/FirebaseConfig";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import RNPickerSelect from "react-native-picker-select";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";

export default function AddBusiness() {
  const [image, setImage] = useState(null);
  const [CategoryList, setCategoryList] = useState([]);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [about, setAbout] = useState("");
  const [contact, setContact] = useState("");
  const [website, setWebsite] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setloading] = useState(false);

  const navigation = useNavigation();
  const { user } = useUser();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Business",
      headerShown: true,
    });

    GetCategoryList();
  }, []);

  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    setImage(result?.assets[0].uri); //Bug was here
    console.log(result);
  };

  const GetCategoryList = async () => {
    setCategoryList([]);
    const q = query(collection(db, "Category"));
    const snapShot = await getDocs(q);
    snapShot.forEach((doc) => {
      setCategoryList((prev) => [
        ...prev,
        {
          label: doc.data().name,
          value: doc.data().name,
        },
      ]);
    });
  };

  const AddNewBusiness = async () => {
    setloading(true);
    const fileName = Date.now().toString() + ".jpeg";
    const response = await fetch(image);
    const blob = await response.blob();

    const Imageref = ref(storage, "Business-App/" + fileName);
    uploadBytes(Imageref, blob)
      .then((snapshot) => {
        console.log("File Uploaded...");
      })
      .then((response) => {
        getDownloadURL(Imageref).then(async (downloadUrL) => {
          console.log(downloadUrL);
          SaveBusinessDetail(downloadUrL);
        });
      });

    setloading(false);
  };

  const SaveBusinessDetail = async (imageUrl) => {
    await setDoc(doc(db, "BusinessList", Date.now().toString()), {
      name: name,
      address: address,
      about: about,
      contact: contact,
      website: website,
      category: category,
      userName: user?.fullName,
      profile: user?.imageUrl,
      imageUrl: imageUrl,
    });
    // setName("");

    setloading(false);
    ToastAndroid.show(
      "New Business Added Succesfully ...",
      ToastAndroid.BOTTOM
    );
  };

  return (
    <ScrollView
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 10,
        }}
      >
        Add New Business
      </Text>

      {/* ImagePicker */}
      <TouchableOpacity
        style={{
          marginTop: 20,
        }}
        onPress={() => onImagePick()}
      >
        {!image ? (
          <Image
            source={require("../../assets/images/camera.png")}
            style={{
              width: 100,
              height: 100,
            }}
          />
        ) : (
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 15,
            }}
            source={{ uri: image }}
          />
        )}
      </TouchableOpacity>

      <View>
        <TextInput
          value={name}
          onChangeText={(val) => setName(val)}
          placeholder="Name"
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 20,
            fontSize: 17,
            backgroundColor: "white",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
          }}
        />

        <TextInput
          value={address}
          onChangeText={(val) => setAddress(val)}
          placeholder="Address"
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 20,
            fontSize: 17,
            backgroundColor: "white",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
          }}
        />

        <TextInput
          value={contact}
          onChangeText={(val) => setContact(val)}
          placeholder="Contact"
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 20,
            fontSize: 17,
            backgroundColor: "white",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
          }}
        />

        <TextInput
          value={website}
          onChangeText={(val) => setWebsite(val)}
          placeholder="Website"
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 20,
            fontSize: 17,
            backgroundColor: "white",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
          }}
        />

        <TextInput
          value={about}
          onChangeText={(val) => setAbout(val)}
          placeholder="About"
          multiline
          numberOfLines={3}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 20,
            fontSize: 17,
            backgroundColor: "white",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            height: 100,
          }}
        />

        <View
          style={{
            borderWidth: 1,
            borderRadius: 20,
            fontSize: 17,
            backgroundColor: "white",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
          }}
        >
          <RNPickerSelect
            onValueChange={(value) => setCategory(value)}
            items={CategoryList}
          />
        </View>
      </View>

      <TouchableOpacity
        disabled={loading}
        onPress={() => AddNewBusiness()}
        style={{
          padding: 20,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 10,
          marginTop: 20,
        }}
      >
        {loading ? (
          <ActivityIndicator size={"large"} color={"purple"} />
        ) : (
          <Text
            style={{
              textAlign: "center",
              color: "white",
            }}
          >
            Add New Business
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}
