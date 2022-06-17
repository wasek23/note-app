import { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { collection, doc, addDoc, getDoc, onSnapshot, query, where } from 'firebase/firestore';
import { showMessage } from 'react-native-flash-message';

import Input from '../../components/Form/Input';
import Radio from '../../components/Form/Radio';
import Button from '../../components/Button/Button';
import Loading from '../../components/Loading/Loading';
import { db } from '../../../App';

const colorOptions = ['red', 'green', 'blue'];

const Create = ({ navigation, user }) => {
	const [loading, setLoading] = useState(false);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [color, setColor] = useState('blue');

	const onNoteCreate = async () => {
		setLoading(true);

		try {
			await addDoc(collection(db, 'notes'), {
				uid: user.uid,
				title,
				description,
				color
			});

			setLoading(false);
			showMessage({
				message: 'Note created successfully!',
				type: 'success'
			})
			navigation.goBack();
		} catch (error) {
			console.log('Create Note Error -> ', error);

			setLoading(false);
		}
	}

	return <SafeAreaView style={styles.container}>
		<Input placeholder='Title' onChangeText={val => setTitle(val)} autoCapitalize='words' />
		<Input placeholder='Description' onChangeText={val => setDescription(val)} multiline={true} />

		<View style={styles.colorSelect}>
			<Text style={styles.colorLabel}>Select Theme:</Text>

			<Radio value={color} options={colorOptions} onPress={val => setColor(val)} style={styles.colorRadio} />
		</View>

		{loading ? <Loading style={styles.button} /> : <Button style={styles.button} text='Create' onPress={onNoteCreate} />}
	</SafeAreaView>
}
export default Create;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 20
	},

	colorSelect: {
		marginTop: 25
	},
	colorLabel: {
		marginBottom: 15
	},
	colorRadio: {
		// flexDirection: 'row'
	},

	button: {
		marginTop: 50
	}
});