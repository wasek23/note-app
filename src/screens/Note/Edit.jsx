import { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { collection, doc, addDoc, getDoc, onSnapshot, query, where, updateDoc } from 'firebase/firestore';
import { showMessage } from 'react-native-flash-message';

import Input from '../../components/Form/Input';
import Radio from '../../components/Form/Radio';
import Button from '../../components/Button/Button';
import Loading from '../../components/Loading/Loading';
import { db } from '../../../App';

const colorOptions = ['red', 'green', 'blue'];

const Edit = ({ navigation, route, user }) => {
	const noteItem = route.params.item;
	const [loading, setLoading] = useState(false);
	const [title, setTitle] = useState(noteItem.title);
	const [description, setDescription] = useState(noteItem.description);
	const [color, setColor] = useState(noteItem.color);

	const onNoteUpdate = async () => {
		setLoading(true);

		try {
			await updateDoc(doc(db, 'notes', noteItem.id), {
				title,
				description,
				color
			});

			setLoading(false);
			showMessage({
				message: 'Note updated successfully!',
				type: 'success'
			})
			navigation.goBack();
		} catch (error) {
			console.log('Create Note Error -> ', error);

			setLoading(false);
		}
	}

	return <SafeAreaView style={styles.container}>
		<Input value={title} placeholder='Title' onChangeText={val => setTitle(val)} autoCapitalize='words' />
		<Input value={description} placeholder='Description' onChangeText={val => setDescription(val)} multiline={true} />

		<View style={styles.colorSelect}>
			<Text style={styles.colorLabel}>Select Theme:</Text>

			<Radio value={color} options={colorOptions} onPress={val => setColor(val)} style={styles.colorRadio} />
		</View>

		{loading ? <Loading style={styles.button} /> : <Button style={styles.button} text='Update' onPress={onNoteUpdate} />}
	</SafeAreaView>
}
export default Edit;

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