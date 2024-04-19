import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, LayoutAnimation, Platform, UIManager, TextInput, TouchableWithoutFeedback, Touchable, Pressable, Keyboard, Image, Alert } from 'react-native';
import { Defs, Path, Svg, Use } from 'react-native-svg';

// Ativar LayoutAnimation no Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function AnimatedFooter() {
    const [bottomSheet, setBottomSheet] = useState(false);
    const [taskText, setTaskText] = useState('')

    const toggleBottomSheet = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setBottomSheet(!bottomSheet);
    };

    const saveTask = async () => {
        const id = Math.random()

            AsyncStorage.setItem(`task${id}`, JSON.stringify({ task: taskText, uuid: id }))
            Alert.alert("Task salva com sucesso")
    }

    return (
        <View style={[bottomSheet ? styles.bottomSheetContainer : styles.footerContainer]}>
            {!bottomSheet &&
                <TouchableOpacity onPress={toggleBottomSheet} style={styles.buttonContainer}>
                    <Svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 32 32">
                        <Defs>
                            <Path id="carbonNewTab0" fill="#fff" d="M26 26H6V6h10V4H6a2.002 2.002 0 0 0-2 2v20a2.002 2.002 0 0 0 2 2h20a2.002 2.002 0 0 0 2-2V16h-2Z" />
                        </Defs>
                        <Use href="#carbonNewTab0" />
                        <Use href="#carbonNewTab0" />
                        <Path fill="#fff" d="M26 6V2h-2v4h-4v2h4v4h2V8h4V6z" />
                    </Svg>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20, elevation: 2 }}>Nova Tarefa</Text>
                </TouchableOpacity>
            }

            {bottomSheet &&
                <View style={{ width: '100%', alignItems: 'center', gap: 40 }}>
                    <Pressable onPress={() => { toggleBottomSheet(); setTaskText('') }} style={{ width: 100, height: 5, borderRadius: 10, backgroundColor: '#fff' }}></Pressable>
                    <View style={{ width: '100%', alignItems: 'center', gap: -15 }}>
                        <TextInput
                            style={styles.input}
                            placeholder='Digite sua task'
                            onChangeText={e => setTaskText(e)}
                        />
                        <Pressable style={{ width: '100%', height: '70%', padding: 45 }} onPress={Keyboard.dismiss}>
                            <Text style={{ fontSize: 18, color: '#fff', opacity: 0.4 }}>{taskText}</Text>
                        </Pressable>
                    </View>
                    <TouchableOpacity onPress={saveTask} style={{ width: '80%', height: 45, backgroundColor: '#fff', borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold', color: '#2270FF', fontSize: 18 }}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>

    );
}

const styles = StyleSheet.create({
    footerContainer: {
        paddingVertical: 10,
        height: 100,
        width: '100%',
        borderTopEndRadius: 50,
        borderTopStartRadius: 50,
        backgroundColor: '#2270FF',
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },

    bottomSheetContainer: {
        paddingVertical: 10,
        height: '80%', // Expandido para ocupar 80% da tela
        width: '100%',
        borderTopEndRadius: 50,
        borderTopStartRadius: 50,
        backgroundColor: '#2270FF',
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
    },

    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },

    input: {
        fontSize: 20,
        backgroundColor: '#fff',
        opacity: 0.3,
        width: '80%',
        padding: 4,
        paddingHorizontal: 10,
        borderRadius: 10
    },


});
