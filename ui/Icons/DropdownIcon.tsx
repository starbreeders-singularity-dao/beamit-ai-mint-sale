import { CustomIconProps } from "@/interface/icons.interface";

function DropDownIcon({ IconColor, IconWidth, IconHeight }: CustomIconProps) {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={IconWidth || "20"}
        height={IconHeight || "21"}
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M5.5 8.5L12.5 15.5L19.5 8.5"
          stroke={IconColor || "#070707"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default DropDownIcon;
