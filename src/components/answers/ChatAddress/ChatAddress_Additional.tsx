/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState} from 'react';
import {View, TouchableOpacity, Keyboard, ScrollView} from 'react-native';
import {TChatProps} from '../../../types';
import {ButtonComponent} from '../../shared/buttons/ButtonComponent';
import {ChatAddressAdditionalStyles} from './S_ChatAddress_Additional';
import {TextField} from 'react-native-material-textfield';
import {USE_Address} from '../../../utils/hooks/USE_AddressChecking';
import {screenHeight, getBottomSpace, screenWidth} from '../../../utils/helpers/screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useKeyboardData } from '../../../utils/hooks/USE_KeyboardData';

const ChatAddressAdditional: FC<TChatProps> = React.memo(
  ({chatMiddleware, libraryInputData, setVisibleAdditionalAnswerPanel}) => {

    const {answerFieldColor, buttonColor} = libraryInputData.viewStyles;
    const {
      saveCountry,
      country,
      saveCity,
      city,
      saveStreet,
      street,
      saveHouse,
      house,
      saveApartment,
      savePostCode,
      postCode,
      onHidePanel,
      title,
      getPlaceByFields,
      isNeedToFill,
    } = USE_Address.useAddressChecking(
      chatMiddleware,
      setVisibleAdditionalAnswerPanel,
    );

    const {keyboardHeight, keyboardShow} = useKeyboardData();

    const headerHeight = 64;
    const buttonContainerHeight = 48 + 16 + 16;
    const customYOffset = 20;

    return (
      <View
        style={[
          ChatAddressAdditionalStyles.main,
          {backgroundColor: answerFieldColor, height: screenHeight},
        ]}>
        <View
          style={{
            backgroundColor: '#ffffff',
            height: 64,
            width: '100%',
            opacity: 0.8,
            top: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={onHidePanel}
            style={{
              width: 32,
              height: 32,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              style={{
                fontSize: 32,
                color: '#4F4E4E',
              }}
              name="close"
            />
          </TouchableOpacity>
        </View>
        <View
          style={
            keyboardShow
              ? {
                  height:
                    screenHeight -
                    keyboardHeight -
                    headerHeight -
                    buttonContainerHeight -
                    getBottomSpace(),
                }
              : {flex: 1}
          }>
          <ScrollView
            contentContainerStyle={{
              paddingBottom: keyboardShow ? buttonContainerHeight : 0,
            }}>
            <TextField
              label={'Страна*'}
              error={
                isNeedToFill && country.length === 0 ? 'Поле обязательное' : ''
              }
              style={ChatAddressAdditionalStyles.inputText}
              tintColor={buttonColor}
              keyboardType="default"
              onChangeText={saveCountry}
              placeholderTextColor={buttonColor}
            />
            <TextField
              label={'Город*'}
              error={
                isNeedToFill && city.length === 0 ? 'Поле обязательное' : ''
              }
              style={ChatAddressAdditionalStyles.inputText}
              tintColor={buttonColor}
              keyboardType="default"
              onChangeText={saveCity}
              placeholderTextColor={buttonColor}
            />
            <TextField
              label={'Улица*'}
              error={
                isNeedToFill && street.length === 0 ? 'Поле обязательное' : ''
              }
              style={ChatAddressAdditionalStyles.inputText}
              tintColor={buttonColor}
              keyboardType="default"
              onChangeText={saveStreet}
              placeholderTextColor={buttonColor}
            />
            <TextField
              label={'Дом*'}
              error={
                isNeedToFill && house.length === 0 ? 'Поле обязательное' : ''
              }
              style={ChatAddressAdditionalStyles.inputText}
              tintColor={buttonColor}
              keyboardType="default"
              onChangeText={saveHouse}
              placeholderTextColor={buttonColor}
            />
            <TextField
              label={'Квартира'}
              style={ChatAddressAdditionalStyles.inputText}
              tintColor={buttonColor}
              keyboardType="default"
              onChangeText={saveApartment}
              placeholderTextColor={buttonColor}
            />
            <TextField
              label={'Индекс*'}
              error={
                isNeedToFill && postCode.length === 0 ? 'Поле обязательное' : ''
              }
              style={ChatAddressAdditionalStyles.inputText}
              tintColor={buttonColor}
              keyboardType="default"
              onChangeText={savePostCode}
              placeholderTextColor={buttonColor}
            />
          </ScrollView>
        </View>
        <ButtonComponent
          style={{
            position: 'absolute',
            bottom: getBottomSpace() + keyboardHeight + customYOffset,
            width: screenWidth - 16,
          }}
          title={title}
          mainColor={buttonColor}
          secondColor={answerFieldColor}
          onPress={getPlaceByFields}
          type="light"
        />
      </View>
    );
  },
);

export default ChatAddressAdditional;
