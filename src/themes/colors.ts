export interface ThemeColor {
  color: {
    brand: [string, string, string, string, string];
    brandSecond: [string, string, string];
    white: [string, string, string];
    black: [string, string, string, string];
    gray: [string, string];
    red: [string];
    yellow: [string];
    gradients: [string];
    chart: [string, string, string];
    contrastWhite: [string];
    contrastBrand: [string, string];
    shadow: [string, string];
    buttonColor: [string];
    buttonShadow: [string, string];
    points: {
      RED: string;
      GREEN: string;
      DEFAULT: string;
    };
  };
}

export interface ThemeColorByMode {
  light: ThemeColor;

  dark: ThemeColor;
}

const colors: ThemeColorByMode = {
  light: {
    color: {
      brand: [
        '#69C397',
        '#3A7759',
        'rgba(58, 119, 89, 0.4)',
        '#6B9983',
        '#3A7759',
      ],
      brandSecond: ['#FF9552', '#DC7738', '#B2612E'],
      white: ['rgb(255, 255, 255)', 'rgb(255, 255, 255)', '#E7C8B5'],
      black: ['#4F4F4F', '#2D2D2D', '#4F4F4F', '#727272'],
      gray: ['rgb(220, 220, 220)', 'rgb(119, 119, 119)'],
      red: ['#d53035'],
      yellow: ['#e6a700'],
      gradients: [
        ' linear-gradient(to right, rgba(15,91,138,1) 0%, rgba(143,204,240,1) 41%, rgba(255,139,66,1) 64%, rgba(170,92,44,1) 100%);',
      ],
      chart: ['#69C397', 'rgb(119, 119, 119)', 'rgb(220, 220, 220)'],
      contrastWhite: ['rgb(255, 255, 255)'],
      contrastBrand: ['#6B9983', 'rgba(58, 119, 89, 0.4)'],
      shadow: [
        '0px 0px 8px rgba(0, 0, 0, 0.1)',
        '0px 0px 8px rgba(0, 0, 0, 0.1)',
      ],
      buttonColor: ['#6B9983'],
      buttonShadow: [`0px 0px 3px #15633e`, `0px 0px 1px #15633e`],
      points: {
        RED: '#EC7D7D',
        GREEN: '#3A7759',
        DEFAULT: '#A9ABAA',
      },
    },
  },
  dark: {
    color: {
      brand: [
        'rgba(58, 119, 89, 0.4)',
        '#6B9983',
        '#69C397',
        '#3A7759',
        '#3A7759',
      ],
      brandSecond: ['#FF9552', '#DC7738', '#B2612E'],
      white: ['#242424', '#242424', '#E7C8B5'],
      black: [
        'rgb(255, 255, 255)',
        'rgb(255, 255, 255)',
        'rgb(255, 255, 255)',
        '#727272',
      ],
      gray: ['#000', 'rgb(119, 119, 119)'],
      red: ['rgb(255, 255, 255)'],
      yellow: ['#e6a700'],
      gradients: [
        ' linear-gradient(to right, rgba(15,91,138,1) 0%, rgba(143,204,240,1) 41%, rgba(255,139,66,1) 64%, rgba(170,92,44,1) 100%);',
      ],
      chart: ['#69C397', 'rgb(119, 119, 119)', 'rgb(220, 220, 220)'],
      contrastWhite: ['rgb(255, 255, 255)'],
      contrastBrand: ['rgb(255, 255, 255)', 'rgb(119, 119, 119)'],
      shadow: [
        `5px 5px 5px rgb(19,19,19), -1px -3px 5px rgba(103,103,103,0.84)`,
        `2px 2px 5px rgb(19, 19, 19),0px -1px 5px rgb(19, 19, 19)`,
      ],
      buttonColor: ['rgb(35, 35, 35)'],
      buttonShadow: [
        `3px 3px 5px rgb(19,19,19), -1px -3px 5px rgba(134, 134, 134, 0.57)`,
        `3px 3px 5px rgb(19,19,19) inset, -1px -3px 5px rgba(134,134,134,0.57) inset`,
      ],
      points: {
        RED: '#9D3030',
        GREEN: '#3A7759',
        DEFAULT: '#A9ABAA',
      },
    },
  },
};
export default colors;
