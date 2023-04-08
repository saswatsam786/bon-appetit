'use client'
import {
    Header,
    Menu,
    Group,
    Center,
    Burger,
    Container,
    ActionIcon,
    useMantineColorScheme,
    Button,
    Link,
} from "@mantine/core";
import Sidebar from "../Sidebar/Sidebar";
import { useDisclosure } from "@mantine/hooks";
import {
    IconSchool,
    IconChevronDown,
    IconSun,
    IconMoonStars,
    IconCircle,
} from "@tabler/icons";
import { useStyles } from "./navbar.styles";

const links = [
    { link: "/", label: "Home" },
    {
        link: "#1",
        label: "My students",
        links: [
            {
                link: "/students/verified",
                label: "Verified students",
            },
            {
                link: "/students/unverified",
                label: "Unverified students",
            },
        ],
    },
    // {
    //   link: "/qr",
    //   label: "QR Generator",
    // },
    {
        link: "/profile",
        label: "Edit profile",
    },
    {
        link: "/contact",
        label: "Contact Us",
    },
];

const colors = [
    { label: "Red", value: "red" },
    { label: "Pink", value: "pink" },
    { label: "Violet", value: "violet" },
    { label: "Cyan", value: "cyan" },
    { label: "Teal", value: "teal" },
    { label: "Green", value: "green" },
    { label: "Lime", value: "lime" },
    { label: "Orange", value: "orange" },
];



export default function Navbar() {
    const user = ""
    const wait = null
    const [opened, { toggle }] = useDisclosure(false);
    const { classes } = useStyles();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    const dark = colorScheme === "dark";

    const items = []

    items.push(
        <>
            <Menu key="Select" trigger="hover" exitTransitionDuration={0}>
                <Menu.Target>
                    <Button>Toggle Color</Button>
                </Menu.Target>

                <Menu.Dropdown>
                    {colors.map((color) => (
                        <Menu.Item
                            key={color.value}
                            icon={<IconCircle fill={color.value} size={14}></IconCircle>}
                            onClick={() => toggleColorScheme(color.value)}
                        >
                            {color.label}
                        </Menu.Item>
                    ))}
                </Menu.Dropdown>
            </Menu>
        </>
    );

    items.push(
        <Menu key="button" trigger="hover" exitTransitionDuration={0}>
            <Menu.Target>
                <ActionIcon
                    variant="default"
                    color="white"
                    onClick={() => toggleColorScheme()}
                    title="Toggle color scheme"
                >
                    {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
                </ActionIcon>
            </Menu.Target>
        </Menu>
    );

    return (
        <>
            <Sidebar showModal={opened} setShowModal={toggle}></Sidebar>
            <Header height={56} className={classes.header} mb={120}>
                <Container>
                    <div className={classes.inner}>
                        <IconSchool size={28} />
                        <Group spacing={5} className={classes.links}>
                            {items}
                        </Group>
                        <Burger
                            opened={opened}
                            onClick={toggle}
                            className={classes.burger}
                            size="sm"
                            color="#fff"
                        />
                    </div>
                </Container>
            </Header>
        </>
    );
}
