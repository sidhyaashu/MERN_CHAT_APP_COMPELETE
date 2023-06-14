import { Button, FormControl, FormLabel, Input, VStack, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const toast = useToast()
    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const submitHandler=async(e)=>{
        e.preventDefault()
        setLoading(true)

        if(email && password){
            try {
                const config = {
                        Headers:{
                            "Content-type":"application/json"
                        }
                    };
                        // "http://localhost:5000/api/user/register"
                    const { data } = await axios.post(
                        "/api/user/login",
                        { email:email , password:password },
                        config
                    )
                    
                    if(data){
                        toast({
                        title:"Login succesfull",
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
                        title:"Not Logged in try again",
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
                title:"All feilds are required!",
                duration:1000,
                isClosable:true,
                status:"warning",
                position:"top"
            })
            setLoading(false)
            return;
        }
    }

    const disable = email && password



  return (
<VStack align='stretch'spacing={4} >

<FormControl id="email" isRequired>
    <FormLabel >Email:</FormLabel>
    <Input
    value={email}
    onChange={(e)=>setEmail(e.target.value)}
    type='email'
    placeholder="Enter your email"
    />
</FormControl>

<FormControl id="password" isRequired>
    <FormLabel >Password:</FormLabel>
    <Input
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
    type='password'
    placeholder="Enter your password"
    />
</FormControl>

    <Button
    colorScheme="blue"
    width="100%"
    style={{marginTop:15}}
    onClick={submitHandler}
    type="submit"
    isLoading={loading}
    isDisabled={!disable}
    >
        Login
    </Button>

    <Button
    colorScheme="red"
    width="100%"
    style={{marginTop:15}}
    onClick={()=>{
        setEmail("guest@gmail.com")
        setPassword("12345")
    }}
    type="submit"
    isLoading={loading}
    isDisabled={!disable}
    >
        Guest user
    </Button>

</VStack>
  )
}

export default Login
