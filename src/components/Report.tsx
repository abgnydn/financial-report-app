import { useGetAllDataQuery } from "../hooks/useGetAllDataQuery";
import LeftSideBar from "./LeftSideBar/LeftSideBar";
import RightSideBar from "./RightSideBar/RightSideBar";
import Table from "./Table/Table";

const Report: React.FC = () => {
  const data = useGetAllDataQuery();

  if (!data) {
    return null;
  }

  return (
    <>
      <div>
        <div className="flex h-fit">
          <LeftSideBar data={data} />
          <Table data={data} />
        </div>
      </div>
      <RightSideBar />
    </>
  );
};

export default Report;
