import React, { useCallback } from "react";
import { View } from "react-native";

import { Text, List } from "react-native-paper";
import { format, isValid } from 'date-fns'

import styles from '../screens/Tech/style';

const status = [
  {
    id: 1,
    name: 'Pending'
  },
  {
    id: 2,
    name: 'In Progress'
  },
  {
    id: 3,
    name: 'Job Completed'
  },
  {
    id: 4,
    name: 'Awaiting Auth'
  },
  {
    id: 5,
    name: 'Awaiting Parts'
  },
];

export default function (booking) {
  const formatDate = useCallback((date) => {
    const newDate = new Date(date);

    if (newDate && isValid(newDate)) {
      return format(newDate, 'dd-MM-yyyy');
    }

    return '';
  }, [booking]);

  return (
    <View>
      <View style={{ marginHorizontal: 10 }}>
        <List.Item
          title={props => <Text {...props}>{booking.id}</Text>}
          left={props => <Text {...props} style={styles.text}>Job Number:</Text>}
        />

        <List.Item
          title={props => <Text {...props}>{booking ? formatDate(booking.datetime) : ''}</Text>}
          left={props => <Text {...props} style={styles.text}>Date/Time:</Text>}
        />

        <List.Item
          title={props => <Text {...props}>{status.find((s) => s.id == booking.status)?.name}</Text>}
          left={props => <Text {...props} style={styles.text}>Status:</Text>}
        />

        <List.Item
          title={props => <Text {...props}>{booking?.added_by?.username}</Text>}
          left={props => <Text {...props} style={styles.text}>Added By:</Text>}
        />

        <List.Item
          title={props => <Text {...props}>{formatDate(booking.date_added)}</Text>}
          left={props => <Text {...props} style={styles.text}>Added On:</Text>}
        />

        <List.Item
          title={props => <Text {...props}>{booking?.updated_by?.username}</Text>}
          left={props => <Text {...props} style={styles.text}>Updated By:</Text>}
        />

        <List.Item
          title={props => <Text {...props}>{formatDate(booking?.date_updated)}</Text>}
          left={props => <Text {...props} style={styles.text}>Updated On:</Text>}
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
            description={`${booking?.job_location?.address_1 || ''} ${booking?.job_location?.address_2 || ''}`}
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
};
