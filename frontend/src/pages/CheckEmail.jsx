import React, { useEffect } from 'react'
import { Alert, createStyles, Text, ThemeIcon } from '@mantine/core';
import { AlertCircle, MailOpened } from 'tabler-icons-react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const useStyles = createStyles(() => ({
    page: {
        display:"flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "10rem",
        textAlign: 'center',
        '@media (max-width: 767px)':{
            marginTop: "7rem",
        }
    },
    layout: {
        width: "800px",
        '@media (max-width: 767px)':{
            width: "auto",
            margin: "0 1rem"
        }
    },
    icon: {
        marginBottom: "2rem"
    },
    heading: {
        color: "#15192C",
        fontSize: "3rem",
        fontWeight: 600,
        paddingBottom: "1rem",
        '@media (max-width: 767px)':{
          fontSize: "2rem",
        }
    },
    subHeading: {
        color: "#888",
        fontSize: "1.3rem",
        '@media (max-width: 767px)':{
          fontSize: "1rem",
        }
    },
    alert: {
        width: "600px",
        left: 0, 
        right: 0,
        top:20, 
        marginLeft: "auto", 
        marginRight: "auto", 
        '@media (max-width: 767px)':{
            width: "90%"
        }
    },
    link: {
        cursor: 'pointer',
        textDecoration: 'none',
        marginTop: "1.5rem"
    },
}))

const CheckEmail = () => {
  const { classes } = useStyles();
  const {state} = useLocation();
  const { email } = state;
  const navigate = useNavigate()

  return (
    <>
        <Alert  className={classes.alert} icon={<AlertCircle size={16} />} color="green" withCloseButton closeButtonLabel="Close alert" >
            Confirmation email has been sent! Please check your inbox
        </Alert>
        <section className={classes.page}>

            <div className={classes.layout}>
                <ThemeIcon className={classes.icon} variant="gradient" radius="xl" gradient={{ from: 'orange', to: 'red' }}  size={60}>
                <MailOpened size={40} />
                </ThemeIcon>
                <h1 className={classes.heading}>Check your email</h1>
                <p className={classes.subHeading}>We have sent you an email to {email && email}. To change the password of your GymBro account, please click on the link and create a new secure password for your account.</p>
                <p className={classes.subHeading}>Can't find it? Check your promotions and spam folder.</p>
                <Text className={classes.link} size="lg" weight={700} color="orange" align="center">Click to send a new confirmation email.</Text>
            </div>
        </section>
    </>
  )
}

export default CheckEmail