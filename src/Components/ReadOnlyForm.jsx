import React, { useMemo } from "react";
import { View } from "react-native";

import { Text, List } from "react-native-paper";

import styles from '../screens/Tech/style';
import { format } from "date-fns";

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
          title={props => <Text {...props}>{booking?.datetime ? format(booking.datetime.split(' ')[0], 'dd/MM/yyyy') : null}</Text>}
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
            descriptionNumberOfLines={10}
          />

          <List.Item
            title="Name:"
            description={booking?.customer?.first_name}
            descriptionNumberOfLines={10}
          />

          <List.Item
            title="Job Location:"
            description={`${booking?.job_location?.address_line_1 || ''} ${booking?.job_location?.address_line_2 || ''} ${booking?.job_location?.city || ''} ${booking?.job_location?.county || ''}`}
            descriptionNumberOfLines={10}
          />

          <List.Item
            title="Postcode:"
            description={booking?.job_location?.postcode}
            descriptionNumberOfLines={10}
          />

          <List.Item
            title="Phone No:"
            description={booking?.customer?.phone}
            descriptionNumberOfLines={10}
          />

          <List.Item
            title="Mobile Phone:"
            description={booking?.customer?.mobile}
            descriptionNumberOfLines={10}
          />

          <List.Item
            title="Order Number:"
            description={booking?.order_number}
            descriptionNumberOfLines={10}
          />

          <List.Item
            title="Vehicle Reg:"
            description={booking?.vehicle?.reg_no}
            descriptionNumberOfLines={10}
          />

          <List.Item
            title="Make:"
            description={booking?.vehicle?.car_make?.name}
            descriptionNumberOfLines={10}
          />

          <List.Item
            title="Model:"
            description={booking?.vehicle?.car_model?.name}
            descriptionNumberOfLines={10}
          />

          <List.Item
            title="Mileage:"
            description={booking?.miles}
            descriptionNumberOfLines={10}
          />

          <List.Item
            title="Glass Position:" // www_lookups -> glassItemDescription
            description={booking?.miles}
            descriptionNumberOfLines={10}
          />

          <List.Item
            title="Job Cost:"
            description={booking?.job_cost}
            descriptionNumberOfLines={10}
          />

          <List.Item
            title="Work Required:"
            description={booking?.work_required}
            descriptionNumberOfLines={10}
          />

          <List.Item
            title="Additional Details"
            description={booking?.additional_details}
            descriptionNumberOfLines={10}
          />

          <List.Item
            title="Sub Contractor"
            description={booking?.sub_contractor?.name}
            descriptionNumberOfLines={10}
          />
        </List.Accordion>
      </List.Section>
    </View>
  );
}
