import React, { useState, useEffect } from 'react';
import './Banner.css'; // Make sure this path is correct

const Banner = () => {
    const [bannerData, setBannerData] = useState(null);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        // Fetch the banner data from the backend
        fetch('http://localhost:5000/api/banner')
            .then(response => response.json())
            .then(data => {
                setBannerData(data);
                setTimer(data.timer); // Initialize the timer with the value from the backend
            })
            .catch(error => console.error('Error fetching banner data:', error));
    }, []);

    useEffect(() => {
        if (timer > 0) {
            // Set up the countdown timer
            const countdown = setInterval(() => {
                setTimer(prevTimer => {
                    if (prevTimer <= 1) {
                        clearInterval(countdown); // Stop the timer when it reaches zero
                        return 0;
                    }
                    return prevTimer - 1;
                });
            }, 1000);

            // Clean up interval on component unmount
            return () => clearInterval(countdown);
        }
    }, [timer]);

    // Hide the banner when timer reaches 0 or if it's not visible
    if (!bannerData || timer <= 0 || !bannerData.isVisible) return null;

    return (
        <div className="banner">
            <p>{bannerData.description}</p>
            {bannerData.link && (
                <a href={bannerData.link} target="_blank" rel="noopener noreferrer">
                    Click Here
                </a>
            )}
            <p>Time remaining: {timer} seconds</p>
        </div>
    );
};

export default Banner;
