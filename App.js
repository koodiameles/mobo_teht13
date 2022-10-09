import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, TextInput, Text, FlatList} from 'react-native';
import * as Contacts from 'expo-contacts';


export default function App() {
  const [contactList, setContactList] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync(
        {fields: [Contacts.Fields.PhoneNumbers]} 
      )
      // console.log(data)

      if (data.length > 0) {
        let list = [];
        data.map((contact) => {
          let name = contact.firstName + " "+ contact.lastName
          let number = contact.phoneNumbers[0].number
          list.push({name: name, number: number})
        })
        setContactList(list);
        console.log("list", list)
      }
    }
  }

  return (
    <>
      <View style={styles.containerHeader}>
        <Text style={styles.assignmentHeaderText}>TEHT 13 KONTAKTI</Text>
      </View>
      <View style={styles.container}>
        <View style={{display: 'flex', flexDirection: 'row', margin: 10}}>
          <View style={{flex: 1, marginHorizontal: 20}}>
            <Button color="green" title="Get contacts" onPress={getContacts} />
          </View>
        </View>
      </View>
      <View style={styles.container3}>
        <Text style={{color:"#6495ED", fontSize:24}}>CONTACT LIST</Text>
        <FlatList 
          style={styles.list}
          data={contactList}
          // keyExtractor={item => item.id.toString()} 
          renderItem={({ item }) =>
            <View style={styles.shoppingList}>
              <Text style={{color:"white", marginHorizontal: 20}}>{item.name} {item.number}</Text>
            </View>}  
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: 'black',
  },
  containerHeader: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  container3: {
    flex: 3,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  shoppingList: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'black',
    alignItems: 'center',
    margin: 10
  },
  input : {
    width:"80%", 
    borderColor: 'gray', 
    borderWidth: 1,
    margin: 5,
    color:"white",
  },
  assignmentHeaderText: {
    fontSize: 40,
    color:"#6495ED",
  }
});