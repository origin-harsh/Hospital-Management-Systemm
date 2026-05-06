import React, { useState } from 'react'
import { PasswordInput, TextInput, Button } from '@mantine/core'
import { IconHeartHandshake, IconMail, IconLock } from '@tabler/icons-react'
import { useForm } from '@mantine/form';
import { Link, useNavigate } from 'react-router-dom';
import { log } from 'console';
import { loginUser } from '../Service/UserService';
import { successNotification ,errorNotification } from '../Components/Utility/NotificationUtil';
import { useDispatch } from 'react-redux';
import { set } from 'react-hook-form';
import { setJwt } from '../Slice/JwtSlice';
import { jwtDecode } from 'jwt-decode';
import { setUser } from '../Slice/userSlice';


const Login = () => {
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const form = useForm({
    initialValues: {
      email: '',
      password: "",
    },

    validate: {
      email: (value:string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
     password: (value: string) =>
  (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,15}$/.test(value)
    ? null
    : "Password must be 8-15 chars with upper, lower, number & special char"),
    },
  });
  const handleSubmit = (values: typeof form.values) => {
    setLoading(true);
    loginUser(values)
    .then((_data)=>{
          console.log(jwtDecode(_data));
          successNotification("Login successful!");
          dispatch(setJwt(_data));
          dispatch(setUser(jwtDecode(_data)));
        })
        .catch((error)=>{
          console.error(error);
          errorNotification(error.response.data.errorMessage || "Login failed. Please try again.")
        }).finally(()=>{
          setLoading(false);
        });
  };
  return (
    <div
      style={{ background: 'url("/bg.png")' }}
      className="h-screen w-screen !bg-cover !bg-center !bg-no-repeat flex items-center justify-center"
    >
      <div className="w-[420px] rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8 flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 text-green-500">
          <IconHeartHandshake size={44} stroke={2.2} />
          <span className="font-heading text-3xl font-semibold tracking-wide">
            HospAIx
          </span>
        </div>

        <form  onSubmit={form.onSubmit(handleSubmit)} className="flex flex-col gap-4 [&_input]:placeholder-neutral-100 [&_.mantine-Input-input]:!border-white
         [&_.mantine-Input-input]:!border [&_input]:!text-white" >
          <TextInput
            className='transition duration-300'
            leftSection={<IconMail size={18}  style={{color:'white'}} />}
            placeholder="Email address"
            radius="md"
            size="md"
            variant="unstyled"
              {...form.getInputProps('email')}
          />

          <PasswordInput
            className='transition duration-300'
            leftSection={<IconLock size={18} style={{color:'white'}} />}
            placeholder="Password"
            radius="md"
            size="md"
            variant="unstyled"
              {...form.getInputProps('password')}
          />

        <Button
          loading={loading}
          radius="md"
          size="md"
          type="submit"
          color='green'
          className="hover:bg-green-600 transition duration-300"
          styles={{
            label: { color: "black", fontWeight: 500 }
          }}
        >
          Login
        </Button>
        </form>
        <div className='text-neutral-100 self-center text-sm'>
          Don't have an account? <Link to="/register" className="hover:underline">Register</Link>
        </div>
       
      </div>
    </div>
  )
}

export default Login
