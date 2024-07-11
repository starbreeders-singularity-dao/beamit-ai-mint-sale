import { CustomIconProps } from "@/interface/icons.interface";

export default function WithCheck({
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
        fill={IconColor || "#00FFFF"}
        stroke={IconColor || "#00FFFF"}
        stroke-width="2"
        stroke-miterlimit="10"
      />
      <path
        d="M14.1901 25.6532C13.9609 25.8757 13.6485 26 13.3237 26C12.999 26 12.6865 25.8757 12.4573 25.6532L5.53858 18.9693C4.82047 18.2757 4.82047 17.1512 5.53858 16.4588L6.40495 15.622C7.12305 14.9284 8.28598 14.9284 9.00408 15.622L13.3237 19.7942L24.9959 8.5202C25.714 7.8266 26.8782 7.8266 27.595 8.5202L28.4614 9.35703C29.1795 10.0506 29.1795 11.1751 28.4614 11.8675L14.1901 25.6532Z"
        fill="black"
      />
    </svg>
  );
}
