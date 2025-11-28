import {
  MD3LightTheme,
  MD3DarkTheme,
  configureFonts,
} from "react-native-paper";
import { fontConfig } from "./fontConfig";
import { light, dark } from "./appColors";

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...light,
  },
  fonts: configureFonts({ config: fontConfig }),
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...dark,
  },
  fonts: configureFonts({ config: fontConfig }),
};
