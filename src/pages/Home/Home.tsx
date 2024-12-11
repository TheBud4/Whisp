import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { styles } from 'src/styles/main'
import { Ionicons } from '@expo/vector-icons';

export class Home extends Component {
  
  
  render() {
    return (
      <View style={styles.container}>
        { /*Conteudo Principal*/}
        <View style={styles.content}>
          <Text style={styles.placeholderText}>Aqui onde vai ficar o conteudo Principal</Text>
        </View>
       
       {/*BOTÕES FLUTUATES*/}

       <View style={styles.floatingButtons}>
        <TouchableOpacity style={styles.button}>
        <Ionicons name="chatbubble-ellipses-outline" size={24} color="#007bff" />
          <Text style={ styles.buttonLabel}>Conversas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
        <Ionicons name="people-outline" size={24} color="#007bff" />
          <Text style={ styles.buttonLabel}>Contatos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
        <Ionicons name="people-circle-outline" size={24} color="#007bff" />
          <Text style={styles.buttonLabel}>Grupos</Text>
        </TouchableOpacity>
       </View>
      </View>
    )
  }
}


export default Home