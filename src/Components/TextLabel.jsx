import React from 'react'

import { View } from 'react-native';
import { Text } from 'react-native-paper'

export default function TextLabel({
  label,
  value,
}) {
  return (
    <View style={{ margin: 10 }}>
      <Text variant="titleSmall">{label}</Text>

      <Text variant="bodyLarge">{value}</Text>
    </View>
  )
}
