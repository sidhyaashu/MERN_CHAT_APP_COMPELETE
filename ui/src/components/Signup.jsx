import { Button, FormControl, FormLabel, Input, Spinner, VStack } from "@chakra-ui/react"
import {useState} from 'react'
import { useToast } from "@chakra-ui/react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Signup = () => {

    const toast = useToast()
    const navigate = useNavigate()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [pic, setpic] = useState('');

    const [loading, setLoading] = useState(false);


    const postDetails =(post)=>{
        console.log(post)
    }


    const submitHandler=async(e)=>{
        e.preventDefault()

        setLoading(true)
        if(name && email && password && confirmPassword){
            if(password === confirmPassword){
                try {
                    const config = {
                        Headers:{
                            "Content-type":"application/json"
                        }
                    };
                        // "http://localhost:5000/api/user/register"
                    const { data } = await axios.post(
                        "/api/user/register",
                        { name:name , email:email , password:password ,confirm_password:confirmPassword },
                        config
                    )

                    if(data){
                        toast({
                        title:"Registration succesfull",
                        status:"success",
                        duration:1000,
                        isClosable:true,
                        position:'top'
                        })
                        localStorage.setItem('userInfo',JSON.stringify(data))
                        setLoading(false)
                        setTimeout(() => {
                            navigate('/chats')
                        }, 1000);

                    }else{
                        toast({
                        title:"Not registered try again",
                        status:"warning",
                        duration:1000,
                        isClosable:true,
                        position:'top'
                        })
                    setLoading(false)
                    return;
                    }


                } catch (error) {
                    toast({
                title:error.response.data.message,
                status:"warning",
                duration:1000,
                isClosable:true,
                position:'top'
                })
                setLoading(false)
                return;
                }

            }else{
                toast({
                title:"Password and confirm password dose't match",
                status:"warning",
                duration:1000,
                isClosable:true,
                position:'top'
            })
            setLoading(false)
            return;
            }

        }else{
            toast({
                title:"Please fill all the feidls",
                status:"warning",
                duration:1000,
                isClosable:true,
                position:'top'
            })
            setLoading(false)
            return;
        }
    }


  return (
 <VStack align='stretch'spacing={4} >

        <FormControl id="name" isRequired>
            <FormLabel >Name:</FormLabel>
            <Input
            placeholder="Enter your name"
            type="text"
            onChange={(e)=>setName(e.target.value)}
            />
        </FormControl>

        <FormControl id="email" isRequired>
            <FormLabel >Email:</FormLabel>
            <Input
            onChange={(e)=>setEmail(e.target.value)}
            type='email'
            placeholder="Enter your email"
            />
        </FormControl>

        <FormControl id="password" isRequired>
            <FormLabel >Password:</FormLabel>
            <Input
            onChange={(e)=>setPassword(e.target.value)}
            type='password'
            placeholder="Enter your password"
            />
        </FormControl>

        <FormControl id="confirm_password" isRequired>
            <FormLabel >Confirm Password:</FormLabel>
            <Input
            onChange={(e)=>setConfirmPassword(e.target.value)}
            type='password'
            placeholder="Confirm your password"
            />
        </FormControl>

        <FormControl id="pic">
            <FormLabel >Picture:</FormLabel>
            <Input
            onChange={(e)=>postDetails(e.target.files[0])}
            type="file"
            accept="image/*"
            />
        </FormControl>

            <Button
            colorScheme="blue"
            width="100%"
            style={{marginTop:15}}
            onClick={submitHandler}
            isLoading={loading}
            type="submit"
            >
                Sign Up
            </Button>

        </VStack>

  )
}

export default Signup
