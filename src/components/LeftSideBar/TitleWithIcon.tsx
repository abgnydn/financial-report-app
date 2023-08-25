import { ListIcon, ArrowDownIcon, ArrowRightIcon } from "../../icons";
import { useContext } from "react";
import { DropdownContext } from "../../context/DropdownContext";

type TitleWithIconProps = {
  title: string;

  disabled: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
};
const TitleWithIcon: React.FC<TitleWithIconProps> = ({
  title,

  disabled = false,
  open,
  setOpen,
}) => {
  const { setIsVisibleMap } = useContext(DropdownContext);

  const joinedTitle = title?.split(" ").join("");

  const handleOpen = () => {
    setOpen(!open);
    setIsVisibleMap((prev) => ({
      ...prev,
      [joinedTitle]: !prev[joinedTitle],
    }));
  };
  const icon = open ? <ArrowDownIcon /> : <ArrowRightIcon />;

  return (
    <div
      className={` pt-10 pb-2 border-b ${
        disabled ? "text-gray-400 cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={!disabled ? handleOpen : undefined}
    >
      {" "}
      <div className="flex flex-row gap-3">
        {!disabled ? (
          icon
        ) : (
          <div className="w-6 h-6" /> // Placeholder for icons
        )}

        <ListIcon />
        <div className="font-bold">{title}</div>
      </div>
    </div>
  );
};

export default TitleWithIcon;
