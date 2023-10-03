import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const App = () => {
  const [standard, setStandard] = useState(true);
  const [inputValues, setInputValues] = useState({
    height: null,
    weight: null,
    height_inches: null,
  });
  const [bmi, setBmi] = useState(0);

  //Function to cahnge to Standard or Metric units
  const switchType = name => {
    if (name === 'metric') {
      setStandard(false);
    } else {
      setStandard(true);
    }
    setInputValues({
      height: null,
      weight: null,
      height_inches: null,
    });

    setBmi(0);
  };

  const changeInput = (e, name) => {
    setInputValues({
      ...inputValues,
      [name]: e,
    });
  };
  const bmiResult = () => {
    if (bmi > 0 && bmi <= 18.5) {
      return (
        <Text style={{ textAlign: 'center', fontSize: 22, color: '#000000' }}>
          BMI= {bmi.toFixed(2)} {'! \n'} Underweight.
        </Text>
      );
    } else if (bmi > 18.5 && bmi <= 24.9) {
      return (
        <Text style={{ textAlign: 'center', fontSize: 22, color: '#000000' }}>
          BMI = {bmi.toFixed(2)} {'! \n'} Normal Weight.
        </Text>
      );
    } else if (bmi > 24.9 && bmi <= 29.9) {
      return (
        <Text style={{ textAlign: 'center', fontSize: 22, color: '#000000' }}>
          BMI = {bmi.toFixed(2)} {'! \n'} Overweight.
        </Text>
      );
    } else if (bmi > 29.9) {
      return (
        <Text style={{ textAlign: 'center', fontSize: 22, color: '#000000' }}>
          BMI = {bmi.toFixed(2)} {'! \n'} Obese.
        </Text>
      );
    }
  };

  const { height, weight, height_inches } = inputValues;

  //Function to calulate BMI
  const calculateBMI = () => {
    let calculated = 0;
  
    if (standard) {
      const heightInches = parseFloat(height_inches);
      const ht = parseFloat(height) * 12;
      const total = ht + heightInches;
      console.log(
        ht,
        heightInches,
        'check value',
        weight,
        weight / (total * total),
        total,
      );
      calculated = weight / (total * total);
      calculated = calculated * 703;
      console.log(calculated, 'calculated');
    } else {
      const ht = height / 100;
      calculated = weight / (ht * ht);
    }

    console.log(calculated, 'bmi');
    setBmi(calculated);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          ...styles.mainContainer,
        }}>
        <View style={{ flex: 1, backgroundColor: 'white', paddingVertical: 10 }}>
          <View style={{ paddingVertical: 15, alignItems: 'center' }}>
            <Text style={{ fontSize: 30 }}>BMI Calculator</Text>
          </View>
          <View style={styles.tab}>
            <TouchableOpacity
              onPress={() => switchType('standard')}
              style={standard ? styles.activeTabStyle : styles.inactiveTabStyle}>
              <Text
                style={standard ? styles.activeTextStyle : styles.inactiveTextStyle}>
                Imperial Units
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => switchType('metric')}
              style={!standard ? styles.activeTabStyle : styles.inactiveTabStyle}>
              <Text
                style={!standard ? styles.activeTextStyle : styles.inactiveTextStyle}>
                Metric Units
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputField}>
              <TextInput
                keyboardType="number-pad"
                name="height"
                value={height}
                onChangeText={e => changeInput(e, 'height')}
                placeholder={'Height in ' + (!standard ? 'cms' : 'feet')}
                style={styles.inputStyle}
              />
              <View style={styles.inputField}>
              {standard && (
              <View style={styles.inputField}>
                <TextInput
                  keyboardType="number-pad"
                  name="height_inches"
                  value={height_inches}
                  onChangeText={e => changeInput(e, 'height_inches')}
                  placeholder={'Height in ' + (!standard ? 'cm' : 'in')}
                  style={styles.inputStyle}
                />
              </View>
            )}
              <TextInput
                keyboardType="number-pad"
                name="weight"
                value={weight}
                onChangeText={e => changeInput(e, 'weight')}
                placeholder={'Weight in ' + (!standard ? 'kgs' : 'lbs')}
                style={styles.inputStyle}
              />
            </View>
            </View>
            <TouchableOpacity style={styles.btnStyle} onPress={calculateBMI}>
              <Text style={styles.activeTextStyle}>Calculate Your BMI!</Text>
            </TouchableOpacity>
            <View style={{ paddingVertical: 15, alignItems: 'center' }}>
            {bmi > 0 && bmiResult()}
          </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

//Design Styles

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  tab: {
    flexDirection: 'row',
  },
  inactiveTabStyle: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    marginHorizontal: 4,
    paddingVertical: 10,
    marginVertical: 10,
    elevation: 5,
  },
  activeTabStyle: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    marginHorizontal: 4,
    paddingVertical: 10,
    marginVertical: 10,
    elevation: 5,
  },
  inactiveTextStyle: {
    fontSize: 18,
    color: '#000000',
  },
  activeTextStyle: {
    color: '#ffffff',
    fontSize: 18,
  },
  inputContainer: {
    marginHorizontal: 15,
    paddingHorizontal: 15,
    marginVertical: 15,
    flex: 1,
  },
  inputField: {
    marginVertical: 10,
  },
  inputStyle: {
    fontSize: 18,
    paddingLeft: 12,
    borderWidth: 0.6,
  },
  btnStyle: {
    alignItems: 'center',
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    elevation: 8,
  },
});

export default App;