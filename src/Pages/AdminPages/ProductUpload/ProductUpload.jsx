import React, { useState, useRef } from 'react';
import styles from './ProductUpload.module.css';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ProductUpload = () => {
    const [productData, setProductData] = useState({
        name: '',
        img: null,
        price: '',
        quantity: 1,
        description: '',
        tag: ''
    });
    const [loading, setLoading] = useState(false);

    const fileInputRef = useRef(null);
    const tags = ['bedsheet', 'floormat', 'towel', 'pillowcover', 'featured'];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setProductData(prev => ({
            ...prev,
            img: file
        }));
    };

    const handleImageRemove = () => {
        setProductData(prev => ({
            ...prev,
            img: null
        }));
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('name', productData.name);
            formData.append('price', productData.price);
            formData.append('quantity', productData.quantity);
            formData.append('description', productData.description);
            formData.append('tag', productData.tag);
            formData.append('image', productData.img);

            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_API}/api/productRoutes/product/create`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            toast.success('Product uploaded successfully!', {
                position: 'top-center',
                duration: 3000
            });

            setProductData({
                name: '',
                img: null,
                price: '',
                quantity: 1,
                description: '',
                tag: ''
            });

            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }

        } catch (error) {
            console.error('Error uploading product:', error);
            toast.error(
                error.response?.data?.message || 'Failed to upload product. Please try again.',
                {
                    position: 'top-center',
                    duration: 3000
                }
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.productUploadContainer}>
            <h2 className={styles.pageTitle}>Upload New Product</h2>

            <form onSubmit={handleSubmit} className={styles.uploadForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>Product Name</label>
                    <input type="text" id="name" name="name" value={productData.name} onChange={handleInputChange}
                        className={styles.input} required />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="img" className={styles.label}>Product Image</label>
                    <input type="file" id="img" name="img" accept="image/*" onChange={handleImageUpload} ref={fileInputRef}
                        className={styles.fileInput} required />
                    <div className={styles.imageUploadWrapper} onClick={() => fileInputRef.current.click()} >
                        {productData.img ? (
                            <>
                                <img src={URL.createObjectURL(productData.img)} alt="Product Preview" className={styles.imagePreview} />
                                <button type="button" className={styles.imageRemoveBtn}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleImageRemove();
                                    }} >
                                    ✕
                                </button>
                            </>
                        ) : (
                            <div className={styles.imageUploadIcon}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
                                    <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.152-.177a1.56 1.56 0 001.11-.71l.821-1.317a2.685 2.685 0 012.332-1.39zM12 12.75h.008v.008H12v-.008z" clipRule="evenodd" />
                                </svg>
                                <div className={styles.imageUploadText}>
                                    Click to upload product image
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="price" className={styles.label}>Price</label>
                    <input type="number" id="price" name="price" value={productData.price} onChange={handleInputChange}
                        className={styles.input} min="0" step="0.01" required />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="quantity" className={styles.label}>Quantity</label>
                    <input type="number" id="quantity" name="quantity" value={productData.quantity} onChange={handleInputChange}
                        className={styles.input} min="1" required />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="description" className={styles.label}>Description</label>
                    <textarea id="description" name="description" value={productData.description}
                        onChange={handleInputChange} className={styles.textarea} required />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="tag" className={styles.label}>Product Tag</label>
                    <select id="tag" name="tag" value={productData.tag} onChange={handleInputChange}
                        className={styles.select} required >
                        <option value="">Select a Tag</option>
                        {tags.map(tag => (
                            <option key={tag} value={tag}>{tag}</option>
                        ))}
                    </select>
                </div>

                <button type="submit" className={styles.submitButton} disabled={loading}>
                    {loading ? 'Uploading...' : 'Upload Product'}
                </button>
            </form>
        </div>
    );
};

export default ProductUpload;