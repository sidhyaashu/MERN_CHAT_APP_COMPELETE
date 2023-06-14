import {
  Container,
  Box,
  Text,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Tabs
} from '@chakra-ui/react'
import Login from '../components/Login'
import Signup from '../components/Signup'


const HomePage = () => {
  return (
    <Container maxW="xl" centerContent  >
      <Box
      display= 'flex'
      justifyContent='center'
      p={3}
      bg="white"
      w="100%"
      m="40px 0 15px 0"
      borderRadius="lg"
      borderWidth="1px"
      >
        <Text>Sidhya Chat App</Text>
      </Box>

      <Box
      bg='white'
      w='100%'
      p={4}
      borderRadius="lg"
      borderWidth="1px"
      >
        <Tabs>
          <TabList mb='1em' >
            <Tab width='50%' >Login</Tab>
            <Tab width='50%' >Sign up</Tab>

          </TabList>

          <TabPanels>
            <TabPanel> <Login/> </TabPanel>
            <TabPanel> <Signup/> </TabPanel>

          </TabPanels>
        </Tabs>

      </Box>
    </Container>
  )
}

export default HomePage
