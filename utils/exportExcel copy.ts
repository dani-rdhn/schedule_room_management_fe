import * as XLSX from 'xlsx';

export const exportToExcel = (data: any[], fileName: string) => {
  // Buat workbook dan worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = {
    Sheets: { 'data': worksheet },
    SheetNames: ['data'],
  };

  // Mengonversi workbook menjadi file Excel
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  // Buat objek blob untuk file Excel
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

  // Buat tautan unduhan untuk file Excel
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${fileName}.xlsx`;
  a.click();

  // Bersihkan objek URL
  window.URL.revokeObjectURL(url);
};
