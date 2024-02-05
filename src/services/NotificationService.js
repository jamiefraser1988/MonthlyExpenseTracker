import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';

// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
  // (required) Called when a remote or local notification is opened or received
  onNotification: function (notification) {
    console.log('LOCAL NOTIFICATION ==>', notification);
  },

  popInitialNotification: true,
  requestPermissions: Platform.OS === 'android',
});

const NotificationService = {
  // Schedules a single local notification
  scheduleNotification: (id, title, message, date) => {
    PushNotification.localNotificationSchedule({
      id: id.toString(),
      title: title,
      message: message,
      date: new Date(date), // date is a Date object
      channelId: 'your-channel-id', // Required for Android 8+
      allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
      /* Android Only Properties */
      repeatTime: 1, // (optional) Schedule a repeating notification. Specify time in milliseconds
      repeatType: 'time', // (optional) Repeating interval. Could be 'time', 'minute', 'hour', 'day'
    });
  },

  // Cancels a scheduled notification by ID
  cancelNotification: id => {
    PushNotification.cancelLocalNotifications({id: id.toString()});
  },

  // Create a channel - required for Android 8+ (API level 26)
  createChannel: () => {
    PushNotification.createChannel(
      {
        channelId: 'your-channel-id', // (required)
        channelName: 'My channel', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      created => console.log(`CreateChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  },

  // Check permission status
  checkPermissions: callback => {
    return PushNotification.checkPermissions(callback);
  },
};

export default NotificationService;
