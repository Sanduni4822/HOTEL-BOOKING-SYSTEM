import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManagerDashboard = () => {
    const [reviews, setReviews] = useState([]);

    // Fetch reviews data
    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/review/all')
            .then(response => {
                setReviews(response.data.body);
            })
            .catch(error => console.error('Error fetching reviews:', error));
    }, []);

    // Handle delete review
    const deleteReview = (revId) => {
        axios.delete(`http://localhost:8080/api/v1/review/delete?revId=${revId}`)
            .then(() => {
                setReviews(reviews.filter(review => review.revId !== revId));
            })
            .catch(error => console.error('Error deleting review:', error));
    };

    return (
        <div className="p-8 font-sans text-center">
            <h1 className="mb-8 text-3xl font-bold text-gray-800">Manager Dashboard</h1>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse shadow-lg">
                    <thead>
                        <tr className="text-gray-700 bg-gray-100">
                            <th className="px-6 py-4 font-semibold border-b">Review ID</th>
                            <th className="px-6 py-4 font-semibold border-b">Email</th>
                            <th className="px-6 py-4 font-semibold border-b">Name</th>
                            <th className="px-6 py-4 font-semibold border-b">Post Day</th>
                            <th className="px-6 py-4 font-semibold border-b">Rating</th>
                            <th className="px-6 py-4 font-semibold border-b">Review Title</th>
                            <th className="px-6 py-4 font-semibold border-b">Review</th>
                            <th className="px-6 py-4 font-semibold border-b">Images</th>
                            <th className="px-6 py-4 font-semibold border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review) => (
                            <tr key={review.revId} className="even:bg-gray-50">
                                <td className="px-4 py-3 border-b">{review.revId}</td>
                                <td className="px-4 py-3 border-b">{review.email}</td>
                                <td className="px-4 py-3 border-b">{review.name}</td>
                                <td className="px-4 py-3 border-b">{review.postDay}</td>
                                <td className="px-4 py-3 border-b">{review.rate}</td>
                                <td className="px-4 py-3 border-b">{review.reviewTitle}</td>
                                <td className="max-w-xs px-4 py-3 overflow-hidden border-b text-ellipsis">
                                    {review.review}
                                </td>
                                <td className="flex justify-center gap-2 px-4 py-3 border-b">
                                    {review.img1 && <img src={review.img1} alt="img1" className="object-cover w-16 h-16 rounded-md" />}
                                    {review.img2 && <img src={review.img2} alt="img2" className="object-cover w-16 h-16 rounded-md" />}
                                    {review.img3 && <img src={review.img3} alt="img3" className="object-cover w-16 h-16 rounded-md" />}
                                </td>
                                <td className="px-4 py-3 border-b">
                                    <button
                                        onClick={() => deleteReview(review.revId)}
                                        className="px-4 py-2 font-semibold text-white bg-red-500 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManagerDashboard;
