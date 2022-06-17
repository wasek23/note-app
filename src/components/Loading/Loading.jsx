import { View, ActivityIndicator } from 'react-native';

import colors from '../../theme/colors';

const Loading = ({ style }) => {
	return <View style={style}>
		<ActivityIndicator color={colors.yellow} size='large' />
	</View>
}
export default Loading;