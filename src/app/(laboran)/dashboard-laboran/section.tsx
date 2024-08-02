'use client'

import React, { useState, useEffect } from 'react';
import DashboardLaboran from '@/components/(laboran)/Dashboard/index';


export default function DashboardLaboranSection() {

  return (
    <div className="p-10 bg-white">
      {/* <MyCalendar /> */}
      <div className="flex items-center mt-5 gap-5 py-5">
        {/* Tombol export */}
        <DashboardLaboran />
      </div>
      {/* <DataTable columns={columnsJadwalLaboran} data={data} /> */}
    </div>
  );
}