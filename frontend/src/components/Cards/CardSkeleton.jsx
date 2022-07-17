import { Card, createStyles, Skeleton } from '@mantine/core';
import React from 'react'

const useStyles = createStyles(() => ({
    cardImage: {
        margin: "0.5rem"
    }
}))

const CardSkeleton = () => {
  const { classes } = useStyles();

  return (
    <>
        <Card shadow="lg" p="xl">
          <Card.Section className={classes.cardImage} >
            <Skeleton mb="xl"  height={300} />
          </Card.Section>

          <Skeleton height={8} mt={6} radius="xl" />
          <Skeleton height={8} mt={12} radius="xl" />
          <Skeleton height={8} mt={6} radius="xl" />

        </Card>
    </>
  )
}

export default CardSkeleton