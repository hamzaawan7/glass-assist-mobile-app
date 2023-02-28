import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { TextInput, Text, Checkbox } from "react-native-paper";

import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import TimePicker from "react-native-24h-timepicker";

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
  const [isChecked, setIsChecked] = useState("unchecked");

  const [isExpiryDateOpen, setIsExpiryDateOpen] = useState(false);
  const [expiryDate, setExpiryDate] = useState(booking?.expiryDate);

  const [time, setTime] = useState(() => {
    const time = new Date(booking?.datetime?.replace(/-/g, "/"));

    return `${time.getHours()}:${time.getMinutes()}`;
  });
  const timeRef = useRef();

  useEffect(() => {
    timeRef.current?.close();
  }, []);

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

      <TextInput
        label={"Calender"}
        style={styles.input}
        value={booking?.calendar}
        editable={false}
      />

      <TextInput
        label={"Company Name"}
        style={styles.input}
        value={booking?.company?.name}
        editable={false}
      />

      <TextInput
        label={"Ref Caller Name"}
        style={styles.input}
        value={booking?.ref_caller_name}
        editable={false}
      />

      <TextInput
        label={"Customer Order#"}
        style={styles.input}
        value={booking?.order_number}
        editable={false}
      />

      <TextInput
        label={"C Card Ref No"}
        style={styles.input}
        value={booking?.c_card_ref_number}
        editable={false}
      />

      <TextInput
        label={"GA Invoice Number"}
        style={styles.input}
        value={booking?.ga_invoice_number}
        editable={false}
      />

      <Checkbox.Item
        style={{ backgroundColor: "white" }}
        label="Job Invoiced"
        status={booking?.invoice_type === 'invoice' ? 'unchecked' : 'checked'}
        editable={false}
      />



      <Text style={styles.text}>Insurance Details</Text>
      <TextInput
        label={"Policy Number"}
        style={styles.input}
        value={booking?.policy_number}
        editable={false}
      />

      <Text
        style={styles.expBtn}
        onPress={() => setIsExpiryDateOpen(!isExpiryDateOpen)}
        editable={false}
      >
        Expiry Date {booking?.expiry_date}
      </Text>
      {isExpiryDateOpen && (
        <DateTimePicker
          mode="date"
          value={expiryDate}
          onChange={() => setIsExpiryDateOpen(false)}
        />
      )}

      <TextInput
        label={"Business/Title"}
        style={styles.input}
        value={booking?.customer?.title}
        editable={false}
      />

      <TextInput
        label={"First Name"}
        style={styles.input}
        value={booking?.customer?.first_name}
        editable={false}
      />

      <TextInput
        label={"Surname"}
        style={styles.input}
        value={booking?.customer?.surname}
        editable={false}
      />

      <TextInput
        label={"Address Line 1"}
        style={styles.input}
        value={booking?.customer?.address_1}
        editable={false}
      />

      <TextInput
        label={"Address Line 2"}
        style={styles.input}
        value={booking?.customer?.address_2}
        editable={false}
      />

      <TextInput
        label={"City"}
        style={styles.input}
        value={booking?.customer?.city}
        editable={false}
      />

      <TextInput
        label={"Postcode"}
        style={styles.input}
        value={booking?.customer?.postcode}
        editable={false}
      />

      <TextInput
        label={"Phone"}
        style={styles.input}
        value={booking?.customer?.phone}
        editable={false}
      />

      <TextInput
        label={"Mobile Phone"}
        style={styles.input}
        value={booking?.customer?.mobile}
        editable={false}
      />

      <TextInput
        label={"Email"}
        style={styles.input}
        value={booking?.customer?.email}
        editable={false}
      />

      <Checkbox.Item
        style={{ backgroundColor: "white", marginBottom: 10 }}
        label="Send Texts"
        status={booking?.customer?.send_text ? 'checked' : 'unchecked'}
        editable={false}
      />

      <Checkbox.Item
        style={{ backgroundColor: "white" }}
        label="Send Emails"
        status={booking?.customer?.send_email ? 'checked' : 'unchecked'}
        editable={false}
      />

      <Text style={styles.note}>
        Note: Checking these boxes gives permission to send texts and/or emails
        to customer. It will send texts/emails when MOT/Service is due, and a
        reminder the day before bookings.
      </Text>

      <Text style={styles.expBtn}>
        Booking Date   {booking.datetime}
      </Text>

      <Text
        style={[styles.expBtn, { marginTop: 10 }]}
        onPress={() => timeRef.current?.open()}
        disabled
      >
        {time}
      </Text>

      <TimePicker
        ref={timeRef}
        onCancel={() => timeRef.current?.close()}
        onConfirm={(hour, minute) => {
          setTime(`${hour}:${minute}`);
          timeRef.current?.close();
        }}
      />

      <Text
        style={[styles.expBtn, { marginVertical: 10 }]}
        disabled
      >
        {booking?.time_allocated}
      </Text>

      <Checkbox.Item
        style={{ backgroundColor: "white", marginVertical: 10 }}
        label="Warranty Work"
        status={booking?.warranty_work ? 'checked' : 'unchecked'}
        editable={false}
      />

      <Checkbox.Item
        style={{ backgroundColor: "white", marginVertical: 10 }}
        label="Cust Account"
        status={booking?.cust_account ? 'checked' : 'unchecked'}
        editable={false}
      />


      <Text style={styles.text}>Send on Save</Text>
      <Checkbox.Item
        style={{ backgroundColor: "white", marginVertical: 10 }}
        label="Text"
        status={booking?.send_text ? 'checked' : 'unchecked'}
        editable={false}
      />

      <Checkbox.Item
        style={{ backgroundColor: "white", marginVertical: 10 }}
        label="Emails"
        status={booking?.send_email ? 'checked' : 'unchecked'}
        editable={false}
      />

      <Text style={styles.note}>
        Note: This will send a text/email when the booking is saved
      </Text>

      <TextInput
        label={"Make/Model"}
        style={styles.input}
        value={booking?.manual_make_model}
        editable={false}
      />

      <TextInput
        label={"Mileage"}
        style={styles.input}
        value={booking?.mileage}
        editable={false}
      />

      <TextInput
        label={"Vehicle Link"}
        style={styles.input}
        editable={false}
      />

      <TextInput
        label={"Vehicle Reg"}
        style={styles.input}
        value={booking?.vehicle?.reg_no}
        editable={false}
      />

      <TextInput
        label={"VIN No."}
        style={styles.input}
        value={booking?.vehicle?.vin_number}
        editable={false}
      />

      <TextInput
        label={"Make"}
        style={styles.input}
        value={booking?.vehicle?.car_make?.name}
        editable={false}
      />

      <TextInput
        label={"Model"}
        style={styles.input}
        value={booking?.vehicle?.car_model?.name}
        editable={false}
      />

      <TextInput
        label={"Job Cost"}
        style={styles.input}
        value={booking?.job_cost}
        editable={false}
        multiline
        numberOfLines={3}
      />

      <TextInput
        label={"Work Required"}
        style={styles.input}
        value={booking?.work_required}
        editable={false}
        multiline
        numberOfLines={3}
      />

      <TextInput
        label={"Additional Details"}
        style={styles.input}
        value={booking?.part_code}
        editable={false}
        multiline
        numberOfLines={3}
      />

      <TextInput
        label={"Additional Details"}
        style={styles.input}
        value={booking?.additional_details}
        editable={false}
      />

      <TextInput
        label={"Glass Supplier"}
        style={styles.input}
        value={booking?.glassSupplier?.name}
        editable={false}
      />

      <Checkbox.Item
        style={{ backgroundColor: "white" }}
        label="CALIBRATION"
        status={booking?.calibration ? 'checked' : 'unchecked'}
        editable={false}
      />

      <TextInput
        label={"Sub Contractor"}
        style={styles.input}
        value={booking?.subContractor?.name}
        editable={false}
      />


      <Text style={styles.text}>Manual Contact Details</Text>
      <TextInput
        label={"Mobile Phone"}
        style={styles.input}
        value={booking?.manual_mobile}
        editable={false}
      />

      <TextInput
        label={"Email"}
        style={styles.input}
        value={booking?.manual_email}
        editable={false}
      />

      <TextInput
        label={"Technician"}
        style={styles.input}
        value={booking?.technician?.name}
        editable={false}
      />

      <TextInput
        label={"Miles"}
        style={styles.input}
        value={booking?.miles}
        editable={false}
      />

      <TextInput
        label={"Job Notes"}
        style={styles.input}
        value={booking?.notes}
        editable={false}
        multiline
        numberOfLines={3}
      />
    </View>
  );
};
