import { useState } from 'react';
import { SafeAreaView, View, Text, Pressable, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import Input from '../../components/Form/Input';
import Radio from '../../components/Form/Radio';
import Button from '../../components/Button/Button';
import colors from '../../theme/colors';
import { auth } from '../../../App';

const genderOptions = ['Male', 'Female'];

const SignUp = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [age, setAge] = useState('');
	const [gender, setGender] = useState('Male');

	const onSignUp = () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in 
				const user = userCredential.user;
				console.log(user);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
			});
	}

	return <SafeAreaView style={styles.container}>
		<View style={styles.signUpArea}>
			<Input placeholder='Email address' onChangeText={val => setEmail(val)} />
			<Input placeholder='Password' secureTextEntry onChangeText={val => setPassword(val)} />
			<Input placeholder='Full name' onChangeText={val => setName(val)} />
			<Input placeholder='Age' onChangeText={val => setAge(val)} />

			<View>
				<Text style={styles.genderLabel}>Select Gender:</Text>

				<Radio value={gender} options={genderOptions} onPress={val => setGender(val)} style={styles.genderRadio} />
			</View>

			<Button text='Sign Up' customStyle={styles.button} onPress={onSignUp} />
		</View>

		<View style={styles.agreeMsg}>
			<Text style={styles.agreeText}>By continuing you, accept the</Text>

			<Pressable>
				<Text style={{ ...styles.agreeText, ...styles.agreeLink }}>Terms of Use</Text>
			</Pressable>

			<Text style={styles.agreeText}>and</Text>

			<Pressable>
				<Text style={{ ...styles.agreeText, ...styles.agreeLink }}>Privacy Policy</Text>
			</Pressable>
		</View>
	</SafeAreaView>
}
export default SignUp;

const styles = StyleSheet.create({
	container: {
		flex: 1
	},

	signUpArea: {
		paddingVertical: 25,
		paddingHorizontal: 16,
	},
	genderLabel: {
		marginVertical: 15
	},
	genderRadio: {
		marginLeft: 30
	},
	button: {
		marginTop: 50
	},

	agreeMsg: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'center',
		paddingBottom: 50
	},
	agreeText: {
		fontSize: 11
	},
	agreeLink: {
		fontWeight: 'bold',
		color: colors.green,
		marginHorizontal: 5,
	}
});