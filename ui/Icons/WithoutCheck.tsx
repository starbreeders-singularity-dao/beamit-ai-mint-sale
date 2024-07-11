import { CustomIconProps } from "@/interface/icons.interface";

export default function WithoutCheck({
  IconColor,
  IconWidth,
  IconHeight
}: CustomIconProps) {
  return (
    <svg
      width={IconWidth || "35"}
      height={IconHeight || "35"}
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M33.53 1H1V33.53H33.53V1Z"
        stroke={IconColor || "#00FFFF"}
        stroke-width="2"
        stroke-miterlimit="10"
      />
    </svg>
  );
}
