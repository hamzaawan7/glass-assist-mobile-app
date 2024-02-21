import React from "react";
import { View } from "react-native";
import { Text, Card, List } from "react-native-paper";

import styles from '../screens/Tech/style';
import TextLabel from './TextLabel'

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
  return (
    <View>
      <View style={{ marginHorizontal: 10 }}>
        <List.Item
          title={props => <Text {...props}>{booking.id}</Text>}
          left={props => <Text {...props} style={styles.text}>Job Number:</Text>}
        />

        <List.Item
          title={props => <Text {...props}>{booking.datetime}</Text>}
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
          title={props => <Text {...props}>{booking?.date_added}</Text>}
          left={props => <Text {...props} style={styles.text}>Added On:</Text>}
        />

        <List.Item
          title={props => <Text {...props}>{booking?.updated_by?.username}</Text>}
          left={props => <Text {...props} style={styles.text}>Updated By:</Text>}
        />

        <List.Item
          title={props => <Text {...props}>{booking?.date_updated}</Text>}
          left={props => <Text {...props} style={styles.text}>Updated On:</Text>}
        />
      </View>

      <List.Section style={{ paddingHorizontal: 10 }}>
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

          <TextLabel
            label="Business"
            value={booking?.customer?.business}
          />

          <TextLabel
            label="First Name"
            value={booking?.customer?.first_name}
          />

          <TextLabel
            label="Surname"
            value={booking?.customer?.surname}
          />
        </Card.Content>
      </Card>

      <Card style={{ marginTop: 15 }}>
        <Card.Title title="Vehicle Information" />

        <Card.Content>
          <TextLabel
            label="Vehicle Reg"
            value={booking?.vehicle?.reg_no}
          />

          <TextLabel
            label="VIN No"
            value={booking?.vehicle?.vin_number}
          />

          <TextLabel
            label="Year of Manf:"
            value={booking?.vehicle?.yearOfManufacture}
          />

          <TextLabel
            label="Make"
            value={booking?.vehicle?.car_make?.name}
          />

          <TextLabel
            label="Model"
            value={booking?.vehicle?.car_model?.name}
          />
        </Card.Content>
      </Card>

      <Card style={{ marginTop: 15 }}>
        <Card.Title title="Job/Work Details" />

        <Card.Content>
          <TextLabel
            label="Work Required"
            value={booking?.work_required}
          />

          <TextLabel
            label="Additional Details"
            value={booking?.additional_details}
          />
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
        <TextLabel
          label="Customer Order No"
          value={booking?.order_number}
        />
      </Card>

      <Card style={{ marginTop: 15 }}>
        <Card.Title title="JOB SUB CONTRACTOR DETAILS" />

        <Card.Content>
          <TextLabel
            label="Sub Contractor"
            value={booking?.sub_contractor?.name}
          />

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

          <TextLabel
            label=""
            value={booking?.tech_details}
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
            label="Phone"
            value={booking?.customer?.phone}
          />

          <TextLabel
            label="Mobile Phone"
            value={booking?.customer?.mobile}
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
            label="Address Line 1"
            value={booking?.job_location?.address_1}
          />

          <TextLabel
            label="Address Line 2"
            value={booking?.job_location?.address_2}
          />


          <TextLabel
            label="City"
            value={booking?.job_location?.city}
          />

          <TextLabel
            label="Postcode"
            value={booking?.job_location?.postcode}
          />

          <TextLabel
            label="Country"
            value={booking?.job_location?.country}
          />
        </Card.Content>
      </Card>
    </View>
  );
};
