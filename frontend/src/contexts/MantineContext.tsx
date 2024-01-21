import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { theme } from "../styles/theme";

interface MantineContextProps {
  children: React.ReactNode;
}

export function MantineContext(props: MantineContextProps) {
  return <MantineProvider theme={theme}>{props.children}</MantineProvider>;
}
