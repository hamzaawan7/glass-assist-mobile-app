import React, {useState} from "react";
import { View } from "react-native";
import { TextInput, Text, Checkbox, Button, Divider } from "react-native-paper";
import Datatable from "./Datatable";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from '../screens/Tech/style';

const ReadOnlyForm = () => {
  const [isChecked, setIsChecked] = useState("unchecked");
  const [date, setDate] = useState(new Date(Date.now()));
  const [open, setOpen] = useState(false);

  return (
    <View>
      <Text style={styles.text}>Job Card 45597</Text>
      <View style={styles.picker}>
        <Picker label="Status">
          <Picker.Item label="Pending" value="pending" />
          <Picker.Item label="In Progress" value="in-progress" />
          <Picker.Item label="Job Completed" value="job-completed" />
          <Picker.Item label="Awaiting Auth" value="awaiting-auth" />
        </Picker>
      </View>
      <TextInput label={"Calender"} style={styles.input} />
      <TextInput label={"customer link"} style={styles.input} />
      <View style={styles.picker}>
        <Picker>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
      </View>
      <TextInput label={"Company Name"} style={styles.input} />
      <TextInput label={"Ref Caller Name"} style={styles.input} />
      <TextInput label={"Cust Order No"} style={styles.input} />
      <TextInput label={"C Card Ref No"} style={styles.input} />
      <TextInput label={"GA Invoice Number"} style={styles.input} />
      <TextInput label={"C Card Ref No"} style={styles.input} />
      <Checkbox.Item
        style={{ backgroundColor: "white" }}
        label="Job Invoiced"
        status={isChecked}
        onPress={() =>
          setIsChecked(isChecked === "checked" ? "unchecked" : "checked")
        }
      ></Checkbox.Item>
      <Text style={styles.text}>Insurance Details</Text>
      <TextInput label={"Policy Number"} style={styles.input} />
      <Text style={styles.expBtn} onPress={() => setOpen(!open)}>
        Expiry Date
      </Text>
      {open && (
        <DateTimePicker
          mode="date"
          value={date}
          onChange={() => setOpen(false)}
        />
      )}
      <TextInput label={"Business/Title"} style={styles.input} />
      <TextInput label={"First Name"} style={styles.input} />
      <TextInput label={"Surname"} style={styles.input} />
      <TextInput label={"Address Line 1"} style={styles.input} />
      <TextInput label={"Address Line 2"} style={styles.input} />
      <TextInput label={"City"} style={styles.input} />
      <TextInput label={"Postcode"} style={styles.input} />
      <TextInput label={"Phone"} style={styles.input} />
      <TextInput label={"Mobile Phone"} style={styles.input} />
      <TextInput label={"Email"} style={styles.input} />
      <Checkbox.Item
        style={{ backgroundColor: "white" }}
        label="Send Texts"
        status={isChecked}
        onPress={() =>
          setIsChecked(isChecked === "checked" ? "unchecked" : "checked")
        }
      ></Checkbox.Item>
      <Checkbox.Item
        style={{ backgroundColor: "white" }}
        label="Send Emails"
        status={isChecked}
        onPress={() =>
          setIsChecked(isChecked === "checked" ? "unchecked" : "checked")
        }
      ></Checkbox.Item>
      <Text style={styles.note}>
        Note: Checking these boxes gives permission to send texts and/or emails
        to customer. It will send texts/emails when MOT/Service is due, and a
        reminder the day before bookings.
      </Text>
      <Text style={styles.expBtn} onPress={() => setOpen(!open)}>
        Booking Date *
      </Text>

      <TextInput label={"Booking Time"} style={styles.input} />
      <TextInput label={"Time Allocated"} style={styles.input} />

      <Checkbox.Item
        style={{ backgroundColor: "white" }}
        label="Warranty Work"
        status={isChecked}
        onPress={() =>
          setIsChecked(isChecked === "checked" ? "unchecked" : "checked")
        }
      ></Checkbox.Item>
      <Checkbox.Item
        style={{ backgroundColor: "white" }}
        label="Cust Account"
        status={isChecked}
        onPress={() =>
          setIsChecked(isChecked === "checked" ? "unchecked" : "checked")
        }
      ></Checkbox.Item>

      <View>
        <Text style={styles.text}>Send on Save</Text>
        <Checkbox.Item
          style={{ backgroundColor: "white" }}
          label="Text"
          status={isChecked}
          onPress={() =>
            setIsChecked(isChecked === "checked" ? "unchecked" : "checked")
          }
        ></Checkbox.Item>
        <Checkbox.Item
          style={{ backgroundColor: "white" }}
          label="Emails"
          status={isChecked}
          onPress={() =>
            setIsChecked(isChecked === "checked" ? "unchecked" : "checked")
          }
        ></Checkbox.Item>
        <Text style={styles.note}>
          Note: This will send a text/email when the booking is saved
        </Text>
      </View>

      <TextInput label={"Make/Model"} style={styles.input} />
      <TextInput label={"Mileage"} style={styles.input} />
      <TextInput label={"Vehicle Link"} style={styles.input} />
      <TextInput label={"Vehicle Reg"} style={styles.input} />
      <TextInput label={"VIN No."} style={styles.input} />
      <TextInput label={"Make"} style={styles.input} />
      <TextInput label={"Model"} style={styles.input} />

      <TextInput label={"Job Cost"} style={styles.input} />
      <TextInput label={"Work Required"} style={styles.input} />
      <TextInput label={"Additional Details"} style={styles.input} />
      <TextInput label={"Make/Model"} style={styles.input} />

      <View style={styles.picker}>
        <Picker>
          <Picker.Item label="Glass Supplier" value="" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
      </View>

      <Checkbox.Item
        style={{ backgroundColor: "white" }}
        label="CALIBRATION"
        status={isChecked}
        onPress={() =>
          setIsChecked(isChecked === "checked" ? "unchecked" : "checked")
        }
      ></Checkbox.Item>

      <TextInput label={"Part Code"} style={styles.input} />
      <TextInput label={"Sub Contractor"} style={styles.input} />

      <Text style={styles.text}>Manual Contact Details</Text>

      <TextInput label={"Mobile Phone"} style={styles.input} />
      <TextInput label={"Email"} style={styles.input} />

      <TextInput label={"Sub Contractor"} style={styles.input} />
      <TextInput label={"Sub Contractor"} style={styles.input} />

      <View style={styles.picker}>
        <Picker>
          <Picker.Item label="Technician" value="" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
      </View>

      <TextInput label={"Miles"} style={styles.input} />
      <TextInput label={"Job Notes"} style={styles.input} />
      <TextInput label={"Eurethane Batch Number"} style={styles.input} />

      <Text style={styles.text}>SERVICE INVOICE / QUOTE SECTION</Text>
      <Text style={{ paddingLeft: 16, fontSize: 15 }}>Job Cart Items</Text>

      <View>
        <Datatable />
      </View>
    </View>
  );
};

export default ReadOnlyForm;
