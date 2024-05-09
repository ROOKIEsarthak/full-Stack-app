import { Responsive, WidthProvider } from "react-grid-layout";
import CreateStudentForm from "../components/CreateStudent";
import MetricsTable from "../components/ViewMetrics";
import ViewStudentTable from "../components/ViewStudents";
import { useState } from "react";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function HomePage() {
  const [refreshStudents, setRefreshStudents] = useState<boolean>(false);
  const [refreshLogs, setRefreshLogs] = useState<boolean>(false);
  return (
    <ResponsiveGridLayout
      className="layout relative"
      rowHeight={30}
      width={1200}
      autoSize={true}
      allowOverlap={false}
    >
      <div
        className="bg-lime-700 text-white p-10 justify-center flex"
        key="a"
        data-grid={{
          x: 0,
          y: 0,
          w: 4,
          h: 15,
          minW: 3,
          maxW: 4,
          minH: 8,
          maxH: 20,
        }}
      >
        <CreateStudentForm
          setRefreshLogs={() => {
            setRefreshLogs(!refreshLogs);
          }}
          setRefreshStudent={() => {
            setRefreshStudents(!refreshStudents);
          }}
        />
      </div>
      <div
        className="bg-sky-700 text-white p-10 overflow-scroll"
        key="b"
        data-grid={{ x: 5, y: 0, w: 8, h: 15, minW: 3, maxW: 8, maxH: 20 }}
      >
        <ViewStudentTable
          refreshStudents={refreshStudents}
          setRefreshLogs={() => {
            setRefreshLogs(!refreshLogs);
          }}
        />
      </div>
      <div
        className="bg-green-500 text-white p-10 overflow-scroll"
        key="c"
        data-grid={{ x: 0, y: 11, w: 12, h: 15, minW: 1, maxW: 12, maxH: 25 }}
      >
        <MetricsTable refreshLogs={refreshLogs} />
      </div>
    </ResponsiveGridLayout>
  );
}
