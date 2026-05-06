import React, { useState } from 'react'
import { PasswordInput, TextInput, Button } from '@mantine/core'
import { IconHeartHandshake, IconMail, IconLock, IconUser } from '@tabler/icons-react'
import { useForm } from '@mantine/form';
import { Link, useNavigate } from 'react-router-dom';
import { SegmentedControl } from '@mantine/core';
import {registerUser} from '../Service/UserService';
import { errorNotification, successNotification } from '../Components/Utility/NotificationUtil';
import { set } from 'react-hook-form';


const RegisterPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
     const form = useForm({
      
        initialValues: {
          name:"",
          role:"PATIENT",  
          email: '',
          password: "",
          confirmPassword:"",
        },
    
        validate: {
          name:(value:string)=> (!value ? 'Name is required' : null),
          email: (value:string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
          password: (value: string) =>
  (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,15}$/.test(value)
    ? null
    : "Password must be 8-15 chars with upper, lower, number & special char"),
          confirmPassword: (value:string, values:{password:string}) => (value !== values.password ? 'Passwords do not match' : null),
        },
      });
      const handleSubmit = (values: typeof form.values) => {
        setLoading(true);
        registerUser(values)
        .then((_data)=>{
          successNotification("Registration successful! Please login.")
          navigate("/login");
        })
        .catch((error)=>{
          console.error(error);
          errorNotification(error.response.data.errorMessage || "Registration failed. Please try again.")
        }).finally(()=>{
          setLoading(false);
        });
      }
       
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
             <SegmentedControl
                  color='green' bg="none" 
                  className='[&_*]:!text-black border border-white'
                  {...form.getInputProps('role')}
                  data={[
                    { label: 'Patient', value: 'PATIENT' },
                    { label: 'Doctor', value: 'DOCTOR' },
                    { label: 'Admin', value: 'ADMIN' },
                  
                  ]}
                />
          <TextInput
            className='transition duration-300'
            leftSection={<IconUser size={18}  style={{color:'white'}} />}
            placeholder="Name"
            radius="md"
            size="md"
            variant="unstyled"
              {...form.getInputProps('name')}
          />
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
           <PasswordInput
            className='transition duration-300'
            leftSection={<IconLock size={18} style={{color:'white'}} />}
            placeholder="Confirm Password"
            radius="md"
            size="md"
            variant="unstyled"
              {...form.getInputProps('confirmPassword')}
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
                  Register
                </Button> 
        </form>
        <div className='text-neutral-100 self-center text-sm'>
          Have an account? <Link to="/login" className="hover:underline">Login</Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage