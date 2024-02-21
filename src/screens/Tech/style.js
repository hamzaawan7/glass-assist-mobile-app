import { StyleSheet } from "react-native";


export default styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    input: {
        backgroundColor: 'white',
        borderBottomColor: 'lightgray',
        marginVertical: 10,
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    picker: {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        paddingLeft: 8,
        marginVertical: 10,
    },
    expBtn: {
        backgroundColor: 'white',
        padding: 10,
        paddingLeft: 16,
        fontSize: 15,
        borderBottomWidth: 1,
    },
    note: {
        padding: 10,
        paddingLeft: 10,
    },
    datatable: {
        backgroundColor: 'white'
    }
});
