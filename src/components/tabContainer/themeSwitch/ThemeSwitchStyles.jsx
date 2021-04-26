import styled from 'styled-components'

export const PanelTabContainerRight = styled.div`
  h3 {
    font-size: 1.7rem;
    margin: 1rem 0;
  }
  .tab {
    position: relative;
    margin-right: 1.2rem;
    border-radius: 1.2rem;
    border-top: ${(props) => props.theme.style.mainBorder};
    border-left: ${(props) => props.theme.style.mainBorder};
    border-right: ${(props) => props.theme.style.mainBorder};
    top: 0.6rem;
    padding: 0.4rem 0.5rem 1rem 0.5rem;

    cursor: pointer;
    color: ${(props) => props.theme.style.buttonFontColor};
    @media (max-width: 500px) {
      top: 1.2rem;
      margin-left: 1rem;
      padding: 0.4rem 0.5rem 3rem 0.5rem;
    }
    @media (max-width: 380px) {
      top: 1.4rem;
    }
    @media (max-width: 380px) {
      top: 1.4rem;
      margin-left: 0.5rem;
    }
  }
  /* The switch - the box around the slider */
  .switch {
    border: ${(props) => props.theme.style.mainBorder};
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 6rem;
    height: 2.6rem;
    pointer-events: none;
  }
  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  /* The slider */
  .slider {
    width: 100%;
    position: absolute;
    cursor: pointer;
    pointer-events: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${(props) => props.theme.style.blueBackground};
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
  .slider:before {
    position: absolute;
    content: '';
    height: 2rem;
    width: 2rem;
    left: 0.2rem;
    right: 0.5rem;
    top: 0.1rem;
    bottom: 0;

    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
  input:checked + .slider {
    background-color: ${(props) => props.theme.style.blueBackground};
  }
  input:focus + .slider {
    box-shadow: 0 0 1px ${(props) => props.theme.style.blueBackground};
  }
  input:checked + .slider:before {
    -webkit-transform: translateX(3.3rem);
    -ms-transform: translateX(3.3rem);
    transform: translateX(3.3rem);
  }
  /* Rounded sliders */
  .slider.round {
    border-radius: 0.5rem;
  }
  .slider.round:before {
    border-radius: 0.5rem;
  }
  input[type='button']:focus,
  button:focus {
    outline: none;
  }
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    appearance: none;
  }
`
