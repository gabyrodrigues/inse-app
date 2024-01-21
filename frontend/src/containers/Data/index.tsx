import { useContext, useEffect, useState } from "react";
import { Flex, Loader, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { DrawColumns } from "@pages/Dashboard/DrawColumns";
import { Table } from "@components/Table";
import { ItemContext } from "@contexts/Item";
import { InseDataItem } from "@utils/data";

import { ItemModal } from "./ItemModal";

export default function DataContainer() {
  const [opened, { open, close }] = useDisclosure(false);
  const [activeItem, setActiveItem] = useState<InseDataItem | null>(null);

  const {
    isLoading,
    isFetchingPage,
    currentTablePage,
    tableRenderedData,
    totalRecords,
    setTableRenderedData,
    handlePageChange,
    handleLoadData
  } = useContext(ItemContext);

  const theme = useMantineTheme();

  function handleRowClick(item: InseDataItem) {
    open();
    setActiveItem(item);
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
