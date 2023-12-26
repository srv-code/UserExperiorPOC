import { useState, useEffect, useRef } from 'react';
import { Dimensions, EmitterSubscription, ScaledSize } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

type ScreenOrientation = 'PORTRAIT' | 'LANDSCAPE';

const useOrientation = () => {
  const getOrientation = (dimension: ScaledSize) =>
    dimension.width < dimension.height ? 'PORTRAIT' : 'LANDSCAPE';

  const [screenOrientation, setScreenOrientation] = useState<ScreenOrientation>(
    getOrientation(Dimensions.get('window')),
  );
  const [screenDimension, setScreenDimension] = useState<ScaledSize>(
    Dimensions.get('window'),
  );
  const listener = useRef<EmitterSubscription | null>(null);
  const isFocused = useIsFocused();

  const update = (dimension: ScaledSize) => {
    setScreenOrientation(getOrientation(dimension));
    setScreenDimension(dimension);
  };

  const addListener = () => {
    update(Dimensions.get('window'));

    listener.current = Dimensions.addEventListener('change', ({ window }) => {
      update(window);
    });
  };

  useEffect(() => {
    if (isFocused && !listener.current) addListener();
    else if (listener.current) {
      listener.current.remove();
      listener.current = null;
    }
  }, [isFocused]);

  return { screenOrientation, screenDimension };
};

export default useOrientation;
