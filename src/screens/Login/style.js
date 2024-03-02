import { StyleSheet } from "react-native";


export default styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    loginText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 50,
        padding: 10,
    },
    inputContainer: {
        padding: 10,
        height: 200,
        justifyContent: 'space-between',
    },
    input: {
        backgroundColor: 'white',
    },
    loginButton: {
        borderRadius: 0,
        backgroundColor: 'black',
        padding: 5,
    },
    error: {
        backgroundColor: 'red',
        padding: 10,
        textAlign: 'center',
        marginTop: 20,
        color: 'white'
    }
});
