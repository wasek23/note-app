import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import colors from '../../theme/colors';

const Button = ({ text, onPress, customStyle = {} }) => {
    return <TouchableOpacity style={[styles.button, customStyle]} onPress={onPress}>
        <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
}
export default Button;

const styles = StyleSheet.create({
    button: {
        width: 165,
        height: 45,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.yellow,
        borderRadius: 30,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold'
    }
})