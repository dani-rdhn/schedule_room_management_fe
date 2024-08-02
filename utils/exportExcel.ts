import * as XLSX from 'xlsx';

export const exportToExcel = (columns: any[], data: any[], fileName: string) => {
  const formattedData = data.map((item) => {
    const formattedItem: any = {};
    columns.forEach((column) => {
      if (column.accessorKey) {
        formattedItem[column.header] = item[column.accessorKey];
      } else if (column.accessorFn) {
        formattedItem[column.header] = column.accessorFn(item);
      }
    });
    return formattedItem;
  });

  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'data');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${fileName}.xlsx`;
  a.click();

  window.URL.revokeObjectURL(url);
};
