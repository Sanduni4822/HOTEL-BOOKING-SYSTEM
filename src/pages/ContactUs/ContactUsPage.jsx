import React, { useState } from 'react';
import Image from '../../assets/contctimage/Image.jpg';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../configs/firebase';
import axios from 'axios';  // Import Axios 

const RatingComponent = () => {
  const [rating, setRating] = useState(0);
  const [when, setWhen] = useState('');
  const [who, setWho] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [photos, setPhotos] = useState([]);
  const [isCertified, setIsCertified] = useState(false);
  const [reviewError, setReviewError] = useState('');
  const [titleError, setTitleError] = useState('');
  const [certifyError, setCertifyError] = useState('');
  const [name, setName] = useState(''); // New state for name
  const [email, setEmail] = useState('');
  const [img1, setImg1]= useState(''); // New state for email
  const [img2, setImg2] = useState(''); // New state for email
  const [img3, setImg3] = useState(''); // New state for email


  const handleRating = (rate) => {
    setRating(rate);
  };

  const handlePhotoChange = async (e) => {
    const files = [...e.target.files];
    const photoURLs = [];

    // Loop through each file and upload it to Firebase
    for (let file of files) {
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      photoURLs.push(url);
    }

    // Update the state and store URLs in local storage
    setPhotos(photoURLs);
    localStorage.setItem('uploadedPhotos', JSON.stringify(photoURLs));
    // console.log(photoURLs);
    if (photoURLs.length > 0) {
      setImg1(photoURLs[0]); // Corrected line
      setImg2(photoURLs[1] || ''); // Ensure img2 has a fallback
      setImg3(photoURLs[2] || '');
    }

    console.log(photoURLs);
    console.log(img1); 
    console.log(img2); 
    console.log(img3); 
  };


  const handleContinue = async () => {
    let hasError = false;
    console.log("hhh")

    if (!reviewText) {
      setReviewError('Review text is required.');
      hasError = true;
    } else if (reviewText.length < 5) {
      setReviewError('Review text must be at least 40 characters.');
      hasError = true;
    } else {
      setReviewError('');
    }

    if (!reviewTitle) {
      setTitleError('Review title is required.');
      hasError = true;
    } else {
      setTitleError('');
    }

    if (!isCertified) {
      setCertifyError('Please tick the certification checkbox.');
      hasError = true;
    } else {
      setCertifyError('');
    }

    if (hasError) {
      return;
    }

    // Show alert when all fields are correctly filled out
    alert('All fields are correctly filled out!');

    // Handle the continue button click event
    console.log(photos);


    // Prepare the data to be sent
    const reviewData = {
      email: email,
      name: name,
      postDay: new Date().toISOString().split('T')[0], // Today's date
      rate: rating,
      review: reviewText,
      goDay: when,
      goWithWho: who,
      reviewTitle: reviewTitle,
      img1: img1,
      img2: img2,
      img3: img3,
    };
    console.log(reviewData);

    try {
      const  response = await axios.post('http://localhost:8080/api/v1/review/add', reviewData);
      console.log(response.data); // Handle response if needed
      alert('Review submitted successfully!');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">

      {/* Name Input */}
      <div className="mb-4">
        <label className="block mb-2 text-lg font-bold">Your Name</label>
        <input
          type="text"
          className="w-full p-2 border rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
      </div>

      {/* Email Input */}
      <div className="mb-4">
        <label className="block mb-2 text-lg font-bold">Your Email</label>
        <input
          type="email"
          className="w-full p-2 border rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-2 text-lg font-bold">HOW WOULD YOU RATE YOUR EXPERIENCE?</h2>
          <div className="flex items-center mb-4">
            <span className="mr-2 text-lg font-semibold">{rating} / 5</span> {/* Rating count */}
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  onClick={() => handleRating(star)}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={rating >= star ? '#F59E0B' : 'none'}
                  stroke="#F59E0B"
                  strokeWidth="2"
                  className={`w-8 h-8 cursor-pointer ${star < 5 ? 'mr-2' : ''}`}
                >
                  <path d="M12 .587l3.668 7.568L24 9.423l-6 5.843 1.417 8.23L12 18.897l-7.417 4.599L6 15.266.001 9.423l8.332-1.268L12 .587z" />
                </svg>
              ))}
            </div>
          </div>
          <div className="relative mb-4">
            <label className="block mb-2 text-lg font-bold">WHEN DID YOU GO?</label>
            <div className="relative">
              <input
                type="date"
                className="w-full p-2 border rounded-full"
                value={when}
                onChange={(e) => setWhen(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-lg font-bold">WHO DID YOU GO WITH?</label>
            <div className="flex flex-wrap gap-2">
              {['BUSINESS', 'COUPLES', 'FAMILY', 'FRIENDS', 'SOLO'].map((option) => (
                <button
                  key={option}
                  className={`p-2 border rounded-full ${who === option ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
                  onClick={() => setWho(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="mb-4">
            <label className="block mb-2 text-lg font-bold">WRITE YOUR REVIEW</label>
            <textarea
              className="w-full p-2 border rounded-md"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows="4"
            ></textarea>
            {reviewError && <p className="mt-1 text-sm text-red-500">{reviewError}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-lg font-bold">TITLE YOUR REVIEW</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={reviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
            />
            {titleError && <p className="mt-1 text-sm text-red-500">{titleError}</p>}
          </div>
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-lg font-bold">ADD SOME PHOTOS <span className="text-sm font-normal">(OPTIONAL)</span></label>
        <div className="p-4 text-center border border-gray-400 border-dashed rounded-md">
          <input
            type="file"
            className="hidden"
            id="photo-upload"
            multiple
            onChange={handlePhotoChange}
          />
          <label htmlFor="photo-upload" className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 mx-auto mb-2 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 5v14m7-7H5"
              />
            </svg>
            <span className="text-gray-600">Click to add photos or drag and drop</span>
          </label>
        </div>
      </div>
      <div className="mb-4">
        {photos.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {photos.map((photo, index) => (
              <img
                key={index}
                src={photo} // Use `photo` directly as it is already a URL
                alt={`Upload ${index + 1}`}
                className="object-cover w-24 h-24 rounded-md"
              />
            ))}

          </div>
        )}
      </div>
      <div className="mb-4">
        <input
          type="checkbox"
          id="certify"
          className="mr-2"
          checked={isCertified}
          onChange={(e) => setIsCertified(e.target.checked)}
        />
        <label htmlFor="certify" className="text-sm">
          I certify that this review is based on my own experience and is my genuine opinion of this hotel, and that I have no personal or business relationship with this establishment, and have not been offered any incentive or payment originating from the establishment to write this review. I understand that Tripadvisor has a zero-tolerance policy on fake reviews.
        </label>
        {certifyError && <p className="mt-1 text-sm text-red-500">{certifyError}</p>}
      </div>
      <div className="flex justify-center mb-4">
        <button
          className="p-2 text-white bg-black rounded-full"
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

const ContactUsPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="relative w-full">
        <img
          src={Image}
          alt="Example"
          className="w-full h-auto max-h-[400px] object-cover mb-8"
        />
      </div>
      <div className="grid w-full max-w-4xl grid-cols-1 gap-8 mb-8 md:grid-cols-2">
        <div className="text-left">
          <h1 className="mb-6 text-4xl font-bold">
            WE LOVE TO<br />
            <span className="relative">
              HEAR FROM YOU
              <span className="absolute left-0 bottom-[-2px] w-full h-[2px] bg-black"></span>
            </span>
          </h1>
          <p className="mb-4 text-xl">Your hospitality is our priority, Luxury at its finest.</p>
        </div>
        <div className="text-left">
          <p className="mb-4">
            Hotel La-Vila is a famous hotel and well-known hotel with the best hospitality in Waligama area. We expect to give our guests a better service, to accommodate more guests & give a lifetime experience as a rising hotel.
          </p>
          <p className="mb-4">
            We hope our hotel will give chance to guests to plan their vacation in an effective way by providing numerous facilities and services.
          </p>
          <p className="mb-4">
            We are grateful to you as our valuable guest if you could give reviews about our hotel then it will be really helpful for us. Also, you can contact our hotel anytime for any information.
          </p>
        </div>
      </div>
      <div className="w-full max-w-4xl mx-auto mb-8">
        <RatingComponent />
      </div>
      <div className="w-full">
        <iframe
          width="100%"
          height="600"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=villa%20the%20leaf%20waligama+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUsPage;
