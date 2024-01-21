import { Link } from "react-router-dom";
import { Flex } from "@mantine/core";

import logo from "@assets/logo-full.svg";
import { Search } from "@components/Search";

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

        <Search />
      </Flex>
    </Flex>
  );
}
