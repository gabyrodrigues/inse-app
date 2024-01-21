import { KeyboardEvent, useContext, useState } from "react";
import { TextInput, ThemeIcon, UnstyledButton } from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";

import { ItemContext } from "@contexts/Item";

export function Search() {
  const [isCleanAllowed, setCleanAllowed] = useState(false);
  const { searchTerm, setSearchTerm, handleSearchData, handleLoadData } = useContext(ItemContext);

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearchData(searchTerm);
      setCleanAllowed(true);
    }
  }

  function handleCleanSearch() {
    setCleanAllowed(false);
    setSearchTerm("");
    handleLoadData();
  }

  return (
    <TextInput
      placeholder="Procure por nome da Escola, UF ou Município"
      leftSection={
        <ThemeIcon
          variant="light"
          className="bg-transparent text-base-secondary">
          <IconSearch size="24" />
        </ThemeIcon>
      }
      rightSection={
        isCleanAllowed && (
          <UnstyledButton onClick={handleCleanSearch}>
            <ThemeIcon
              variant="light"
              className="bg-transparent text-gray-700">
              <IconX size="24" />
            </ThemeIcon>
          </UnstyledButton>
        )
      }
      value={searchTerm}
      onChange={(event) => setSearchTerm(event.target.value)}
      onKeyDown={handleKeyDown}
      size="lg"
      className="w-full max-w-lg"
    />
  );
}
