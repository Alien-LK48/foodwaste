import React from 'react'

export default function Prblm() {
    return (
        <>
            <h2 className="text-4xl font-bold text-center">Why Reduce Food Waste?</h2> <br />
            <div className='flex flex-wrap gap-[20px] justify-center items-center align-middle'>
                <div className="card card-compact bg-base-100 w-96 shadow-xl">
                    <figure>
                        <img
                            src="/earth.png"
                            alt="earth" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Environmental Impact</h2>
                        <p className='text-justify'>In 2023, Bangladesh's waste-related methane emissions were equivalent to over 15 million metric tons of CO₂, contributing significantly to climate change. <br />
                            <a className='font-bold' target='_blank' href="https://www.statista.com/statistics/1418133/waste-related-methane-emissions-from-bangladesh/">view details</a>
                        </p>

                    </div>
                </div>
                <div className="card card-compact bg-base-100 w-96 shadow-xl">
                    <figure>
                        <img
                            src="/money.png"
                            alt="money" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Economic Cost</h2>
                        <p className='text-justify'>According to a 2023 report, between 12% and 32% of staple foods are lost during production and distribution in Bangladesh, leading to substantial economic losses. <br />
                        <a className='font-bold' target='_blank' href="https://thefinancialexpress.com.bd/views/filling-empty-plates-tackling-food-waste-in-bangladesh">view details</a>
                        </p>

                    </div>
                </div>
                <div className="card card-compact bg-base-100 w-96 shadow-xl">
                    <figure>
                        <img
                            src="/hunger.png"
                            alt="hunger" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Hunger Issue</h2>
                        <p className='text-justify'>Despite significant food waste, approximately 24% of Bangladesh's population still lives under the poverty line, and millions face food insecurity and malnutrition. <br />
                        <a href="https://thefinancialexpress.com.bd/views/filling-empty-plates-tackling-food-waste-in-bangladesh" className='font-bold' target='_blank'>view details</a></p>

                    </div>
                </div>

            </div>
        </>

    )
}
