import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/client/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#f5efe5",
        ink: "#1f2933",
        coral: "#da6a4e",
        teal: "#1f766e",
        sand: "#fffaf3",
      },
      boxShadow: {
        card: "0 20px 60px rgba(31, 41, 51, 0.12)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
} satisfies Config;

