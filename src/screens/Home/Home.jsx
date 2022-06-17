import { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Pressable, StyleSheet, FlatList } from 'react-native';
import { signOut } from 'firebase/auth';
import { AntDesign } from '@expo/vector-icons';
import { collection, doc, deleteDoc, onSnapshot, query, where } from 'firebase/firestore';

import Button from '../../components/Button/Button';
import { auth, db } from '../../../App';
import colors from '../../theme/colors';

const Home = ({ navigation, user }) => {
	const [notes, setNotes] = useState([]);

	// Get notes from database
	useEffect(() => {
		const q = query(collection(db, 'notes'), where('uid', '==', user.uid));

		const notesListenerSubscription = onSnapshot(q, querySnapshot => {
			const list = [];

			querySnapshot.forEach(doc => list.push({ ...doc.data(), id: doc.id }));

			setNotes(list);
		});

		return notesListenerSubscription;
	}, []);

	// Render note item
	const renderNoteItem = ({ item }) => {
		const { id, title, description, color } = item;

		return <Pressable
			style={[styles.noteItem, { backgroundColor: color }]}
			onPress={() => navigation.navigate('EditNote', { item })}
		>
			<AntDesign style={styles.noteDelete} name='delete' size={20} color={colors.white} onPress={() => {
				deleteDoc(doc(db, 'notes', id));
			}} />

			<Text style={styles.noteTitle}>{title}</Text>
			<Text style={styles.noteDescription}>{description}</Text>
		</Pressable>
	}

	return <SafeAreaView style={styles.container}>
		<View style={styles.noteTop}>
			<Text>My Notes</Text>
			<Pressable onPress={() => navigation.navigate('CreateNote')}>
				<AntDesign name='pluscircleo' size={24} color='black' />
			</Pressable>
		</View>

		<FlatList data={notes} renderItem={renderNoteItem} contentContainerStyle={styles.noteList} />

		<Button text='Sign Out' onPress={() => signOut(auth)} keyExtractor={item => item.title} />
	</SafeAreaView>
}
export default Home;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	noteTop: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 20
	},
	noteList: {
		padding: 20,
	},
	noteItem: {
		color: colors.white,
		padding: 15,
		marginBottom: 20,
		borderRadius: 16,
	},
	noteDelete: {
		position: 'absolute',
		alignSelf: 'flex-end',
		padding: 15,
		zIndex: 4
	},
	noteTitle: {
		fontSize: 24,
		fontWeight: 'bold',
		color: colors.white,
		marginBottom: 16,
	},
	noteDescription: {
		fontSize: 18,
		color: colors.white,
	}
});