import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { styles } from 'src/styles/main'




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
          {/*Aqui vai o icone de conversas */}
          <Text style={ styles.buttonLabel}>Conversas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          {/*Aqui vai o icone de Contatos */}
          <Text style={ styles.buttonLabel}>Contatos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          {/*Aqui vai o icone de Grupos */}
          <Text style={styles.buttonLabel}>Grupos</Text>
        </TouchableOpacity>
       </View>
      </View>
    )
  }
}


export default Home