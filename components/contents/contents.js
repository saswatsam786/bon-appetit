import { Card, Image, Text, Group, Modal, ScrollArea } from '@mantine/core';
import { useStyles } from './contents.style';

export default function Contents({ opened, close, data }) {
    const { classes } = useStyles();

    if (!data || !data.length) return <>
        <Modal opened={opened} onClose={close} overflow="auto" size="xl" centered title="No results found" >
            <Text>There are no results found for your search</Text>
        </Modal>
    </>;

    return (
        <Modal opened={opened} onClose={close} overflow="auto" size="xl" centered title={`${data.length} results found`} >
            <ScrollArea h={500}>
                {data.map((item) => (

                    <Card withBorder radius="md" p={0} className={classes.card} key={item.id}>
                        <Group noWrap spacing={0}>
                            <Image src={item.image_url || `/default-${Math.floor(Math.random() * 10 % 4)}.jpg`} height={140} width={140} />
                            <div className={classes.body}>
                                <Text transform="uppercase" color="dimmed" weight={700} size="xs">
                                    {item.description.length > 50 ? item.description.substring(0, 50) + "..." : item.description}
                                </Text>
                                <Text className={classes.title} mt="xs" mb="md">
                                    {item.name}
                                </Text>

                            </div>
                        </Group>
                    </Card>

                ))}
            </ScrollArea>

        </Modal>
    );
}