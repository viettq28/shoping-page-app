import { useState, useEffect, useContext } from 'react';
import ServerContext from '../../contexts/SeverContextProvider';
import useHttp from '../../hook/useHttp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faDollarSign,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
import getPrice from '../../tools/getPriceFromString';

const Card = ({ title, value, children }) => {
  return (
    <div className="w-full rounded border p-2 shadow-[rgba(99,99,99,0.2)_0px_2px_8px_0px]">
      <div className="mb-5 text-xs font-semibold text-[gray]">{title}</div>
      <div className="text-2xl leading-4">{value}</div>
      {children}
    </div>
  );
};

const ListCard = () => {
  const [data, setData] = useState(null);
  const { sendRequest } = useHttp();
  const serverHost = useContext(ServerContext);

  useEffect(() => {
    sendRequest(`${serverHost}/api/v1/stats`, null, (data) =>
      setData(data.data)
    );
  }, [sendRequest, serverHost]);

  const list = [
    {
      title: 'Clients',
      icon: faUser,
      value: data?.userNumber || 0,
    },
    {
      title: 'Earnings of Month',
      icon: faDollarSign,
      value: `${getPrice(data?.earning || 0)}`,
    },
    {
      title: 'New Order',
      icon: faWallet,
      value: `${data?.orderNumber || 0}`,
    },
  ];
  return (
    <div className="flex w-full gap-3">
      {list.map((property, i) => {
        return (
          <Card
            key={property.title}
            title={property.title}
            value={property.value}
          >
            <div className="relative ms-auto aspect-square w-5 rounded-[5px] p-[0.5px] text-center">
              <FontAwesomeIcon size='lg' icon={property.icon} />
            </div>
          </Card>
        );
      })}
    </div>
  );
};
export default ListCard;
