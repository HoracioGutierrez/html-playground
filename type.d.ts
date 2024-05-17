declare namespace JSX {
  interface ExtendedButton
    extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    > {
    popoveraction?: string;
    popovertarget?: string;
  }

  interface ExtendDiv
    extends React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    > {
    popover?: string;
  }

  interface IntrinsicElements {
    button: ExtendedButton;
    div: ExtendDiv;
  }
}
