import { Badge, Card, createStyles, Group, Image, Text, ThemeIcon, useMantineTheme } from "@mantine/core"
import { Link } from "react-router-dom";
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
        // width: 500,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        '@media (max-width: 767px)':{
            // width: 300,
            margin: "auto"
        }
    },
    cardImage: {
        // width: 400,
        // height: "auto",
        // margin: "0.5rem",
    }
}))


const Cards = (exercise) => {
  const { classes } = useStyles();

  const {id,bodyPart,equipment,gifUrl,name,target} = exercise.exercise
  const theme = useMantineTheme();
  return (
    <Card shadow="lg" p="xl" className={classes.card} >
        <Card.Section className={classes.cardImageDiv} >
            <Link to={`/app/exercise/${id}`} state={{id,bodyPart,equipment,gifUrl,name,target}}>
                <Image radius="md" width={360} height={360}fit="contain"  className={classes.cardImage} src={gifUrl && gifUrl}  alt={name && name} withPlaceholder />
            </Link>
        </Card.Section>

        <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
            <Link to={`/app/exercise/${id}`} state={{id,bodyPart,equipment,gifUrl,name,target}}>
                <Text size="lg" className={classes.heading}  weight={700} transform="capitalize">{name && name}</Text>
            </Link>
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