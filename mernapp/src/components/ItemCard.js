import React from 'react'

export default function ItemCard(props) {
    let option = props.options ?? {};
    let priceOptions = Object.keys(option);
    return (
        <div>
            <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                <img className="card-img-top" src={props.imgURL} alt="Item Card" style={{ height: "120px", objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.cardTitle}</h5>
                    <div className="container w-100">
                        <select name="" id="" className="m-2 h-100 bg-success rounded">
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>
                        <select name="" id="" className="m-2 h-100 bg-success rounded">
                            {
                                priceOptions.map((optionData) => {
                                    return (
                                        <option key={optionData} value={optionData}>{optionData}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}
