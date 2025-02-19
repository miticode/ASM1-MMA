import React, { useState } from "react";
import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { Checkbox } from "react-native-paper";

const iniTasks = [
  { title: "Task 1", subTitle: "This is a description of Task 1", id: 1 },
  { title: "Task 2", subTitle: "This is a description of Task 2", id: 2 },
  { title: "Task 3", subTitle: "This is a description of Task 3", id: 3 },
  { title: "Task 4", subTitle: "This is a description of Task 4", id: 4 },
  { title: "Task 5", subTitle: "This is a description of Task 5", id: 5 },
];

const Items = ({ title, subTitle ,id,onDelete}) => {
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
      <View style={{ flexDirection: "row",alignItems:"center", justifyContent: "center" }}>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => handleCheck()}
        />
        <TouchableOpacity style={Styles.button1} onPress={()=> onDelete(id,title)} >
            <Text style={Styles.buttonText1}>Delete</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

const TaskList = () => {
  const [tasks, setTasks] = useState(iniTasks);
  const [modal, setModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSubTitle, setNewSubTitle] = useState("");
  
  const addTask = () => {
    if (newSubTitle && newTitle) {
      const newTask = {
        title: newTitle,
        subTitle: newSubTitle,
        id: tasks.length + 1,
      };
      setTasks([...tasks, newTask]);
      setNewTitle("");
      setNewSubTitle("");
      setModal(false);
    }
  };
  const deleteTask = (id,title) => {
    setTasks(tasks.filter(task=>task.id !== id));
    ToastAndroid.show(
      ` ${title} has been deleted`, 
      ToastAndroid.SHORT
    );
  };
  const renderItem = ({ item }) => (
    <Items title={item.title} subTitle={item.subTitle} id={item.id} onDelete={deleteTask}  />
  );

  return (
    <View style={Styles.container}>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={Styles.header}>Task List</Text>
        <Button
        style={Styles.button}
          title="Add Task"
          onPress={() => {
            setModal(true);
          }}
        />
      </View>

      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => setModal(false)}
      >
        <View style={Styles.modalView}>
          <Text style={Styles.modalText}>Add New Task</Text>
          <TextInput
            style={Styles.input}
            placeholder="Task Title"
            value={newTitle}
            onChangeText={setNewTitle}
          />
          <TextInput
            style={Styles.input}
            placeholder="Task Description"
            value={newSubTitle}
            onChangeText={setNewSubTitle}
          />
          <TouchableOpacity style={Styles.button} onPress={addTask}>
            <Text style={Styles.buttonText}>Add Task</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.button}
            onPress={() => setModal(false)}
          >
            <Text style={Styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  modalView: {
    marginTop: 200,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
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
  button1: {
    backgroundColor: "red",
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
