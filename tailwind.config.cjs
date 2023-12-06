function createSpacing() {
  const spacing = {}
  for (let i = 0.5; i <= 187.5; i += 0.5) {
    spacing[i] = `${(i * 0.04).toFixed(2)}rem`
  }
  return spacing
}

function createBorderRadius() {
  const borderRadius = {}
  for (let i = 0.5; i <= 10; i += 0.5) {
    borderRadius[i] = `${i * 0.04}rem`
  }
  return borderRadius
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    fontSize: {
      'xs': ['0.12rem', '0.16rem'],
      'sm': ['0.14rem', '0.2rem'],
      'base': ['0.16rem', '0.24rem'],
      'lg': ['0.18rem', '0.28rem'],
      'xl': ['0.2rem', '0.28rem'],
      '2xl': ['0.24rem', '0.32rem'],
      '2.5xl': ['0.28rem', '0.32rem'],
      '3xl': ['0.3rem', '0.36rem'],
      '3.5xl': ['0.32rem', '0.36rem'],
      '4xl': ['0.36rem', '0.4rem'],
      '5xl': ['0.48rem', '1'],
      '6xl': ['0.6rem', '1'],
      '7xl': ['0.72rem', '1'],
      '8xl': ['0.96rem', '1'],
      '9xl': ['1.28rem', '1'],
    },
    // 1 = 0.04rem
    spacing: {
      '0': '0px',
      'px': '1px',
      ...createSpacing(),
    },
    extend: {
      colors: {
        primary: '#348379'
      },
      borderRadius: {
        ...createBorderRadius(),
      },
    },
  },
  plugins: [],
}
