import React, { useEffect, useRef, useState } from 'react'

import { UseCart, DispatchCart } from './ContextReducer';

export default function ItemCard(props) {
    const priceRef = useRef();

    let dispatch = DispatchCart();
    let cartData = UseCart();

    let options = props.options ?? {};
    let priceOptions = Object.keys(options);

    const [Quantity, setQuantity] = useState(1);
    const [Size, setSize] = useState("");

    const addToCartHandler = async () => {
        let food = [];
        for (const item of cartData) {
            if (item.id === props.foodItem._id) {
                food = item;
                if (food.size === Size) {
                    await dispatch({
                        type: "UPDATE",
                        id: props.foodItem._id,
                        price: finalPrice,
                        quantity: Quantity
                    });
                    return;
                }
            }
        }

        await dispatch({
            type: "ADD",
            id: props.foodItem._id,
            name: props.foodItem.name,
            img: props.foodItem.img,
            price: finalPrice,
            quantity: Quantity,
            size: Size
        });
    }

    let finalPrice = Quantity * parseInt(options[Size]);

    useEffect(() => {
        setSize(priceRef.current.value);
    }, [])

    return (
        <div>
            <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                <img className="card-img-top" src={props.foodItem.img} alt="Item Card" style={{ height: "120px", objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <div className="container w-100">
                        <select className="m-2 h-100 bg-success rounded" onChange={(e) => setQuantity(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>
                        <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {
                                priceOptions.map((optionData) => {
                                    return (
                                        <option key={optionData} value={optionData}>{optionData}</option>
                                    )
                                })
                            }
                        </select>
                        <div className="d-inline h-100 fs-5">
                            ₹{finalPrice}/-
                        </div>
                    </div>
                    <hr />
                    <button className="btn btn-success text-white justify-center ms-2" onClick={addToCartHandler}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}
