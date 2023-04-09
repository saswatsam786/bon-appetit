import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
    header: {
        backgroundColor: theme.fn.variant({
            variant: "filled",
            color: theme.primaryColor,
        }).background,
        borderBottom: 0,

        [theme.fn.smallerThan("sm")]: {
            backgroundColor: "transparent",
            color: theme.fn.variant({
                variant: "filled",
                color: theme.primaryColor,
            }).background,
        },
        position: "sticky",
        zIndex: "4000",
    },

    inner: {
        height: 56,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    burger: {
        display: "none",

    },

    link: {
        display: "block",
        lineHeight: 1,
        padding: "8px 12px",
        borderRadius: theme.radius.sm,
        textDecoration: "none",
        color: theme.white,
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        "&:hover": {
            color: "inherit",
            backgroundColor: theme.fn.lighten(
                theme.fn.variant({ variant: "filled", color: theme.primaryColor })
                    .background,
                0.1
            ),
        },
    },

    linkLabel: {
        marginRight: 5,
    },
}));
