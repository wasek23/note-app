import { SafeAreaView, Text } from 'react-native';
import { signOut } from 'firebase/auth';

import Button from '../../components/Button/Button';
import { auth } from '../../../App';

const Home = () => {
	return <SafeAreaView>
		<Text>Home</Text>

		<Button text='Sign Out' onPress={() => signOut(auth)} />
	</SafeAreaView>
}
export default Home;