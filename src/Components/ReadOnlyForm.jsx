import React from "react";
import { View } from "react-native";
import { Text, Card } from "react-native-paper";

import { Picker } from "@react-native-picker/picker";

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
      <Text style={styles.text}>Job Card {booking.id}</Text>

      <View style={styles.picker}>
        <Picker
          label="Status"
          selectedValue={booking?.status}
          enabled={false}
        >
          {status.map(stat => (
            <Picker.Item label={stat.name} value={stat.id} />
          ))}
        </Picker>
      </View>

      <TextLabel
        label="Calender"
        value={booking?.calendar}
      />

      <Card style={{ paddingHorizontal: 10 }}>
        <TextLabel
          label="Ref Caller Name"
          value={booking?.ref_caller_name}
        />

        <TextLabel
          label="Contact Number"
          value={booking?.ref_caller_contact_no}
        />

        <TextLabel
          label="Invoice Number"
          value={booking?.invoice_number}
        />
      </Card>

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
