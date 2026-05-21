// Design tokens extracted from components
// Grouped by: colors, spacing, radius, typography

export const theme = {
	colors: {
		primary: '#6C3DF4', // Main purple (logo, focus, interactive)
		primaryLight: '#8B79B7', // Checkbox checked bg
		primaryBorder: '#B9AEE2', // Checkbox checked border
		primaryBorderMuted: '#D6D1E6', // Checkbox unchecked border
		surface: '#FFFFFF', // Card/input/page background
		surfaceMuted: '#F3F3F3', // Completed/muted card bg
		surfaceInput: '#E9E9E9', // Input bg
		surfaceHover: '#F0F0F0', // Button hover
		border: '#ECECEC', // Avatar border
		text: '#1A1A1A', // Main text (fallback)
		textMuted: '#7C7C7C', // Input text
		textPlaceholder: '#B0B0B0', // Input placeholder, trash icon
		textSecondary: '#B0B0B0', // Inactive nav, trash icon
		cardShadow: 'rgba(16, 30, 54, 0.04)', // Card shadow
		accentRed: '#F4431D', // Add button
		accentRedHover: '#d63a18', // Add button hover
		accentGreenBg: '#D1FAE5', // Done badge bg (emerald-100)
		accentGreenText: '#065F46', // Done badge text (emerald-800)
		accentBlueBg: '#DBEAFE', // In Progress badge bg (blue-100)
		accentBlueText: '#1E40AF', // In Progress badge text (blue-800)
		accentSlateBg: '#F1F5F9', // Todo badge bg (slate-100)
		accentSlateText: '#334155', // Todo badge text (slate-800)
		// Add more as needed
		headerBg: 'rgba(255,255,255,0.95)', // bg-white/95
		headerBorder: '#E5E7EB', // border-slate-200
		headerText: '#6D28D9', // text-purple-700
		heroHeading: '#2c125b',
		heroSubtitle: '#494550',
	},
	spacing: {
		xs: 4,
		sm: 8,
		md: 16,
		lg: 24,
		xl: 32,
		cardPaddingX: 24, // px-6
		cardPaddingY: 16, // py-4
		inputPaddingX: 24, // px-6
		inputPaddingY: 12, // py-3
		buttonPaddingX: 28, // px-7
		buttonPaddingY: 12, // py-3
		gap: 16, // gap-4
		cardGap: 16, // mb-2, gap-4
		cardMinHeight: 64, // minHeight: 64
		checkbox: 28, // w-7 h-7
		avatar: 36, // w-9 h-9
		maxInputWidth: 544, // max-w-[544px]
	},
	radius: {
		card: 24, // rounded-3xl (24px)
		input: 12, // rounded-xl (12px)
		button: 12, // rounded-xl (12px)
		checkbox: 8, // rounded-lg (8px)
		badge: 9999, // rounded-full
		navUnderline: 4, // rounded (default 4px)
		avatar: 9999, // rounded-full
	},
	typography: {
		fontFamily: 'Inter, sans-serif',
		heading: {
			lg: { fontSize: 20, fontWeight: 600 }, // text-lg font-semibold
		},
		body: {
			base: { fontSize: 16, fontWeight: 400 }, // text-base
			sm: { fontSize: 14, fontWeight: 400 }, // text-sm
			xs: { fontSize: 12, fontWeight: 400 }, // text-xs
		},
		label: {
			base: { fontSize: 16, fontWeight: 600 }, // font-semibold
			sm: { fontSize: 14, fontWeight: 500 }, // font-medium
			xs: { fontSize: 12, fontWeight: 600 }, // font-semibold
		},
		fontWeight: {
			regular: 400,
			medium: 500,
			semibold: 600,
			bold: 700,
		},
		letterSpacing: {
			badge: 0.18, // tracking-[0.18em]
		},
		// Add more as needed
	},
} as const

export type Theme = typeof theme
