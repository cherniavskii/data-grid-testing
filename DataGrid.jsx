import { DataGrid } from '@mui/x-data-grid';

export default function DataGridDemo() {
  return (
    <div style={{ width: 400, height: 400 }}>
      <DataGrid
        columns={[{ field: 'id' }, { field: 'name' }]}
        rows={[{ id: 1, name: 'John Doe' }]}
      />
    </div>
  )
}