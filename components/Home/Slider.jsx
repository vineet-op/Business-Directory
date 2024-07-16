import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../../Config/FirebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";

export default function Slider() {
  const [SliderList, setSliderList] = useState([]);

  useEffect(() => {
    getSliderList();
  }, []);

  const getSliderList = async () => {
    setSliderList([]);
    const q = query(collection(db, "Slider"));
    const querySnapShot = await getDocs(q);

    querySnapShot.forEach((docs) => {
      console.log(docs.data());
      setSliderList((prev) => [...prev, docs.data()]);
    });
  };

  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          padding: 20,
        }}
      >
        Special for you
      </Text>

      <FlatList
        horizontal={true}
        data={SliderList}
        style={{ paddingLeft: 20 }}
        renderItem={({ item, index }) => (
          <Image
            source={{ uri: item.ImageUrl }}
            style={{
              width: 300,
              height: 160,
              borderRadius: 15,
              marginRight: 20,
            }}
          />
        )}
      />
    </View>
  );
}
