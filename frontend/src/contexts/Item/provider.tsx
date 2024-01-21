"use client";
import { useState } from "react";

import { ItemContext } from ".";
import { api } from "@services/api";
import { InseDataItem } from "@utils/data";

interface ItemContextProviderProps {
  children: React.ReactNode;
}

export default function ItemContextProvider(props: ItemContextProviderProps) {
  const [isLoading, setLoading] = useState(true);
  const [currentTablePage, setCurrentTablePage] = useState(1);
  const [tableRenderedData, setTableRenderedData] = useState<InseDataItem[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isFetchingPage, setIsFetchingPage] = useState(false);

  async function handleLoadData() {
    try {
      setLoading(true);

      const response = await api.get("/inse/list");
      setTableRenderedData(response.data.result);
      setTotalRecords(response.data.total);
      setLoading(false);
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

  async function handleSearchData(search: string) {
    try {
      setLoading(true);

      const response = await api.get(`/inse?search=${search}`);
      setTableRenderedData(response.data.result);
      setTotalRecords(response.data.total);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const values = {
    isLoading,
    currentTablePage,
    tableRenderedData,
    totalRecords,
    isFetchingPage,
    setLoading,
    setTableRenderedData,
    handleLoadData,
    handlePageChange,
    handleSearchData
  };

  return <ItemContext.Provider value={values}>{props.children}</ItemContext.Provider>;
}
