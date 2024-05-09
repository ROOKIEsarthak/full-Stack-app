import { useEffect, useState } from "react";
import { type Metric } from "../types/metric";

export default function MetricsTable({
  refreshLogs,
}: {
  refreshLogs: boolean;
}) {
  const [metrics, setMetrics] = useState<Metric[]>();
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    const fetchMetrics = async () => {
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/v1/metrics",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        setMetrics(data);
        setError(undefined);
      } else {
        // const data = await response.json();
        setError("Failed to fetch metrics : ");
      }
    };
    fetchMetrics();
  }, [refreshLogs]);

  if (error) {
    return <div>{error}</div>;
  }

  if (metrics?.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th>Model</th>
          <th>Count</th>
          <th>Created At</th>
          <th>Updated At</th>
        </tr>
      </thead>
      <tbody>
        {metrics?.map((metric) => (
          <tr key={metric.id}>
            <td>{metric.model}</td>
            <td>{metric.count}</td>
            <td>{metric.createdAt}</td>
            <td>{metric.updatedAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
