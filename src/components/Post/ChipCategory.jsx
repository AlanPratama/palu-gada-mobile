import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity } from 'react-native';

const ChipCategory = ({ cat }) => {
    const navigate = useNavigation();

    return (
        <TouchableOpacity
            onPress={() =>
                navigate.navigate("PostByCategory", { id: cat.id, name: cat.name })
            }
            className="bg-blue-100 rounded-full px-3.5 py-1 mr-2 justify-center items-center"
        >
            <Text className="text-[14.5px] font-semibold text-primary">
                {cat.name}
            </Text>
        </TouchableOpacity>
    )
}

export default ChipCategory