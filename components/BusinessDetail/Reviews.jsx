import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Rating } from "react-native-ratings";
import { Colors } from "../../constants/Colors";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../Config/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";

export default function Reviews({ business }) {
  const [rating, setrating] = useState(1);
  const [userInput, setUserinput] = useState();

  const { user } = useUser();

  const onSubmit = async () => {
    const docRef = doc(db, "BusinessList", business?.id);
    await updateDoc(docRef, {
      reviews: arrayUnion({
        rating: rating,
        comment: userInput,
        userName: user?.fullName,
        userImage: user?.imageUrl,
      }),
    });

    setUserinput(null);
    ToastAndroid.show("Comment Added Successfully !", ToastAndroid.BOTTOM);
  };

  return (
    <View
      style={{
        display: "flex",
        flex: 1,
        padding: 20,
        backgroundColor: "white",
      }}
    >
      <Text
        style={{
          fontSize: 20,
        }}
      >
        Reviews
      </Text>

      <View>
        <Rating
          showRating={true}
          imageSize={20}
          onFinishRating={(rating) => setrating(rating)}
          style={{ paddingVertical: 10 }}
        />

        <TextInput
          placeholder="Write your comment"
          numberOfLines={3}
          onChangeText={(value) => setUserinput(value)}
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            borderBlockColor: "gray",
            textAlignVertical: "top",
          }}
        />

        <TouchableOpacity
          disabled={!userInput}
          onPress={() => onSubmit()}
          style={{
            padding: 10,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 6,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>

      {/* Display Previous reviews */}

      <View>
        {business?.reviews?.map((item, index) => (
          <View
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 20,
              alignItems: "center",
              padding: 10,
              borderWidth: 1,
              backgroundColor: "white",
              borderRadius: 15,
              marginTop: 20,
            }}
          >
            <Image
              source={{ uri: item.userImage }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 99,
              }}
            />
            <View
              style={{
                display: "flex",
              }}
            >
              <Text>{item.userName}</Text>
              <Rating
                imageSize={20}
                startingValue={item.rating}
                style={{
                  alignItems: "flex-start",
                }}
              />
              <Text>{item.comment}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
