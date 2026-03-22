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

// ─── Color Palette — Jewel Tones ────────────────────────────────
const C = {
  bg: "#0c0a0e",
  cream: "#f5efe6",
  gold: "#c9a84c",
  goldLight: "#e8d5a0",
  goldDark: "#8a6d2b",
  pink: "#d4467a",
  pinkHot: "#e83e8c",
  emerald: "#2d8c6f",
  marigold: "#e8a832",
  scarlet: "#c0392b",
  burgundy: "#5c1a2a",
  plum: "#2a1528",
  textMuted: "#a8a0b0",
};

// ─── Decorative Paisley-ish Mandala SVG ─────────────────────────
const MandalaCorner: React.FC<{
  style?: React.CSSProperties;
  color?: string;
  size?: number;
}> = ({ style, color = C.gold, size = 200 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    style={{ opacity: 0.12, ...style }}
  >
    <circle cx="0" cy="0" r="180" fill="none" stroke={color} strokeWidth="0.5" />
    <circle cx="0" cy="0" r="140" fill="none" stroke={color} strokeWidth="0.5" />
    <circle cx="0" cy="0" r="100" fill="none" stroke={color} strokeWidth="0.5" />
    <circle cx="0" cy="0" r="60" fill="none" stroke={color} strokeWidth="0.8" />
    {/* Petals */}
    {Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 0.5;
      const x = Math.cos(angle) * 120;
      const y = Math.sin(angle) * 120;
      return (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="15"
          fill="none"
          stroke={color}
          strokeWidth="0.6"
        />
      );
    })}
    {Array.from({ length: 12 }, (_, i) => {
      const angle = (i / 12) * Math.PI * 0.5;
      const x = Math.cos(angle) * 80;
      const y = Math.sin(angle) * 80;
      return (
        <circle
          key={`inner-${i}`}
          cx={x}
          cy={y}
          r="8"
          fill="none"
          stroke={color}
          strokeWidth="0.4"
        />
      );
    })}
  </svg>
);

// ─── Scene 1: Brand Intro ───────────────────────────────────────
const Scene1_Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Gold line draws in from center
  const lineWidth = interpolate(frame, [0.3 * fps, 1.2 * fps], [0, 300], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Brand name entrance
  const nameScale = spring({
    frame: frame - Math.floor(0.6 * fps),
    fps,
    config: { damping: 18, stiffness: 80 },
  });

  // Tagline fade
  const taglineOpacity = interpolate(frame, [1.8 * fps, 2.4 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const taglineY = interpolate(frame, [1.8 * fps, 2.4 * fps], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "Available at Nordstrom"
  const nordstromOpacity = interpolate(frame, [3 * fps, 3.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Mandala rotation
  const mandalaRotate = interpolate(frame, [0, 10 * fps], [0, 15], {
    extrapolateRight: "clamp",
  });

  // Background shimmer
  const shimmerX = interpolate(frame, [0, 4 * fps], [-200, 1200], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${C.plum} 0%, ${C.bg} 40%, ${C.burgundy}22 100%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Corner mandalas */}
      <div style={{ position: "absolute", top: -20, left: -20, transform: `rotate(${mandalaRotate}deg)` }}>
        <MandalaCorner size={250} />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: -20,
          right: -20,
          transform: `rotate(${180 + mandalaRotate}deg)`,
        }}
      >
        <MandalaCorner size={250} />
      </div>

      {/* Shimmer sweep */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: shimmerX,
          width: 150,
          height: "100%",
          background: `linear-gradient(90deg, transparent, rgba(201,168,76,0.04), transparent)`,
          transform: "skewX(-15deg)",
        }}
      />

      {/* Top gold line */}
      <div
        style={{
          width: lineWidth,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`,
          marginBottom: 50,
        }}
      />

      {/* SANI */}
      <div
        style={{
          transform: `scale(${Math.max(0, nameScale)})`,
          opacity: Math.max(0, nameScale),
          fontSize: 110,
          fontWeight: 300,
          color: C.cream,
          fontFamily: "Georgia, 'Times New Roman', serif",
          letterSpacing: 30,
          marginBottom: 20,
        }}
      >
        SANI
      </div>

      {/* Bottom gold line */}
      <div
        style={{
          width: lineWidth,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`,
          marginBottom: 50,
        }}
      />

      {/* Tagline */}
      <div
        style={{
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          fontSize: 22,
          color: C.goldLight,
          fontFamily: "Georgia, serif",
          fontStyle: "italic",
          textAlign: "center",
          letterSpacing: 3,
          lineHeight: 1.8,
        }}
      >
        Celebrating South Asian Culture
        <br />
        Through Fashion
      </div>

      {/* Available at Nordstrom */}
      <div
        style={{
          position: "absolute",
          bottom: 140,
          opacity: nordstromOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            fontSize: 13,
            color: C.textMuted,
            fontFamily: "system-ui",
            letterSpacing: 5,
          }}
        >
          AVAILABLE AT
        </div>
        <div
          style={{
            fontSize: 28,
            color: C.cream,
            fontFamily: "system-ui",
            fontWeight: 300,
            letterSpacing: 8,
          }}
        >
          NORDSTROM
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 2: Founders ──────────────────────────────────────────
const Scene2_Founders: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Card entrance
  const cardY = interpolate(frame, [0, 0.6 * fps], [60, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cardOpacity = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Names stagger
  const name1Spring = spring({
    frame: frame - Math.floor(0.5 * fps),
    fps,
    config: { damping: 14 },
  });
  const name2Spring = spring({
    frame: frame - Math.floor(0.8 * fps),
    fps,
    config: { damping: 14 },
  });

  // Story text typewriter
  const story =
    "Two first-generation Indian American sisters from Fayetteville, NC — searching for authentic South Asian wedding attire, they couldn't find it in America. So they made it.";
  const storyChars = Math.floor(
    interpolate(frame, [1.5 * fps, 4 * fps], [0, story.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  // Forbes badge
  const forbesScale = spring({
    frame: frame - Math.floor(4.3 * fps),
    fps,
    config: { damping: 10 },
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${C.bg} 0%, ${C.plum} 100%)`,
        justifyContent: "center",
        alignItems: "center",
        padding: 50,
      }}
    >
      {/* Section label */}
      <div
        style={{
          position: "absolute",
          top: 120,
          fontSize: 14,
          color: C.gold,
          fontFamily: "system-ui",
          letterSpacing: 6,
          opacity: cardOpacity,
        }}
      >
        THE FOUNDERS
      </div>

      {/* Founder silhouette circles */}
      <div
        style={{
          display: "flex",
          gap: 30,
          marginBottom: 40,
          marginTop: -40,
          transform: `translateY(${cardY}px)`,
          opacity: cardOpacity,
        }}
      >
        {/* Niki */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${C.pink}40, ${C.gold}30)`,
              border: `2px solid ${C.gold}50`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 52,
              transform: `scale(${Math.max(0, name1Spring)})`,
            }}
          >
            <span style={{ opacity: 0.7 }}>N</span>
          </div>
          <div
            style={{
              marginTop: 16,
              fontSize: 20,
              color: C.cream,
              fontFamily: "Georgia, serif",
              opacity: Math.max(0, name1Spring),
            }}
          >
            Niki
          </div>
        </div>

        {/* Ritika */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${C.emerald}40, ${C.gold}30)`,
              border: `2px solid ${C.gold}50`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 52,
              transform: `scale(${Math.max(0, name2Spring)})`,
            }}
          >
            <span style={{ opacity: 0.7 }}>R</span>
          </div>
          <div
            style={{
              marginTop: 16,
              fontSize: 20,
              color: C.cream,
              fontFamily: "Georgia, serif",
              opacity: Math.max(0, name2Spring),
            }}
          >
            Ritika
          </div>
        </div>
      </div>

      {/* Shamdasani */}
      <div
        style={{
          fontSize: 16,
          color: C.textMuted,
          fontFamily: "system-ui",
          letterSpacing: 4,
          marginBottom: 35,
          opacity: Math.max(0, name2Spring),
        }}
      >
        SHAMDASANI
      </div>

      {/* Story */}
      <div
        style={{
          fontSize: 22,
          color: C.cream,
          fontFamily: "Georgia, serif",
          fontStyle: "italic",
          textAlign: "center",
          padding: "0 40px",
          lineHeight: 1.7,
          minHeight: 160,
          maxWidth: 500,
        }}
      >
        {story.slice(0, storyChars)}
        {storyChars < story.length && (
          <span
            style={{
              color: C.gold,
              opacity: Math.floor(frame / 10) % 2 === 0 ? 1 : 0,
            }}
          >
            |
          </span>
        )}
      </div>

      {/* Forbes badge */}
      <div
        style={{
          transform: `scale(${Math.max(0, forbesScale)})`,
          opacity: Math.max(0, forbesScale),
          marginTop: 40,
          background: `linear-gradient(135deg, ${C.goldDark}, ${C.gold})`,
          borderRadius: 14,
          padding: "14px 32px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: C.bg,
            fontFamily: "system-ui",
            letterSpacing: 1,
          }}
        >
          Forbes 30 Under 30
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 3: The Collection ────────────────────────────────────
const Scene3_Collection: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const products = [
    {
      name: "Pearl Beaded Lehenga\nCholi with Dupatta",
      color: C.pinkHot,
      colorName: "Hot Pink",
      price: "$578",
      gradientEnd: "#d4467a",
    },
    {
      name: "Mirza Choli &\nPalazzo Pants Set",
      color: C.scarlet,
      colorName: "Scarlet Fleur",
      price: "$698",
      gradientEnd: "#e74c3c",
    },
    {
      name: "Holi Lehenga Choli\nwith Dupatta",
      color: C.marigold,
      colorName: "Marigold Sunrise",
      price: "$598",
      gradientEnd: "#f39c12",
    },
    {
      name: "Cai Embroidered\nLehenga with Dupatta",
      color: C.emerald,
      colorName: "Emerald Garden",
      price: "$618",
      gradientEnd: "#27ae60",
    },
  ];

  // Title
  const titleOpacity = interpolate(frame, [0, 0.4 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: C.bg,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 100,
      }}
    >
      {/* Title */}
      <div
        style={{
          opacity: titleOpacity,
          fontSize: 18,
          color: C.gold,
          fontFamily: "system-ui",
          letterSpacing: 6,
          marginBottom: 50,
        }}
      >
        THE COLLECTION
      </div>

      {/* Product cards */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 22,
          width: "100%",
          padding: "0 45px",
        }}
      >
        {products.map((product, i) => {
          const cardSpring = spring({
            frame: frame - Math.floor((0.4 + i * 0.4) * fps),
            fps,
            config: { damping: 14 },
          });

          // Shimmer on each card
          const shimmerPos = interpolate(
            frame,
            [(0.8 + i * 0.4) * fps, (2 + i * 0.4) * fps],
            [-100, 500],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div
              key={i}
              style={{
                transform: `scale(${Math.max(0, cardSpring)}) translateX(${(1 - Math.max(0, cardSpring)) * 60}px)`,
                opacity: Math.max(0, cardSpring),
                background: `linear-gradient(135deg, ${product.color}15, ${product.gradientEnd}08)`,
                border: `1px solid ${product.color}35`,
                borderRadius: 20,
                padding: "22px 25px",
                display: "flex",
                alignItems: "center",
                gap: 20,
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Shimmer */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: shimmerPos,
                  width: 80,
                  height: "100%",
                  background: `linear-gradient(90deg, transparent, ${product.color}10, transparent)`,
                  transform: "skewX(-15deg)",
                }}
              />

              {/* Color swatch */}
              <div
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 16,
                  background: `linear-gradient(145deg, ${product.color}, ${product.gradientEnd})`,
                  flexShrink: 0,
                  boxShadow: `0 4px 20px ${product.color}40`,
                }}
              />

              {/* Info */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 18,
                    color: C.cream,
                    fontFamily: "Georgia, serif",
                    lineHeight: 1.4,
                    whiteSpace: "pre-line",
                  }}
                >
                  {product.name}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: C.textMuted,
                    fontFamily: "system-ui",
                    marginTop: 6,
                  }}
                >
                  {product.colorName}
                </div>
              </div>

              {/* Price */}
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: C.gold,
                  fontFamily: "system-ui",
                  flexShrink: 0,
                }}
              >
                {product.price}
              </div>
            </div>
          );
        })}
      </div>

      {/* Product types */}
      <div
        style={{
          marginTop: 45,
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          justifyContent: "center",
          padding: "0 50px",
          opacity: interpolate(frame, [3 * fps, 3.5 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        {["Lehengas", "Sarees", "Anarkalis", "Dupattas", "Loungewear"].map(
          (type, i) => (
            <div
              key={type}
              style={{
                border: `1px solid ${C.gold}30`,
                borderRadius: 30,
                padding: "8px 20px",
                fontSize: 15,
                color: C.goldLight,
                fontFamily: "system-ui",
              }}
            >
              {type}
            </div>
          )
        )}
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 4: The Milestone ─────────────────────────────────────
const Scene4_Milestone: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "FIRST" word slam
  const firstScale = spring({
    frame: frame - Math.floor(0.3 * fps),
    fps,
    config: { damping: 8, stiffness: 150 },
  });

  // Rest of the text reveals
  const line1Opacity = interpolate(frame, [0.8 * fps, 1.3 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line2Opacity = interpolate(frame, [1.3 * fps, 1.8 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line3Opacity = interpolate(frame, [1.8 * fps, 2.3 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Quote
  const quoteOpacity = interpolate(frame, [3 * fps, 3.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const quoteY = interpolate(frame, [3 * fps, 3.5 * fps], [25, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Gold particles
  const particles = Array.from({ length: 20 }, (_, i) => {
    const startY = 800 + (i % 5) * 200;
    const x = 60 + (i * 137) % 960;
    const speed = 0.8 + (i % 3) * 0.4;
    const y = startY - frame * speed;
    const particleOpacity =
      y > 0 && y < 1920
        ? interpolate(frame, [1.5 * fps, 2 * fps], [0, 0.4], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        : 0;
    return { x, y, opacity: particleOpacity, size: 3 + (i % 3) * 2 };
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at center, ${C.burgundy}40 0%, ${C.bg} 70%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Gold particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: C.gold,
            opacity: p.opacity,
          }}
        />
      ))}

      {/* FIRST */}
      <div
        style={{
          transform: `scale(${Math.max(0, firstScale)})`,
          opacity: Math.max(0, firstScale),
          fontSize: 90,
          fontWeight: 300,
          color: C.gold,
          fontFamily: "Georgia, serif",
          letterSpacing: 20,
          marginBottom: 30,
        }}
      >
        FIRST
      </div>

      {/* Lines */}
      <div
        style={{
          textAlign: "center",
          fontSize: 36,
          color: C.cream,
          fontFamily: "Georgia, serif",
          lineHeight: 1.8,
        }}
      >
        <div style={{ opacity: line1Opacity }}>South Asian Brand</div>
        <div style={{ opacity: line2Opacity }}>
          at{" "}
          <span style={{ fontWeight: 700, letterSpacing: 3 }}>Nordstrom</span>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          width: interpolate(frame, [2.3 * fps, 2.8 * fps], [0, 250], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          height: 1,
          background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`,
          marginTop: 40,
          marginBottom: 40,
        }}
      />

      {/* Year */}
      <div
        style={{
          opacity: line3Opacity,
          fontSize: 60,
          fontWeight: 300,
          color: C.goldLight,
          fontFamily: "Georgia, serif",
          letterSpacing: 12,
        }}
      >
        Est. 2017
      </div>

      {/* Quote */}
      <div
        style={{
          position: "absolute",
          bottom: 130,
          left: 50,
          right: 50,
          opacity: quoteOpacity,
          transform: `translateY(${quoteY}px)`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 18,
            color: C.textMuted,
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            lineHeight: 1.7,
          }}
        >
          "Growing up I never thought I would be able to find clothes for Indian
          weddings at a big department store in the US..."
        </div>
        <div
          style={{
            fontSize: 14,
            color: C.gold,
            fontFamily: "system-ui",
            marginTop: 14,
            letterSpacing: 2,
          }}
        >
          — NIKI SHAMDASANI
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 5: Shop CTA ─────────────────────────────────────────
const Scene5_CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // SANI text
  const saniScale = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 80 },
  });

  // X NORDSTROM
  const xOpacity = interpolate(frame, [0.8 * fps, 1.2 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Product type pills orbit
  const categories = [
    "Lehengas",
    "Sarees",
    "Anarkalis",
    "Dupattas",
    "Formalwear",
    "Loungewear",
  ];

  // Shop now button
  const btnScale = spring({
    frame: frame - Math.floor(2 * fps),
    fps,
    config: { damping: 12 },
  });

  // Gold border pulse
  const borderPulse = 0.3 + 0.3 * Math.sin(frame * 0.1);

  // Shimmer sweep
  const shimmerX = interpolate(frame, [2.5 * fps, 4 * fps], [-200, 1200], {
    extrapolateRight: "clamp",
  });

  // URL text
  const urlOpacity = interpolate(frame, [3 * fps, 3.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${C.plum} 0%, ${C.bg} 50%, ${C.burgundy}30 100%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Border frame */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 50,
          right: 50,
          bottom: 50,
          border: `1px solid ${C.gold}`,
          borderRadius: 30,
          opacity: borderPulse,
        }}
      />

      {/* Shimmer */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: shimmerX,
          width: 120,
          height: "100%",
          background: `linear-gradient(90deg, transparent, rgba(201,168,76,0.06), transparent)`,
          transform: "skewX(-15deg)",
        }}
      />

      {/* SANI */}
      <div
        style={{
          transform: `scale(${Math.max(0, saniScale)})`,
          opacity: Math.max(0, saniScale),
          fontSize: 100,
          fontWeight: 300,
          color: C.cream,
          fontFamily: "Georgia, serif",
          letterSpacing: 25,
          marginBottom: 10,
        }}
      >
        SANI
      </div>

      {/* x NORDSTROM */}
      <div
        style={{
          opacity: xOpacity,
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 50,
        }}
      >
        <div
          style={{
            width: 30,
            height: 1,
            background: C.gold,
          }}
        />
        <span
          style={{
            fontSize: 16,
            color: C.gold,
            fontFamily: "system-ui",
            letterSpacing: 6,
          }}
        >
          NORDSTROM
        </span>
        <div
          style={{
            width: 30,
            height: 1,
            background: C.gold,
          }}
        />
      </div>

      {/* Category pills */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          justifyContent: "center",
          maxWidth: 480,
          marginBottom: 50,
        }}
      >
        {categories.map((cat, i) => {
          const pillSpring = spring({
            frame: frame - Math.floor((1.2 + i * 0.15) * fps),
            fps,
            config: { damping: 14 },
          });

          const colors = [C.pinkHot, C.scarlet, C.marigold, C.emerald, C.gold, C.pink];

          return (
            <div
              key={cat}
              style={{
                transform: `scale(${Math.max(0, pillSpring)})`,
                opacity: Math.max(0, pillSpring),
                border: `1px solid ${colors[i]}50`,
                background: `${colors[i]}12`,
                borderRadius: 30,
                padding: "10px 24px",
                fontSize: 16,
                color: C.cream,
                fontFamily: "system-ui",
              }}
            >
              {cat}
            </div>
          );
        })}
      </div>

      {/* Shop Now button */}
      <div
        style={{
          transform: `scale(${Math.max(0, btnScale)})`,
          opacity: Math.max(0, btnScale),
          background: `linear-gradient(135deg, ${C.gold}, ${C.goldDark})`,
          borderRadius: 16,
          padding: "18px 60px",
          marginBottom: 30,
        }}
      >
        <span
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: C.bg,
            fontFamily: "system-ui",
            letterSpacing: 4,
          }}
        >
          SHOP NOW
        </span>
      </div>

      {/* URL */}
      <div
        style={{
          opacity: urlOpacity,
          fontSize: 14,
          color: C.textMuted,
          fontFamily: "system-ui",
          letterSpacing: 1,
        }}
      >
        nordstrom.com/brands/sani
      </div>
    </AbsoluteFill>
  );
};

// ─── Main Composition ───────────────────────────────────────────
export const SaniBrand: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={130}>
        <Scene1_Intro />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 20 })}
      />

      <TransitionSeries.Sequence durationInFrames={160}>
        <Scene2_Founders />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-bottom" })}
        timing={linearTiming({ durationInFrames: 18 })}
      />

      <TransitionSeries.Sequence durationInFrames={140}>
        <Scene3_Collection />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 18 })}
      />

      <TransitionSeries.Sequence durationInFrames={150}>
        <Scene4_Milestone />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 20 })}
      />

      <TransitionSeries.Sequence durationInFrames={130}>
        <Scene5_CTA />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
