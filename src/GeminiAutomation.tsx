import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";

// ─── Scene 1: The Prompt ─────────────────────────────────────────
// User speaks to Gemini: "Order me a ride to the Palace of Fine Arts"

const Scene1_Prompt: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background gradient pulse
  const bgPulse = interpolate(frame, [0, 3 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Gemini logo entrance
  const logoScale = spring({ frame, fps, config: { damping: 12 } });

  // Voice waveform bars
  const waveFrames = Array.from({ length: 7 }, (_, i) => {
    const offset = i * 4;
    const height = interpolate(
      frame,
      [0.5 * fps + offset, 1 * fps + offset, 1.8 * fps + offset],
      [8, 40 + Math.sin(i * 1.2) * 25, 8],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
    return height;
  });

  // Text typewriter
  const fullText = '"Order me a ride to the Palace of Fine Arts"';
  const charsVisible = Math.floor(
    interpolate(frame, [1 * fps, 3.5 * fps], [0, fullText.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const displayText = fullText.slice(0, charsVisible);

  // Cursor blink
  const cursorOpacity =
    charsVisible < fullText.length ? (Math.floor(frame / 8) % 2 === 0 ? 1 : 0) : 0;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #0a0a1a ${10 + bgPulse * 5}%, #1a1a3e ${50}%, #0d0d2b ${90}%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Gemini sparkle icon */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          marginBottom: 60,
        }}
      >
        <svg width="120" height="120" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="geminiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4285F4" />
              <stop offset="33%" stopColor="#9B72CB" />
              <stop offset="66%" stopColor="#D96570" />
              <stop offset="100%" stopColor="#F5C518" />
            </linearGradient>
          </defs>
          <path
            d="M50 5 C50 5, 55 40, 95 50 C55 60, 50 95, 50 95 C50 95, 45 60, 5 50 C45 40, 50 5, 50 5Z"
            fill="url(#geminiGrad)"
          />
        </svg>
      </div>

      {/* Waveform */}
      <div style={{ display: "flex", gap: 12, marginBottom: 50, alignItems: "center" }}>
        {waveFrames.map((h, i) => (
          <div
            key={i}
            style={{
              width: 6,
              height: h,
              borderRadius: 3,
              background: `linear-gradient(180deg, #4285F4, #9B72CB)`,
              opacity: interpolate(frame, [0.3 * fps, 0.8 * fps], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          />
        ))}
      </div>

      {/* Prompt text */}
      <div
        style={{
          fontFamily: "system-ui, sans-serif",
          fontSize: 42,
          color: "#e0e0ff",
          fontStyle: "italic",
          textAlign: "center",
          padding: "0 80px",
          lineHeight: 1.5,
          minHeight: 130,
        }}
      >
        {displayText}
        <span style={{ opacity: cursorOpacity, color: "#4285F4" }}>|</span>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 2: Gemini Takes Over ──────────────────────────────────
// Phone screen shows Gemini launching Uber autonomously

const Scene2_TakeOver: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "Understood" text fade in
  const understoodOpacity = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });

  // App icons grid entrance
  const gridEntrance = spring({ frame, fps, delay: Math.floor(0.8 * fps), config: { damping: 15 } });

  // Scanning highlight that moves across app icons
  const scanProgress = interpolate(frame, [1.2 * fps, 3 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Uber icon highlight
  const uberGlow = interpolate(frame, [2.5 * fps, 3.2 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const apps = [
    { name: "Maps", color: "#34A853", icon: "📍" },
    { name: "Photos", color: "#FBBC05", icon: "🖼" },
    { name: "Uber", color: "#000000", icon: "🚗" },
    { name: "DoorDash", color: "#FF3008", icon: "🍔" },
    { name: "Spotify", color: "#1DB954", icon: "🎵" },
    { name: "Gmail", color: "#EA4335", icon: "✉️" },
    { name: "Starbucks", color: "#00704A", icon: "☕" },
    { name: "Instacart", color: "#43B02A", icon: "🛒" },
    { name: "Lyft", color: "#FF00BF", icon: "🚙" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: "#0a0a1a",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Phone frame */}
      <div
        style={{
          width: 380,
          height: 780,
          borderRadius: 40,
          border: "3px solid #333",
          background: "#111",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 30,
          position: "relative",
        }}
      >
        {/* Status bar */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            fontSize: 14,
            color: "#888",
            marginBottom: 30,
          }}
        >
          <span>9:41</span>
          <span>5G ▉▉▉</span>
        </div>

        {/* Gemini "understood" */}
        <div
          style={{
            opacity: understoodOpacity,
            fontSize: 22,
            color: "#a0a0ff",
            marginBottom: 30,
            fontFamily: "system-ui",
          }}
        >
          ✨ Opening Uber for you...
        </div>

        {/* App grid */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 20,
            justifyContent: "center",
            transform: `scale(${gridEntrance})`,
            opacity: gridEntrance,
          }}
        >
          {apps.map((app, i) => {
            const isUber = app.name === "Uber";
            const iconScale = isUber
              ? interpolate(uberGlow, [0, 1], [1, 1.2])
              : 1;
            const glowAmount = isUber ? uberGlow * 20 : 0;

            // Scan highlight passes over each icon
            const iconScanPos = i / apps.length;
            const scanDist = Math.abs(scanProgress - iconScanPos);
            const scanHighlight = scanDist < 0.15 ? (1 - scanDist / 0.15) * 0.5 : 0;

            return (
              <div
                key={app.name}
                style={{
                  width: 85,
                  height: 85,
                  borderRadius: 20,
                  background: app.color,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 32,
                  transform: `scale(${iconScale})`,
                  boxShadow: isUber
                    ? `0 0 ${glowAmount}px #4285F4, 0 0 ${glowAmount * 2}px #4285F4`
                    : `0 0 ${scanHighlight * 15}px rgba(66,133,244,${scanHighlight})`,
                  border: isUber && uberGlow > 0.5 ? "2px solid #4285F4" : "none",
                  transition: "none",
                }}
              >
                <span>{app.icon}</span>
                <span style={{ fontSize: 10, color: "#fff", marginTop: 4 }}>
                  {app.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 3: Autonomous Navigation ─────────────────────────────
// Gemini fills in Uber fields step by step

const Scene3_Navigate: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const steps = [
    { label: "Setting pickup location", field: "Current Location", delay: 0 },
    { label: "Entering destination", field: "Palace of Fine Arts", delay: 1 },
    { label: "Selecting ride type", field: "UberX — $14.50", delay: 2.2 },
  ];

  // AI cursor position
  const cursorY = interpolate(frame, [0, 1 * fps, 2.2 * fps, 3.5 * fps], [200, 320, 440, 540], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cursorPulse = Math.sin(frame * 0.3) * 3;

  return (
    <AbsoluteFill
      style={{
        background: "#0a0a1a",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Phone frame */}
      <div
        style={{
          width: 380,
          height: 780,
          borderRadius: 40,
          border: "3px solid #333",
          background: "#111",
          overflow: "hidden",
          position: "relative",
          padding: 30,
        }}
      >
        {/* Uber-ish header */}
        <div
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: "#fff",
            fontFamily: "system-ui",
            marginBottom: 30,
          }}
        >
          🚗 Uber
        </div>

        {/* Form fields */}
        {steps.map((step, i) => {
          const stepProgress = interpolate(
            frame,
            [step.delay * fps, (step.delay + 0.8) * fps],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          const charsVisible = Math.floor(stepProgress * step.field.length);

          return (
            <div key={i} style={{ marginBottom: 30 }}>
              <div
                style={{
                  fontSize: 13,
                  color: "#666",
                  marginBottom: 8,
                  fontFamily: "system-ui",
                  opacity: interpolate(
                    frame,
                    [step.delay * fps, (step.delay + 0.3) * fps],
                    [0, 1],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                  ),
                }}
              >
                {step.label}
              </div>
              <div
                style={{
                  background: "#1a1a2e",
                  borderRadius: 12,
                  padding: "14px 18px",
                  fontSize: 18,
                  color: "#e0e0ff",
                  fontFamily: "system-ui",
                  border: stepProgress > 0 && stepProgress < 1 ? "1px solid #4285F4" : "1px solid #333",
                  minHeight: 22,
                }}
              >
                {step.field.slice(0, charsVisible)}
                {stepProgress > 0 && stepProgress < 1 && (
                  <span
                    style={{
                      color: "#4285F4",
                      opacity: Math.floor(frame / 8) % 2 === 0 ? 1 : 0,
                    }}
                  >
                    |
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {/* AI Cursor — the Gemini dot */}
        <div
          style={{
            position: "absolute",
            left: 280,
            top: cursorY + cursorPulse,
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #4285F4, #9B72CB, #D96570)",
            boxShadow: "0 0 15px rgba(66,133,244,0.6)",
          }}
        />

        {/* Gemini status bar */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 30,
            right: 30,
            background: "linear-gradient(90deg, rgba(66,133,244,0.15), rgba(155,114,203,0.15))",
            borderRadius: 20,
            padding: "12px 18px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 100 100">
            <path
              d="M50 5 C50 5, 55 40, 95 50 C55 60, 50 95, 50 95 C50 95, 45 60, 5 50 C45 40, 50 5, 50 5Z"
              fill="#4285F4"
            />
          </svg>
          <span style={{ fontSize: 13, color: "#8888cc", fontFamily: "system-ui" }}>
            Gemini is navigating...
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 4: Confirmation Handoff ──────────────────────────────
// Gemini pauses and hands back control for final confirmation

const Scene4_Handoff: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Card entrance
  const cardScale = spring({ frame, fps, config: { damping: 14 } });

  // "Confirm?" pulse
  const confirmPulse = interpolate(
    frame,
    [1.5 * fps, 2 * fps, 2.5 * fps, 3 * fps],
    [1, 1.05, 1, 1.05],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Finger tap animation
  const fingerOpacity = interpolate(frame, [2.8 * fps, 3.2 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fingerScale = spring({
    frame: frame - Math.floor(3 * fps),
    fps,
    config: { damping: 10 },
  });

  // Ripple effect on button tap
  const rippleScale = interpolate(
    frame,
    [3.5 * fps, 4 * fps],
    [0, 3],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const rippleOpacity = interpolate(
    frame,
    [3.5 * fps, 4 * fps],
    [0.5, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: "#0a0a1a",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          transform: `scale(${cardScale})`,
          width: 400,
          background: "linear-gradient(145deg, #1a1a3e, #0d0d2b)",
          borderRadius: 30,
          padding: 40,
          border: "1px solid #333",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Gemini icon */}
        <svg width="50" height="50" viewBox="0 0 100 100" style={{ marginBottom: 20 }}>
          <path
            d="M50 5 C50 5, 55 40, 95 50 C55 60, 50 95, 50 95 C50 95, 45 60, 5 50 C45 40, 50 5, 50 5Z"
            fill="#F5C518"
          />
        </svg>

        <div
          style={{
            fontSize: 18,
            color: "#9999cc",
            fontFamily: "system-ui",
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          I've set everything up.
        </div>

        {/* Ride summary */}
        <div
          style={{
            width: "100%",
            background: "#111",
            borderRadius: 16,
            padding: 20,
            marginBottom: 25,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ color: "#888", fontSize: 14, fontFamily: "system-ui" }}>Ride</span>
            <span style={{ color: "#fff", fontSize: 14, fontFamily: "system-ui" }}>UberX</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ color: "#888", fontSize: 14, fontFamily: "system-ui" }}>To</span>
            <span style={{ color: "#fff", fontSize: 14, fontFamily: "system-ui" }}>Palace of Fine Arts</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#888", fontSize: 14, fontFamily: "system-ui" }}>Price</span>
            <span style={{ color: "#4285F4", fontSize: 18, fontWeight: "bold", fontFamily: "system-ui" }}>
              $14.50
            </span>
          </div>
        </div>

        {/* Confirm button */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              background: "linear-gradient(90deg, #4285F4, #9B72CB)",
              borderRadius: 16,
              padding: "16px 60px",
              fontSize: 20,
              fontWeight: "bold",
              color: "#fff",
              fontFamily: "system-ui",
              transform: `scale(${confirmPulse})`,
              cursor: "pointer",
            }}
          >
            Confirm Ride
          </div>

          {/* Ripple */}
          {frame > 3.5 * fps && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "rgba(66,133,244,0.3)",
                transform: `translate(-50%, -50%) scale(${rippleScale})`,
                opacity: rippleOpacity,
              }}
            />
          )}

          {/* Finger tap indicator */}
          {frame > 2.8 * fps && (
            <div
              style={{
                position: "absolute",
                bottom: -40,
                right: -10,
                fontSize: 36,
                opacity: fingerOpacity,
                transform: `scale(${Math.max(0, fingerScale)})`,
              }}
            >
              👆
            </div>
          )}
        </div>

        <div
          style={{
            fontSize: 13,
            color: "#666",
            marginTop: 20,
            fontFamily: "system-ui",
            textAlign: "center",
          }}
        >
          You're always in control of the final step.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 5: The Future ─────────────────────────────────────────
// Apps supported, vision of AI doing tasks for you

const Scene5_Future: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title entrance
  const titleSpring = spring({ frame, fps, config: { damping: 15 } });

  // App pills stagger
  const supportedApps = [
    "Uber",
    "DoorDash",
    "Lyft",
    "Instacart",
    "Starbucks",
    "McDonald's",
    "Grubhub",
    "Uber Eats",
  ];

  // "Your phone works for you" tagline
  const taglineOpacity = interpolate(frame, [2.5 * fps, 3.2 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const taglineY = interpolate(frame, [2.5 * fps, 3.2 * fps], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #0a0a1a 0%, #1a1a3e 100%)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Title */}
      <div
        style={{
          fontSize: 48,
          fontWeight: "bold",
          color: "#fff",
          fontFamily: "system-ui",
          textAlign: "center",
          marginBottom: 50,
          transform: `scale(${titleSpring})`,
          opacity: titleSpring,
        }}
      >
        <span style={{ color: "#4285F4" }}>Gemini</span> Task
        <br />
        Automation
      </div>

      {/* Supported apps grid */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 14,
          justifyContent: "center",
          maxWidth: 500,
          padding: "0 40px",
          marginBottom: 50,
        }}
      >
        {supportedApps.map((app, i) => {
          const pillSpring = spring({
            frame,
            fps,
            delay: Math.floor(0.6 * fps + i * 4),
            config: { damping: 14 },
          });

          return (
            <div
              key={app}
              style={{
                background: "rgba(66,133,244,0.12)",
                border: "1px solid rgba(66,133,244,0.3)",
                borderRadius: 30,
                padding: "10px 22px",
                fontSize: 18,
                color: "#a0a0ff",
                fontFamily: "system-ui",
                transform: `scale(${pillSpring})`,
                opacity: pillSpring,
              }}
            >
              {app}
            </div>
          );
        })}
      </div>

      {/* Tagline */}
      <div
        style={{
          fontSize: 28,
          color: "#e0e0ff",
          fontFamily: "system-ui",
          textAlign: "center",
          fontStyle: "italic",
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          padding: "0 60px",
        }}
      >
        Your phone now works
        <br />
        <span style={{ color: "#F5C518", fontWeight: "bold" }}>for you.</span>
      </div>

      {/* Gemini sparkle at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          opacity: interpolate(frame, [3 * fps, 3.5 * fps], [0, 0.6], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <svg width="40" height="40" viewBox="0 0 100 100">
          <path
            d="M50 5 C50 5, 55 40, 95 50 C55 60, 50 95, 50 95 C50 95, 45 60, 5 50 C45 40, 50 5, 50 5Z"
            fill="url(#geminiGradEnd)"
          />
          <defs>
            <linearGradient id="geminiGradEnd" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4285F4" />
              <stop offset="100%" stopColor="#F5C518" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </AbsoluteFill>
  );
};

// ─── Main Composition ────────────────────────────────────────────

export const GeminiAutomation: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={120}>
        <Scene1_Prompt />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 15 })}
      />

      <TransitionSeries.Sequence durationInFrames={100}>
        <Scene2_TakeOver />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={linearTiming({ durationInFrames: 15 })}
      />

      <TransitionSeries.Sequence durationInFrames={120}>
        <Scene3_Navigate />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 15 })}
      />

      <TransitionSeries.Sequence durationInFrames={130}>
        <Scene4_Handoff />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 20 })}
      />

      <TransitionSeries.Sequence durationInFrames={120}>
        <Scene5_Future />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
