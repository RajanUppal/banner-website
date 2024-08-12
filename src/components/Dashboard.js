import React, { useState, useEffect } from 'react';
import './Dashboard.css'; // Ensure CSS is applied correctly
import Banner from './Banner';

const Dashboard = () => {
    const [formData, setFormData] = useState({
        description: '',
        timer: 60,
        link: '',
        isVisible: true,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showMessage, setShowMessage] = useState(false); // new state to control message visibility


    useEffect(() => {
        // Fetch the current banner settings to pre-fill the form
        fetch('http://localhost:5000/api/banner')
            .then(response => response.json())
            .then(data => setFormData({
                description: data.description || '',
                timer: data.timer || 60,
                link: data.link || '',
                isVisible: data.isVisible || true
            }))
            .catch(error => console.error('Error fetching banner data:', error));
    }, []);

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };


    const fetchBannerSettings = () => {
        fetch('http://localhost:5000/api/banner')
            .then(response => response.json())
            .then(data => setFormData({
                description: data.description || '',
                timer: data.timer || 60,
                link: data.link || '',
                isVisible: data.isVisible || true
            }))
            .catch(error => console.error('Error fetching banner data:', error));
    };
    

    // Debugging in handleSubmit
    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        setShowMessage(true); 
    
        fetch('http://localhost:5000/api/banner', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(() => {
            // Fetch the updated banner settings
            fetchBannerSettings();
            setSuccess('Banner settings updated successfully!');
            setLoading(false);
            setTimeout(() => {
                setShowMessage(false); // hide message after 3 seconds
              }, 5000);
        })
        .catch(error => {
            console.error('Error updating banner data:', error);
            setError('Failed to update banner settings. Please try again.');
            setLoading(false);
            setTimeout(() => {
                setShowMessage(false); // hide message after 3 seconds
              }, 5000);
        });
    };
    
    useEffect(() => {
        fetchBannerSettings();
    }, []);
    


    return (
        <>

            {formData.isVisible && <Banner />}


        <div className="dashboard">
            <h2>Banner Settings</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Description:
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Banner Description"
                    />
                </label>
                <label>
                    Timer (seconds):
                    <input
                        type="number"
                        name="timer"
                        value={formData.timer}
                        onChange={handleChange}
                        placeholder="Timer"
                    />
                </label>
                <label>
                    Banner Link:
                    <input
                        type="url"
                        name="link"
                        value={formData.link}
                        onChange={handleChange}
                        placeholder="Banner Link"
                    />
                </label>
                <div className="button-group">
                        <button
                            type="button"
                            className={formData.isVisible ? 'toggle-button active' : 'toggle-button'}
                            onClick={() => setFormData(prevState => ({ ...prevState, isVisible: !prevState.isVisible }))}
                        >
                            {formData.isVisible ? 'Hide Banner' : 'Show Banner'}
                        </button>
                        <button type="submit" disabled={loading}>Update Banner</button>
                    </div>
                    {loading && <p>Loading...</p>}
                    {showMessage && (
                        <div>
                        {success && <p className="success">{success}</p>}
                        {error && <p className="error">{error}</p>}
                        </div>
                    )}
            </form>
            
        </div>

        </>
    );
};

export default Dashboard;
