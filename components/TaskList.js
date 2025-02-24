import React, { useState, useEffect } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Checkbox } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';

const iniTasks = [
  { title: "Task 1", subTitle: "This is a description of Task 1", id: 1 },
  { title: "Task 2", subTitle: "This is a description of Task 2", id: 2 },
  { title: "Task 3", subTitle: "This is a description of Task 3", id: 3 },
  { title: "Task 4", subTitle: "This is a description of Task 4", id: 4 },
  { title: "Task 5", subTitle: "This is a description of Task 5", id: 5 },
];

const Items = ({ title, subTitle, id, onDelete }) => {
  const [checked, setChecked] = useState(false);
  const handleCheck = () => {
    const newChecked = !checked;
    setChecked(newChecked);

    ToastAndroid.show(
      `${title} has been ${newChecked ? 'completed' : 'uncompleted yet'}`,
      ToastAndroid.SHORT
    );
  };

  return (
    <View style={Styles.itemContainer}>
      <View>
        <Text style={Styles.itemTitle}>{title}</Text>
        <Text style={Styles.itemSubTitle}>{subTitle}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => handleCheck()}
        />
        <TouchableOpacity style={Styles.button1} onPress={() => onDelete(id, title)}>
          <Text style={Styles.buttonText1}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    loadTasks();
  }, []);

  const saveTasks = async (tasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks to AsyncStorage', error);
    }
  };

  const loadTasks = async () => {
    try {
      const tasksString = await AsyncStorage.getItem('tasks');
      if (tasksString) {
        setTasks(JSON.parse(tasksString));
      } else {
        setTasks(iniTasks);
      }
    } catch (error) {
      console.error('Failed to load tasks from AsyncStorage', error);
    }
  };

  const addTask = (title, subTitle) => {
    const newTask = {
      title,
      subTitle,
      id: tasks.length + 1,
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const deleteTask = (id, title) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    ToastAndroid.show(
      ` ${title} has been deleted`,
      ToastAndroid.SHORT
    );
  };

  const renderItem = ({ item }) => (
    <Items title={item.title} subTitle={item.subTitle} id={item.id} onDelete={deleteTask} />
  );

  return (
    <View style={Styles.container}>
      <View
        style={{
        }}
      >
        <Text style={Styles.header}>Task List</Text>
        <Button
          style={Styles.button}
          title="Add Task"
          onPress={() => navigation.navigate('AddTask', { addTask })}
        />
      </View>

      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const Styles = StyleSheet.create({
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
  itemContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemSubTitle: {
    fontSize: 14,
    color: "#666",
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
  button1: {
    backgroundColor: "green",
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
    width: "35%",
    alignItems: "center",
  },
  buttonText1: {
    color: "white",
    fontWeight: "bold",
  },
});

export default TaskList;