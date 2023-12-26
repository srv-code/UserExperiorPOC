import React from 'react';
import { Alert, FlatList, StyleProp, ViewProps } from 'react-native';
import { Button } from 'react-native-paper';
import UserExperior from 'react-native-userexperior';

import styles from './styles';

interface IProps {
  style: StyleProp<ViewProps>;
  elementRef?: React.Ref<any> | null;
}

interface IEvent {
  name: string;
  label?: string;
  props?: object | string;
  extra?: object;
  passRef?: boolean;
}

const allEvents: IEvent[] = [
  { name: 'startRecording', props: 'version-key-1' },
  { name: 'stopRecording' },
  { name: 'pauseRecording' },
  { name: 'resumeRecording' },
  { name: 'setUserIdentifier', props: 'user-1' },
  { name: 'setUserProperties', props: { id: 'sdfsd', role: 'admin' } },
  { name: 'logEvent', props: 'custom-event-1' },
  {
    name: 'logEvent',
    label: 'logEvent with props',
    props: 'custom-event-2',
    extra: { eventId: 'ev2', time: 100 },
  },
  { name: 'logMessage', props: 'This is the user message 1' },
  {
    name: 'logMessage',
    label: 'logMessage with props',
    props: 'This is the user message 1',
    extra: { time: 100, date: 200 },
  },
  { name: 'startScreen', props: 'MyNewScreen' },
  { name: 'startTimer', props: 'My Timer 1' },
  {
    name: 'startTimer',
    label: 'startTimer with props',
    props: 'My Timer 1',
    extra: { a: 100, b: 200 },
  },
  { name: 'endTimer', props: 'My Timer 1' },
  {
    name: 'endTimer',
    label: 'endTimer with props',
    props: 'My Timer 1',
    extra: { a: 100, b: 200 },
  },
  { name: 'setDeviceLocation', props: { latitude: 100, longitude: 200 } },
  { name: 'addInSecureViewBucket', passRef: true },
  { name: 'removeFromSecureViewBucket', passRef: true },
  { name: 'optIn' },
  { name: 'optOut' },
  { name: 'getOptOutStatus' },
  { name: 'isRecording' },
  { name: 'getSessionUrl', props: 'version-key-1' },
];

const UserExperiorControls: React.FC<IProps> = props => {
  const onPressHandler = async (event: IEvent) => {
    console.log('firing UserExperior method:', { event });

    try {
      if (allEvents.some(e => e.name === event.name)) {
        let retval;
        if (event.passRef) {
          if (!props.elementRef) {
            Alert.alert(
              'UserExperior Error',
              `Ref has not been passed and called the method "${event.name}" which requires a ref.`,
            );
            console.log(
              'Ref has not been passed and called the method which requires a ref.',
              { event, ref: props.elementRef },
            );

            return;
          }
          retval = await UserExperior[event.name](props.elementRef);
        } else {
          retval = await UserExperior[event.name](event.props, event.extra);
        }

        let message = `Event "${event.name}" fired successfully.`;
        if (event.passRef) message += '\nHas ref: ' + !!props.elementRef;
        if (event.props) message += '\nProps: ' + JSON.stringify(event.props);
        if (event.extra) message += '\nExtra: ' + JSON.stringify(event.extra);
        if (retval != null) message += '\nReturned: ' + JSON.stringify(retval);

        Alert.alert('UserExperior Success', message);
        console.log(
          'UserExperior Success: Event: ',
          event,
          ' fired successfully. Has ref: ',
          !!props.elementRef,
          ', returned: ',
          retval,
        );
      } else {
        Alert.alert(
          'UserExperior Error',
          `Unrecognized event fired: "${event.name}"`,
        );
        console.log(
          'UserExperior Error: Unrecognized event fired:',
          event.name,
        );
      }
    } catch (e) {
      Alert.alert(
        'UserExperior Error',
        `Failed firing event "${event.name}".\nDetails: ${e?.message}`,
      );
      console.log('UserExperior Error: Failed firing event', {
        event,
        error: e,
      });
    }
  };

  return (
    <FlatList
      style={[styles.container, props.style]}
      contentContainerStyle={styles.contentContainer}
      keyExtractor={(item, index) => item.name + index}
      data={allEvents}
      renderItem={({ item }) => (
        <Button
          mode="contained"
          uppercase={false}
          style={styles.button}
          onPress={() => onPressHandler(item)}>
          {item.label ?? item.name}
        </Button>
      )}
    />
  );
};

export default UserExperiorControls;
