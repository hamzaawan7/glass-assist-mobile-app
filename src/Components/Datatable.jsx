import React from "react";
import { View } from "react-native";
import { DataTable } from "react-native-paper";

const Datatable = () => {
  return (
    <View style={styles.datatable}>
      <DataTable.Row>
        <DataTable.Cell>#</DataTable.Cell>
        <DataTable.Cell>Description</DataTable.Cell>
        <DataTable.Cell>Qty</DataTable.Cell>
        <DataTable.Cell>Cost Price</DataTable.Cell>
        <DataTable.Cell>Sell Price</DataTable.Cell>
        <DataTable.Cell>Total</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell>1</DataTable.Cell>
        <DataTable.Cell>test</DataTable.Cell>
        <DataTable.Cell>1</DataTable.Cell>
        <DataTable.Cell>20</DataTable.Cell>
        <DataTable.Cell>13</DataTable.Cell>
        <DataTable.Cell>33</DataTable.Cell>
      </DataTable.Row>
    </View>
  );
};

export default Datatable;
