import { createStyles, rem } from "@mantine/core";


export const useStyles = createStyles((theme, _params, getRef) => ({
    card: {
        position: 'relative',
        height: "15rem",
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],

        [`&:hover .${getRef('image')}`]: {
            transform: 'scale(1.03)',
        },
    },

    image: {
        ...theme.fn.cover(),
        ref: getRef('image'),
        backgroundSize: 'cover',
        transition: 'transform 500ms ease',
    },

    overlay: {
        position: 'absolute',
        top: '20%',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .85) 90%)',
    },

    content: {
        height: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        zIndex: 1,
    },

    title: {
        color: theme.primaryColor,
        marginBottom: "5rem",
        fontSize: "1.5rem",
        fontWeight: 700,
        marginTop: "-10rem",
        textTransform: "uppercase",
    },

    bodyText: {
        color: theme.colors.dark[2],
        marginLeft: "7rem",
    },

    author: {
        color: theme.colors.dark[2],
    },
}));