import { css } from 'styled-components';

// custom styles for react-toastify/package
export default css`
  .Toastify {
    $p: &;
    &__toast {
      background: ${({ theme }) => theme.color.white[0]};
      color: ${({ theme }) => theme.color.black[0]};
      border-radius: 9px 9px 4px 4px;
      box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    }
    &__toast--error {
      .Toastify__progress-bar {
        background: ${({ theme }) => theme.color.red[0]};
      }
      &__toast--warning {
        .Toastify__progress-bar {
          background: ${({ theme }) => theme.color.yellow[0]};
        }
      }
    }
    &__close-button {
      color: ${({ theme }) => theme.color.black[0]};
    }
    &__progress-bar {
      background: ${({ theme }) => theme.color.brand[2]};
    }
  }
`;
