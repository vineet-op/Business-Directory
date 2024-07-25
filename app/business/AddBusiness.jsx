import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Colors } from "../../constants/Colors";

export default function AddBusiness() {
  const [image, setimage] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Business",
      headerShown: true,
    });
  }, []);

  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    console.log(result);
    setimage(result?.assets?.uri[0]);
  };

  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 25,
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
            style={{
              width: 100,
              height: 100,
            }}
            source={require("../../assets/images/camera.png")}
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
          placeholder="Name"
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 20,
            fontSize: 17,
            backgroundColor: "white",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            // height: 100,
          }}
        />

        <TextInput
          placeholder="Address"
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 20,
            fontSize: 17,
            backgroundColor: "white",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            // height: 100,
          }}
        />

        <TextInput
          placeholder="Contact"
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 20,
            fontSize: 17,
            backgroundColor: "white",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            // height: 100,
          }}
        />

        <TextInput
          placeholder="Email"
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 20,
            fontSize: 17,
            backgroundColor: "white",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            // height: 100,
          }}
        />

        <TextInput
          multiline
          numberOfLines={3}
          placeholder="About"
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
      </View>
    </View>
  );
}
