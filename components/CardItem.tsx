// components/CardItem.tsx

import React from "react";
import { Employee } from "../types/types";
import Carousel from 'react-bootstrap/Carousel';

interface CardItemProps {
  item: Employee;
}

const CardItem: React.FC<CardItemProps> = ({ item }) => {
  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="card">
        <div className="card-body">
          
          {item.positions.map((position) => (
            <div key={position.id}>
              {position.toolLanguages.map((toolLanguage) => (
                <div key={toolLanguage.id} className="mb-2">
                  <div className="d-flex flex-wrap">
                  <Carousel className="mx-auto">
                    {toolLanguage.images.map((image) => (
                      <Carousel.Item key={image.id}>
                        
                        <img
                          className="d-block w-100 rounded"
                          src={image.cdnUrl}
                          alt={`Image ${image.id}`}
                          style={{ maxHeight: '200px' }}
                        />
                       
                      </Carousel.Item>
                    ))}
                  </Carousel>
                  </div>
                  <h5 className="card-title">{item.name}</h5>
                  <p className="font-weight-bold mt-2">
                    Tool Language Description:
                  </p>
                  <p>{toolLanguage.description}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardItem;
