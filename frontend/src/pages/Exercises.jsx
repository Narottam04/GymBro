import { Badge, Card, createStyles, Grid, Group, Image, Input, Pagination, Skeleton, Text, TextInput, ThemeIcon, useMantineTheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heart, Search } from "tabler-icons-react";
import Cards from "../components/Cards/Cards";
import CardSkeleton from "../components/Cards/CardSkeleton";
import { allExercise, reset, searchExercise } from "../features/exercise/exerciseSlice";
import { useDebouncedValue } from '@mantine/hooks';
import { motion} from "framer-motion"
import { useGetExerciseQuery } from "../features/exercise/exerciseApi";

const useStyles = createStyles(() => ({
  heading: {
      color: "#15192C",
      fontSize: "2rem"
  },
  text: {
    color: "#888888",
    paddingTop: "1rem"
  },
  searchBar: {
    paddingTop: "1rem"
  },
  cards: {
    marginTop: "1rem"
  },
  pagination: {
    padding: "4rem 0",
    display: "flex",
    justifyContent: "center"
  }
}))

const Exercises = () => {
  const theme = useMantineTheme();
  const { classes } = useStyles();

  const [search, setSearch] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [debouncedSearch] = useDebouncedValue(search, 500);

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  // const {exercise,isLoading,isError,isSuccess,message} = useSelector((state) => state.exercise)

  const {data:exercise,isSuccess,error,isLoading,refetch} = useGetExerciseQuery({search:debouncedSearch,token:user.token,page:activePage,limit:12}) 
  

  useEffect(() => {
    if (error) {
      showNotification({
        title: 'Error :(',
        message: `${error && error.message}`,
        color: 'red',
      })
    }
    // if(debouncedSearch){
    //   refetch({search:debouncedSearch,token:user.token,page:activePage,limit:12})
    // }

    return () => {
      dispatch(reset())
    }
  }, [error, dispatch,debouncedSearch,activePage])

  return (
    <motion.section exit={{opacity: 0}} initial={{opacity: 0}} animate={{opacity: 1}}  >
        <h1 className={classes.heading}>Exercises</h1>
        {/* search bar */}
        <div className={classes.searchBar}>
          <TextInput
            icon={<Search />}
            placeholder="Search For Exercises.."
            radius="md"
            size="md"
            onChange={(event) => setSearch(event.currentTarget.value)}
          />
        </div>
        {/* filters */}
        <div>

        </div>
        {/* Exercises */}
        <Grid className={classes.cards}>
          {
            isLoading &&
            [...Array(8)].map(() => (
              <Grid.Col sm={6} md={6} lg={4} xl={3}>
                <CardSkeleton/>
              </Grid.Col>
            ))
          }
        </Grid>
        <Grid className={classes.cards}>
          {
            isSuccess &&
            exercise.data.map((exercise,index) => (
              <Grid.Col sm={6} md={6} lg={4} xl={3} >
                <Cards exercise={exercise} key={index} />
              </Grid.Col>
            ))
          }
        </Grid>
        <div className={classes.pagination}>
          {
            (isSuccess && !debouncedSearch && exercise.max) &&
            <Pagination onChange={setActivePage} total={exercise.max.maxPages} siblings={3} initialPage={activePage} />
          }
        </div>
    </motion.section>
  )
}

export default Exercises