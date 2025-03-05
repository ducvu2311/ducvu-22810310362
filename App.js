import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const SignInScreen = ({ navigation }) => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  // Hàm kiểm tra định dạng số điện thoại (VN: 10 số, bắt đầu bằng 03,05,07,08,09)
  const validatePhoneNumber = (number) => {
    const phoneRegex = /^(0[3|5|7|8|9])[0-9]{8}$/;
    return phoneRegex.test(number);
  };

  // Xử lý khi người dùng nhập
  const handlePhoneChange = (text) => {
    const formattedText = text.replace(/\D/g, "");
    setPhone(formattedText);

    if (!validatePhoneNumber(formattedText)) {
      setError("Số điện thoại không đúng định dạng");
    } else {
      setError("");
    }
  };

  // Xử lý khi nhấn nút "Tiếp tục"
  const handleSubmit = () => {
    if (!validatePhoneNumber(phone)) {
      setError("Số điện thoại không đúng định dạng. Vui lòng nhập lại.");
    } else {
      setError("");
      // Chuyển sang màn hình HomeScreen
      navigation.navigate("Home");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
      <Text style={styles.instruction}>Vui lòng nhập số điện thoại của bạn để tiếp tục</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="call-outline" size={24} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Nhập số điện thoại"
          keyboardType="numeric"
          value={phone}
          onChangeText={handlePhoneChange}
          maxLength={10} // Giới hạn 10 số
        />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </TouchableOpacity>
    </View>
  );
};

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trang chủ</Text>
      <Text style={styles.instruction}>Chào mừng bạn đến với trang chủ!</Text>
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  instruction: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    width: "100%",
    height: 50,
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default App;
