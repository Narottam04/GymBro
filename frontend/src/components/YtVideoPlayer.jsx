import { createStyles } from '@mantine/core';

import Plyr from "plyr-react"
import "plyr-react/plyr.css"

const useStyles = createStyles(()=> ({
    playerSize: {
        maxWidth: "28rem",
        marginLeft: "auto",
        marginRight: "auto",
        height: "auto",
        '@media (max-width: 767px)':{
            width: 350
        }
    }
}))


const YtVideoPlayer = ({id}) => {
    const { classes } = useStyles();

    const videoSrc = {
        type: "video",
        sources: [
        {
            src: id,
            provider: "youtube"
        }
        ]
    };
    return (
        <div className={classes.playerSize}>
          <Plyr source={videoSrc} />
        </div>
    );
}

export default YtVideoPlayer