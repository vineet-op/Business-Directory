import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 150,
        }}
      >
        <Image
          style={{
            width: 250,
            height: 450,
            borderRadius: 20,
            borderColor: "black",
            borderWidth: 8,
          }}
          source={require("./../assets/images/login.png")}
        />
      </View>

      <View style={styles.subContainer}>
        <Text style={{ fontSize: 30, textAlign: "center" }}>
          Your Ultimate{" "}
          <Text style={{ color: Colors.PRIMARY }}>
            Community Business Directory App
          </Text>
        </Text>

        <Text style={{ fontSize: 15, textAlign: "center", marginTop: 20 }}>
          Find Your Favourite Business Near You and Post Your Own Business to
          your Community
        </Text>

        <TouchableOpacity style={styles.btn} onPress={onPress}>
          <Text style={{ textAlign: "center", color: "white" }}>
            Let's Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subContainer: {
    backgroundColor: "#fff",
    padding: 20,
    marginTop: -20,
  },

  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: 16,
    borderRadius: 99,
    marginTop: 20,
  },
});
