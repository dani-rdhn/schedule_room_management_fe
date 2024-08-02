'use client'

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { RoomOccupancy, AverageOccupancy, OccupancyMetrics } from "@/types/dashboard";

const DashboardPraktikum: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [roomOccupancy, setRoomOccupancy] = useState<RoomOccupancy[]>([]);
  const [averageOccupancy, setAverageOccupancy] = useState<AverageOccupancy>({ totalOccupancyPercentage: 0, averageOccupancyPercentage: 0 });
  const [occupancyMetrics, setOccupancyMetrics] = useState<OccupancyMetrics>({ stdDev: 0, range: 0, totalCapacityUtilization: 0 });

  const fetcher = async (url: string) => {
    try {
      const res = await fetch(url, {
        // No Authorization header needed for these endpoints
      });

      if (!res.ok) {
        throw new Error(`Error fetching data: ${res.status}`);
      }
      return res.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (status === "loading") return;

    if (!session || (session.user.role !== "admin" && session.user.role !== "laboran" && session.user.role !== "praktikum")) {
      router.push("/login");
    } else {
      const fetchData = async () => {
        try {
          const [roomOccupancyRes, averageOccupancyRes, occupancyMetricsRes] = await Promise.all([
            fetcher('http://localhost:5000/room-occupancy'),
            fetcher('http://localhost:5000/average-room-occupancy'),
            fetcher('http://localhost:5000/occupancy-metrics')
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
      {/* <Breadcrumb pageName="Dashboard" /> */}

      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Table Container */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Room Occupancy</h2>
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="py-2 px-2 border text-center">Room Name</th>
                  <th className="py-2 px-2 border text-center">Occupancy</th>
                  <th className="py-2 px-2 border text-center">Occupancy Percentage</th>
                </tr>
              </thead>
              <tbody>
                {roomOccupancy.map((room) => (
                  <tr key={room.room_id}>
                    <td className="py-2 px-2 border text-center">{room.room_name}</td>
                    <td className="py-2 px-2 border text-center">{room.occupancy}</td>
                    <td className="py-2 px-2 border text-center">{room.occupancy_percentage.toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Metrics Container */}
          <div className="flex-1">
            <div className="bg-white p-6 rounded-lg shadow-md mb-4">
              <h3 className="text-lg font-bold">Total Occupancy Percentage</h3>
              <p className="text-2xl">{averageOccupancy.totalOccupancyPercentage.toFixed(2)}%</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md mb-4">
              <h3 className="text-lg font-bold">Average Occupancy Percentage</h3>
              <p className="text-2xl">{averageOccupancy.averageOccupancyPercentage.toFixed(2)}%</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold">Standard Deviation</h3>
              <p className="text-2xl">{occupancyMetrics.stdDev.toFixed(2)}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md mt-4">
              <h3 className="text-lg font-bold">Range</h3>
              <p className="text-2xl">{occupancyMetrics.range.toFixed(2)}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md mt-4">
              <h3 className="text-lg font-bold">Total Capacity Utilization</h3>
              <p className="text-2xl">{occupancyMetrics.totalCapacityUtilization.toFixed(2)}%</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );

};

export default DashboardPraktikum;