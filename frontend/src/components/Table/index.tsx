import { useMantineTheme } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { DataTableColumn } from "mantine-datatable";

interface TableProps<T> {
  tablePage: number;
  tableRenderedData: T[];
  totalRecords: number;
  TableColumns: DataTableColumn<T>[];
  isFetchingPage: boolean;
  setTableRenderedData: (values: T[]) => void;
  openTableDeleteModal?: () => void;
  closeTableDeleteModal?: () => void;
  handleRowClick: (values: T) => void;
  handlePageChange: (page: number) => void;
}

export function Table<T>(props: TableProps<T>): JSX.Element {
  const {
    tablePage,
    tableRenderedData,
    TableColumns,
    totalRecords,
    handleRowClick,
    handlePageChange,
    isFetchingPage
  } = props;

  const theme = useMantineTheme();

  return (
    <>
      <DataTable
        striped
        withColumnBorders
        highlightOnHover
        minHeight={400}
        height={400}
        noRecordsText="Nenhum registro a ser listado"
        records={tableRenderedData}
        totalRecords={totalRecords}
        columns={TableColumns}
        shadow={theme.shadows.xl}
        recordsPerPage={100}
        page={tablePage}
        onPageChange={(page) => handlePageChange(page)}
        onRowClick={({ record }) => handleRowClick(record)}
        fetching={isFetchingPage}
        loaderType="oval"
        loaderSize="md"
        loaderColor="blue"
        loaderBackgroundBlur={3}
        className="w-full break-words text-left"
      />
    </>
  );
}
