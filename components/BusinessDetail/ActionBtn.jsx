import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";

export default function ActionBtn({ business }) {
  const actionButtonMenu = [
    {
      id: 1,
      name: "Call",
      icon: "https://e7.pngegg.com/pngimages/432/941/png-clipart-telephone-call-dialer-android-android-text-telephone-call-thumbnail.png",
      url: "tel:" + business?.contact,
    },
    {
      id: 2,
      name: "Location",
      icon: "https://w7.pngwing.com/pngs/457/630/png-transparent-location-logo-location-computer-icons-symbol-location-miscellaneous-angle-heart.png",
      url: "https://www.googlemap.com",
    },
    {
      id: 3,
      name: "Web",
      icon: "https://e7.pngegg.com/pngimages/911/267/png-clipart-web-development-computer-icons-website-web-design-search-engine-optimization-thumbnail.png",
      url: business?.website,
    },
    {
      id: 4,
      name: "Share",
      icon: "https://image.similarpng.com/very-thumbnail/2020/11/Share-icon-with-red-color-on-transparent-background-PNG.png",
      url: "tel:" + business?.contact,
    },
  ];

  const onPresshandler = (item) => {
    if (item.name == "share") {
      return;
    }
    Linking.openURL(item.url);
  };
  return (
    <View
      style={{
        padding: 20,
        backgroundColor: "white",
      }}
    >
      <FlatList
        numColumns={4}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        data={actionButtonMenu}
        renderItem={({ index, item }) => (
          <TouchableOpacity onPress={() => onPresshandler(item)} key={index}>
            <Image
              source={{ uri: item?.icon }}
              style={{
                width: 35,
                height: 35,
              }}
            />
            <Text style={{ textAlign: "center", marginTop: 6 }}>
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
