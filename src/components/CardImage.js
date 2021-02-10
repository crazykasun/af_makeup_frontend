import React, {useState, useEffect} from "react";
import {getImage} from "../services/PackageService";

const CardImage = ({item, url}) => {

    const [image, setImage] = useState('');
    const [id, setId] = useState(item._id);

    const loadImage = (id) => {
        getImage(id).then(data => {
            if (data) {
                setImage(data.url);
            }
        })
    };

    useEffect(() => {
        setId(item._id);
        loadImage(id);
    }, []);


        return (
            <div className="product-img img-thumbnail text-center">
                <img
                    src={image}
                    alt={item.name}
                    className="mb-3 col-auto"
                    style={{height: "300px", width: "800px"}}
                />
            </div>
        )

};

export default CardImage;
