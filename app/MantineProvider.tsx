"use client";
import { MantineProvider } from "@mantine/core";

interface MantineProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<MantineProviderProps> = ({
  children,
}) => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      {children}
    </MantineProvider>
  );
};

export default ThemeProvider;
