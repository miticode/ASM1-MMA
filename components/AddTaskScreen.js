import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';

const AddTaskScreen = ({ route }) => {
  const { addTask } = route.params;
  const [newTitle, setNewTitle] = useState("");
  const [newSubTitle, setNewSubTitle] = useState("");
  const navigation = useNavigation();

  const handleAddTask = () => {
    if (newTitle && newSubTitle) {
      addTask(newTitle, newSubTitle);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Task</Text>
      <TextInput
        style={styles.input}
        placeholder="Task Title"
        value={newTitle}
        onChangeText={setNewTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Task Description"
        value={newSubTitle}
        onChangeText={setNewSubTitle}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddTask}>
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#6200ea",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default AddTaskScreen;