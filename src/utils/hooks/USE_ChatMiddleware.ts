import {TMessageAddedInStack} from '../../store/T_ChatProvider';
import {TOnlyOneMessageIteration} from '../../types';
import {useContext, useState} from 'react';
import {ChatContext} from '../../store/ChatProvider';
import {TLibraryInputData, TOutputData} from '../../types/T_LibraryInputData';
import React from 'react';

export type TUseChatMiddleware = {
  currentChatBotQuestion: TOnlyOneMessageIteration;
  messageIndex: number;
  sendAnswer: (
    answer: any,
    type: EBubbleType,
    sendAnswerOutput?: boolean,
  ) => void;
  answerFieldVisible: boolean;
  setAnswerFieldVisible: React.Dispatch<React.SetStateAction<boolean>>;
  savedChatInfo: TOutputData;
  isLastMessageInModel: boolean;
  refreshMessages: React.Dispatch<React.SetStateAction<TMessageAddedInStack[]>>;
  messages: TMessageAddedInStack[];
};

export enum EBubbleType {
  TEXT = 'TEXT',
  PHOTO = 'PHOTO',
  DOUBLE_PHOTO = 'DOUBLE_PHOTO',
}

export const useChatMiddleware = (
  libraryInputData: TLibraryInputData,
): TUseChatMiddleware => {
  const {
    currentMessage: [messageIndex, setNewMessageIndex],
    chatInfo: [savedChatInfo, refreshChatInfo],
    messageStack: [messages, refreshMessages],
  } = useContext(ChatContext)!;

  const [answerFieldVisible, setAnswerFieldVisible] = useState(false);
  const isLastMessageInModel =
    messageIndex === libraryInputData.messages.length - 1;

  const currentChatBotQuestion = libraryInputData.messages[messageIndex];
  const myAnswerType = Object.getOwnPropertyNames(
    currentChatBotQuestion.myAnswer,
  )[0];

  const currentKeyForFormdata =
    currentChatBotQuestion.myAnswer[myAnswerType].keyForFormData;

  const dto = (answer: any, type: EBubbleType, answerForSaving: any) => {
    const answerDto: TMessageAddedInStack = {
      id: answerForSaving,
      sender: 'me',
    };

    const additionalFields = {
      [EBubbleType.TEXT]: () => {
        answerDto.text = answer;
      },
      [EBubbleType.PHOTO]: () => {
        answerDto.picture = answer;
      },
      [EBubbleType.DOUBLE_PHOTO]: () => {
        answerDto.twoSidePicture = answer;
      },
    };
    additionalFields[type]();

    return answerDto;
  };

  const sendAnswer = React.useCallback(
    (answer: any, type: EBubbleType, sendAnswerOutput?: boolean) => {
      let answerForSaving = answer;
      setAnswerFieldVisible(false);

      if (typeof answer !== 'string') {
        answerForSaving = answer.join(', ');
      }

      const answerDto = dto(answer, type, answerForSaving);

      refreshChatInfo(currentState => {
        const dataForSaving = {
          ...currentState,
          [currentKeyForFormdata]: answer,
        };

        if (sendAnswerOutput) {
          libraryInputData.events.answerSended(dataForSaving);
        }
        return dataForSaving;
      });

      const timeout = setTimeout(() => {
        if (!isLastMessageInModel) {
          setNewMessageIndex(current => current + 1);
        } else {
          libraryInputData.events.endConversationEvent(savedChatInfo);
        }
        refreshMessages(currentStack => [...currentStack, answerDto]);
      }, answerForSaving.length * 100);
      return () => clearTimeout(timeout);
    },
    [
      currentKeyForFormdata,
      isLastMessageInModel,
      libraryInputData.events,
      refreshChatInfo,
      refreshMessages,
      savedChatInfo,
      setNewMessageIndex,
    ],
  );

  return {
    currentChatBotQuestion,
    messageIndex,
    sendAnswer,
    answerFieldVisible,
    setAnswerFieldVisible,
    savedChatInfo,
    isLastMessageInModel,
    refreshMessages,
    messages,
  };
};
