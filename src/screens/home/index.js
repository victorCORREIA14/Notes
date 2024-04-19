import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AnimatedFooter from "../../components/animatedFooter";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const keys = await AsyncStorage.getAllKeys(); // Busca todas as chaves
                const result = await AsyncStorage.multiGet(keys); // Busca os valores para essas chaves
                const loadedTasks = result.map(([key, value]) => {
                    const taskData = JSON.parse(value); // Transforma em objeto JavaScript
                    return { id: key, description: taskData.task, uuid: taskData.uuid }; // Extrai e nomeia os campos necessários
                });
                setTasks(loadedTasks); // Atualiza o estado com os dados carregados
            } catch (e) {
                console.error("Error fetching tasks", e);
            }
        };

        fetchTasks();
    }, []);

    const deleteTask = (e) => {
        AsyncStorage.removeItem(`task${e}`)
    }

    return (
        <View style={styles.container}>
            {setTasks &&
                tasks.map((item, index) => (
                    <View key={item.uuid} style={{ width: '80%', height: 80, borderRadius: 20, borderColor: '#2270FF', borderWidth: 3 }}>
                        <Text>{item.description}</Text>
                        <TouchableOpacity onPress={()=>deleteTask(item.uuid)}>
                            <Text>Delete</Text>
                        </TouchableOpacity>
                    </View>
                ))
            }

            {!setTasks &&
                <Text>Nenhuma tarefa disponível</Text>
            }

            <AnimatedFooter />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
