import { type ImageSource } from "expo-image";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useImageViewerContext } from "@/components/ImageViewerContext";

type Props = {
  imageSize: number;
  stickerSource: ImageSource;
};

export default function EmojiSticker({ imageSize, stickerSource }: Props) {
  const { width, height, x, y } = useImageViewerContext();
  const scaleImage = useSharedValue(imageSize);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scaleImage.value === imageSize * 2) {
        scaleImage.value = Math.round(scaleImage.value / 2);
      } else {
        scaleImage.value = scaleImage.value * 2;
      }
    });

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });

  const drag = Gesture.Pan().onChange((event) => {
    if (translateX.value + event.changeX <= 0) {
      translateX.value = 0;
    }

    if (translateY.value + event.changeY <= 0) {
      translateY.value = 0;
    }

    if (translateX.value + event.changeX + scaleImage.value <= width) {
      translateX.value += event.changeX;
    } else {
      translateX.value = width - scaleImage.value;
    }

    if (translateY.value + event.changeY + scaleImage.value <= height) {
      translateY.value += event.changeY;
    } else {
      translateY.value = height - scaleImage.value;
    }
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      top: 0,
      left: 0,
      position: "absolute",
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  return (
    <GestureDetector gesture={drag}>
      <Animated.View style={containerStyle}>
        <GestureDetector gesture={doubleTap}>
          <Animated.Image
            source={stickerSource}
            resizeMode="contain"
            style={imageStyle}
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
}
