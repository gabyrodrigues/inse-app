import { useEffect, useState } from "react";
import { Flex, Loader, useMantineTheme } from "@mantine/core";

import { DrawColumns } from "@pages/Dashboard/DrawColumns";
import { Table } from "@components/Table";
import { InseDataItem } from "@utils/data";
import { api } from "@services/api";

export default function DataContainer() {
  const [currentTablePage, setCurrentTablePage] = useState(1);
  const [tableRenderedData, setTableRenderedData] = useState<InseDataItem[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingPage, setIsFetchingPage] = useState(false);

  const theme = useMantineTheme();

  function handleRowClick(values: InseDataItem) {
    console.log("click", values);
  }

  async function handleLoadData() {
    try {
      setIsLoading(true);

      const response = await api.get("/inse/list");
      setTableRenderedData(response.data.result);
      setTotalRecords(response.data.total);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function handlePageChange(page: number) {
    setCurrentTablePage(page);

    try {
      setIsFetchingPage(true);

      const response = await api.get(`/inse/list?page=${page}`);
      setTableRenderedData(response.data.result);
      setTotalRecords(response.data.total);
      setIsFetchingPage(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleLoadData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader color="pink" />
      ) : (
        <Flex className="w-full">
          <Table
            tablePage={currentTablePage}
            tableRenderedData={tableRenderedData}
            TableColumns={DrawColumns({
              theme
            })}
            totalRecords={totalRecords}
            setTableRenderedData={setTableRenderedData}
            handleRowClick={handleRowClick}
            handlePageChange={handlePageChange}
            isFetchingPage={isFetchingPage}
          />
        </Flex>
      )}
    </>
  );
}
