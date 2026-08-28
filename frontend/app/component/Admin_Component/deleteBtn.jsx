import React, { useState } from 'react';

function DeleteBtn({ movieId }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // Function to handle the delete action
    const handleDelete = async () => {
        setIsDeleting(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/movie/${movieId}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to delete the movie');
            }

            alert('Movie deleted successfully');
            setIsModalOpen(false); 
        } catch (error) {
            alert(error.message);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleCancelDelete = () => {
        setIsModalOpen(false);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    return (
        <div>
            <button
                onClick={openModal}
                className="px-3 py-1 mt-2 text-white bg-red-600 rounded-md hover:bg-red-500"
            >
                Delete Movie
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50">
                    <div className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
                        <svg
                            onClick={handleCancelDelete}
                            className="w-3.5 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500 float-right"
                            viewBox="0 0 320.591 320.591"
                        >
                            <path
                                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                            ></path>
                            <path
                                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                            ></path>
                        </svg>
                        <div className="my-4 text-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="inline w-14 fill-red-500"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                                />
                                <path
                                    d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                                />
                            </svg>
                            <h4 className="mt-4 text-base font-semibold text-gray-800">
                                Are you sure you want to delete it?
                            </h4>
                            <div className="mt-8 space-x-4 text-center">
                                <button
                                    type="button"
                                    onClick={handleCancelDelete}
                                    className="px-4 py-2 text-sm text-gray-800 bg-gray-200 rounded-lg hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className={`px-4 py-2 text-sm text-white ${isDeleting ? 'bg-gray-500' : 'bg-red-600'} rounded-lg hover:bg-red-700`}
                                >
                                    {isDeleting ? 'Deleting...' : 'Confirm Delete'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DeleteBtn;
