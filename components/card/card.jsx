import { IconEye, IconMessageCircle, IconSalt, IconTimeline } from '@tabler/icons';
import { Card, Text, Group, Center } from '@mantine/core';
import { useStyles } from './card.styles';
import { useRouter } from 'next/router';


export function ImageCard({ image, title, link, description }) {
    const { classes, theme } = useStyles();
    const router = useRouter();

    return (
        <Card
            p="lg"
            shadow="lg"
            className={classes.card}
            radius="md"
            component="a"
            href={link}
            style={{ margin: "2rem 2rem" }}
        >
            <div className={classes.image} style={{ backgroundImage: `url(${image})` }} />
            <div className={classes.overlay} />

            <div className={classes.content}>
                <div>
                    <Text size="lg" className={classes.title} weight={500}>
                        {title}
                    </Text>

                    <Group position="apart" spacing="xs">
                        <Text size="sm" className={classes.author}>
                            {description.length > 20 ? description.substring(0, 20) + "..." : description}
                        </Text>


                    </Group>
                </div>
            </div>
        </Card>
    );
}