import { Badge, Card, createStyles, Group, Image, Text, ThemeIcon, useMantineTheme } from "@mantine/core"
import {  Heart } from "tabler-icons-react"

const useStyles = createStyles(() => ({
    card: {
        cursor:"pointer",
    },
    heading: {
        maxWidth: 200,
        color: "#15192C"
    },
    cardImageDiv: {
        width: 400,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        '@media (max-width: 767px)':{
            width: 300,
            margin: "auto"
        }
    },
    cardImage: {
        margin: "0.5rem",
    }
}))


const Cards = (exercise) => {
  const { classes } = useStyles();

  const {id,bodyPart,equipment,gifUrl,name,target} = exercise.exercise
  const theme = useMantineTheme();
  return (
    <Card shadow="lg" p="xl" className={classes.card} >
        <Card.Section className={classes.cardImageDiv} >
            <Image className={classes.cardImage} src={gifUrl && gifUrl}  alt={name && name} withPlaceholder />
        </Card.Section>

        <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
            <Text size="lg" className={classes.heading}  weight={700} transform="capitalize">{name && name}</Text>
            <ThemeIcon variant="light" color="pink"  size={30}>
                <Heart size={18} />
            </ThemeIcon>
        </Group>

        <Badge color="orange" variant="light">
            Equipment - {equipment && equipment}
        </Badge>

        <Badge color="orange" variant="light">
            Body part - {bodyPart && bodyPart}  
        </Badge>

        <Badge color="red" variant="light">
            Target Muscle - {target && target}  
        </Badge>

    </Card>
  )
}

export default Cards