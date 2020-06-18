import {
    createContext,
    ContextState,
    createDefaultContextState,
} from "@atomize/context";
import { useState } from "react";

interface ThemeContextProps {
    theme: ContextState<"light" | "dark">;
}

export const { Context: ThemeContext, Provider: ThemeProvider } = createContext<
    ThemeContextProps
>({ theme: createDefaultContextState("dark") }, () => {
    const [theme, setTheme] = useState<ThemeContextProps["theme"]["value"]>(
        "dark"
    );

    return {
        theme: { value: theme, setValue: setTheme },
    };
});
