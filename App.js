import { StyleSheet, Text, View } from "react-native";
import TaskList from "./components/TaskList";
import Header from "./components/Header";
import { NavigationContainer } from "@react-navigation/native";
import AddTaskScreen from "./components/AddTaskScreen";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
    <View style={styles.container}>
      <Header />
      <Stack.Navigator initialRouteName="TaskList">
        <Stack.Screen name="TaskList" component={TaskList} options={{ headerShown: false }} />
        <Stack.Screen name="AddTask" component={AddTaskScreen} />
      </Stack.Navigator>
    </View>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
