import React from 'react';
import { Card, Carousel, Modal, Tag } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

function ItemCard({ category, condition, tags, description, price, images, details }) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const pressTimer = React.useRef(null);
  const [isPressing, setIsPressing] = React.useState(false);

  const handlePressStart = () => {
    setIsPressing(true);
    pressTimer.current = setTimeout(() => {
      setModalVisible(true);
    }, 2000);
  };

  const handlePressEnd = () => {
    setIsPressing(false);
    clearTimeout(pressTimer.current);
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  const handleClick = (e) => {
    console.log(e.target);
  }

  return (
    <>
      <Card
        hoverable
        className="item-card"
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
        onClick={(e) => handleClick(e)}
        cover={
          <div
            className="carousel-container img-ctn"
            style={{
              background: isPressing ? '#f0f0f0' : 'transparent',
              position: 'relative'
            }}
          >
            <Tag className="category-tag img-ctn">{category}</Tag>
            <Tag className="condition-tag img-ctn">{condition}</Tag>
            <Carousel {...carouselSettings}>
              {images.map((img, index) => (
                <div key={index}>
                  <img className="item-image img-ctn" alt={`Item ${index + 1}`} src={img} />
                </div>
              ))}
            </Carousel>
            <Tag className="price-tag img-ctn">${price}</Tag>
          </div>
        }
      >
        <div className="tag-container">
          {tags.slice(0, 3).map((tag, index) => (
            <Tag key={index} className="item-tag">{tag}</Tag>
          ))}
        </div>
      </Card>

      <Modal
        visible={modalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
        width="90%"
        style={{ maxWidth: '800px' }}
      >
        <Carousel {...carouselSettings}>
          {images.map((img, index) => (
            <div key={index}>
              <img className="modal-image" alt={`Item ${index + 1}`} src={img} />
            </div>
          ))}
        </Carousel>
        <div style={{ marginTop: '16px' }}>
          {tags.map((tag, index) => (
            <Tag key={index} className="item-tag">{tag}</Tag>
          ))}
        </div>
        <p><strong>Price:</strong> ${price}</p>
        <p><strong>Description:</strong> {description}</p>
        <div>
          <h3>Details:</h3>
          <ul>
            {Object.entries(details).map(([key, value]) => (
              <li key={key}><strong>{key}:</strong> {value}</li>
            ))}
          </ul>
        </div>
      </Modal>

      <style jsx>{`
        .carousel-container {
          position: relative;
        }
        .category-tag {
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 1;
        }
        .condition-tag {
          position: absolute;
          top: 10px;
          left: 10px;
          z-index: 1;
        }
        .price-tag {
          position: absolute;
          bottom: 10px;
          right: 10px;
          z-index: 1;
        }
        .item-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
        .tag-container {
          margin-top: 8px;
        }
        .item-tag {
          margin-right: 4px;
          margin-bottom: 4px;
        }
        @media (max-width: 768px) {
          .item-image {
            height: 150px;
          }
        }
      `}</style>
    </>
  );
}

export default ItemCard;