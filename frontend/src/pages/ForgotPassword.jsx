import * as Yup from 'yup';
import { Button, createStyles,  PasswordInput, Text, TextInput } from "@mantine/core"
import { At } from "tabler-icons-react";
import { useForm , yupResolver  } from '@mantine/form';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { showNotification } from '@mantine/notifications';

const useStyles = createStyles(() => ({
  page: {
    display:"flex",
    height:"100vh",
  },
  formLayout: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    '@media (max-width: 1024px)':{
      width: "100vw"
    }
  },
  form: {
    width: "500px",
    '@media (max-width: 767px)':{
      maxWidth: "300px",
    }
  },
  formInput: {
    paddingTop: "0.8rem",
    paddingBottom: "0.8rem"
  },
  promo: {
    width: "50%",
    background:"url('https://source.unsplash.com/sHfo3WOgGTU')",
    '@media (max-width: 1024px)':{
      display: "none",
      visibility:"hidden" 
    }
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
  button: {
    marginTop: "1rem"
  },
  link: {
    cursor: 'pointer',
  },
  subHeading: {
    color: "#777",
    fontSize: "1.3rem",
    paddingBottom: "1rem",
    '@media (max-width: 767px)':{
      fontSize: "1rem",
    }
  }
}))

// form validation
const schema = Yup.object().shape({
  email: Yup.string().email('Invalid Email Address'),
});

const ForgotPassword = () => {
  const { classes } = useStyles();
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()


  const form = useForm({
    schema: yupResolver(schema),
    initialValues: {
      email: '',
    },
  });

  const forgotPasswordHandler =async (userData) => {

    const API_URL = '/api/users/forgotPassword'

    try {
      setLoading(true)

      const res = await axios.post(API_URL,userData)
      
      setLoading(false)

      navigate('/forgotPassword/checkEmail', { state: res.data})
      
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

      showNotification({
        title: 'Error',
        message: `${message}`,
        color: 'red',
      })

      setLoading(false)
    } 
  }

  return ( 
    <section className={classes.page}>
      <div className={classes.formLayout}>
        <div className={classes.form} >
          <h1 className={classes.heading}>Reset password</h1>
          <p className={classes.subHeading}>Please enter your registered email address to change your account password.</p>
          <form onSubmit={form.onSubmit((values) => forgotPasswordHandler(values))}>
            <TextInput
              required
              label="Email"
              placeholder="Enter your registered email"
              size="md"
              icon={<At />}
              className={classes.formInput}
              {...form.getInputProps('email')}
            />
            
            <Button type="submit" color="orange" size="md" className={classes.button} fullWidth loading={loading}  >
              Reset Password
            </Button>
          </form>
        </div>
      </div>

      <div className={classes.promo}></div>
    </section>
  )
}

export default ForgotPassword