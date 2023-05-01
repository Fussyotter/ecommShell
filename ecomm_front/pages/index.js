import Image from 'next/image'
import {makeStyles} from '@mui/material/styles'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Login from './login'
import Signup from './signup'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <Header/>
    <Login/>
    {/* <Signup/> */}
    <Footer/>
    
    
    
    
    
    </>
  )
}
