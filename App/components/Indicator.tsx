import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';


type IndicatorProps = {
  color: 'greenpoint' | 'yellowpoint' | 'purplepoint' | 'redpoint' | 'bluepoint';
  status?: String;
}

const Indicator: React.FC<IndicatorProps> = ({ color, status }) => {
  shadowCol = color + "_shadow";
  textColor = color + "_status";
  return (
    <View style={styles.indicatorContainer}>
      <View style={[styles.indicatorPoint, styles[color] as StyleProp<ViewStyle>]} />
      <View style={[styles[shadowCol]]} />
      
      {/* <View style={[styles.indicatorPoint, styles[color] as StyleProp<ViewStyle>]}>
        <View style={[styles[shadowCol], styles[color] as StyleProp<ViewStyle>]} />  
      </View> */}
      
      {status && <Text style={styles[textColor]}>{status}</Text>}
    </View>

  );
}


const styles = StyleSheet.create({
  indicatorContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center', 
    marginVertical: 50,
  },
  indicatorPoint: {
    borderRadius: 100,
    backgroundColor: 'white',
    shadowRadius: 8,
  },
  greenpoint: {
    height: 5,
    width: 50,
    backgroundColor: '#00ff08',
    shadowColor: '#ABFF77',
    shadowOffset: { width: 10, height: 20 }, 
    shadowOpacity: 1,
    shadowRadius: 100,
    borderRadius: 10,
    elevation: 2,
    zIndex: 0,
  },
  greenpoint_shadow: {
    height: 3,
    width: 50,
    marginTop: -4,
    borderRadius: 10,
    backgroundColor: '#ABFF77',
    shadowColor: '#63ff68',
    shadowOffset: { width: -10, height: -20 }, 
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 20,
    zIndex: 2,
  },
  yellowpoint: {
    height: 5,
    width: 50,
    backgroundColor: '#ffb200',
    shadowColor: '#ffc642',
    shadowOffset: { width: 10, height: 20 }, 
    shadowOpacity: 1,
    shadowRadius: 100,
    borderRadius: 10,
    elevation: 2,
    zIndex: 0,
  },
  yellowpoint_shadow: {
    height: 3,
    width: 50,
    marginTop: -4,
    borderRadius: 10,
    backgroundColor: '#ffe100',
    shadowColor: '#ffdd63',
    shadowOffset: { width: -10, height: -20 }, 
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 20,
    zIndex: 2,
  },
  purplepoint: {
    height: 5,
    width: 50,
    backgroundColor: '#bb00ff',
    shadowColor: '#d477ff',
    shadowOffset: { width: 10, height: 20 }, 
    shadowOpacity: 1,
    shadowRadius: 100,
    borderRadius: 10,
    elevation: 2,
    zIndex: 0,
  },
  purplepoint_shadow: {
    height: 3,
    width: 50,
    marginTop: -4,
    borderRadius: 10,
    backgroundColor: '#d477ff',
    shadowColor: '#d063ff',
    shadowOffset: { width: -10, height: -20 }, 
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 20,
    zIndex: 2,
  },
  redpoint: {
    height: 5,
    width: 50,
    backgroundColor: '#ff0051',
    shadowColor: '#ff7792',
    shadowOffset: { width: 10, height: 20 }, 
    shadowOpacity: 1,
    shadowRadius: 100,
    borderRadius: 10,
    elevation: 2,
    zIndex: 0,
  },
  redpoint_shadow: {
    height: 3,
    width: 50,
    marginTop: -4,
    borderRadius: 10,
    backgroundColor: '#ff7792',
    shadowColor: '#ff6363',
    shadowOffset: { width: -10, height: -20 }, 
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 20,
    zIndex: 2,
  },
  bluepoint: {
    height: 5,
    width: 50,
    backgroundColor: '#00ccff',
    shadowColor: '#77fdff',
    shadowOffset: { width: 10, height: 20 }, 
    shadowOpacity: 1,
    shadowRadius: 100,
    borderRadius: 10,
    elevation: 2,
    zIndex: 0,
  },
  bluepoint_shadow: {
    height: 3,
    width: 50,
    marginTop: -4,
    borderRadius: 10,
    backgroundColor: '#77fdff',
    shadowColor: '#63edff',
    shadowOffset: { width: -10, height: -20 }, 
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 20,
    zIndex: 2,
  },

  greenpoint_status: {
    marginTop: 10,
    color: '#ABFF77',
    shadowColor: 'white',
    elevation:20,
    fontFamily: 'sans-serif',
  },
  yellowpoint_status: {
    marginTop: 10,
    color: '#F5D800',
    shadowColor: 'white',
    elevation:20,
    fontFamily: 'sans-serif',
  },
  purplepoint_status: {
    marginTop: 10,
    color: '#d063ff',
    shadowColor: 'white',
    elevation:20,
    fontFamily: 'sans-serif',
  },
  redpoint_status: {
    marginTop: 10,
    color: '#FF4878',
    shadowColor: 'white',
    elevation:20,
    fontFamily: 'sans-serif',
  },
  bluepoint_status: {
    marginTop: 5,
    color: '#48F9FF',
    shadowColor: 'white',
    elevation:20,
    fontFamily: 'sans-serif',
  },
});

export default Indicator;