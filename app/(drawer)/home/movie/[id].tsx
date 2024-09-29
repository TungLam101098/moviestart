import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View>
      <Text>Page {id}</Text>
    </View>
  );
};

export default Page;
