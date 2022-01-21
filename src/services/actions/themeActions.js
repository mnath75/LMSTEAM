export const APPLY_THEME = "APPLY_THEME";
export const applyTheme = (theme) => {
    return {
        type: APPLY_THEME,
        payload: theme
    };
};
