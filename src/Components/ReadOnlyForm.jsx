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
    if (date && isValid(date)) {
      return format(date, 'dd-MM-yyyy');
    }

    return '';
  }, [booking])


  return (
    <View>
      <View style={{ marginHorizontal: 10 }}>
        <List.Item
          title={props => <Text {...props}>{booking.id}</Text>}
          left={props => <Text {...props} style={styles.text}>Job Number:</Text>}
        />

        <List.Item
          title={props => <Text {...props}>{formatDate(booking.datetime)}</Text>}
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

      {/* <List.Section style={{ paddingHorizontal: 10 }}>
        <List.Accordion title="Details">
          <List.Item
            title="Ref Caller Name"
            description={booking?.ref_caller_name}
          />

          <TextLabel
            label="Contact Number"
            value={booking?.ref_caller_contact_no}
          />

          <TextLabel
            label="Invoice Number"
            value={booking?.invoice_number}
          />
        </List.Accordion>
      </List.Section>

      <Card style={{ marginTop: 15 }}>
        <Card.Title title="Customer Details" />

        <Card.Content>
          <TextLabel
            label="Title"
            value={booking?.customer?.title}
          />
        </Card.Content>
      </Card>

      <Card style={{ marginTop: 15 }}>
        <Card.Title title="Vehicle Information" />

        <Card.Content>


          <TextLabel
            label="Year of Manf:"
            value={booking?.vehicle?.yearOfManufacture}
          />


        </Card.Content>
      </Card>

      <Card style={{ marginTop: 15 }}>
        <Card.Title title="Job/Work Details" />

        <Card.Content>


        </Card.Content>
      </Card>

      <Card style={{ marginTop: 15 }}>
        <Card.Title title="Company / Glass Assist Account Name" />

        <Card.Content>
          <TextLabel
            label="Company Name"
            value={booking?.company_name}
          />
        </Card.Content>
      </Card>

      <Card style={{ marginTop: 15 }}>
        <Card.Title title="JOB SUB CONTRACTOR DETAILS" />

        <Card.Content>


          <TextLabel
            label="Mobile Phone"
            value={booking?.sub_contractor?.phone}
          />

          <TextLabel
            label="Email"
            value={booking?.sub_contractor?.email1}
          />

          <TextLabel
            label="Job Notes"
            value={booking?.notes}
          />

          <TextLabel
            label="Eurethane Batch Number:"
            value={booking?.batch_no}
          />

          
        </Card.Content>
      </Card>

      <Card style={{ marginTop: 15 }}>
        <Card.Title title="CUSTOMER ADDRESS" />

        <Card.Content>
          <TextLabel
            label="Address Line 1"
            value={booking?.customer?.address_1}
          />

          <TextLabel
            label="Address Line 2"
            value={booking?.customer?.address_2}
          />

          <TextLabel
            label="City"
            value={booking?.customer?.city}
          />

          <TextLabel
            label="Postcode"
            value={booking?.customer?.postcode}
          />

          <TextLabel
            label="Email"
            value={booking?.customer?.email}
          />
        </Card.Content>
      </Card>

      <Card style={{ marginTop: 15 }}>
        <Card.Title title="Job Location" />

        <Card.Content>



          <TextLabel
            label="City"
            value={booking?.job_location?.city}
          />

          <TextLabel
            label="Country"
            value={booking?.job_location?.country}
          />
        </Card.Content>
      </Card> */}
    </View>
  );
};
