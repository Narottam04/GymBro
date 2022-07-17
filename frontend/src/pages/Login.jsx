import { useEffect } from 'react';
import * as Yup from 'yup';
import { Button, createStyles,  PasswordInput, Text, TextInput } from "@mantine/core"
import { At } from "tabler-icons-react";
import { useForm , yupResolver  } from '@mantine/form';
import { Link, useNavigate } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice';
import { showNotification } from '@mantine/notifications';
import { useDispatch, useSelector } from 'react-redux';

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
    marginTop: "1rem",
    marginBottom: "2rem"
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
  email: Yup.string().email('Invalid Email Address'),

  password: Yup.string().min(6,"Password must be 6 charcters at minimum").max(30,"Password is too big!"),
});

const Login = () => {
  const { classes } = useStyles();

  const form = useForm({
    schema: yupResolver(schema),
    initialValues: {
      email: '',
      password: '',
    },
  });

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user,isLoading,isError,isSuccess, message} = useSelector((state) => state.auth)

  useEffect(() => {
    if(isError) {
      showNotification({
        title: 'Error :(',
        message: `${message}`,
        color: 'red',
      })
    }
    if(isSuccess || user) {
        navigate('/app')
    }

    dispatch(reset())
  }, [user,isError,isSuccess,message,navigate,dispatch])

  const loginHandler = (userData) => {
    dispatch(login(userData))
  }

  return (
    <section className={classes.page}>
      <div className={classes.formLayout}>
        <div className={classes.form} >
          <h1 className={classes.heading}>Log in</h1>
          <p className={classes.subHeading}>Welcome back! Please enter your details.</p>
          <form onSubmit={form.onSubmit((values) => loginHandler(values))}>
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
              size="md"
              className={classes.formInput}
              {...form.getInputProps('password')}
              required
            />
            <Link to='/forgotPassword' className={classes.link}>
              <Text size="md" weight={500} color="orange" >Forgot password</Text>
            </Link>
            <Button type="submit" color="orange" size="md" className={classes.button} fullWidth loading={isLoading} >
              {
                isLoading ?
                "Logging you in..."
                :
                "Sign in"
              }
            </Button>
          </form>
          <Link to='/register' className={classes.link}>
            <Text size="md" weight={500} align={'center'} color="orange" >Don't have an account? Sign up</Text>
          </Link>
        </div>
      </div>

      <div className={classes.promo}></div>
    </section>
  )
}

export default Login