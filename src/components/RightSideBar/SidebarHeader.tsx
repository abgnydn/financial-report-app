interface SidebarHeaderProps {
  name: string;
  setIsOpen: (isOpen: boolean) => void;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  name,
  setIsOpen,
}) => {
  return (
    <div className="flex flex-row justify-between text-white">
      <div>{name}</div>
      <button onClick={() => setIsOpen(false)}>x</button>
    </div>
  );
};
