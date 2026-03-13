module.exports = {
    important: false,

    // ✅ CRITICAL: Optimized content paths for PurgeCSS
    content: [
        "src/views/**/*.twig",
        "src/assets/js/**/*.js",
    ],

    // ✅ Safelist ONLY dynamic/necessary classes
    safelist: [
        // Salla icons (dynamically added)
        {
            pattern: /^sicon-/,
        },

        // ✅ Primary colors (used in @apply and dynamic content)
        'bg-primary-50', 'bg-primary-100', 'bg-primary-200', 'bg-primary-300',
        'bg-primary-400', 'bg-primary-500', 'bg-primary-600', 'bg-primary-700',
        'bg-primary-800', 'bg-primary-900',
        'text-primary-50', 'text-primary-100', 'text-primary-200', 'text-primary-300',
        'text-primary-400', 'text-primary-500', 'text-primary-600', 'text-primary-700',
        'text-primary-800', 'text-primary-900',
        'border-primary-50', 'border-primary-100', 'border-primary-200', 'border-primary-300',
        'border-primary-400', 'border-primary-500', 'border-primary-600', 'border-primary-700',
        'border-primary-800', 'border-primary-900',
        'ring-primary-500', 'ring-primary-600',

        // ✅ Secondary colors
        'bg-secondary-50', 'bg-secondary-600', 'bg-secondary-700',
        'text-secondary-600', 'text-secondary-700',
        'border-secondary-500', 'border-secondary-600',

        // ✅ Accent colors
        'bg-accent-500', 'bg-accent-600',
        'text-accent-500', 'text-accent-600',
        'border-accent-500',

        // Status badges
        'bg-green-500', 'bg-green-600',
        'bg-red-500', 'bg-red-600',
        'bg-yellow-500', 'bg-yellow-600',
        'bg-blue-500', 'bg-blue-600',
        'text-green-600', 'text-green-700',
        'text-red-600', 'text-red-700',
        'text-yellow-600', 'text-yellow-700',
        'text-blue-600', 'text-blue-700',

        // Animation classes
        'animate-spin',
        'animate-pulse',
        'animate-bounce',
        'animate-fade-in',
        'animate-slide-up',
        'animate-scale-in',
        'animate-float',

        // Restaurant-specific dynamic classes
        'bg-restaurant-500', 'bg-restaurant-600',
        'text-restaurant-500', 'text-restaurant-600',
        'border-restaurant-500', 'border-restaurant-600',
        'hover:bg-restaurant-600', 'hover:bg-restaurant-700',

        // Notification classes (Salla notifications)
        'notification-success',
        'notification-error',
        'notification-warning',
        'notification-info',

        // Common hover states
        'hover:bg-primary-700',
        'hover:text-primary-600',
        'hover:border-primary-600',
    ],

    darkMode: 'class', // or 'media' or 'class'
    theme   : {
        container : {
            center : true,
            padding: '10px',
            screens: {
                '2xl': "1280px"
            }
        },
        fontFamily: {
            sans: [
                'var(--font-main)',
                '-apple-system',
                'BlinkMacSystemFont',
            ],
            primary: "var(--font-main)"
        },
        extend    : {
            transitionTimingFunction: {
              'elastic': 'cubic-bezier(0.55, 0, 0.1, 1)',
            },
            gridTemplateColumns: {
                'auto-fill'  : 'repeat(auto-fill, 290px)',
            },
            colors             : {
                'dark'         : '#1D1F1F',
                'darker'       : '#0E0F0F',
                'danger'       : '#AE0A0A',
                'primary-dark' : 'var(--color-primary-dark)',

                // Restaurant-specific color palette
                'restaurant': {
                    50: '#FEF3C7',
                    100: '#FDE68A',
                    200: '#FCD34D',
                    300: '#FBBF24',
                    400: '#F59E0B',
                    500: '#D97706',  // Main brand color (Amber)
                    600: '#B45309',
                    700: '#92400E',
                    800: '#78350F',
                    900: '#451A03',
                },
                'restaurant-secondary': {
                    50: '#ECFDF5',
                    100: '#D1FAE5',
                    200: '#A7F3D0',
                    300: '#6EE7B7',
                    400: '#34D399',
                    500: '#10B981',
                    600: '#059669',  // Fresh, appetizing green
                    700: '#047857',
                    800: '#065F46',
                    900: '#064E3B',
                },
                'spicy': {
                    DEFAULT: '#EF4444',  // For spicy/hot indicators
                    light: '#FCA5A5',
                    dark: '#DC2626',
                },
                'neutral-warm': {
                    50: '#FAFAF9',
                    100: '#F5F5F4',
                    200: '#E7E5E4',
                    300: '#D6D3D1',
                    400: '#A8A29E',
                    500: '#78716C',
                    600: '#57534E',
                    700: '#44403C',
                    800: '#292524',
                    900: '#1C1917',
                }
            },
            spacing: {
              '3.75': '15px',
              '7.5' : '30px',
              '58'  : '232px',
              '62'  : '248px',
              '100' : '28rem',
              '116' : '464px',
              '132' : '528px',
              '200' : '800px',
            },
            borderRadius       : {
                'large': '22px',
                'big'  : '40px',
                'tiny' : '3px',
                DEFAULT: '.75rem',
            },
            fontSize           : {
                'icon-lg'   : '33px',
                'xxs'       : '10px',
                'xxxs'      : '8px',
                'title-size': '42px',
                '22px'      : '22px',
            },
            lineHeight         : {
                '12': '3rem',
                '14': '3.5rem',
                '16': '4rem',
                '18': '4.5rem',
                '20': '5rem',
            },
            boxShadow          : {
                'default' : '5px 10px 30px #2B2D340D;',
                'top'     : '0px 0px 10px #0000001A;',
                'md'      : '5px 10px 99px #2B2D340D',
                'dropdown'      : '0 4px 8px rgba(161, 121, 121, 0.07)',
                'light'   : '0px 4px 15px rgba(1, 1, 1, 0.06)',
                'huge'    : '0px 3px 6px #00000029',
                'progress': '0 5px 15px rgba(92, 213, 196, 0.4)',
                'mobile': 'rgb(0 0 0 / 9%) 0px 2px 1px, rgb(0 0 0 / 9%) 0px 4px 2px, rgb(0 0 0 / 9%) 0px 8px 4px, rgb(0 0 0 / 9%) 0px 16px 18px, rgb(0 0 0 / 9%) -15px 10px 7px, rgb(0 0 0 / 9%) -20px 10px 20px, rgb(0 0 0 / 9%) -20px 10px 20px, rgb(0 0 0 / 9%) -25px 20px 20px',

                // Restaurant-specific shadows
                'dish-card': '0 4px 6px -1px rgba(217, 119, 6, 0.1), 0 2px 4px -1px rgba(217, 119, 6, 0.06)',
                'dish-card-hover': '0 10px 15px -3px rgba(217, 119, 6, 0.2), 0 4px 6px -2px rgba(217, 119, 6, 0.1)',
                'modal': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                'menu-sticky': '0 10px 30px rgba(0, 0, 0, 0.08)',
            },
            width              : {
                '18': '4.5rem',
                '22': '5.5rem',
                '74': '18.5rem',
                '76': '19rem',
                '78': '19.5rem',
            },
            height             : {
                'banner'        : '200px',
                'lg-banner'     : '428px',
                'full-banner'   : '600px',
                '500'           : '500px',
                '460'           : '460px',
            },
            minWidth           : {
                '1/4': '25%',
                '1/2': '50%',
                '3/4': '75%',
            },
            maxWidth           : {
                '1/4': '25%',
                '1/2': '50%',
                '3/4': '75%',
            },
            zIndex             : {
                '1': '1',
                '2': '2',
                '-1': '-1',
            },
            screens            : {
                'xxs': {'min': '380px', 'max': '479px'},
                'xs': '480px',
            },
            backgroundOpacity  : {
                '05': '0.05',
            },
            transitionProperty : {
                'height': 'height'
            },
            keyframes: {
                slideUpFromBottom: {
                    '0%': { transform: 'translateY(100%)', opacity: '0' },
                    '100%': { transform: 'translateY(0%)', opacity: '1' },
                },
                slideDownFromBottom: {
                    '0%': { transform: 'translateY(0%)', opacity: '1' },
                    '100%': { transform: 'translateY(100%)', opacity: '0' },
                },
                // Restaurant-specific animations
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            },
            animation: {
                slideUpFromBottom: 'slideUpFromBottom .6s linear',
                slideDownFromBottom: 'slideDownFromBottom .6s linear',

                // Restaurant animations
                'fade-in': 'fadeIn 0.3s ease-in-out',
                'slide-up': 'slideUp 0.4s ease-out',
                'scale-in': 'scaleIn 0.3s ease-out',
                'float': 'float 3s ease-in-out infinite',
            },
        },
    },
    corePlugins: {
      outline: false,
    },
    plugins: [
      require('@salla.sa/twilight-tailwind-theme'),
      require('@tailwindcss/forms'),
      require('@tailwindcss/line-clamp'),
    ],
}
