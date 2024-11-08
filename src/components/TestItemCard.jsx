import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';  // Make sure to import Link
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ItemCard = ({
  category,
  condition,
  tags,
  description,
  price,
  images,
  details,
  sellerReviews,
  recommendedItems,
  sellerId,
  username,
  timeAgo,
  id,
  buyLink = '/',
  ...props
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // For item card
  const [modalImageIndex, setModalImageIndex] = useState(0); // For modal
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [scrollIndex, setScrollIndex] = useState(0); // For scroll snapping
  const carouselRef = useRef(null);
  const modalRef = useRef(null); // Ref for scroll snapping
  const swipeThreshold = 50; // Minimum distance for swipe detection

  const navigate = useNavigate(); // Initialize navigate

  const handleBuyClick = () => {
    navigate(buyLink); // Navigate to the provided link
  };

  // Open modal and set image to current card image
  const handleClick = () => {
    setModalVisible(true);
    setModalImageIndex(currentImageIndex);
  };

  // Mouse and touch event handlers
  const handleMouseDown = (e) => {
    if (!isLargeScreen) {
      setIsDragging(true);
      setStartX(e.pageX);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging || isLargeScreen) return;
    const currentX = e.pageX;
    const diff = currentX - startX;
    setTranslateX(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging || isLargeScreen) return;
    setIsDragging(false);
    snapToNearestImage();
  };

  const handleTouchStart = (e) => {
    if (!isLargeScreen) {
      setIsDragging(true);
      setStartX(e.touches[0].pageX);
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || isLargeScreen) return;
    const currentX = e.touches[0].pageX;
    const diff = currentX - startX;
    setTranslateX(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging || isLargeScreen) return;
    setIsDragging(false);
    snapToNearestImage();
  };

  // Snap to nearest image after swipe
  const snapToNearestImage = () => {
    const carouselWidth = carouselRef.current.offsetWidth;
    if (Math.abs(translateX) > swipeThreshold) {
      // If swipe distance exceeds the threshold, determine direction
      const newIndex = translateX > 0 ? currentImageIndex - 1 : currentImageIndex + 1;
      const boundedIndex = Math.max(0, Math.min(newIndex, images.length - 1));
      setCurrentImageIndex(boundedIndex);
    }
    setTranslateX(0); // Reset translateX after snapping
  };

  // Scroll snapping logic for modal sections
  const handleScroll = () => {
    const modal = modalRef.current;
    const { scrollTop, clientHeight } = modal;
    const newScrollIndex = Math.round(scrollTop / clientHeight);
    setScrollIndex(newScrollIndex);
  };

  const handleNextImage = () => {
    const newIndex = modalImageIndex + 1;
    if (newIndex < images.length) {
      setModalImageIndex(newIndex);
    }
  };

  const handlePrevImage = () => {
    const newIndex = modalImageIndex - 1;
    if (newIndex >= 0) {
      setModalImageIndex(newIndex);
    }
  };

  // Set up the event listeners and resize detection
  useEffect(() => {
    const carouselWidth = carouselRef.current.offsetWidth;

    // Detect large screens (laptop or higher)
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [currentImageIndex]);

  const handleCloseModal = (e) => {
    e.stopPropagation();
    setModalVisible(false);
  };

  return (
    <div
      className="bg-white rounded-lg border border-gray-200 p-4 max-w-xs shadow-lg font-sans"
      onClick={handleClick}
    >
      <Link
        to={`/profile/${sellerId}`}
        className="flex items-center mb-4">
          
        <img
          src={props.sellerProfilePicture}
          alt="Seller Profile"
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <p className="m-0 font-bold">{username}</p>
          <p className="text-gray-500 text-sm m-0">{timeAgo}</p>
        </div>
      </Link>
      <div>


        <div className="relative mb-4 overflow-hidden">
          <div
            ref={carouselRef}
            className="relative w-full h-48"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="absolute top-0 left-0 h-full flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(${-currentImageIndex * 100}%)` }}
            >
              {images.map((img, index) => (
                <img
                  key={index}
                  className="w-full h-full flex-shrink-0 object-cover"
                  src={img}
                  alt={`Product ${index + 1}`}
                />
              ))}
            </div>
          </div>
          <div className="absolute top-0 left-0 p-2 rounded-br-lg flex flex-col gap-1">
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">{condition}</span>
          </div>
          <div className="absolute top-0 right-0 p-2 rounded-br-lg flex flex-col gap-1">
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">{category}</span>
          </div>
          <div className="absolute bottom-0 right-0 bg-white p-2 rounded-tl-lg">
            <div className="text-2xl font-bold text-gray-900">${price}</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag, index) => (
            <div key={index} className="text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              {tag}
            </div>
          ))}
        </div>
      </div>
      {modalVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white p-6 rounded-lg max-w-lg w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div ref={modalRef} onScroll={handleScroll} className="relative w-full h-64 mb-4 overflow-y-auto snap-y snap-mandatory">
              {/* Item Details */}
              <div className="snap-start h-full w-full mb-8">
                <div className="relative w-full h-200 mb-4 overflow-hidden"> {//TODO: Fix height
                }
                  <div className="absolute top-0 left-0 h-48 flex transition-transform duration-300 ease-out"
                    style={{ transform: `translateX(${-modalImageIndex * 100}%)` }}
                  >
                    {images.map((img, index) => (
                      <img
                        key={index}
                        className="w-full h-48 flex-shrink-0 object-cover"
                        src={img}
                        alt={`Product ${index + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                    onClick={handlePrevImage}
                  >
                    ‹
                  </button>
                  <button
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                    onClick={handleNextImage}
                  >
                    ›
                  </button>
                </div>
                <h2 className="text-xl font-bold mb-2">{description}</h2>
                <p className="text-gray-700 mb-4">${price}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}

                </div>
                <Link
                  to={`/chat?seller=${encodeURIComponent(sellerId)}&item=${encodeURIComponent(id)}&action=chat`}
                  className="bg-blue-500 text-white p-2 mt-2 inline-block"
                >
                  Chat with Seller
                </Link>
                <h3 className="font-bold mb-2">Details:</h3>
                <ul className="list-disc pl-5 mb-4">
                  {Object.entries(details).map(([key, value], index) => (
                    <li key={index}>
                      <span className="font-semibold">{key}:</span> {value}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Seller Reviews */}
              <div className="snap-start h-full w-full">
                <h2 className="text-xl font-bold mb-2">Seller Reviews</h2>
                <ul className="list-disc pl-5">
                  {sellerReviews.map((review, index) => (
                    <li key={index} className="mb-2">
                      <div><strong>Reviewer:</strong> {review.reviewer}</div>
                      <div><strong>Rating:</strong> {review.rating} / 5</div>
                      <div><strong>Comment:</strong> {review.comment}</div>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Recommended Items */}
              <div className="snap-start h-full w-full">
                <h2 className="text-xl font-bold mb-2">Recommended Items</h2>
                <ul className="list-disc pl-5">
                  {recommendedItems.map((item, index) => (
                    <li key={index} className="mb-2">
                      <div><strong>Reviewer:</strong> {item.reviewer}</div>
                      <div><strong>Rating:</strong> {item.rating} / 5</div>
                      <div><strong>Comment:</strong> {item.comment}</div>

                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              onClick={handleCloseModal}
            >
              Close
            </button>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              style={{ float: 'right', backgroundColor:'green'}}
              onClick={handleBuyClick}
            >
              Buy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemCard;