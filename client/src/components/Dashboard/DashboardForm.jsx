import { useState, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useHttp from '../../hook/useHttp';
import { useMutateProducts } from '../../hook/useProducts';
import { useEffect } from 'react';
import ServerContext from '../../contexts/SeverContextProvider';

const EditPost = () => {
  const [searchParams] = useSearchParams();
  const method = searchParams.get('method');
  const { sendRequest } = useHttp();
  const { mutateAsync } = useMutateProducts();
  const productId = searchParams.get('productId');
  const [inputValue, setInputValue] = useState({
    _id: '',
    name: '',
    price: 0,
    images: null,
    category: 'other',
    short_desc: '',
    long_desc: '',
  });
  const serverHost = useContext(ServerContext);

  useEffect(() => {
    if (method === 'update' && productId) {
      const url = `${serverHost}/api/v1/products/` + productId;
      sendRequest(url, null, (data) => {
        const { _id, name, price, category, short_desc, long_desc } = data.data;
        setInputValue({
          _id,
          name,
          price,
          images: null,
          category,
          short_desc,
          long_desc,
        });
      });
    }
  }, [sendRequest, productId, method, serverHost]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const key = e.target.name;
    const value = key === 'images' ? e.target.files : e.target.value;
    setInputValue({
      ...inputValue,
      [key]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let options;
    if (method === 'add') {
      const body = new FormData();
      body.append('name', inputValue.name);
      body.append('price', inputValue.price);
      body.append('category', inputValue.category);
      body.append('short_desc', inputValue.short_desc);
      body.append('long_desc', inputValue.long_desc);
      [...inputValue.images].forEach((file) => {
        body.append('images', file);
      });
      options = {
        method: 'POST',
        body,
      };
    }
    if (method === 'update') {
      const { images, ...body } = inputValue;
      options = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      };
    }
    try {
      await mutateAsync({
        productId: method === 'update' ? inputValue._id : null,
        options,
      });
      navigate('/dashboard');
    } catch (err) {
      console.log(err);
    }
  };

  const labelClass = 'text-left block w-full mb-[0.25rem]';
  const textareaInputClass =
    'block w-full mb-[0.25rem] p-2 border border-solid border-[#a1a1a1] rounded-[2px] focus:outline-[rgb(59,0,98)] invalid:border-red-600';

  return (
    <main>
      <form
        className="m-auto block w-full max-w-[90%] rounded-[3px] border border-solid border-slate-100 bg-slate-50 p-[1.5em] text-gray-500"
        onSubmit={handleSubmit}
      >
        <div className="mx-0 my-[1rem]">
          <label className={labelClass} htmlFor="name">
            Name
          </label>
          <input
            className={textareaInputClass}
            type="text"
            name="name"
            id="name"
            value={inputValue.name}
            onChange={handleChange}
          />
        </div>
        <div className="mx-0 my-[1rem]">
          <label className={labelClass} htmlFor="price">
            Price
          </label>
          <input
            className={textareaInputClass}
            type="text"
            name="price"
            id="price"
            value={inputValue.price}
            onChange={handleChange}
          />
        </div>
        <div className="mx-0 my-[1rem]">
          <label className={labelClass} htmlFor="category">
            Category
          </label>
          <select
            className={textareaInputClass}
            name="category"
            id="category"
            onChange={handleChange}
            value={inputValue.category}
          >
            <option value="iphone">Iphone</option>
            <option value="ipad">Ipad</option>
            <option value="macbook">Macbook</option>
            <option value="airpod">Airpod</option>
            <option value="watch">Watch</option>
            <option value="mouse">Mouse</option>
            <option value="keyboard">Keyboard</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mx-0 my-[1rem]">
          <label className={labelClass} htmlFor="short_desc">
            Short Description
          </label>
          <textarea
            className={textareaInputClass}
            name="short_desc"
            id="short_desc"
            rows="3"
            value={inputValue.short_desc}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mx-0 my-[1rem]">
          <label className={labelClass} htmlFor="long_desc">
            Long Description
          </label>
          <textarea
            className={textareaInputClass}
            name="long_desc"
            id="long_desc"
            rows="5"
            value={inputValue.long_desc}
            onChange={handleChange}
          ></textarea>
        </div>
        {method === 'add' && (
          <div className="mx-0 my-[1rem] [&_input]:mb-[0.25rem] [&_input]:block [&_input]:rounded-[2px] [&_input]:border [&_input]:border-none [&_input]:invalid:border-solid [&_input]:invalid:border-red-600 [&_input]:focus:outline-[#3B0062] [&_label]:mb-[0.25rem] [&_label]:block [&_label]:w-full [&_label]:text-left [&_textarea]:mb-[0.25rem] [&_textarea]:block [&_textarea]:w-full [&_textarea]:rounded-[2px] [&_textarea]:border [&_textarea]:border-solid [&_textarea]:border-[#a1a1a1] [&_textarea]:invalid:border-red-600 [&_textarea]:focus:outline-[#3B0062]">
            <label className={labelClass} htmlFor="images">
              Upload Image (5 images)
            </label>
            <input
              type="file"
              name="images"
              id="images"
              className="bg-white"
              onChange={handleChange}
              multiple
            />
          </div>
        )}

        <button
          className="ali cursor-pointer rounded-[3px] border border-solid border-[#5F76E8] bg-[#5F76E8] px-4 py-1 text-white"
          type="submit"
        >
          {method.replace(/^([a-z])/, (match) => match.toUpperCase())}
        </button>
      </form>
    </main>
  );
};
export default EditPost;
