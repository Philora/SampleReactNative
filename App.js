import React, { Component } from 'react';
import { Text, View, StatusBar, Platform, ScrollView, TouchableHighlight, StyleSheet, ListView } from 'react-native';
import CustomInput from './CustomInput';

const inputButtons = [
    [1, 2, 3, '/'],
    [4, 5, 6, '*'],
    [7, 8, 9, '-'],
    ['Clear', 0, '=', '+'],
];
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class App extends Component {
  constructor(props) {
        super(props);

        this.initialState = {
            prev_input: 0,
            inputValue: 0,
            sel_sign: null,
            dataSource: ds.cloneWithRows([]),
            items: []
        };

        this.state = this.initialState;
    }
    add_val() {
    if (this.state.new_val !== '') {
      var newItem = this.state.new_val;
      this.state.items.push(newItem);
      this.setState({
        dataSource: ds.cloneWithRows(this.state.items),
        new_val: ''
      });
    }
  }
    
    renderRow(row_data) {
  	return (
      <TouchableHighlight
        underlayColor='#dddddd'
        onPress={() => this.deleteRow(row_data)} >
        <View
          style={{
            flex:1,
            height: 45,
            backgroundColor:'#dddddd',
            borderBottomColor: '#ededed',
            borderBottomWidth: 1,
            paddingLeft: 10, 
            paddingTop: 10 }} >
        <Text style={{ fontSize: 13, color: 'black', }}> {row_data} </Text> 
        </View>
      </TouchableHighlight>
    );
  }
  
  deleteRow(row_data) {
    for (var i = this.state.items.length - 1; i >= 0; i--) {
      if (this.state.items[i] === row_data) {
         this.state.items.splice(i, 1);
         break;
      }
    }
    this.setState({
      dataSource: ds.cloneWithRows(this.state.items)
    });
  }

    render() {
        return (
            <View style={styles.rootContainer}>
            <StatusBar
              backgroundColor="black"
              barStyle="dark-content" /> 
              <View>
              <ScrollView>
              <Text style={styles.textHeader}>Sample Task</Text>
                <View style={styles}>
                    <Text style={styles.displayText}>{this.state.inputValue}</Text>
                </View>
                <View style={styles.inputContainer}>
                    {this._renderInputButtons()}
                </View>
                <ListView
                   dataSource={this.state.dataSource}
                   renderRow={(row_data) => this.renderRow(row_data)}
                   enableEmptySections={true}/>
               </ScrollView>
              </View>
            </View>
        );
    }

    _renderInputButtons() {
        let views = inputButtons.map((row, idx) => {
            let inputRow = row.map((buttonVal, columnIdx) => {
                return <CustomInput
                            value={buttonVal}
                            highlight={this.state.sel_sign === buttonVal}
                            onPress={this._onInputButtonPressed.bind(this, buttonVal)}
                            key={'butt-' + columnIdx} />;
            });

            return <View style={styles.inputRow} key={'row-' + idx}>{inputRow}</View>;
        });

        return views;
    }

    _onInputButtonPressed(input) {
        switch (typeof input) {
            case 'number':
                return this.numberFormat(input);
            default:
                return this.stringFormat(input);
        }
    }

    numberFormat(num) {
        let inputValue = (this.state.inputValue * 10) + num;

        this.setState({
            inputValue: inputValue
        });
    }

    stringFormat(str) {
        switch (str) {
            case '/':
            case '*':
            case '+':
            case '-':
                this.setState({
                    sel_sign: str,
                    prev_input: this.state.inputValue,
                    inputValue: 0
                });
                break;
            case '=':
                let symbol = this.state.sel_sign,
                    inputValue = this.state.inputValue,
                    prev_input = this.state.prev_input;

                if (!symbol) {
                     this.setState(this.initialState);
                    return;
                }
                this.add_val()
                this.setState({
                    prev_input: 0,
                    inputValue: eval(prev_input + symbol + inputValue),
                    sel_sign: null
                });
                break;

            case 'Clear':
                this.setState(this.initialState);
                    break;

            // case 'c':
            //     this.setState({inputValue: 0});
            //     break;

        }
    }
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        marginTop: (Platform.OS == 'ios') ? 30 : 20,
    },

    displayText: {
        color: 'black',
        fontSize: 38,
        fontWeight: 'bold',
        textAlign: 'right',
        marginTop: 42,
        paddingRight: 18,
        paddingBottom: 18,
    },
    
    textHeader: { 
        padding:15, 
        fontSize:22, 
        color: '#FFF', 
        backgroundColor:'#003399'
    },

    inputContainer: {
        flex: 1,
        backgroundColor: '#123456',
        margin:5,
    },
    
    inputRow: {
        flex: 1,
        flexDirection: 'row'
    },
    
});
