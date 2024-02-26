import * as React from 'react';
import { View, ActivityIndicator, Platform, Alert } from 'react-native'

import { DataTable, Text } from 'react-native-paper';
import { format } from 'date-fns'
import { Feather } from '@expo/vector-icons';
import Toast from 'react-native-root-toast';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';

import instance from '../api/axios';

const Document = ({ items: initialItems }) => {
  const [items, setItems] = React.useState(initialItems);

  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPageList] = React.useState([2, 5, 10]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );
  const [isLoading, setIsLoading] = React.useState(false);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const deleteDocument = React.useCallback((id) => {

    Alert.alert('Delete Action', 'Are you sure you want to delete?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          setIsLoading(true);

          try {
            const res = await instance.delete(
              `/api/booking/delete-document/${id}`,
            );

            const { type } = res.data;
            setIsLoading(false);

            if (type === 'success') {
              setItems((prev) => prev.filter((doc) => doc.id !== id))
              Toast.show('Document deleted successfully');
            }
          } catch (error) {
            setIsLoading(false);
            console.error(error.response?.data);

            const { message } = error.response?.data;

            Toast.show(message ?? 'Something went wrong.', {
              duration: Toast.durations.LONG,
              textColor: 'red'
            });
          }
        }
      },
    ]);

  }, [items]);

  const handleFilePress = React.useCallback(async (doc) => {
    try {
      const { uri, mimeType } = await FileSystem.downloadAsync(doc.full_document_path)

      if (Platform.OS !== 'ios') {
        IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
          data: uri,
          flags: 1,
          type: mimeType
        });
      }
    } catch (e) {
      console.error(e);

      Toast.show('Something went wrong!', {
        textColor: 'red'
      });
    }
  }, []);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Name</DataTable.Title>
        <DataTable.Title numeric>Date Added</DataTable.Title>
        <DataTable.Title numeric>Delete</DataTable.Title>
      </DataTable.Header>

      {items.length > 0 ? (
        items.slice(from, to).map((item) => (
          <DataTable.Row key={item.id} onPress={async () => await handleFilePress(item)}>
            <DataTable.Cell>{item.name}</DataTable.Cell>
            <DataTable.Cell numeric>{format(item.date_added, 'dd-MM-yyyy')}</DataTable.Cell>
            <DataTable.Cell numeric>
              <Feather name='trash' size={14} color='red' onPress={() => deleteDocument(item.id)} />
            </DataTable.Cell>
          </DataTable.Row>
        ))
      ) : (
        <View style={{ justifyContent: 'center', alignItems: 'center', margin: 10 }}>
          <Text>No document available</Text>
        </View>
      )}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(items.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${items.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={'Rows per page'}
      />
    </DataTable>
  );
};

export default Document;