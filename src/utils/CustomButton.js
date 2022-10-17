import React from 'react';
import {
    Pressable,
    Text,
    StyleSheet,
} from 'react-native';

const CustomButton = (props) => {
    return (
        <Pressable
            onPress={props.onPressFunction}
            hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
            android_ripple={{ color: '#00000050' }}
            style={({ pressed }) => [
                { backgroundColor: pressed ? ' #A020F0.' : props.color },
                styles.button,
                { ...props.style }
            ]}
        >
            <Text style={styles.text}>
                {props.title}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    text: {
        color: '#ffffff',
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
        fontFamily:'TradeWinds-Regular'
    },
    button: {
        height: 50,
        alignItems: 'center',
        justifyContent:'center',
        borderRadius: 10,
        marginRight:15,
        borderTopEndRadius:10,
        borderTopRightRadius:10,
        borderBottomRightRadius:10
    },
})

export default CustomButton;