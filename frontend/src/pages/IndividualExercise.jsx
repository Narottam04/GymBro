import { Badge, createStyles, Group, Image, Skeleton, Text } from "@mantine/core";
import { useLocation } from "react-router-dom"
import { motion} from "framer-motion"
import YtVideoPlayer from "../components/YtVideoPlayer";
import { useFetchVideosQuery } from "../features/YtVideo/videoApi";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination,Navigation } from "swiper";
import CardSkeleton from "../components/Cards/CardSkeleton";
import Cards from "../components/Cards/Cards";
import { useGetRelatedExerciseQuery } from "../features/exercise/exerciseApi";

const useStyles = createStyles(() => ({
    page: {
        display:"flex",
        // justifyContent:"space-evenly",
        marginTop: "4rem",  
        '@media (max-width: 1024px)':{
            flexDirection: "column",
            marginTop: "2rem", 

        }
    },
    layout: {
        // width: "50%",
        display: "flex",
        flexDirection: "column",
        paddingLeft: "4rem",
        '@media (max-width: 1024px)':{
            width: "100vw",
            paddingTop: "1rem",
            paddingLeft: 0,
        }
    },
    cardImageDiv: {
        border: "solid",
        borderColor: "#777",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        '@media (max-width: 1024px)':{
            border: "none",
        }
    },
    cardImage: {
        width: 500,
        height: 500,
        '@media (max-width: 1024px)':{
            border: "none",
            width: 360,
            height: 360,
        }
    },
    heading: {
        color: "#15192C",
        fontSize: "3rem",
        textTransform: "capitalize",
        paddingBottom: "2rem",
        fontWeight: "700",
        '@media (max-width: 767px)':{
            fontSize: "2rem",
        }
    },
    subHeading: {
        color: "#555",
        fontSize: "1.3rem",
        fontWeight: "bold",
        '@media (max-width: 767px)':{
        //   fontSize: "1rem",
        }
    },
    videoDiv: {
        marginTop: "3rem",
    },
    playerSkeleton: {
        maxWidth: "28rem",
        marginLeft: "auto",
        marginRight: "auto",
        height: "auto",
        '@media (max-width: 767px)':{
            width: 350
        }
    },
    relatedExercise: {
        marginTop: "4rem"
    }
}))

const IndividualExercise = () => {
  const { classes } = useStyles();
  const location = useLocation()
  const data = location.state

  const { user } = useSelector((state) => state.auth)

  //fetch related videos on youtube
  const {data:relatedVideos,isSuccess,error,isLoading} = useFetchVideosQuery({search:data && data.name,token:user.token}) 

  // fetch related exercise   
  const {data:relatedExercise,isSuccess:relatedExerciseSuccess,error:relatedExerciseErr,isLoading: relatedExerciseLoading} = useGetRelatedExerciseQuery({bodyPart: data && data.bodyPart,token:user.token}) 


  return (
    <motion.section exit={{opacity: 0}} initial={{opacity: 0}} animate={{opacity: 1}} >
        <div className={classes.page} >
            <div className={classes.cardImageDiv} >
                <Image className={classes.cardImage} src={data && data.gifUrl}  alt={data && data.name} withPlaceholder  />
            </div>
            <div className={classes.layout}>
                <h1 className={classes.heading}>{data && data.name}</h1>
                <Group spacing="lg" style={{padding: "0.7rem 0"}} >
                    <h3 className={classes.subHeading}>Equipments -</h3>

                    <Badge size="xl" className={classes.badge} color="orange" variant="light">
                        {data && data.equipment}
                    </Badge>
                </Group>
                <Group spacing="lg" style={{padding: "0.7rem 0"}}>
                    <p className={classes.subHeading}>Target Muscles -</p>

                    <Badge size="xl" className={classes.badge} color="orange" variant="light">
                        {data && data.target}
                    </Badge>
                </Group>
                <Group spacing="lg" style={{padding: "0.7rem 0"}}>
                    <p className={classes.subHeading}>BodyPart-</p>

                    <Badge size="xl" className={classes.badge} color="orange" variant="light">
                        {data && data.bodyPart}
                    </Badge>
                </Group>
            </div>
        </div>
        <div className={classes.videoDiv}>
            <h1 className={classes.heading}>Related Youtube Videos</h1>
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                pagination={{
                clickable: true,
                }}
                breakpoints={{
                768: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                },
                1024: {
                    slidesPerView: 2,
                    spaceBetween: 50,
                },
                1300: {
                    slidesPerView: 3,
                    spaceBetween: 50,
                }
                }}
                rewind={true}
                navigation={true}
                modules={[Pagination,Navigation]}
                className="mySwiper"
            >    
                {
                    isSuccess &&
                    relatedVideos.slice(0,6).map((video) => (
                        <SwiperSlide>
                            <YtVideoPlayer id={video.id.videoId}/>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
        <div className={classes.relatedExercise}>
            <h1 className={classes.heading}>Related {data && data.bodyPart} exercises</h1>
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                pagination={{
                clickable: true,
                }}
                breakpoints={{
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 2,
                        spaceBetween: 50,
                    },
                    1300: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    }
                }}
                rewind={true}
                navigation={true}
                modules={[Pagination,Navigation]}
                className="mySwiper"
            >    
                {
                    relatedExerciseLoading &&
                    [...Array(8)].map(() => (
                        <SwiperSlide>
                            <CardSkeleton/>
                        </SwiperSlide>
                    ))
                }
                {
                    relatedExerciseSuccess &&
                    relatedExercise.data.map((exercise,index) => (
                        <SwiperSlide>
                            <Cards exercise={exercise} key={index} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    </motion.section>
  )
}

export default IndividualExercise