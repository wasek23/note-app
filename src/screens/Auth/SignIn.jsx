import { SafeAreaView, View, Text, Image, Pressable, StyleSheet } from 'react-native';

import Input from '../../components/Form/Input';
import Button from '../../components/Button/Button';
import colors from '../../theme/colors';

const SignIn = ({ navigation }) => {
	return <SafeAreaView style={styles.container}>
		<Image source={require('../../../assets/icon.png')} style={styles.image} />
		<Text style={styles.topText}>Never forget your notes</Text>

		<View style={styles.signInArea}>
			<Input placeholder='Email address' />
			<Input placeholder='Password' secureTextEntry />

			<Button text='Sign In' customStyle={styles.button} />
		</View>

		<View style={styles.signUpMsg}>
			<Text>Don't have an account?</Text>

			<Pressable onPress={() => navigation.navigate('SignUp')}>
				<Text style={styles.goToSignUp}>Sign Up</Text>
			</Pressable>
		</View>
	</SafeAreaView>
}
export default SignIn;

const styles = StyleSheet.create({
	container: {
		flex: 1
	},

	image: {
		alignSelf: 'center',
		width: '90%',
		height: 300,
		marginBottom: 20
	},

	topText: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center'
	},

	signInArea: {
		paddingVertical: 25,
		paddingHorizontal: 16,
	},
	button: {
		marginTop: 50
	},

	signUpMsg: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'center',
		paddingBottom: 50
	},
	goToSignUp: {
		fontWeight: 'bold',
		color: colors.green,
		marginLeft: 5
	}
});