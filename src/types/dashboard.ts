// types.ts
export interface RoomOccupancy {
  room_id: number;
  room_name: string;
  occupancy: number;
  occupancy_percentage: number;
}

export interface AverageOccupancy {
  totalOccupancyPercentage: number;
  averageOccupancyPercentage: number;
}

export interface OccupancyMetrics {
  stdDev: number;
  range: number;
  totalCapacityUtilization: number;
}
