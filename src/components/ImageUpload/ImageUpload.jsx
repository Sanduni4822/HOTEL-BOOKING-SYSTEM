import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../configs/firebase';

const ImageUpload = () => {
    const [url, setUrl] = useState('');
    const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/e-channelling-10dc6.appspot.com/o/images%2F123.png?alt=media&token=16c311df-34fe-4dbc-ada4-1d6fb17e0291';

    const handleChange = (e) => {
        const currentDate = new Date();
        const image = e.target.files[0];

        if (image) {
            const storageRef = ref(storage, `images/${currentDate.toISOString()}`);
            const uploadTask = uploadBytesResumable(storageRef, image);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    // Optionally, you can set the progress state here if you want to show a progress bar.
                },
                (error) => {
                    console.error('Image upload failed!', error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setUrl(downloadURL);
                        localStorage.setItem('url', downloadURL);
                        console.log('Image uploaded successfully!');
                    });
                }
            );
        }
    };

    const handleButtonClick = () => {
        document.getElementById('fileInput').click();
    };

    return (
        <div>
            {/* Profile Picture */}
            <div className="relative flex flex-row h-[120px] w-full items-center gap-5 justify-center">
                {/* Image and Upload Button */}
                <div className="w-[120px] h-[120px] bg-white rounded-full overflow-hidden">
                    <img
                        src={url || defaultImage}
                        alt="Uploaded file"
                        className="object-cover w-full h-full rounded-full"
                    />
                </div>

                <button
                    className="w-[120px] h-[40px] py-2 bg-[#005F7E] rounded-lg text-white text-sm font-semibold"
                    onClick={handleButtonClick}
                >
                    Upload
                </button>
            </div>

            <input
                id="fileInput"
                type="file"
                onChange={handleChange}
                style={{ display: 'none' }}
            />
        </div>
    );
};

export default ImageUpload;
