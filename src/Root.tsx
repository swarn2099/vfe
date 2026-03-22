import { Composition } from "remotion";
import { GeminiAutomation } from "./GeminiAutomation";
import { IranWarDay23 } from "./IranWarDay23";
import { SaniBrand } from "./SaniBrand";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="GeminiAutomation"
        component={GeminiAutomation}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="IranWarDay23"
        component={IranWarDay23}
        durationInFrames={760}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="SaniBrand"
        component={SaniBrand}
        durationInFrames={634}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
