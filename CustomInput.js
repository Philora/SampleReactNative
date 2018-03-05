import React, { Component } from 'react';
import { TouchableHighlight, Text, StyleSheet } from 'react-native';

export default class CustomInput extends Component {
    
    render() {
        return (
            <TouchableHighlight 
                  style={[styles.inputButton, this.props.highlight ? styles.inputButtonHighlighted :null]} 
                  underlayColor="#00CCFF"
                  onPress={this.props.onPress}>
                <Text style={styles.inputButtonText}>{this.props.value}</Text>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    inputButton: {
        flex: 1,
        margin: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2.5,
        borderColor: '#b3b3b3'
    },

    inputButtonHighlighted: {
        backgroundColor: '#123456'
    },

    inputButtonText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white'
    },
});
    