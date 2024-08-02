'use client'

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { RoomOccupancy, AverageOccupancy, OccupancyMetrics } from "@/types/dashboard";

const Chart = dynamic(() => import('react-chartjs-2').then(mod => mod.Chart), { ssr: false });

const DashboardPraktikum: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [roomOccupancy, setRoomOccupancy] = useState<RoomOccupancy[]>([]);
  const [averageOccupancy, setAverageOccupancy] = useState<AverageOccupancy>({ totalOccupancyPercentage: 0, averageOccupancyPercentage: 0 });
  const [occupancyMetrics, setOccupancyMetrics] = useState<OccupancyMetrics>({ stdDev: 0, range: 0, totalCapacityUtilization: 0 });

  useEffect(() => {
    if (status === "loading") return;

    if (!session || (session.user.role !== "admin" && session.user.role !== "Praktikum" && session.user.role !== "praktikum")) {
      router.push("/login");
    } else {
      const fetchData = async () => {
        try {
          const [roomOccupancyRes, averageOccupancyRes, occupancyMetricsRes] = await Promise.all([
            fetch('http://localhost:5000/room-occupancy').then(res => res.json()),
            fetch('http://localhost:5000/average-room-occupancy').then(res => res.json()),
            fetch('http://localhost:5000/occupancy-metrics').then(res => res.json())
          ]);

          setRoomOccupancy(roomOccupancyRes.occupancy);
          setAverageOccupancy(averageOccupancyRes);
          setOccupancyMetrics(occupancyMetricsRes);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, [status, session, router]);

  if (status === "loading") return <div>Loading...</div>;

  return (
    <>
      <Breadcrumb pageName="Dashboard" />

      <div className="w-full max-w-full bg-white border rounded-sm border-gray-300 shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Room Occupancy</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Room Name</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Occupancy</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Occupancy Percentage</th>
              </tr>
            </thead>
            <tbody>
              {roomOccupancy.map((room) => (
                <tr key={room.room_id}>
                  <td className="px-6 py-4 border-b border-gray-300">{room.room_name}</td>
                  <td className="px-6 py-4 border-b border-gray-300">{room.occupancy}</td>
                  <td className="px-6 py-4 border-b border-gray-300">{room.occupancy_percentage.toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Average Occupancy</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-100 rounded">
            <p className="text-gray-700">Total Occupancy Percentage: {averageOccupancy.totalOccupancyPercentage.toFixed(2)}%</p>
          </div>
          <div className="p-4 bg-gray-100 rounded">
            <p className="text-gray-700">Average Occupancy Percentage: {averageOccupancy.averageOccupancyPercentage.toFixed(2)}%</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Occupancy Metrics</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-gray-100 rounded">
            <p className="text-gray-700">Standard Deviation: {occupancyMetrics.stdDev.toFixed(2)}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded">
            <p className="text-gray-700">Range: {occupancyMetrics.range.toFixed(2)}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded">
            <p className="text-gray-700">Total Capacity Utilization: {occupancyMetrics.totalCapacityUtilization.toFixed(2)}%</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Occupancy Chart</h2>
        <div className="chart-container">
          <Chart
            type="bar"
            data={{
              labels: roomOccupancy.map(item => item.room_name),
              datasets: [
                {
                  label: 'Occupancy Percentage',
                  data: roomOccupancy.map(item => item.occupancy_percentage),
                  backgroundColor: 'rgba(75, 192, 192, 0.6)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1,
                }
              ]
            }}
            options={{
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: function (value) {
                      return value + "%";
                    }
                  }
                }
              }
            }}
          />
        </div>
      </div>
    </>
  );
};

export default DashboardPraktikum;
