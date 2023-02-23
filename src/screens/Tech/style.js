import { StyleSheet } from "react-native";


export default styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        backgroundColor: 'white',
        borderBottomColor: 'lightgray',
    },
    text: {
        fontSize: 20,
        textAlign:'center',
        marginTop: 30,
        marginBottom: 30
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    picker: {
        backgroundColor:'white',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        paddingLeft:8,
    },
    expBtn: {
        backgroundColor: 'white',
        padding: 10,
        paddingLeft: 16,
        fontSize: 15,
        borderBottomWidth: 1,
    },
    note: {
        padding:10,
        paddingLeft: 16,
    },
    datatable: {
        backgroundColor: 'white'
    }



});
