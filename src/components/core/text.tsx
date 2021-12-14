import { ColorType } from "../../theme/colors";

type textType = {
  fontSize?: "13" | "16" | "18" | "24" | "32";
  children?: string;
  color?: ColorType;
  weight?: "400" | "500" | "600" | "700" | "800" | "900";
  className?: string;
};

export const Text = ({
  children,
  color = "black",
  weight = "600",
  fontSize = "16",
  className,
}: textType) => {
  return (
    <p
      className={`text color-${color} weight-${weight} fs-${fontSize} ${
        className || ""
      }`}
    >
      {children}
    </p>
  );
};
