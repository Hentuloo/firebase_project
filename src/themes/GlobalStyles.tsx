import { createGlobalStyle } from 'styled-components';
import Toastify from './Toastify.styled';

export default createGlobalStyle`
 html {
    font-size: 62.5%;
}

body {
    min-height: 100vh;
    margin: 0px;
    padding: 0px;
    overflow-x: hidden;
   font-family: ${({ theme }) => theme.ff[0]};
    font-weight: 300;
    font-size: ${({ theme }) => theme.fs.s};
    color:  ${({ theme }) => theme.color.black[0]};  

    ${({ theme }) => theme.mediaQuery.md}{
         font-size: 1.4rem;
    }
    ${({ theme }) => theme.mediaQuery.vlg}{
         font-size: 1.8rem;
    }
}
*,
*::after,
*::before {
    box-sizing: border-box;
}

body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
ol,
ul {
    margin: 0;
    padding: 0;
    font-weight: normal;
}

.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
}

.hide__mobile{
    display:none;
    ${({ theme }) => theme.mediaQuery.md} {
        display:block;
    }
}
.hide__deskop{
    display:block;
    ${({ theme }) => theme.mediaQuery.md} {
        display:none;
    }
}
${Toastify}
`;
