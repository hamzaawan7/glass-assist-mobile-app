import { StyleSheet } from "react-native";


export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    header: {
        backgroundColor: 'black',
        padding: 20,
    },
    headerText: {
        color: 'white',
        fontSize: 20,
    },
    dateContainer: {
        alignSelf: 'center',
        padding: 20,
    },
    companyText: {
        fontSize: 13,
        marginTop: 2,
        color: 'red',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    dateText: {
        fontSize: 20,
        marginVertical: 5,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    jobText: {
        marginTop: 15,
        fontSize: 17,
        textAlign: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    emptyText: {
        fontWeight: '600',
        fontSize: 20,
    }
});
