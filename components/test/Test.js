import { View, Text, Button, TextInput } from "react-native";
import React, { useState } from "react";
import uuid from "react-native-uuid";

const Test = () => {
  const [people, setPeople] = useState([
    { id: uuid.v4(), name: "Steven", age: "30" },
    { id: uuid.v4(), name: "Betsy", age: "28" },
  ]);
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");

  const addPerson = () => {
    const newPerson = { id: uuid.v4(), name: newName, age: newAge };
    setPeople([...people, newPerson]);
  };

  const removePerson = (id) => {
    setPeople(people.filter((person) => person.id !== id));
  };

  const updatePerson = (currentId) => {
    setPeople((existingPeople) => {
      const itemIndex = people.findIndex((item) => item.id === currentId);
      return [
        ...existingPeople.slice(0, itemIndex),
        {
          // spread all the other items in the object and update only the score
          ...existingPeople[itemIndex],
          name: "Janet",
          age: 34,
        },
        ...existingPeople.slice(itemIndex + 1),
      ];
    });
  };

  return (
    <View>
      <View>
        {people.map((person) => (
          <View>
            <Text>{person.name}</Text>
            <Text>{person.age}</Text>
            <View>
              <Button
                title="- Remove"
                onPress={() => removePerson(person.id)}
              />
            </View>
            <View>
              <Button title="Update" onPress={() => updatePerson(person.id)} />
            </View>
          </View>
        ))}
      </View>
      <View>
        <Text>Add person</Text>
      </View>
      <View>
        <TextInput
          label="Name"
          onChangeText={(val) => setNewName(val)}
          style={{ marginTop: 50, borderColor: "#eee", borderWidth: 1 }}
        />
      </View>
      <View>
        <TextInput
          label="Age"
          onChangeText={(val) => setNewAge(val)}
          style={{ marginTop: 50, borderColor: "#eee", borderWidth: 1 }}
        />
      </View>
      <View>
        <Button title="+ Add" onPress={() => addPerson()} />
      </View>
    </View>
  );
};

export default Test;
