import { TextInput, StyleSheet } from 'react-native';

import colors from '../../theme/colors';

const Input = ({ placeholder, secureTextEntry, onChangeText }) => {
	return <TextInput placeholder={placeholder} style={styles.input} secureTextEntry={secureTextEntry} onChangeText={onChangeText} />
}
export default Input;

const styles = StyleSheet.create({
	input: {
		height: 48,
		borderBottomWidth: .5,
		borderBottomColor: colors.gray,
		marginBottom: 25
	}
})