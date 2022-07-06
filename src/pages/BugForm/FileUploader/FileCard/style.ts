import styled from "styled-components";

export const StyledFileCard = styled.div`
  .file-card {
    box-shadow: 0 4px 6px -4px rgb(0 0 0 / 25%);
    margin-bottom: 0.3em;

    &.failed {
      border-color: ${(p) => p.theme.variants.danger};
    }

    .file-card-body {
      display: flex;
      padding: 1em;

      .file-card-left {
        display: flex;
        align-items: flex-start;
        width: 70%;

        video,
        img,
        svg {
          width: 48px;
          height: 48px;
        }
        video,
        img {
          border-radius: 6px;
        }
        svg {
          min-width: 48px;
          min-height: 48px;
        }
        .file-card-text {
          overflow: hidden;
          .file-info {
            color: ${(p) => p.theme.variants.primary};
            width: 100%;
            height: 2.2em;
            margin-bottom: 0.2em;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2; /* number of lines to show */
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .file-error {
            color: ${(p) => p.theme.palette.danger};
            width: 100%;
            height: 1.3em;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }

      .file-card-right {
        display: flex;
        width: 30%;
        align-items: center;
        justify-content: flex-end;

        svg {
          width: 24px;
          height: 24px;
        }

        .file-delete {
          cursor: pointer;
          width: 36px;
          height: 36px;
        }
      }
    }
  }

  @media (min-width: ${(p) => p.theme.grid.breakpoints.lg}) {
    .file-card {
      .file-card-body {
        .file-card-left {
          width: 85%;
          svg,
          video,
          img {
            width: 37px;
            height: 37px;
          }
          svg {
            min-width: 37px;
            min-height: 37px;
          }
          .file-card-text {
            .file-info {
              height: 1.3em;
              margin-bottom: 0.5em;
              -webkit-line-clamp: 1; /* number of lines to show */
              line-clamp: 1;
            }
            .file-error {
            }
          }
        }
        .file-card-right {
          width: 15%;
          svg {
            width: 18px;
            height: 18px;
          }
          .file-delete {
            width: 22px;
            height: 22px;
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
