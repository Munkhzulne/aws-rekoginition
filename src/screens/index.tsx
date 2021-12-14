export * from "./home-screen";
export * from "./sign-up-screen";
export * from "./sign-in-screen";

type Props = {
  className?: string;
  children: any;
  justifyContent?: "justify-center" | "justify-between";
  alignItems?: "align-center" | "align-between";
};
export const ScreenContainer = ({
  className,
  justifyContent = "justify-center",
  alignItems = "align-center",
  children,
}: Props) => (
  <div
    className={`flex ${justifyContent} ${alignItems} h-100-vh w-100-vw ${className}`}
  >
    {children}
  </div>
);
