import { screenHeight } from './../../../utils/helpers/screen'
import { screenWidth } from '../../../utils/helpers/screen'
import { StyleSheet } from 'react-native'
import { isIos } from '../../../utils/helpers/platform'

export const ChatPaymentAdditionalStyles = StyleSheet.create({
  main: {
    width: screenWidth,
    height: screenHeight,
    zIndex: 999,
    bottom: isIos ? 65 : 0,
    paddingTop: isIos ? 55 : undefined,
    paddingHorizontal: 16,
  },
  header: {
    backgroundColor: '#ffffff',
    height: 64,
    width: '100%',
    opacity: 0.8,
    top: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 32,
    color: '#4F4E4E',
  },
  form: {
    paddingBottom: 16,
    flex: 1,
  },
  input: {
    maxHeight: 52,
    borderBottomWidth: 1,
  },
  inputText: {
    fontFamily: 'Circe-Regular',
  },
  dateTitle: {
    fontSize: 18,
    lineHeight: 27,
    marginTop: 16,
    marginBottom: 8,
    fontFamily: 'Circe-Bold',
  },
  checkboxBlock: {
    marginLeft: 4,
    height: 34,
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
  checkboxText: {
    fontFamily: 'Circe-Regular',
    marginLeft: 11,
    fontSize: 18,
  },
})
