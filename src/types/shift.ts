interface Shift {
  // shift_id: number;
  id: number;
  shift_uuid: string;
  start_time: Date | string;
  end_time: Date | string;
  keterangan: string;
}

export default Shift;