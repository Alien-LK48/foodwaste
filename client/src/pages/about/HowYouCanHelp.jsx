import React from 'react';
import Header from '../../components/heading/Header';
import './css.css'
export default function HowYouCanHelp() {
    return (
        <section className="bg-[url('/help.png')] bg-cover bg-center bg-no-repeat py-12 px-6 bg-gray-100 border-x-[20px] border-[#3B42D2] mt-[-25px] border-double">
            <div className="backdrop-blur-sm max-w-5xl mx-auto text-center">
                <Header childern={`How You Can Help`}/>
                <p className="mt-4 text-lg text-gray-700">Every small effort counts. Here are a few ways you can make a difference and help us in our mission:</p>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="help-option bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold text-gray-800">Donate Food</h3>
                        <p className="mt-2 text-gray-700 text-justify ">
                            If you have surplus food, donate it to help feed those in need. Your donations can provide meals to hungry families, reduce food waste, and support your local community.
                        </p>
                    </div>

                    <div className="help-option bg-white p-6 rounded-lg shadow-lg ">
                        <h3 className="text-xl font-semibold text-gray-800">Volunteer</h3>
                        <p className="mt-2 text-gray-700 text-justify ">
                            Volunteers are the heart of our organization. By volunteering your time, you’ll be directly involved in rescuing food, distributing meals, and supporting our mission in your local area.
                        </p>
                    </div>

                    <div className="help-option bg-white p-6 rounded-lg shadow-lg ">
                        <h3 className="text-xl font-semibold text-gray-800">Raise Awareness</h3>
                        <p className="mt-2 text-gray-700 text-justify ">
                            Share our cause with your friends, family, and community. The more people know about food waste, the more we can do to solve the problem. Together, we can inspire change!
                        </p>
                    </div>

                    <div className="help-option bg-white p-6 rounded-lg shadow-lg ">
                        <h3 className="text-xl font-semibold text-gray-800">Make a Financial Contribution</h3>
                        <p className="mt-2 text-gray-700 text-justify ">
                            Monetary donations help us cover operational costs, improve our infrastructure, and expand our reach to rescue even more food. Every dollar goes towards creating a sustainable impact.
                        </p>
                    </div>

                    <div className="help-option bg-white p-6 rounded-lg shadow-lg ">
                        <h3 className="text-xl font-semibold text-gray-800">Partner With Us</h3>
                        <p className="mt-2 text-gray-700 text-justify ">
                            Whether you're a local business or an organization, partner with us to rescue surplus food, reduce waste, and share meals with communities in need. Together, we can build a stronger future.
                        </p>
                    </div>

                    <div className="help-option bg-white p-6 rounded-lg shadow-lg ">
                        <h3 className="text-xl font-semibold text-gray-800">Support Our Initiatives</h3>
                        <p className="mt-2 text-gray-700 text-justify ">
                            Support our campaigns, events, and projects. By joining forces, we can amplify our impact, encourage others to help, and create a network of individuals working together to fight hunger.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
