import * as React from 'react';
import { View } from 'react-native'

import { DataTable, Text } from 'react-native-paper';
import { format } from 'date-fns'
import { Feather } from '@expo/vector-icons';

const Document = ({ items }) => {
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Name</DataTable.Title>
        <DataTable.Title numeric>Date Added</DataTable.Title>
        <DataTable.Title numeric>Delete</DataTable.Title>
      </DataTable.Header>

      {items.length > 0 ? (
        items.slice(from, to).map((item) => (
          <DataTable.Row key={item.key}>
            <DataTable.Cell>{item.name}</DataTable.Cell>
            <DataTable.Cell numeric>{format(item.date_added, 'dd-MM-yyyy')}</DataTable.Cell>
            <DataTable.Cell numeric>
              <Feather name='trash' size={14} color='red' onPress={() => console.log('Pressed')} />
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