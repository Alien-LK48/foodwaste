import React from 'react';

export default function OurTeam() {
    return (
        <section className="py-12 px-6 bg-white">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-800">Meet Our Team</h2>
                <p className="mt-4 text-lg text-gray-700">Our dedicated team is passionate about making a difference. Here are some of the amazing individuals behind our mission:</p>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="team-member">
                        <img
                            src=""
                            alt="Team Member 1"
                            className="w-full h-auto max-h-[260px] rounded-lg shadow-lg"
                        />
                        <h3 className="mt-4 text-xl font-semibold text-gray-800">John Doe</h3>
                        <p className="text-gray-600">Founder & CEO</p>
                        <p className="mt-2 text-gray-700">
                            John has been the driving force behind our mission to reduce food waste. With a background in social entrepreneurship, he founded our organization to tackle hunger and environmental issues together.
                        </p>
                    </div>
                    <div className="team-member">
                        <img
                            src=""
                            alt="Team Member 2"
                            className="w-full h-auto max-h-[260px] rounded-lg shadow-lg"
                        />
                        <h3 className="mt-4 text-xl font-semibold text-gray-800">Jane Smith</h3>
                        <p className="text-gray-600">Operations Manager</p>
                        <p className="mt-2 text-gray-700">
                            Jane ensures that our operations run smoothly from food recovery to distribution. Her attention to detail and leadership skills keep everything organized and efficient.
                        </p>
                    </div>

                    <div className="team-member">
                        <img
                            src=""
                            alt="Team Member 3"
                            className="w-full h-auto max-h-[260px] rounded-lg shadow-lg"
                        />
                        <h3 className="mt-4 text-xl font-semibold text-gray-800">Emily Brown</h3>
                        <p className="text-gray-600">Community Outreach Coordinator</p>
                        <p className="mt-2 text-gray-700">
                            Emily connects with local communities, volunteers, and partners to expand our outreach efforts. She is passionate about building relationships and growing our network of supporters.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
