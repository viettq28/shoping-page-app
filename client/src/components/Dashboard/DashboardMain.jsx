import { useEffect } from 'react';
import { useParams, useSearchParams, useOutletContext } from 'react-router-dom';
import { useProducts } from '../../hook/useProducts';
import { useOrders } from '../../hook/useOrders';
import ListCard from './ListCard';
import ListInfo from './ListInfo';
import DashboardForm from './DashboardForm';
import NoData from '../../UI/NoData';
import Spinner from '../../UI/Spinner';
import ChatBoard from './ChatBoard';

const DashboardMain = () => {
  const { section } = useParams();
  const setIsChatting = useOutletContext();
  const [searchParams] = useSearchParams();
  const method = searchParams.get('method');
  const { products, isFetching: productsIsFetching } = useProducts();
  const { orders, isFetching: ordersIsFetching } = useOrders();


  useEffect(() => {
    if (!section) {
      setIsChatting(true);
    } else {
      setIsChatting(false);
    }
  }, [setIsChatting, section]);

  return (
    <div className='h-full'>
      {!!section && <ListCard/>}
      {section === 'products' ? (
        productsIsFetching ? (
          <Spinner />
        ) : method ? (
          <DashboardForm />
        ) : (
          <>
            {products.length ? (
              <ListInfo
                key={section}
                title={section}
                data={products}
                section={section}
              />
            ) : (
              <NoData title={`No ${section} yet !!!`} />
            )}
          </>
        )
      ) : null}
      {section === 'history' ? (
        ordersIsFetching ? (
          <Spinner />
        ) : (
          <>
            {orders.length ? (
              <ListInfo
                key={section}
                title={section}
                data={orders}
                section={section}
              />
            ) : (
              <NoData title={`No ${section} yet !!!`} />
            )}
          </>
        )
      ) : null}
      {!section && <ChatBoard />}
    </div>
  );
};
export default DashboardMain;
