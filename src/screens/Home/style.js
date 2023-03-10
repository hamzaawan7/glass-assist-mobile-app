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
        marginTop: 5,
        padding: 20,
    },
    dateText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    jobText: {
        marginTop: 20,
        fontSize: 20,
        paddingLeft: 15,
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
