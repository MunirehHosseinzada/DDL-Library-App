import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, FlatList, SafeAreaView, Image, StatusBar } from 'react-native';
import { fetchCategories } from './apiDataSource';
import { fetchResource } from './apiDataSource';
import { CategoriesViewModel } from './ViewModels';
import { ResourceViewModel } from './ViewModels';

const App = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [elements, setElements] = useState<CategoriesViewModel[]>([]);
  const [data, setData] = useState<ResourceViewModel[]>([]);

  useEffect(() => {
    const fetchElements = async () => {
      setIsLoading(true);

      try {

        const elements = await fetchCategories();
        const data = await fetchResource();

        setElements(elements)
        setData(data)
        
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setIsLoading(false)
      }

    }

    fetchElements();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="grey" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.blackText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.bigTitle}>{data[0].title}</Text>
        <Text style={styles.blackText}>{data[0].abstract}</Text>
        <FlatList
          style={styles.list}
          data={elements}
          renderItem={({ item }) => {
            return (
              <View key={item.id} style={styles.card}>
                <Image
                  source={require("./assets/checkmark.png")}
                  style={styles.img}
                ></Image>
                <Text style={styles.titles}>{item.name}</Text>
              </View>
            )
          }
        }
        ></FlatList>
      </View>
    </SafeAreaView>
  )

}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#ebe8e8',
    flex: 1
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    backgroundColor: '#ebe8e8'
  },

  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },

  blackText: {
    color: "black",
    margin: 10
  },

  titles: {
    color: "#4d4d4d",
    fontSize: 24,
    flex: 6
  },

  list: {
    width: '90%'
  },

  img: {
    height: 45,
    width: 45,
    flex: 1
  },

  bigTitle: {
    fontSize: 40,
    color: 'black',
    marginBottom: 10
  }
});

export default App;