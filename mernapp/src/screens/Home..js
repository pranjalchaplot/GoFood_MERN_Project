import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ItemCard from '../components/ItemCard'

export default function Home() {
    const [Search, setSearch] = useState('')
    const [FoodItem, setFoodItem] = useState([]);
    const [FoodCategory, setFoodCategory] = useState([]);

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        let responseJSON = await response.json();

        setFoodItem(responseJSON[0]);
        setFoodCategory(responseJSON[1]);
    };

    const searchHandler = async (e) => {
        setSearch(e.target.value);
    }

    useEffect(() => {
        loadData();
    }, []);
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                    <div className="carousel-inner" id='carousel'>
                        <div className="carousel-caption" style={{ zIndex: "10" }}>
                            <div className="d-flex justify-content-center">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={Search} onChange={searchHandler} />
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x700/?paneer-pakode" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x700/?brownie" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className="container">
                {
                    FoodCategory !== [] ? FoodCategory.map((category) => {
                        return (
                            <div className='row m-3'>
                                <div key={category._id} className='fs-3 m-3'>{category.CategoryName}</div>
                                <hr />
                                {
                                    FoodItem !== [] ? FoodItem.filter((foodItem) =>
                                        (foodItem.CategoryName === category.CategoryName)
                                        && (foodItem.name.toLowerCase().includes(Search.toLowerCase()))
                                    ).map((item) => {
                                        return (
                                            <>
                                                <div key={item._id} className='col-12 col-md-6 col-lg-3'>
                                                    <ItemCard
                                                        foodItem={item}
                                                        options={item.options[0]} />
                                                </div>
                                            </>
                                        )
                                    }) : <div></div>
                                }
                            </div>
                        );
                    }) : <div></div>
                }
            </div>
            <div><Footer /></div>
        </div>
    )
}
