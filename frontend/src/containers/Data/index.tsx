import { useEffect, useState } from "react";
import { Flex, Loader, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { DrawColumns } from "@pages/Dashboard/DrawColumns";
import { Table } from "@components/Table";
import { InseDataItem } from "@utils/data";
import { api } from "@services/api";
import { ItemModal } from "./ItemModal";

export default function DataContainer() {
  const [currentTablePage, setCurrentTablePage] = useState(1);
  const [tableRenderedData, setTableRenderedData] = useState<InseDataItem[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingPage, setIsFetchingPage] = useState(false);

  const [opened, { open, close }] = useDisclosure(false);
  const [activeItem, setActiveItem] = useState<InseDataItem | null>(null);

  const theme = useMantineTheme();

  function handleRowClick(item: InseDataItem) {
    open();
    setActiveItem(item);
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

  function handleCloseModal() {
    close();
    setActiveItem(null);
  }

  useEffect(() => {
    handleLoadData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader color="blue" />
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

      {opened && (
        <ItemModal
          data={activeItem as InseDataItem}
          opened={opened}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
