import { TextInput, StyleSheet } from 'react-native';

import colors from '../../theme/colors';

const Input = ({ value, placeholder, secureTextEntry, onChangeText, autoCapitalize, multiline }) => {
	return <TextInput
		value={value}
		placeholder={placeholder}
		style={styles.input}
		secureTextEntry={secureTextEntry}
		onChangeText={onChangeText}
		autoCapitalize={autoCapitalize}
		multiline={multiline}
	/>
}
export default Input;

const styles = StyleSheet.create({
	input: {
		height: 48,
		paddingHorizontal: 10,
		borderBottomWidth: .5,
		borderBottomColor: colors.gray,
		marginBottom: 25
	}
})