import React from 'react'

export default function ItemCard() {
    return (
        <div>
            <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                <img className="card-img-top" src="..." alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Aao Khaana Khaao yaaro!</p>
                    <div className="container w-100">
                        <select name="" id="" className="m-2 h-100 bg-success rounded">
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>
                        <select name="" id="" className="m-2 h-100 bg-success rounded">
                            <option key={1} value="half">Half</option>
                            <option key={2} value="full">Full</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}
