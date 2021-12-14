type buttonType = {
  className?: string;
  children?: any;
  onClick?: () => void;
  type?: "button" | "text";
  disabled?: boolean;
};

export const Button = (props: buttonType) => {
  const { className, children, type = "button", ...others } = props;

  return (
    <button
      className={`${type === "button" ? "btn" : "btn-text"} ${className}`}
      {...others}
    >
      {children}
    </button>
  );
};
