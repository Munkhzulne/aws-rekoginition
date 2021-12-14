import { useEffect, useRef, useState } from "react";
import { ColorType } from "../../theme/colors";
import { Text } from ".";

type inputType = {
  placeholder?: string;
  onChange?: (e: any) => void;
  className?: string;
  value?: string;
  error?: boolean;
  disabled?: boolean;
  fontSize?: "13" | "16" | "18" | "24" | "32";
  weight?: "400" | "500" | "600" | "700" | "800" | "900";
  color?: ColorType;
  maxLength?: any;
  pattern?: any;
  size?: any;
  type?:
    | "text"
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "email"
    | "file"
    | "image";
  accept?: string;
  inputEl?: React.Ref<any>;
};

export const FileInput = ({
  onFileSelect,
  label,
}: {
  onFileSelect: any;
  label?: string;
}) => {
  const [selectedFile, setSelectedFile] = useState(undefined);
  const inputEl = useRef<any>(null);

  useEffect(() => {
    if (selectedFile && inputEl.current) {
      inputEl.current.style.backgroundImage = `url('${URL.createObjectURL(
        selectedFile
      )}')`;
    }
  }, [selectedFile]);

  return (
    <label className="w-20-vw h-20-vw image pointer" ref={inputEl}>
      {!selectedFile && (
        <Text className="z-1" fontSize="24">
          {label}
        </Text>
      )}
      <Input
        onChange={(e) => {
          onFileSelect(e.target.files[0]);
          setSelectedFile(e.target.files[0]);
        }}
        type="file"
        accept="image/*"
        placeholder="hello"
        className="z-2"
      />
    </label>
  );
};

export const Input = (props: inputType) => {
  const {
    className,
    error,
    fontSize = "16",
    weight = "400",
    color = "black",
    inputEl,
    ...others
  } = props;
  return (
    <input
      ref={inputEl}
      className={`input ${
        error ? "input-error" : ""
      } fs-${fontSize} weight-${weight} color-${color} ${className || ""}`}
      {...others}
    />
  );
};
