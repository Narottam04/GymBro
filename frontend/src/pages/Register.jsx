import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Button, createStyles,  PasswordInput, Text, TextInput } from "@mantine/core"
import { At } from "tabler-icons-react";
import { useForm , yupResolver  } from '@mantine/form';
import { Link, useNavigate } from 'react-router-dom';
import { showNotification } from '@mantine/notifications';
import { useSelector } from 'react-redux';
import axios from 'axios';

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
    maxWidth: "500px",
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
    marginTop: "1rem",
    marginBottom: "2rem",
  },
  link: {
    cursor: 'pointer',
    textDecoration: 'none'
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
  username: Yup.string().min(2, 'Name should have at least 2 letters').max(30,"Username is too big!"),

  email: Yup.string().email('Invalid Email Address'),

  password: Yup.string().min(6,"Password must be 6 charcters at minimum").max(30,"Password is too big!"),

  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], "Passwords don't match!"),
});

const Register = () => {
  const { classes } = useStyles();

  const [loading, setLoading] = useState(false)

  const form = useForm({
    schema: yupResolver(schema),
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
  });

  const navigate = useNavigate()

  const {user,} = useSelector((state) => state.auth)

  useEffect(() => {
    if(user) {
        navigate('/app')
    }
  }, [user, navigate])

  const registerHandler =async (userData) => {
    const {username,email,password} = userData

    const data = {
      name: username,
      email,
      password
    }

    const API_URL = '/api/users'

    try {
      setLoading(true)

      const res = await axios.post(API_URL,data)
      
      setLoading(false)
      
      navigate('/register/confirmEmail', { state: res.data})
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
          <h1 className={classes.heading}>Sign up</h1>
          <p className={classes.subHeading}>Create an account to start tracking and planning your exercises.</p>
          <form onSubmit={form.onSubmit((values) => registerHandler(values))}>
            <TextInput
              required
              label="Username"
              placeholder="Enter your username"
              size="md"
              className={classes.formInput}
              {...form.getInputProps('username')}
            />
            <TextInput
              required
              label="Email"
              placeholder="Enter your email"
              size="md"
              icon={<At />}
              className={classes.formInput}
              {...form.getInputProps('email')}
            />
            <PasswordInput
              placeholder="Password"
              label="Password"
              // description="Password must include at least one letter, number and special character."
              description="Password should contain at least five characters."
              size="md"
              className={classes.formInput}
              {...form.getInputProps('password')}
              required
            />
            <PasswordInput
              placeholder="Confirm Password"
              label="Confirm Password"
              description="Please type again to confirm the password."
              size="md"
              className={classes.formInput}
              {...form.getInputProps('confirmPassword')}
              required
            />
            <Button type="submit" color="orange" size="md" className={classes.button} fullWidth loading={loading} >
              {!loading ?
                "Create Account"
                :
                "Creating Your Account..."
              }
            </Button>
          </form>
          <Link to='/' className={classes.link}>
            <Text size="md" weight={500} align={'center'} color="orange" >Already have an account? Sign in</Text>
          </Link>
        </div>
      </div>

      <div className={classes.promo}>
        
      </div>
    </section>
  )
}

export default Register