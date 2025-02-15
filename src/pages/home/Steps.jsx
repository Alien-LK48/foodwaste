import React from 'react'

export default function Steps() {
    return (
        <>
             <h2 className="text-4xl font-bold text-center">Our Approach to Tackling Food Waste</h2> <br />
             <div className='flex flex-wrap gap-[20px] justify-center items-center align-middle'>
                <div className="card card-compact bg-base-100 w-96 shadow-xl">
                    <figure>
                        <img
                            src="/public/Rescue.png"
                            alt="earth"
                            className='w-[380px] h-[300px]' />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Rescue</h2>
                        <p className='text-justify'>Rescue is the first critical step in reducing food waste. By identifying surplus food before it has the chance to be discarded, we are able to prevent perfectly edible food from going to waste. This involves working with grocery stores, restaurants, and individuals to gather food that is still fresh and safe for consumption but would otherwise end up in landfills. Rescuing food helps conserve valuable resources and reduces the environmental burden caused by food production and disposal.</p>
                    </div>
                </div>
                <div className="card card-compact bg-base-100 w-96 shadow-xl">
                    <figure>
                        <img
                            src="/public/Redistribute.png"
                            alt="money"
                            className='w-[380px] h-[300px]' />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Redistribute</h2>
                        <p className='text-justify'>Redistribution is about making rescued food available to those who need it the most. Once food is rescued, it is shared with local charities, shelters, and food banks, ensuring that it reaches communities who are struggling with food insecurity. By redistributing surplus food, we not only address hunger but also create a sense of community and support. It's a sustainable way of ensuring that no good food goes to waste when others can benefit from it.</p>
                    </div>
                </div>
                <div className="card card-compact bg-base-100 w-96 shadow-xl">
                    <figure>
                        <img
                            src="/public/Reduce.png"
                            alt="hunger"
                            className='w-[380px] h-[300px]'  />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Reduce</h2>
                        <p className='text-justify'>Reducing food waste starts with small changes in our daily habits. By learning how to properly store food, plan meals, and use leftovers, we can significantly lower the amount of food that goes uneaten. Encouraging families, businesses, and individuals to adopt these waste-free practices is crucial for creating long-term change. The less food we waste, the less strain we put on our environment and resources, leading to a healthier planet for future generations.</p>
                    </div>
                </div>

            </div>

        </>
    )
}
