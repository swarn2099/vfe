import { Composition } from "remotion";
import { GeminiAutomation } from "./GeminiAutomation";

export const RemotionRoot = () => {
  return (
    <Composition
      id="GeminiAutomation"
      component={GeminiAutomation}
      durationInFrames={450}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
