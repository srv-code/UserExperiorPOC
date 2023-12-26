import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { SafeAreaView, ScrollView, View, ViewStyle } from 'react-native';
import styles from './styles';

interface IProps {
  style?: ViewStyle | ViewStyle[];
  noScroll?: boolean;
  children: Element;
}

const Screen: React.FC<IProps> = forwardRef((props, ref) => {
  const scrollViewRef = useRef(null);

  useImperativeHandle(ref, () => ({
    /* NOTE: Add imperative methods here */
    //////
    // /* NOTE: If noScroll prop is true then scrollViewRef.current
    //   will be null, used optional chaining to streamline code */
    // scrollToEnd: () => scrollViewRef.current?.scrollToEnd(),
  }));

  const renderContent = () => {
    if (props.noScroll)
      return <View style={props.style}>{props.children}</View>;
    else
      return (
        <ScrollView ref={scrollViewRef} contentContainerStyle={props.style}>
          {props.children}
        </ScrollView>
      );
  };

  return (
    <SafeAreaView style={styles.container}>{renderContent()}</SafeAreaView>
  );
});

export default Screen;
