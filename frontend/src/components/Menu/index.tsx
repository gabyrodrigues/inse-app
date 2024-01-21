import { Link } from "react-router-dom";
import { Flex, TextInput, ThemeIcon } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

import logo from "@assets/logo-full.svg";

export function Menu() {
  return (
    <Flex className="p-4 bg-base-mainBg justify-center">
      <Flex className="justify-start px-3 max-w-screen-xl w-full">
        <Link to="/">
          <img
            src={logo}
            alt="Logo Inse App"
            className="w-32"
          />
        </Link>

        <TextInput
          placeholder="Procure por nome da Escola, UF ou Município"
          leftSection={
            <ThemeIcon
              variant="light"
              className="bg-transparent text-accent-400">
              <IconSearch size="24" />
            </ThemeIcon>
          }
          onChange={(event) => console.log(event.target.value)}
          size="lg"
          className="w-full max-w-lg"
        />
      </Flex>
    </Flex>
  );
}
