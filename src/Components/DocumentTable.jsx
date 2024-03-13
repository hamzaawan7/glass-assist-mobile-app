import * as React from 'react';
import { View, Platform, Alert } from 'react-native'

import { DataTable, Text } from 'react-native-paper';
import { format } from 'date-fns'
import { Feather } from '@expo/vector-icons';
import Toast from 'react-native-root-toast';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import Spinner from 'react-native-loading-spinner-overlay';

import instance from '../api/axios';

const Document = ({ items: initialItems }) => {
  const [items, setItems] = React.useState(initialItems);

  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPageList] = React.useState([5, 10, 20]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );
  const [isLoading, setIsLoading] = React.useState(false);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  React.useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

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

            const { type, message } = res.data;
            setIsLoading(false);

            if (type === 'success') {
              setItems((prev) => prev.filter((doc) => doc.id !== id))
              Toast.show(message);
            } else {
              Toast.show(message, {
                textColor: 'red'
              })
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
    setIsLoading(true);

    try {
      const { uri } = await FileSystem.downloadAsync(
        doc.full_document_path,
        FileSystem.documentDirectory + doc.filename
      );

      if (Platform.OS !== 'ios') {
        FileSystem.getContentUriAsync(uri).then(file => {
          setIsLoading(false);

          IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
            data: file,
            flags: 1,
            type: 'image/jpeg'
          });
        });
      }
    } catch (e) {
      console.error(e);
      setIsLoading(false);

      Toast.show('Something went wrong!', {
        textColor: 'red'
      });
    }
  }, []);

  return (
    <DataTable>
      <Spinner
        visible={isLoading}
      />

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