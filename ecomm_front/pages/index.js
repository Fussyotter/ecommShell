import { Inter } from 'next/font/google'
import Header from '@/components/header'
import Footer from '@/components/footer'

import FeaturedProducts from '@/components/featuredProducts'
import ProductCarousel from '@/components/productCarousel'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <Header/>
    <ProductCarousel/>
    <FeaturedProducts/>
    <Footer/>
    </>
  )
}
