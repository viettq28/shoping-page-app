import ProductCard from '../components/ProductCard';
import getPrice from './getPriceFromString';

const transformData = (data, output) => {
  return data.map((elm) => {
    switch (output) {
      case 'products':
        return {
          ID: elm._id,
          Name: elm.name,
          Price: getPrice(elm.price),
          Images: elm.images[0],
          Category: elm.category,
        };
      case 'history':
        return {
          id: elm._id,
          'ID User': elm.owner,
          Name: elm.fullname,
          Phone: elm.phonenumber,
          Address: elm.address,
          Total: getPrice(elm.total),
          Delivery: elm.delivery,
          Status: elm.status,
        };
      default:
        return null;
    }
  });
};

export default transformData;
