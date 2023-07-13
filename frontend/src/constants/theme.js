export const tokens = (mode) =>
  mode === "dark"
    ? {
        primary: "#01212e",
        blueAccent: "#38b6ff",
        greenAccent: "#48ca7d",
      }
    : {
        primary: "#01212e",
        blueAccent: "#38b6ff",
        greenAccent: "#48ca7d",
      };

export const themeSettings = (mode) => {
  const colors = tokens(mode);

  return {
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: colors.blueAccent,
            },
            secondary: {
              main: colors.greenAccent,
            },
            background: {
              default: "#161923",
              paper: "#161923",
            },
          }
        : {
            primary: {
              main: colors.blueAccent,
            },
            secondary: {
              main: colors.greenAccent,
            },
            background: {
              default: "#F8F8FF",
              paper: "#F8F8FF",
            },
          }),
    },
    typography: {
      fontFamily: ["Quicksand", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Quicksand", "sans-serif"].join(","),
        fontSize: 40,
        fontWeight: 700,
      },
      h2: {
        fontFamily: ["Quicksand", "sans-serif"].join(","),
        fontSize: 32,
        fontWeight: 500,
      },
      h3: {
        fontFamily: ["Quicksand", "sans-serif"].join(","),
        fontSize: 24,
        fontWeight: 500,
      },
      h4: {
        fontFamily: ["Quicksand", "sans-serif"].join(","),
        fontSize: 20,
        fontWeight: 500,
      },
      h5: {
        fontFamily: ["Quicksand", "sans-serif"].join(","),
        fontSize: 16,
        fontWeight: 500,
      },
      h6: {
        fontFamily: ["Quicksand", "sans-serif"].join(","),
        fontSize: 14,
        fontWeight: 500,
      },
      subtitle1: {
        fontFamily: ["Quicksand", "sans-serif"].join(","),
        fontSize: 14,
        color: mode === "dark" ? "#94a3b8" : "#111729",
      },
    },
  };
};
