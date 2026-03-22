import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";

// ─── Color Palette ──────────────────────────────────────────────
const COLORS = {
  bg: "#0a0a12",
  bgDark: "#050508",
  red: "#cc0000",
  redDark: "#8b0000",
  redGlow: "rgba(204,0,0,0.3)",
  blue: "#1a3a6a",
  blueLight: "#3a6aaa",
  gold: "#d4a847",
  white: "#f0f0f0",
  gray: "#888",
  grayDark: "#444",
  textMuted: "#aaa",
};

// ─── Scene 1: Breaking News Flash ───────────────────────────────
const Scene1_Breaking: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Red flash on entry
  const flashOpacity = interpolate(frame, [0, 5, 10, 15], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
  });

  // "BREAKING" text slam
  const breakingScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 8, stiffness: 200 },
  });

  // Day counter
  const dayScale = spring({
    frame: frame - Math.floor(0.8 * fps),
    fps,
    config: { damping: 12 },
  });

  // Date line fade
  const dateOpacity = interpolate(frame, [1.2 * fps, 1.6 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Headline typewriter
  const headline = "US-ISRAEL WAR WITH IRAN";
  const charsVisible = Math.floor(
    interpolate(frame, [1.8 * fps, 3.2 * fps], [0, headline.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  // Pulsing red bar
  const barPulse =
    0.6 + 0.4 * Math.sin(frame * 0.15);

  // Scanline effect
  const scanlineY = (frame * 3) % 1920;

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Red flash */}
      <AbsoluteFill
        style={{
          background: COLORS.red,
          opacity: flashOpacity,
        }}
      />

      {/* Subtle scanlines */}
      <div
        style={{
          position: "absolute",
          top: scanlineY - 100,
          left: 0,
          right: 0,
          height: 200,
          background:
            "linear-gradient(180deg, transparent, rgba(204,0,0,0.03), transparent)",
          pointerEvents: "none",
        }}
      />

      {/* Top red bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background: COLORS.red,
          opacity: barPulse,
        }}
      />

      {/* BREAKING text */}
      <div
        style={{
          transform: `scale(${Math.max(0, breakingScale)})`,
          fontSize: 72,
          fontWeight: 900,
          color: COLORS.red,
          fontFamily: "system-ui, sans-serif",
          letterSpacing: 16,
          marginBottom: 40,
          textShadow: `0 0 40px ${COLORS.redGlow}, 0 0 80px ${COLORS.redGlow}`,
        }}
      >
        BREAKING
      </div>

      {/* Divider line */}
      <div
        style={{
          width: interpolate(frame, [0.6 * fps, 1 * fps], [0, 400], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          height: 2,
          background: `linear-gradient(90deg, transparent, ${COLORS.red}, transparent)`,
          marginBottom: 40,
        }}
      />

      {/* DAY 23 */}
      <div
        style={{
          transform: `scale(${Math.max(0, dayScale)})`,
          opacity: Math.max(0, dayScale),
          fontSize: 120,
          fontWeight: 900,
          color: COLORS.white,
          fontFamily: "system-ui, sans-serif",
          lineHeight: 1,
          marginBottom: 15,
        }}
      >
        DAY 23
      </div>

      {/* Date */}
      <div
        style={{
          opacity: dateOpacity,
          fontSize: 24,
          color: COLORS.textMuted,
          fontFamily: "system-ui, sans-serif",
          letterSpacing: 4,
          marginBottom: 60,
        }}
      >
        MARCH 22, 2026
      </div>

      {/* Headline */}
      <div
        style={{
          fontSize: 38,
          fontWeight: 700,
          color: COLORS.white,
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: "0 60px",
          letterSpacing: 2,
        }}
      >
        {headline.slice(0, charsVisible)}
        {charsVisible < headline.length && (
          <span
            style={{
              color: COLORS.red,
              opacity: Math.floor(frame / 8) % 2 === 0 ? 1 : 0,
            }}
          >
            _
          </span>
        )}
      </div>

      {/* Bottom red bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 6,
          background: COLORS.red,
          opacity: barPulse,
        }}
      />
    </AbsoluteFill>
  );
};

// ─── Scene 2: Trump's Ultimatum ─────────────────────────────────
const Scene2_Ultimatum: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Quote card entrance
  const cardY = interpolate(frame, [0, 0.6 * fps], [80, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cardOpacity = interpolate(frame, [0, 0.4 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Trump quote typewriter
  const quote =
    '"Hit and obliterate Iran\'s power plants STARTING WITH THE BIGGEST ONE FIRST!"';
  const quoteChars = Math.floor(
    interpolate(frame, [0.8 * fps, 3.5 * fps], [0, quote.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  // Context text
  const contextOpacity = interpolate(frame, [3.8 * fps, 4.3 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 48 hours countdown emphasis
  const countdownScale = spring({
    frame: frame - Math.floor(4.5 * fps),
    fps,
    config: { damping: 10 },
  });

  // Warning pulse
  const warningPulse = frame > 4.5 * fps ? 0.7 + 0.3 * Math.sin(frame * 0.2) : 0;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.bgDark} 0%, #0d0a0a 100%)`,
        justifyContent: "center",
        alignItems: "center",
        padding: 50,
      }}
    >
      {/* Warning glow at top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 300,
          background: `radial-gradient(ellipse at center top, rgba(204,0,0,0.15), transparent)`,
          opacity: warningPulse,
        }}
      />

      {/* Label */}
      <div
        style={{
          fontSize: 18,
          color: COLORS.red,
          fontFamily: "system-ui",
          letterSpacing: 6,
          fontWeight: 700,
          marginBottom: 40,
          opacity: cardOpacity,
        }}
      >
        TRUMP THREATENS IRAN
      </div>

      {/* Quote card */}
      <div
        style={{
          transform: `translateY(${cardY}px)`,
          opacity: cardOpacity,
          background: "rgba(204,0,0,0.06)",
          border: `1px solid rgba(204,0,0,0.25)`,
          borderRadius: 20,
          padding: "40px 35px",
          maxWidth: 500,
        }}
      >
        {/* Quote marks */}
        <div
          style={{
            fontSize: 80,
            color: COLORS.red,
            fontFamily: "Georgia, serif",
            lineHeight: 0.5,
            marginBottom: 15,
            opacity: 0.4,
          }}
        >
          "
        </div>

        <div
          style={{
            fontSize: 32,
            color: COLORS.white,
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            lineHeight: 1.5,
            minHeight: 200,
          }}
        >
          {quote.slice(0, quoteChars)}
          {quoteChars < quote.length && (
            <span
              style={{
                opacity: Math.floor(frame / 8) % 2 === 0 ? 1 : 0,
                color: COLORS.red,
              }}
            >
              |
            </span>
          )}
        </div>

        <div
          style={{
            fontSize: 16,
            color: COLORS.gray,
            fontFamily: "system-ui",
            marginTop: 20,
          }}
        >
          — President Donald Trump
        </div>
      </div>

      {/* Context line */}
      <div
        style={{
          opacity: contextOpacity,
          fontSize: 22,
          color: COLORS.textMuted,
          fontFamily: "system-ui",
          textAlign: "center",
          marginTop: 40,
          padding: "0 40px",
          lineHeight: 1.6,
        }}
      >
        Unless Iran opens the Strait of Hormuz
      </div>

      {/* 48 HOURS */}
      <div
        style={{
          transform: `scale(${Math.max(0, countdownScale)})`,
          opacity: Math.max(0, countdownScale),
          marginTop: 25,
          background: COLORS.red,
          borderRadius: 12,
          padding: "14px 40px",
        }}
      >
        <span
          style={{
            fontSize: 36,
            fontWeight: 900,
            color: COLORS.white,
            fontFamily: "system-ui",
            letterSpacing: 4,
          }}
        >
          48 HOURS
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 3: Military Strikes ──────────────────────────────────
const Scene3_Strikes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Strike counter
  const targetCount = Math.floor(
    interpolate(frame, [0.5 * fps, 2.5 * fps], [0, 200], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  // Strike dots animation
  const dots = Array.from({ length: 30 }, (_, i) => {
    const angle = (i / 30) * Math.PI * 2;
    const radius = 180 + Math.sin(i * 2.3) * 60;
    const delay = i * 3;
    const dotOpacity = interpolate(
      frame,
      [0.3 * fps + delay, 0.6 * fps + delay],
      [0, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
    const flashScale =
      frame > 0.6 * fps + delay && frame < 0.8 * fps + delay
        ? 1 + (1 - (frame - 0.6 * fps - delay) / (0.2 * fps)) * 2
        : 1;

    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius * 0.6,
      opacity: dotOpacity,
      scale: flashScale,
    };
  });

  // Israel label
  const israelOpacity = interpolate(frame, [0, 0.4 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Bottom stat cards
  const card1Spring = spring({
    frame: frame - Math.floor(2.8 * fps),
    fps,
    config: { damping: 12 },
  });
  const card2Spring = spring({
    frame: frame - Math.floor(3.2 * fps),
    fps,
    config: { damping: 12 },
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bgDark,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Label */}
      <div
        style={{
          position: "absolute",
          top: 120,
          fontSize: 18,
          color: COLORS.red,
          fontFamily: "system-ui",
          letterSpacing: 6,
          fontWeight: 700,
          opacity: israelOpacity,
        }}
      >
        WIDE-SCALE STRIKES
      </div>

      {/* Strike visualization — abstract target zone */}
      <div
        style={{
          position: "relative",
          width: 500,
          height: 400,
          marginTop: 40,
        }}
      >
        {/* Concentric rings */}
        {[1, 2, 3].map((ring) => (
          <div
            key={ring}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: ring * 160,
              height: ring * 100,
              border: `1px solid rgba(204,0,0,${0.15 / ring})`,
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}

        {/* Strike dots */}
        {dots.map((dot, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: i % 3 === 0 ? COLORS.red : "#ff6633",
              opacity: dot.opacity,
              transform: `translate(${dot.x - 4}px, ${dot.y - 4}px) scale(${dot.scale})`,
              boxShadow:
                dot.scale > 1.5
                  ? `0 0 20px ${COLORS.red}, 0 0 40px ${COLORS.redGlow}`
                  : `0 0 6px ${COLORS.redGlow}`,
            }}
          />
        ))}

        {/* Center target count */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 900,
              color: COLORS.white,
              fontFamily: "system-ui",
              lineHeight: 1,
            }}
          >
            {targetCount}+
          </div>
          <div
            style={{
              fontSize: 18,
              color: COLORS.textMuted,
              fontFamily: "system-ui",
              marginTop: 8,
              letterSpacing: 3,
            }}
          >
            TARGETS HIT
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div
        style={{
          position: "absolute",
          bottom: 140,
          left: 50,
          right: 50,
          display: "flex",
          gap: 16,
        }}
      >
        <div
          style={{
            flex: 1,
            background: "rgba(204,0,0,0.08)",
            border: "1px solid rgba(204,0,0,0.2)",
            borderRadius: 16,
            padding: "20px 16px",
            transform: `scale(${Math.max(0, card1Spring)})`,
            opacity: Math.max(0, card1Spring),
          }}
        >
          <div
            style={{
              fontSize: 14,
              color: COLORS.gray,
              fontFamily: "system-ui",
              marginBottom: 6,
            }}
          >
            Iran & Hezbollah
          </div>
          <div
            style={{
              fontSize: 20,
              color: COLORS.white,
              fontFamily: "system-ui",
              fontWeight: 700,
            }}
          >
            Simultaneous waves
          </div>
        </div>

        <div
          style={{
            flex: 1,
            background: "rgba(204,0,0,0.08)",
            border: "1px solid rgba(204,0,0,0.2)",
            borderRadius: 16,
            padding: "20px 16px",
            transform: `scale(${Math.max(0, card2Spring)})`,
            opacity: Math.max(0, card2Spring),
          }}
        >
          <div
            style={{
              fontSize: 14,
              color: COLORS.gray,
              fontFamily: "system-ui",
              marginBottom: 6,
            }}
          >
            Israel Defense Minister
          </div>
          <div
            style={{
              fontSize: 20,
              color: COLORS.white,
              fontFamily: "system-ui",
              fontWeight: 700,
            }}
          >
            "Will increase significantly"
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 4: Dimona Attack ─────────────────────────────────────
const Scene4_Dimona: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Impact flash
  const impactFlash =
    frame > 0.5 * fps && frame < 0.7 * fps
      ? interpolate(frame, [0.5 * fps, 0.6 * fps, 0.7 * fps], [0, 0.8, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;

  // Shockwave ring
  const shockwaveScale = interpolate(
    frame,
    [0.5 * fps, 1.5 * fps],
    [0, 4],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const shockwaveOpacity = interpolate(
    frame,
    [0.5 * fps, 1.5 * fps],
    [0.8, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Text reveals
  const locationOpacity = interpolate(frame, [1 * fps, 1.4 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const detailOpacity = interpolate(frame, [1.8 * fps, 2.3 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const aradOpacity = interpolate(frame, [3 * fps, 3.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const mceBadge = spring({
    frame: frame - Math.floor(3.5 * fps),
    fps,
    config: { damping: 10 },
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bgDark,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Impact flash overlay */}
      <AbsoluteFill
        style={{
          background: "#ff4400",
          opacity: impactFlash,
        }}
      />

      {/* Label */}
      <div
        style={{
          position: "absolute",
          top: 120,
          fontSize: 18,
          color: COLORS.gold,
          fontFamily: "system-ui",
          letterSpacing: 6,
          fontWeight: 700,
        }}
      >
        IRAN STRIKES BACK
      </div>

      {/* Shockwave ring */}
      {frame > 0.5 * fps && (
        <div
          style={{
            position: "absolute",
            top: "38%",
            left: "50%",
            width: 100,
            height: 100,
            borderRadius: "50%",
            border: "3px solid rgba(255,68,0,0.6)",
            transform: `translate(-50%, -50%) scale(${shockwaveScale})`,
            opacity: shockwaveOpacity,
          }}
        />
      )}

      {/* Target icon */}
      <div
        style={{
          position: "relative",
          marginBottom: 40,
          marginTop: -80,
        }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke={COLORS.red}
            strokeWidth="2"
            opacity="0.3"
          />
          <circle
            cx="60"
            cy="60"
            r="30"
            fill="none"
            stroke={COLORS.red}
            strokeWidth="2"
            opacity="0.5"
          />
          <circle cx="60" cy="60" r="8" fill={COLORS.red} />
          {/* Crosshairs */}
          <line x1="60" y1="5" x2="60" y2="35" stroke={COLORS.red} strokeWidth="1.5" opacity="0.4" />
          <line x1="60" y1="85" x2="60" y2="115" stroke={COLORS.red} strokeWidth="1.5" opacity="0.4" />
          <line x1="5" y1="60" x2="35" y2="60" stroke={COLORS.red} strokeWidth="1.5" opacity="0.4" />
          <line x1="85" y1="60" x2="115" y2="60" stroke={COLORS.red} strokeWidth="1.5" opacity="0.4" />
        </svg>
      </div>

      {/* DIMONA */}
      <div
        style={{
          opacity: locationOpacity,
          fontSize: 56,
          fontWeight: 900,
          color: COLORS.white,
          fontFamily: "system-ui",
          textAlign: "center",
          marginBottom: 15,
        }}
      >
        DIMONA
      </div>

      <div
        style={{
          opacity: locationOpacity,
          fontSize: 20,
          color: COLORS.gold,
          fontFamily: "system-ui",
          textAlign: "center",
          marginBottom: 40,
          letterSpacing: 3,
        }}
      >
        ISRAEL'S NUCLEAR SITE
      </div>

      {/* Detail */}
      <div
        style={{
          opacity: detailOpacity,
          fontSize: 22,
          color: COLORS.textMuted,
          fontFamily: "system-ui",
          textAlign: "center",
          padding: "0 60px",
          lineHeight: 1.6,
          marginBottom: 40,
        }}
      >
        Iranian missile pierced Israel's defense array, striking near the
        nuclear facility and injuring several people
      </div>

      {/* Arad mass casualty */}
      <div
        style={{
          opacity: aradOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            fontSize: 18,
            color: COLORS.textMuted,
            fontFamily: "system-ui",
          }}
        >
          Nearby city of Arad also hit
        </div>
        <div
          style={{
            transform: `scale(${Math.max(0, mceBadge)})`,
            background: COLORS.red,
            borderRadius: 10,
            padding: "10px 28px",
          }}
        >
          <span
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: COLORS.white,
              fontFamily: "system-ui",
              letterSpacing: 2,
            }}
          >
            MASS CASUALTY EVENT
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 5: Humanitarian Toll ─────────────────────────────────
const Scene5_Toll: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Stats with counting animation
  const iranDeaths = Math.floor(
    interpolate(frame, [0.5 * fps, 2 * fps], [0, 1330], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const iranInjured = Math.floor(
    interpolate(frame, [0.5 * fps, 2 * fps], [0, 18000], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const children = Math.floor(
    interpolate(frame, [0.5 * fps, 2 * fps], [0, 200], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const lebDeaths = Math.floor(
    interpolate(frame, [0.5 * fps, 2 * fps], [0, 1000], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const displaced = interpolate(frame, [0.5 * fps, 2 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headerOpacity = interpolate(frame, [0, 0.4 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Divider between Iran and Lebanon
  const dividerWidth = interpolate(frame, [2.3 * fps, 2.8 * fps], [0, 300], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Lebanon section
  const lebOpacity = interpolate(frame, [2.5 * fps, 3 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.bgDark} 0%, #0a0808 100%)`,
        justifyContent: "center",
        alignItems: "center",
        padding: 50,
      }}
    >
      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: 120,
          fontSize: 18,
          color: COLORS.red,
          fontFamily: "system-ui",
          letterSpacing: 6,
          fontWeight: 700,
          opacity: headerOpacity,
        }}
      >
        HUMANITARIAN COST
      </div>

      {/* Iran section */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 30,
          marginTop: -60,
        }}
      >
        <div
          style={{
            fontSize: 22,
            color: COLORS.gray,
            fontFamily: "system-ui",
            marginBottom: 20,
            letterSpacing: 3,
            opacity: headerOpacity,
          }}
        >
          IRAN
        </div>

        <div style={{ display: "flex", gap: 40, justifyContent: "center" }}>
          {/* Deaths */}
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: 64,
                fontWeight: 900,
                color: COLORS.red,
                fontFamily: "system-ui",
                lineHeight: 1,
              }}
            >
              {iranDeaths.toLocaleString()}+
            </div>
            <div
              style={{
                fontSize: 16,
                color: COLORS.textMuted,
                fontFamily: "system-ui",
                marginTop: 8,
              }}
            >
              KILLED
            </div>
          </div>

          {/* Injured */}
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: 64,
                fontWeight: 900,
                color: "#ff6633",
                fontFamily: "system-ui",
                lineHeight: 1,
              }}
            >
              {iranInjured.toLocaleString()}+
            </div>
            <div
              style={{
                fontSize: 16,
                color: COLORS.textMuted,
                fontFamily: "system-ui",
                marginTop: 8,
              }}
            >
              INJURED
            </div>
          </div>
        </div>

        {/* Children callout */}
        <div
          style={{
            marginTop: 25,
            fontSize: 20,
            color: COLORS.gold,
            fontFamily: "system-ui",
          }}
        >
          Including {children}+ children
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          width: dividerWidth,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${COLORS.grayDark}, transparent)`,
          marginBottom: 35,
        }}
      />

      {/* Lebanon section */}
      <div
        style={{
          textAlign: "center",
          opacity: lebOpacity,
        }}
      >
        <div
          style={{
            fontSize: 22,
            color: COLORS.gray,
            fontFamily: "system-ui",
            marginBottom: 20,
            letterSpacing: 3,
          }}
        >
          LEBANON
        </div>

        <div style={{ display: "flex", gap: 40, justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: 56,
                fontWeight: 900,
                color: COLORS.red,
                fontFamily: "system-ui",
                lineHeight: 1,
              }}
            >
              {lebDeaths.toLocaleString()}+
            </div>
            <div
              style={{
                fontSize: 16,
                color: COLORS.textMuted,
                fontFamily: "system-ui",
                marginTop: 8,
              }}
            >
              KILLED
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: 56,
                fontWeight: 900,
                color: "#ff6633",
                fontFamily: "system-ui",
                lineHeight: 1,
              }}
            >
              {displaced.toFixed(0)}M+
            </div>
            <div
              style={{
                fontSize: 16,
                color: COLORS.textMuted,
                fontFamily: "system-ui",
                marginTop: 8,
              }}
            >
              DISPLACED
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 6: Oil & Closing ─────────────────────────────────────
const Scene6_Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Oil headline
  const oilOpacity = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const oilY = interpolate(frame, [0, 0.5 * fps], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Barrel count
  const barrels = Math.floor(
    interpolate(frame, [0.6 * fps, 1.8 * fps], [0, 140], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  // Divider
  const dividerWidth = interpolate(frame, [2 * fps, 2.5 * fps], [0, 400], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "War enters 4th week" text
  const weekOpacity = interpolate(frame, [2.5 * fps, 3 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const weekScale = spring({
    frame: frame - Math.floor(2.5 * fps),
    fps,
    config: { damping: 14 },
  });

  // Source attribution
  const sourceOpacity = interpolate(frame, [3.5 * fps, 4 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulsing red corners
  const cornerPulse = 0.3 + 0.3 * Math.sin(frame * 0.12);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.bgDark} 0%, #0a0a12 100%)`,
        justifyContent: "center",
        alignItems: "center",
        padding: 50,
      }}
    >
      {/* Corner accents */}
      {[
        { top: 0, left: 0 },
        { top: 0, right: 0 },
        { bottom: 0, left: 0 },
        { bottom: 0, right: 0 },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            ...pos,
            width: 60,
            height: 60,
            borderTop: pos.top !== undefined ? `2px solid ${COLORS.red}` : undefined,
            borderBottom: pos.bottom !== undefined ? `2px solid ${COLORS.red}` : undefined,
            borderLeft: pos.left !== undefined ? `2px solid ${COLORS.red}` : undefined,
            borderRight: pos.right !== undefined ? `2px solid ${COLORS.red}` : undefined,
            opacity: cornerPulse,
          } as React.CSSProperties}
        />
      ))}

      {/* Oil crisis section */}
      <div
        style={{
          opacity: oilOpacity,
          transform: `translateY(${oilY}px)`,
          textAlign: "center",
          marginBottom: 50,
        }}
      >
        <div
          style={{
            fontSize: 18,
            color: COLORS.gold,
            fontFamily: "system-ui",
            letterSpacing: 4,
            marginBottom: 20,
          }}
        >
          OIL MARKET RESPONSE
        </div>

        <div
          style={{
            fontSize: 22,
            color: COLORS.textMuted,
            fontFamily: "system-ui",
            marginBottom: 15,
            lineHeight: 1.5,
          }}
        >
          Trump grants temporary license for Iran
          <br />
          to sell crude oil to calm markets
        </div>

        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 8 }}>
          <span
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: COLORS.gold,
              fontFamily: "system-ui",
            }}
          >
            {barrels}M
          </span>
          <span
            style={{
              fontSize: 22,
              color: COLORS.textMuted,
              fontFamily: "system-ui",
            }}
          >
            barrels
          </span>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          width: dividerWidth,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${COLORS.red}, transparent)`,
          marginBottom: 50,
        }}
      />

      {/* 4th week */}
      <div
        style={{
          opacity: weekOpacity,
          transform: `scale(${Math.max(0, weekScale)})`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: 900,
            color: COLORS.white,
            fontFamily: "system-ui",
            lineHeight: 1.3,
          }}
        >
          THE WAR ENTERS
          <br />
          <span style={{ color: COLORS.red }}>ITS 4TH WEEK</span>
        </div>
      </div>

      {/* Source */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          opacity: sourceOpacity,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 14,
            color: COLORS.grayDark,
            fontFamily: "system-ui",
            letterSpacing: 2,
          }}
        >
          SOURCE: CNN LIVE UPDATES
        </div>
        <div
          style={{
            fontSize: 14,
            color: COLORS.grayDark,
            fontFamily: "system-ui",
            marginTop: 6,
          }}
        >
          MARCH 22, 2026
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Main Composition ───────────────────────────────────────────
export const IranWarDay23: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={120}>
        <Scene1_Breaking />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 15 })}
      />

      <TransitionSeries.Sequence durationInFrames={170}>
        <Scene2_Ultimatum />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-left" })}
        timing={linearTiming({ durationInFrames: 15 })}
      />

      <TransitionSeries.Sequence durationInFrames={140}>
        <Scene3_Strikes />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 15 })}
      />

      <TransitionSeries.Sequence durationInFrames={140}>
        <Scene4_Dimona />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 15 })}
      />

      <TransitionSeries.Sequence durationInFrames={130}>
        <Scene5_Toll />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 20 })}
      />

      <TransitionSeries.Sequence durationInFrames={140}>
        <Scene6_Closing />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
