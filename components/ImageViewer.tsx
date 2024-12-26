import { useImageViewerContext } from "@/components/ImageViewerContext";
import { Image, type ImageSource } from "expo-image";
import { StyleSheet } from "react-native";

const PlaceholderImage = require("@/assets/images/background-image.png");

export default function ImageViewer({
  imgSource,
}: {
  imgSource?: ImageSource | undefined;
}) {
  const imageSource = imgSource?.uri || PlaceholderImage;
  const { updateDimensions } = useImageViewerContext();

  return (
    <Image
      source={imageSource}
      style={styles.image}
      onLayout={(event) => updateDimensions(event.nativeEvent.layout)}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
    position: "relative",
  },
});
