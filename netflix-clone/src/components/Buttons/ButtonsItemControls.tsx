import "./ButtonsItemControls.css";

export const ButtonsItemControls = () => {
  return (
      <div className="buttonsItemControls">
        <div className="buttons-container">
          <div className="playOnly">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                role="img"
                viewBox="0 0 24 24"
                data-icon="PlayStandard"
                aria-hidden="true"
              >
                <path
                  d="M5 2.69127C5 1.93067 5.81547 1.44851 6.48192 1.81506L23.4069 11.1238C24.0977 11.5037 24.0977 12.4963 23.4069 12.8762L6.48192 22.1849C5.81546 22.5515 5 22.0693 5 21.3087V2.69127Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          </div>
          <div className="addList">
            <button>
              <span className="tooltip">Añadir a Mi lista</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
          <div className="like">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M 6.633 10.25 c 0.806 0 1.533 -0.446 2.031 -1.08 a 9.041 9.041 0 0 1 2.861 -2.4 c 0.723 -0.384 1.35 -0.956 1.653 -1.715 a 4.498 4.498 0 0 0 0.322 -1.672 V 2.75 a 0.75 0.75 0 0 1 0.75 -0.75 a 2.25 2.25 0 0 1 2.25 2.25 c 0 1.152 -0.26 2.243 -0.723 3.218 c -0.266 0.558 0.107 1.282 0.725 1.282 m 0 0 h 3.126 c 1.026 0 1.945 0.694 2.054 1.715 c 0.045 0.422 0.068 0.85 0.068 1.285 a 11.95 11.95 0 0 1 -2.649 7.521 c -0.388 0.482 -0.987 0.729 -1.605 0.729 H 13.48 c -0.483 0 -0.964 -0.078 -1.423 -0.23 l -3.114 -1.04 a 4.501 4.501 0 0 0 -1.423 -0.23 H 6.633 m 10.598 -9.75 M 6.633 18.5 L 6.633 10.25 Z"
                />
              </svg>
            </button>
            <div className="like-group">
              <button>
                <span className="tooltip">No es para mí</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M 7.498 15.25 H 4.372 c -1.026 0 -1.945 -0.694 -2.054 -1.715 a 12.137 12.137 0 0 1 -0.068 -1.285 c 0 -2.848 0.992 -5.464 2.649 -7.521 C 5.287 4.247 5.886 4 6.504 4 h 4.016 a 4.5 4.5 0 0 1 1.423 0.23 l 3.114 1.04 a 4.5 4.5 0 0 0 1.423 0.23 h 1.294 M 7.498 15.25 c 0.618 0 0.991 0.724 0.725 1.282 A 7.471 7.471 0 0 0 7.5 19.75 A 2.25 2.25 0 0 0 9.75 22 a 0.75 0.75 0 0 0 0.75 -0.75 v -0.633 c 0 -0.573 0.11 -1.14 0.322 -1.672 c 0.304 -0.76 0.93 -1.33 1.653 -1.715 a 9.04 9.04 0 0 0 2.86 -2.4 c 0.498 -0.634 1.226 -1.08 2.032 -1.08 h 0.384 m -10.253 1.5 H 9.7 m 8.075 -9.75 L 17.751 13.75 m 0.023 -8.25"
                  />
                </svg>
              </button>
              <button>
                <span className="tooltip">Me gusta</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M 6.633 10.25 c 0.806 0 1.533 -0.446 2.031 -1.08 a 9.041 9.041 0 0 1 2.861 -2.4 c 0.723 -0.384 1.35 -0.956 1.653 -1.715 a 4.498 4.498 0 0 0 0.322 -1.672 V 2.75 a 0.75 0.75 0 0 1 0.75 -0.75 a 2.25 2.25 0 0 1 2.25 2.25 c 0 1.152 -0.26 2.243 -0.723 3.218 c -0.266 0.558 0.107 1.282 0.725 1.282 m 0 0 h 3.126 c 1.026 0 1.945 0.694 2.054 1.715 c 0.045 0.422 0.068 0.85 0.068 1.285 a 11.95 11.95 0 0 1 -2.649 7.521 c -0.388 0.482 -0.987 0.729 -1.605 0.729 H 13.48 c -0.483 0 -0.964 -0.078 -1.423 -0.23 l -3.114 -1.04 a 4.501 4.501 0 0 0 -1.423 -0.23 H 6.633 m 10.598 -9.75 M 6.633 18.5 L 6.633 10.25 Z"
                  />
                </svg>
              </button>
              <button>
                <span className="tooltip">¡Me encanta!</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    transform="translate(-3.2,0)"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M 6.633 10.25 c 0.806 0 1.533 -0.446 2.031 -1.08 a 9.041 9.041 0 0 1 2.861 -2.4 c 0.723 -0.384 1.35 -0.956 1.653 -1.715 a 4.498 4.498 0 0 0 0.322 -1.672 V 2.75 a 0.75 0.75 0 0 1 0.75 -0.75 a 2.25 2.25 0 0 1 2.25 2.25 c 0 1.152 -0.26 2.243 -0.723 3.218 c -0.266 0.558 0.107 1.282 0.725 1.282 m 0 0 h 3.126 c 1.026 0 1.945 0.694 2.054 1.715 c 0.045 0.422 0.068 0.85 0.068 1.285 a 11.95 11.95 0 0 1 -2.649 7.521 c -0.388 0.482 -0.987 0.729 -1.605 0.729 H 13.48 c -0.483 0 -0.964 -0.078 -1.423 -0.23 l -3.114 -1.04 a 4.501 4.501 0 0 0 -1.423 -0.23 H 6.633 m 10.598 -9.75 M 6.633 18.5 L 6.633 10.25 Z"
                  />
                  <path
                    transform="translate(7.3,-1)"
                    d="M 5.33 10.25 c 0.723 -0.384 1.35 -0.956 1.653 -1.715 a 4.498 4.498 0 0 0 0.322 -1.672 V 2.75 a 0.75 0.75 0 0 1 0.75 -0.75 a 2.25 2.25 0 0 1 2.25 2.25 c 0 1.152 -0.26 2.243 -0.723 3.218 c -0.266 0.558 0.107 1.282 0.725 1.282 m 0 0 h 3.126 c 1.026 0 1.945 0.694 2.054 1.715 c 0.045 0.422 0.068 0.85 0.068 1.285 a 11.95 11.95 0 0 1 -2.649 7.521 c -0.388 0.482 -0.987 0.729 -1.605 0.729 m -1.301 0 L 11.3 20 Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="moreInfo">
          <button>
            <span className="tooltip">Episodios e información</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
        </div>
      </div>
  );
};
