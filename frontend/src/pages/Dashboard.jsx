import { createStyles, useMantineTheme } from "@mantine/core"
import Logout from "../components/Logout";

const useStyles = createStyles(() => ({
    heading: {
        color: "#15192C",
        fontSize: "2rem"
    },
    text: {
      color: "#888888",
      paddingTop: "1rem"
    }
}))


const Dashboard = () => {
  const theme = useMantineTheme();
  const { classes } = useStyles();

  return (
    <section>
        {/* username */}
        <h1 className={classes.heading}>Welcome Narottam</h1>
        <div>
            <Logout/>
        </div>
    </section>
  )
}

export default Dashboard