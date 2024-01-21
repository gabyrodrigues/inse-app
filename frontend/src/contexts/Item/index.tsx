import { SetStateAction, createContext } from "react";
import { InseDataItem } from "@utils/data";

interface ItemProps {
  isLoading: boolean;
  currentTablePage: number;
  tableRenderedData: InseDataItem[];
  totalRecords: number;
  isFetchingPage: boolean;
  setLoading: (value: SetStateAction<boolean>) => void;
  setTableRenderedData: (values: SetStateAction<InseDataItem[]>) => void;
  handleLoadData: () => Promise<void>;
  handleSearchData: (search: string) => Promise<void>;
  handleFilterData: (query: string) => Promise<void>;
  handlePageChange: (page: number) => Promise<void>;
}

export const ItemContext = createContext({} as ItemProps);
