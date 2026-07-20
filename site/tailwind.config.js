/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
        "on-secondary-fixed-variant": "#6b00b0",
        "tertiary-fixed": "#7df4ff",
        "on-tertiary-container": "#002f33",
        "surface-container-high": "#2a2a2a",
        "on-tertiary-fixed-variant": "#004f54",
        "primary-fixed": "#d8e2ff",
        "secondary-container": "#9d05ff",
        "inverse-on-surface": "#313030",
        "error": "#ffb4ab",
        "surface-container-highest": "#353534",
        "on-primary-container": "#00285c",
        "primary": "#adc6ff",
        "on-primary-fixed-variant": "#004493",
        "outline-variant": "#414755",
        "tertiary-fixed-dim": "#00dbe9",
        "secondary-fixed": "#f1daff",
        "on-primary": "#002e69",
        "primary-fixed-dim": "#adc6ff",
        "surface-dim": "#131313",
        "secondary": "#dfb7ff",
        "surface": "#131313",
        "inverse-primary": "#005bc1",
        "on-surface": "#e5e2e1",
        "outline": "#8b90a0",
        "on-background": "#e5e2e1",
        "on-secondary-container": "#f7e6ff",
        "surface-container": "#201f1f",
        "on-secondary": "#4b007e",
        "on-surface-variant": "#c1c6d7",
        "surface-container-lowest": "#0e0e0e",
        "on-tertiary": "#00363a",
        "background": "#131313",
        "on-error": "#690005",
        "surface-variant": "#353534",
        "tertiary-container": "#00a0aa",
        "primary-container": "#4b8eff",
        "error-container": "#93000a",
        "on-primary-fixed": "#001a41",
        "on-secondary-fixed": "#2d004f",
        "on-tertiary-fixed": "#002022",
        "surface-tint": "#adc6ff",
        "surface-container-low": "#1c1b1b",
        "surface-bright": "#3a3939",
        "inverse-surface": "#e5e2e1",
        "tertiary": "#00dbe9",
        "on-error-container": "#ffdad6",
        "secondary-fixed-dim": "#dfb7ff"
      },
      "borderRadius": {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      "spacing": {
        "unit": "4px",
        "margin-mobile": "20px",
        "margin-desktop": "64px",
        "gutter": "24px",
        "container-max": "1440px"
      },
      "fontFamily": {
        "display-lg": ["Inter"],
        "headline-lg": ["Inter"],
        "label-sm": ["JetBrains Mono"],
        "body-md": ["Inter"],
        "headline-lg-mobile": ["Inter"]
      },
      "fontSize": {
        "display-lg": ["72px", { "lineHeight": "80px", "letterSpacing": "-0.04em", "fontWeight": "700" }],
        "headline-lg": ["40px", { "lineHeight": "48px", "letterSpacing": "-0.02em", "fontWeight": "600" }],
        "label-sm": ["12px", { "lineHeight": "16px", "letterSpacing": "0.1em", "fontWeight": "500" }],
        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
        "headline-lg-mobile": ["32px", { "lineHeight": "40px", "fontWeight": "600" }]
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
