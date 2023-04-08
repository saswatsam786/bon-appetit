import '@/styles/globals.css'
import { useState } from 'react'
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import ToastProvider from '@/utils/ToasterProvider';

export default function App({ Component, pageProps }) {
  const [colorScheme, setColorScheme] = useState("dark");
  const [primaryColor, setPrimaryColor] = useState("red");


  const toggleColorScheme = (value) => {
    if (!value) {
      setColorScheme(colorScheme === "dark" ? "light" : "dark");
    } else {
      setPrimaryColor(value);
    }
  };

  return (<>
    <ToastProvider />
    <MantineProvider
      theme={{ colorScheme, primaryColor, loader: "bars" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <Component {...pageProps} />
      </ColorSchemeProvider>
    </MantineProvider>
  </>)
}
