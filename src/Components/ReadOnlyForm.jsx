import React, { useMemo } from "react";
import { View } from "react-native";

import { Text, List } from "react-native-paper";

import styles from '../screens/Tech/style';

export default function (booking) {
  const status = useMemo(() => [
    {
      id: 1,
      name: 'PENDING'
    },
    {
      id: 2,
      name: 'IN PROGRESS'
    },
    {
      id: 3,
      name: 'JOB COMPLETED'
    },
    {
      id: 4,
      name: 'AWAITING AUTH'
    },
    {
      id: 5,
      name: 'AWAITING PARTS'
    },
    {
      id: 6,
      name: 'PRIORITY'
    },
    {
      id: 7,
      name: 'INVOICED'
    },
    {
      id: 8,
      name: 'CANCELED'
    },
    {
      id: 9,
      name: 'QUOTE'
    },
    {
      id: 10,
      name: 'COMPLETED'
    },
  ], []);

  return (
    <View>
      <View style={{ marginHorizontal: 10 }}>
        <List.Item
          title={props => <Text {...props}>{booking.id}</Text>}
          left={props => <Text {...props} style={styles.text}>Job Number:</Text>}
        />

        <List.Item
          title={props => <Text {...props}>{booking?.datetime}</Text>}
          left={props => <Text {...props} style={styles.text}>Date/Time:</Text>}
        />

        <List.Item
          title={props => <Text {...props}>{status.find((s) => s.id == booking.status)?.name}</Text>}
          left={props => <Text {...props} style={styles.text}>Status:</Text>}
        />
      </View>

      <List.Section style={{ paddingHorizontal: 10 }}>
        <List.Accordion title="Details">
          <Text style={[styles.text, { marginTop: 10 }]}>Customer & Job Location</Text>

          <List.Item
            title="Business:"
            description={booking?.customer?.business}
          />

          <List.Item
            title="Name:"
            description={booking?.customer?.first_name}
          />

          <List.Item
            title="Job Location:"
            description={`${booking?.job_location?.address_line_1 || ''} ${booking?.job_location?.address_line_2 || ''} ${booking?.job_location?.city || ''} ${booking?.job_location?.county || ''}`}
          />

          <List.Item
            title="Postcode:"
            description={booking?.job_location?.postcode}
          />

          <List.Item
            title="Phone No:"
            description={booking?.customer?.phone}
          />

          <List.Item
            title="Mobile Phone:"
            description={booking?.customer?.mobile}
          />

          <List.Item
            title="Order Number:"
            description={booking?.order_number}
          />

          <List.Item
            title="Vehicle Reg:"
            description={booking?.vehicle?.reg_no}
          />

          <List.Item
            title="Make:"
            description={booking?.vehicle?.car_make?.name}
          />

          <List.Item
            title="Model:"
            description={booking?.vehicle?.car_model?.name}
          />

          <List.Item
            title="VIN Number:"
            description={booking?.vehicle?.vin_number}
          />

          <List.Item
            title="Mileage:"
            description={booking?.miles}
          />

          <List.Item
            title="Glass Position:" // www_lookups -> glassItemDescription
            description={booking?.miles}
          />

          <List.Item
            title="Job Cost:"
            description={booking?.job_cost}
          />

          <List.Item
            title="Work Required:"
            description={booking?.work_required}
          />

          <List.Item
            title="Additional Details"
            description={booking?.additional_details}
          />

          <List.Item
            title="Sub Contractor"
            description={booking?.sub_contractor?.name}
          />
        </List.Accordion>
      </List.Section>
    </View>
  );
}
