/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    primary: '#4F46E5',    // Stitch Indigo Primary
                    secondary: '#0F172A',  // Stitch Deep Slate Dark
                    accent: '#A54100',     // Stitch Nagpur Orange / Rust
                    neutral: '#64748B',    // Stitch Cool Gray Neutral
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            }
        },
    },
    plugins: [],
}