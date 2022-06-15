import styled from "styled-components";

export const StyledFileCard = styled.div`
  .file-card {
    box-shadow: 0px 4px 6px -4px rgb(0 0 0 / 25%);
    margin-bottom: 0.3em;

    &.failed {
      background: ${(p) =>
        p.theme.variants.danger}26; /* background color with 15% opacity */
    }

    .file-card-body {
      display: flex;
      padding: 1em;

      .file-card-left {
        display: flex;
        align-items: center;
        width: 70%;

        svg {
          width: 48px;
          height: 48px;
        }
        video,
        img {
          border-radius: 6px;
          width: 55px;
          height: 55px;
        }
        .file-info {
          color: ${(p) => p.theme.variants.primary};
          width: 100%;
          height: 4.8em;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 4; /* number of lines to show */
          line-clamp: 4;
          -webkit-box-orient: vertical;
        }
      }

      .file-card-right {
        display: flex;
        width: 30%;
        align-items: center;
        justify-content: flex-end;

        svg {
          width: 36px;
          height: 36px;
        }

        .file-delete {
          cursor: pointer;
        }
      }
    }
  }

  @media (min-width: ${(p) => p.theme.grid.breakpoints.lg}) {
    .file-card {
      .file-card-body {
        .file-card-left {
          svg,
          video,
          img {
            width: 27px;
            height: 27px;
          }
          .file-info {
            height: 2.4em;
            -webkit-line-clamp: 2; /* number of lines to show */
            line-clamp: 2;
          }
        }
        .file-card-right {
          svg {
            width: 21px;
            height: 21px;
          }
        }
      }
    }
  }
`;

export const StyledUploading = styled.div`
  border: 8px solid ${(p) => p.theme.palette.warning};
  border-radius: 50%;
  border-top: 8px solid ${(p) => p.theme.palette.warning}73;
  width: 36px;
  height: 36px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;

  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @media (min-width: ${(p) => p.theme.grid.breakpoints.lg}) {
    width: 21px;
    height: 21px;
    border-width: 4px;
  }
`;
