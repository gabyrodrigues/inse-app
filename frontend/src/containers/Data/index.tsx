import { useContext, useEffect, useState } from "react";
import { Flex, Loader, Stack, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { DrawColumns } from "@pages/Dashboard/DrawColumns";
import { Table } from "@components/Table";
import { Filter } from "@components/Filter";
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
      <Stack className="w-full gap-8">
        <Filter />

        {isLoading ? (
          <Flex className="w-full justify-center">
            <Loader color="blue" />
          </Flex>
        ) : (
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
        )}
      </Stack>

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
