import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { AdminManagerSummaryApi } from '../../../features/common/AdminManagerSummaryApi';

const CreatePost = () => {
    const accessToken = useSelector((state) => state.auth.accessToken);
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        fullName: 'Nayan',
        propertyTitle: '',
        mobileNumber: '',
        province: '',
        landAddress: '',
        landType: '',
        landCategory: '',
        facilities: [],
        area: {
            size: '',
            unit: '',
        },
        price: {
            amount: '',
            sizePerAmount: '',
        },
        isNegotiable: false,
        purpose: '',
        propertyAge: '',
        facing: '',
        featured: '',
        videoLink: '',
        description: '',
        propertyOverView: '',
        images: [],
        avatar: [],
    });

    const [imagePreviews, setImagePreviews] = useState([]);
    const [avatarPreviews, setAvatarPreviews] = useState([]);

    const provinces = ['Province1', 'Province2', 'Province3', 'Province4', 'Province5'];
    const landTypes = ['commercial', 'residential'];
    const landCategories = ['land', 'apartment', 'officeSpace', 'house'];
    const areaUnits = ['kattha', 'ropani'];
    const facingOptions = ['North', 'South', 'East', 'West', 'Southwest', 'Northeast'];
    const featuredOptions = ['featured', 'unpaid'];

    const handleChange = (e) => {
        const { name, type, checked, value, files } = e.target;

        if (type === 'checkbox') {
            setFormData({ ...formData, [name]: checked });
        } else if (type === 'file') {
            const fileArray = Array.from(files); // Convert FileList to an array

            if (name === 'images') {
                // Append new files to the existing images array
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    images: [...prevFormData.images, ...fileArray],
                }));
    
                // Generate previews for the new images and append to existing previews
                const newPreviews = fileArray.map((file) => URL.createObjectURL(file));
                setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
            } else if (name === 'avatar') {
                // Replace the existing avatar with the new file (assuming only one avatar is allowed)
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    avatar: fileArray, // Replace the entire avatar array
                }));
    
                // Generate previews for the new avatar and replace existing previews
                const newAvatarPreviews = fileArray.map((file) => URL.createObjectURL(file));
                setAvatarPreviews(newAvatarPreviews);
            }
        } else if (type === 'select-multiple') {
            const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
            setFormData({ ...formData, [name]: selectedOptions });
        } else if (name === 'facilities') {
            // Convert comma-separated string to an array
            const facilitiesArray = value.split(',').map(item => item.trim());
            setFormData({ ...formData, [name]: facilitiesArray });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleNestedChange = (parentKey, key, value) => {
        setFormData({
            ...formData,
            [parentKey]: {
                ...formData[parentKey],
                [key]: value,
            },
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key !== 'avatar' && key !== 'images') {
                if (typeof formData[key] === 'object' && formData[key] !== null) {
                    formDataToSend.append(key, JSON.stringify(formData[key]));
                } else {
                    formDataToSend.append(key, formData[key]);
                }
            }
        });
        formData.avatar.forEach((file) => formDataToSend.append('avatar', file));
        formData.images.forEach((file) => formDataToSend.append('images', file));

        try {
            const response = await axios.post(AdminManagerSummaryApi.CreatePost.url, formDataToSend, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccess(true);
            console.log("Post created successfully", response.data);
        } catch (error) {
            setError("Error creating post. Please try again.");
            console.error("Error creating post:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleOptionChange = (value) => {
        setFormData({
            ...formData,
            featured: value,
        });
    };

    const removeItem = (fieldName, index) => {
        // Remove the item from the formData array
        const updatedItems = [...formData[fieldName]];
        updatedItems.splice(index, 1);
        setFormData({ ...formData, [fieldName]: updatedItems });
    
        // If the field is 'images', also remove the preview and revoke the object URL
        if (fieldName === 'images') {
            const updatedPreviews = [...imagePreviews];
            URL.revokeObjectURL(updatedPreviews[index]); // Free up memory
            updatedPreviews.splice(index, 1);
            setImagePreviews(updatedPreviews);
        } else if (fieldName === 'avatar') {
            // Clear the avatar preview
            setAvatarPreviews([]);
        }
    };

    return (
        <div className="flex flex-col p-6 bg-white text-black rounded-2xl shadow-md max-w-[95%] h-[95vh] mx-auto mb-6">
            <div className="flex border-b border-gray-700 pb-4 mb-6">
                <div className='flex items-center space-x-4 justify-center w-full'>
                    <button
                        className={`px-6 py-2 rounded-lg transition-all ${step === 1 ? 'bg-blue-600 text-white' : 'bg-[#f0f0f0] hover:bg-blue-600'}`}
                        onClick={() => setStep(1)}
                    >
                        Main Details
                    </button>
                    <button
                        className={`px-6 py-2 rounded-lg transition-all ${step === 2 ? 'bg-blue-600 text-white' : 'bg-[#f0f0f0] hover:bg-blue-600'}`}
                        onClick={() => setStep(2)}
                    >
                        Other Details
                    </button>
                    <button
                        className={`px-6 py-2 rounded-lg transition-all ${step === 3 ? 'bg-blue-600 text-white' : 'bg-[#f0f0f0] hover:bg-blue-600'}`}
                        onClick={() => setStep(3)}
                    >
                        Images
                    </button>
                    <button
                        className={`px-6 py-2 rounded-lg transition-all ${step === 4 ? 'bg-blue-600 text-white' : 'bg-[#f0f0f0] hover:bg-blue-600'}`}
                        onClick={() => setStep(4)}
                    >
                        URLs
                    </button>
                </div>
            </div>

            {step === 1 && (
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-1">Property Title</label>
                            <input
                                className="w-full p-3 border border-gray-700 rounded-lg bg-[#f0f0f0] focus:outline-none focus:border-blue-600"
                                type="text"
                                name="propertyTitle"
                                placeholder="Property Title"
                                value={formData.propertyTitle}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Mobile Number</label>
                            <input
                                className="w-full p-3 border border-gray-700 rounded-lg bg-[#f0f0f0] focus:outline-none focus:border-blue-600"
                                type="text"
                                name="mobileNumber"
                                placeholder="Mobile Number"
                                value={formData.mobileNumber}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Province</label>
                            <select
                                className="w-full p-3 border border-gray-700 rounded-lg bg-[#f0f0f0] focus:outline-none focus:border-blue-600"
                                name="province"
                                value={formData.province}
                                onChange={handleChange}
                            >
                                <option value="">Select Province</option>
                                {provinces.map((province, index) => (
                                    <option key={index} value={province}>{province}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Address</label>
                            <input
                                className="w-full p-3 border border-gray-700 rounded-lg bg-[#f0f0f0] focus:outline-none focus:border-blue-600"
                                type="text"
                                name="landAddress"
                                placeholder="Land Address"
                                value={formData.landAddress}
                                onChange={handleChange}
                            />
                        </div>

                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            className="w-full p-3 border border-gray-700 rounded-lg bg-[#f0f0f0] focus:outline-none focus:border-blue-600"
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Property Overview</label>
                        <textarea
                            className="w-full p-3 border border-gray-700 rounded-lg bg-[#f0f0f0] focus:outline-none focus:border-blue-600"
                            name="propertyOverView"
                            placeholder="Property Overview"
                            value={formData.propertyOverView}
                            onChange={handleChange}
                            rows="6"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                            onClick={() => setStep(2)}
                        >
                            Next
                        </button>
                    </div>
                </form>
            )}

            {step === 2 && (
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-1">Land Type</label>
                            <select
                                className="w-full p-3 border border-gray-700 rounded-lg bg-[#f0f0f0] focus:outline-none focus:border-blue-600"
                                name="landType"
                                value={formData.landType}
                                onChange={handleChange}
                            >
                                <option value="">Select Land Type</option>
                                {landTypes.map((type, index) => (
                                    <option key={index} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Land Category</label>
                            <select
                                className="w-full p-3 border border-gray-700 rounded-lg bg-[#f0f0f0] focus:outline-none focus:border-blue-600"
                                name="landCategory"
                                value={formData.landCategory}
                                onChange={handleChange}
                            >
                                <option value="">Select Land Category</option>
                                {landCategories.map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Area Size</label>
                            <input
                                className="w-full p-3 border border-gray-700 rounded-lg bg-[#f0f0f0] focus:outline-none focus:border-blue-600"
                                type="number"
                                name="size"
                                placeholder="Area Size"
                                value={formData.area.size}
                                onChange={(e) => handleNestedChange('area', 'size', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Area Unit</label>
                            <select
                                className="w-full p-3 border border-gray-700 rounded-lg bg-[#f0f0f0] focus:outline-none focus:border-blue-600"
                                name="unit"
                                value={formData.area.unit}
                                onChange={(e) => handleNestedChange('area', 'unit', e.target.value)}
                            >
                                <option value="">Select Unit</option>
                                {areaUnits.map((unit, index) => (
                                    <option key={index} value={unit}>{unit}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Price Amount</label>
                            <input
                                className="w-full p-3 border border-gray-700 rounded-lg bg-[#f0f0f0] focus:outline-none focus:border-blue-600"
                                type="number"
                                name="amount"
                                placeholder="Price Amount"
                                value={formData.price.amount}
                                onChange={(e) => handleNestedChange('price', 'amount', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Price Unit</label>
                            <select
                                className="w-full p-3 border border-gray-700 rounded-lg bg-[#f0f0f0] focus:outline-none focus:border-blue-600"
                                name="sizePerAmount"
                                value={formData.price.sizePerAmount}
                                onChange={(e) => handleNestedChange('price', 'sizePerAmount', e.target.value)}
                            >
                                <option value="">Select Unit</option>
                                {areaUnits.map((unit, index) => (
                                    <option key={index} value={unit}>{unit}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Purpose</label>
                            <select
                                className="w-full p-3 border border-gray-700 rounded-lg bg-[#f0f0f0] focus:outline-none focus:border-blue-600"
                                name="purpose"
                                value={formData.purpose}
                                onChange={handleChange}
                            >
                                <option value="">Select Purpose</option>
                                <option value="sell">Sell</option>
                                <option value="rent">Rent</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Property Age</label>
                            <input
                                className="w-full p-3 border border-gray-700 rounded-lg bg-[#f0f0f0] focus:outline-none focus:border-blue-600"
                                type="number"
                                name="propertyAge"
                                placeholder="Property Age"
                                value={formData.propertyAge}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Facing</label>
                            <select
                                className="w-full p-3 border border-gray-700 rounded-lg bg-[#f0f0f0] focus:outline-none focus:border-blue-600"
                                name="facing"
                                value={formData.facing}
                                onChange={handleChange}
                            >
                                <option value="">Select Facing</option>
                                {facingOptions.map((facing, index) => (
                                    <option key={index} value={facing}>{facing}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Select Option</label>
                            <div className="flex space-x-4">
                                {/* Featured Box */}
                                <div
                                    className={`w-1/2 p-3 border border-gray-700 rounded-lg cursor-pointer transition-colors duration-200 ${formData.featured === 'Featured'
                                        ? 'bg-blue-600 text-white' // Selected style
                                        : 'bg-[#f0f0f0] hover:bg-gray-200' // Default and hover style
                                        }`}
                                    onClick={() => handleOptionChange('Featured')}
                                >
                                    <span className="block text-center">Featured</span>
                                </div>

                                {/* Unpaid Box */}
                                <div
                                    className={`w-1/2 p-3 border border-gray-700 rounded-lg cursor-pointer transition-colors duration-200 ${formData.featured === 'Unpaid'
                                        ? 'bg-blue-600 text-white' // Selected style
                                        : 'bg-[#f0f0f0] hover:bg-gray-200' // Default and hover style
                                        }`}
                                    onClick={() => handleOptionChange('Unpaid')}
                                >
                                    <span className="block text-center">Unpaid</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Facilities</label>
                            <input
                                className="w-full p-3 border border-gray-700 rounded-lg bg-[#f0f0f0] focus:outline-none focus:border-blue-600"
                                type="text"
                                name="facilities"
                                placeholder="Enter facilities separated by commas (e.g., water, electricity, parking)"
                                value={formData.facilities.join(', ')} // Convert array to comma-separated string
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Negotiable</label>
                            <input
                                className="w-5 h-5"
                                type="checkbox"
                                name="isNegotiable"
                                checked={formData.isNegotiable}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between mt-6">
                        <button
                            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all"
                            onClick={() => setStep(1)}
                        >
                            Back
                        </button>
                        <button
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                            onClick={() => setStep(3)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {step === 3 && (
               <div>
               <label className="block text-sm font-medium mb-4">Upload Avatar and Images:</label>
           
               {/* Avatar Upload */}
               <div className="mb-6">
                   <label className="block text-sm font-medium mb-2">Avatar:</label>
                   <input
                       className="w-full p-3 border border-gray-700 rounded-lg bg-[#f0f0f0] focus:outline-none focus:border-blue-500"
                       type="file"
                       name="avatar"
                       accept="image/*" // Accept only image files
                       onChange={handleChange}
                   />
                   {/* Avatar Preview */}
                   {avatarPreviews.length > 0 && (
                       <div className="mt-4">
                           <div className="relative w-32 h-32">
                               <img
                                   src={avatarPreviews[0]} // Display the first (and only) avatar preview
                                   alt="Avatar Preview"
                                   className="w-full h-full rounded-lg object-cover"
                               />
                               <button
                                   className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                   onClick={() => removeItem('avatar', 0)} // Remove avatar
                               >
                                   ×
                               </button>
                           </div>
                       </div>
                   )}
               </div>
           
               {/* Images Upload */}
               <div className="mb-6">
                   <label className="block text-sm font-medium mb-2">Images:</label>
                   <input
                       className="w-full p-3 border border-gray-700 rounded-lg bg-[#f0f0f0] focus:outline-none focus:border-blue-500"
                       type="file"
                       name="images"
                       multiple // Allow multiple file selection
                       accept="image/*" // Accept only image files
                       onChange={handleChange}
                   />
                   {/* Images Preview */}
                   <div className="grid grid-cols-3 gap-4 mt-4">
                       {imagePreviews.map((src, index) => (
                           <div key={index} className="relative">
                               <img
                                   src={src}
                                   alt="Image Preview"
                                   className="w-full h-32 rounded-lg object-cover"
                               />
                               <button
                                   className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                   onClick={() => removeItem('images', index)} // Remove image on button click
                               >
                                   ×
                               </button>
                           </div>
                       ))}
                   </div>
               </div>
           
               {/* Navigation Buttons */}
               <div className="flex justify-between mt-6">
                   <button
                       className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all"
                       onClick={() => setStep(2)}
                   >
                       Back
                   </button>
                   <button
                       className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                       onClick={() => setStep(4)}
                   >
                       Next
                   </button>
               </div>
           </div>
            )}

            {step === 4 && (
                <div>
                    <label className="block text-sm font-medium mb-1">Video Link</label>
                    <input
                        className="w-full p-3 border border-gray-700 rounded-lg bg-[#f0f0f0] focus:outline-none focus:border-blue-500"
                        type="text"
                        name="videoLink"
                        placeholder="Video Link"
                        value={formData.videoLink}
                        onChange={handleChange}
                    />
                    <div className="flex justify-between mt-6">
                        <button
                            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all"
                            onClick={() => setStep(3)}
                        >
                            Back
                        </button>
                        <button
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </div>
            )}

            {error && <div className="mt-4 text-red-500">{error}</div>}
            {success && <div className="mt-4 text-green-500">Post created successfully!</div>}
        </div>
    );
};

export default CreatePost;