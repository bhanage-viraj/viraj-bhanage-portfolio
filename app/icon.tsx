import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F7F7F5",
          color: "#5E6AD2",
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: "-0.04em",
        }}
      >
        VB
      </div>
    ),
    { ...size },
  );
}
