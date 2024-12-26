import { createContext, useContext, useState, PropsWithChildren } from "react";
import { LayoutRectangle } from "react-native";

// Define the shape of the context
interface ImageViewerContextProps {
  width: number;
  height: number;
  x: number;
  y: number;
  updateDimensions: (newDimensions: LayoutRectangle) => void;
}

// Create the context with a default value
const ImageViewerContext = createContext<ImageViewerContextProps | undefined>(
  undefined,
);

// Hook to use the context
export const useImageViewerContext = () => {
  const context = useContext(ImageViewerContext);
  if (!context) {
    throw new Error(
      "useImageViewerContext must be used within an ImageViewerProvider",
    );
  }
  return context;
};

// Provider component
export const ImageViewerProvider = ({ children }: PropsWithChildren<{}>) => {
  const [state, setState] = useState<
    Omit<ImageViewerContextProps, "updateDimensions">
  >({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  const updateDimensions = (newDimensions: LayoutRectangle) => {
    setState((prev) => ({
      ...prev,
      ...newDimensions,
    }));
  };

  return (
    <ImageViewerContext.Provider value={{ ...state, updateDimensions }}>
      {children}
    </ImageViewerContext.Provider>
  );
};
