/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("nativewind/preset")],
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "tertiary-fixed-dim": "#66dd8b",
        "inverse-primary": "#afc8f0",
        "outline-variant": "#c4c6cf",
        "surface-tint": "#476083",
        "on-tertiary-fixed-variant": "#005227",
        "surface-dim": "#dadada",
        "secondary-fixed-dim": "#c7c6c4",
        "on-surface": "#1a1c1c",
        "primary": "#000613",
        "surface-container-low": "#f3f3f4",
        "inverse-surface": "#2f3131",
        "on-tertiary-fixed": "#00210c",
        "surface-container-high": "#e8e8e8",
        "tertiary-fixed": "#83fba5",
        "error-container": "#ffdad6",
        "surface-container-highest": "#e2e2e2",
        "inverse-on-surface": "#f0f1f1",
        "error": "#ba1a1a",
        "on-tertiary": "#ffffff",
        "tertiary": "#000802",
        "on-secondary": "#ffffff",
        "surface-container": "#eeeeee",
        "surface": "#f9f9f9",
        "on-primary": "#ffffff",
        "secondary-container": "#e0dfdd",
        "on-surface-variant": "#43474e",
        "primary-container": "#001f3f",
        "surface-bright": "#f9f9f9",
        "surface-container-lowest": "#ffffff",
        "on-primary-fixed-variant": "#2f486a",
        "background": "#f9f9f9",
        "on-secondary-fixed": "#1b1c1b",
        "on-tertiary-container": "#119b50",
        "on-background": "#1a1c1c",
        "outline": "#74777f",
        "tertiary-container": "#00250e",
        "surface-variant": "#e2e2e2",
        "on-error": "#ffffff",
        "on-secondary-fixed-variant": "#464746",
        "secondary": "#5e5e5d",
        "primary-fixed": "#d4e3ff",
        "on-primary-container": "#6f88ad",
        "secondary-fixed": "#e3e2e0",
        "on-secondary-container": "#626361",
        "on-error-container": "#93000a",
        "primary-fixed-dim": "#afc8f0",
        "on-primary-fixed": "#001c3a"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "base": "8px",
        "xs": "4px",
        "md": "24px",
        "sm": "12px",
        "container-max": "1440px",
        "lg": "48px",
        "xl": "80px",
        "gutter": "24px"
      },
      fontFamily: {
        "headline-xl": ["Inter"],
        "body-lg": ["Inter"],
        "headline-md": ["Inter"],
        "label-sm": ["Inter"],
        "headline-lg": ["Inter"],
        "body-md": ["Inter"],
        "label-md": ["Inter"]
      },
      fontSize: {
        "headline-xl": ["40px", {"lineHeight": "48px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
        "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
        "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
        "label-sm": ["12px", {"lineHeight": "16px", "fontWeight": "500"}],
        "headline-lg": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "600"}],
        "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
        "label-md": ["14px", {"lineHeight": "20px", "letterSpacing": "0.05em", "fontWeight": "600"}]
      }
    }
  }
}
