import { Container } from "@mantine/core";

import { Menu } from "@components/Menu";
import DataContainer from "@containers/Data";

export default function Dashboard() {
  return (
    <>
      <Menu />

      <Container className="max-w-screen-xl py-16 text-center">
        <DataContainer />
      </Container>
    </>
  );
}
