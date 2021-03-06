/* eslint-disable react-native/no-inline-styles */
import React, { FC } from 'react'
import { View, ScrollView } from 'react-native'
import { TChatProps } from '../../../types'
import { MessagesFieldStyles } from './S_MessagesField'
import { useRefreshMessageStack } from '../../../utils/hooks/USE_RefreshMessageStack'
import { Bubble } from '../Bubble/Bubble'
import { screenHeight } from '../../../utils/helpers/screen'
import Animated from 'react-native-reanimated'

interface IProps extends TChatProps {
  answerSize?: number
}

const MessagesField: FC<IProps> = React.memo(({ chatMiddleware, libraryInputData, answerSize }) => {
  const { messages, isTyping, autoScrollToEnd, scrollView } = useRefreshMessageStack(chatMiddleware)

  const { viewStyles } = libraryInputData

  const emptyContentForAnimation = () => <View style={{ height: screenHeight - 200, width: 0 }} />

  return (
    <Animated.View style={[MessagesFieldStyles.main]}>
      <ScrollView
        ref={scrollView}
        decelerationRate="normal"
        showsVerticalScrollIndicator={false}
        onContentSizeChange={autoScrollToEnd}
        contentContainerStyle={[
          MessagesFieldStyles.scrollViewContainer,
          {
            backgroundColor: viewStyles.chatBackgroundColor,
          },
        ]}
        style={MessagesFieldStyles.scrollView}
      >
        {emptyContentForAnimation()}
        <View style={[MessagesFieldStyles.messageField, { backgroundColor: viewStyles.chatBackgroundColor }]}>
          {messages.map((message) => (
            <View style={{ zIndex: 2 }}>
              <Bubble key={message.id} message={message} viewStyles={viewStyles} />
            </View>
          ))}
          <View style={{ zIndex: 1 }}>{isTyping ? <Bubble viewStyles={viewStyles} /> : <></>}</View>
        </View>
      </ScrollView>
    </Animated.View>
  )
})

export default MessagesField
