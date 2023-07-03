import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ItemCard from '../components/ItemCard'
import Carousel from '../components/Carousel'

export default function Home() {
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div>
                <Carousel />
            </div>
            <div className="m-3">
                <ItemCard />
                <ItemCard />
                <ItemCard />
            </div>
            <div><Footer /></div>
        </div>
    )
}
