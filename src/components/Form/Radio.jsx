import { View, Text, Pressable, StyleSheet } from 'react-native';

import colors from '../../theme/colors';

const Radio = ({ value, options, onPress, style }) => {
	return options.map(opt => <Pressable
		key={opt}
		style={[styles.radioEl, style]}
		onPress={() => onPress(opt)}
	>
		<View style={[styles.radioOuterCircle, opt === value && styles.selectedRadioOuterCircle]}>
			<View style={[styles.radioInnerCircle, opt === value && styles.selectedRadioInnerCircle]} />
		</View>

		<Text style={styles.radioText}>{opt}</Text>
	</Pressable>)
}
export default Radio;

const styles = StyleSheet.create({
	radioEl: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10
	},
	radioOuterCircle: {
		width: 30,
		height: 30,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: colors.lightGray,
		borderRadius: 15
	},
	selectedRadioOuterCircle: {
		borderColor: colors.orange
	},
	radioInnerCircle: {
		width: 15,
		height: 15,
		borderWidth: 1,
		borderColor: colors.lightGray,
		borderRadius: 7.5
	},
	selectedRadioInnerCircle: {
		backgroundColor: colors.orange,
		borderColor: colors.orange
	},
	radioText: {
		marginLeft: 10
	}
})