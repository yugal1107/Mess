import { ThemeDto } from "../types/dto";

const THEME_CONFIG_URL =
  "https://raw.githubusercontent.com/yugal1107/Mess/dev/theme-config/active.json";

// Cache duration: 10 minutes (in ms)
const CACHE_DURATION = 10 * 60 * 1000;

let cachedTheme: ThemeDto | null = null;
let lastFetchTime = 0;

export async function fetchActiveTheme(): Promise<ThemeDto | null> {
  const now = Date.now();

  // Return cached result if still fresh
  if (cachedTheme && now - lastFetchTime < CACHE_DURATION) {
    return cachedTheme;
  }

  try {
    const response = await fetch(THEME_CONFIG_URL, {
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      // No active theme (e.g. 404) → use default
      cachedTheme = null;
      lastFetchTime = now;
      return null;
    }

    const data: ThemeDto = await response.json();
    cachedTheme = data;
    lastFetchTime = now;
    return data;
  } catch {
    // Network error or parse error → silently fall back
    return null;
  }
}
