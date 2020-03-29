import {ISender} from './../../store/T_ChatProvider';
import React from 'react';
import Animated, {Easing} from 'react-native-reanimated';
import {screenWidth} from '../helpers/screen';

const {Value, timing} = Animated;

type Animation = {
  value: Animated.Value<any>;
};

export const useScaleAnimation = (): Animation => {
  const [scaleValue] = React.useState(new Value(0));
  const scaleConfig = {
    toValue: 1,
    duration: 550,
    easing: Easing.inOut(Easing.ease),
  };
  const scaleAnimation = timing(scaleValue, scaleConfig);

  React.useEffect(() => {
    scaleAnimation.start();
  }, [scaleAnimation]);

  return {value: scaleValue};
};

export const useTranslateXAnimation = (sender: ISender): Animation => {
  const [offsetX] = React.useState(() => {
    const value = sender === 'chatBot' ? -100 : screenWidth;
    return new Value(value);
  });
  const offsetYConfig = {
    toValue: 1,
    duration: 650,
    easing: Easing.inOut(Easing.ease),
  };
  const offsetXAnimation = timing(offsetX, offsetYConfig);

  React.useEffect(() => {
    offsetXAnimation.start();
  }, [offsetXAnimation]);

  return {value: offsetX};
};

export const useTranslateYAnimation = (sender: ISender): Animation => {
  const [offsetY] = React.useState(() => {
    const value = sender === 'chatBot' ? 55 : 355;
    return new Value(value);
  });
  const offsetYConfig = {
    toValue: 1,
    duration: 650,
    easing: Easing.inOut(Easing.ease),
  };
  const offsetYAnimation = timing(offsetY, offsetYConfig);

  React.useEffect(() => {
    offsetYAnimation.start();
  }, [offsetYAnimation]);

  return {value: offsetY};
};

export const useBubbleAnimation = {
  scale: useScaleAnimation,
  translateY: useTranslateYAnimation,
};