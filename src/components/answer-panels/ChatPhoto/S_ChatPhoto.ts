import {StyleSheet} from 'react-native';

export const ChatPhotoStyles = StyleSheet.create({
  main: {
    borderColor: 'rgba(0,0,0,0.1)',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 16,
    margin: 16,
  },
  input: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
  },
  touchable: {
    marginRight: 16,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'green',
  },
});