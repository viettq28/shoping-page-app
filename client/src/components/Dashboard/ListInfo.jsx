import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutateProducts } from '../../hook/useProducts';
import Label from '../../UI/Label';
import transformData from '../../tools/transformData';

const ListInfo = ({ title, section, data }) => {
  const transFormedData = transformData(data, section);
  const [selection, setSelection] = useState([]);
  const { mutateAsync } = useMutateProducts();
  const [isCheckedAll, setIsCheckedAll] = useState(false);

  const ids = data.map((elm) => '' + elm._id);

  const handleCheck = (e) => {
    if (e.target.closest('.checkbox')) {
      if (e.target.closest('#checkAll')) {
        if (isCheckedAll) {
          setIsCheckedAll(false);
          setSelection([]);
        } else {
          setIsCheckedAll(true);
          setSelection(ids);
        }
      } else {
        if (!selection.includes('' + e.target.value)) {
          setSelection([...selection, e.target.value]);
        } else {
          const newSelection = selection.filter(
            (id) => '' + id !== '' + e.target.value
          );
          setSelection(newSelection);
          setIsCheckedAll(false);
        }
      }
    }
  };
  const handleDelete = async (e) => {
    const willDelete = window.confirm(
      `Are you sure you want to delete this ${section.match(/(.*)s$/)[1]}?`
    );
    if (willDelete) {
      const id = e.target.dataset.deleteValue;
      await mutateAsync({ productId: id, options: { method: 'DELETE' } });
    }
  };
  const handleDeleteMultiple = async (e) => {
    const willDelete = window.confirm(
      `Are you sure you want to delete all selected ${section}?`
    );
    if (willDelete) {
      try {
        await mutateAsync({
          options: {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(selection),
          },
        });
        setIsCheckedAll(false);
        setSelection([]);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const thtdClass =
    'relative border-y border-solid border-[lightgrey] p-[8px] text-left first:border-l first:border-solid first:border-[lightgrey] last:border-r last:border-solid last:border-[lightgrey]';
  const thAfter =
    'after:absolute after:right-[1%] after:top-[50%] after:h-[30%] after:translate-y-[-50%] after:border-r after:border-solid after:border-[lightgrey]';
  return (
    <div className="contaitner mt-[20px] p-[25px] font-medium shadow-[rgba(99,99,99,0.2)_0_2px_8px_0] [&_th]:px-[8px] [&_th]:py-[12px]">
      <div className="flex h-10 justify-between">
        <p className="text-[1.1em]">
          {title.replace(/^([a-z])/, (match) => match.toUpperCase())}
        </p>
        {section === 'products' && (
          <div className="flex gap-1">
            <Link to="?method=add">
              <Label title="add new" />
            </Link>
            {selection.length > 0 && (
              <Label title="delete selected" handler={handleDeleteMultiple} />
            )}
          </div>
        )}
      </div>
      <table
        className="w-full border-collapse font-medium text-black [&_*]:text-[0.95em]"
        onClick={handleCheck}
      >
        <thead>
          <tr>
            {section === 'products' && (
              <th
                className={`${thtdClass} ${thAfter} min-w-[30px] text-center [&_input]:absolute [&_input]:left-1/2 [&_input]:top-1/2 [&_input]:-translate-x-1/2 [&_input]:-translate-y-1/2 [&_input]:scale-90`}
              >
                <input
                  id="checkAll"
                  className="checkbox"
                  type="checkbox"
                  checked={isCheckedAll}
                  readOnly={true}
                />
              </th>
            )}
            {Object.keys(transFormedData[0]).map((head) => {
              if (head[0].toLowerCase() === head[0]) return null;
              return (
                <th className={thtdClass + ' w-fit ' + thAfter} key={head}>
                  {head.replace(/^[a-z]/g, (char) => char.toUpperCase())}
                </th>
              );
            })}
            {section === 'products' && (
              <th className={thtdClass + ' ' + thAfter}>Edit</th>
            )}
            {section === 'history' && (
              <th className={thtdClass + ' ' + thAfter}>Detail</th>
            )}
          </tr>
        </thead>
        <tbody>
          {transFormedData.map((row) => {
            return (
              <tr key={row.ID || row.id} id={row.ID || row.id}>
                {section === 'products' && (
                  <td
                    className={`${thtdClass} text-center [&_input]:absolute [&_input]:left-1/2 [&_input]:top-1/2 [&_input]:-translate-x-1/2 [&_input]:-translate-y-1/2 [&_input]:scale-90`}
                  >
                    <input
                      className="checkbox"
                      type="checkbox"
                      value={row.ID}
                      checked={selection.includes('' + row.ID)}
                      readOnly={true}
                    />
                  </td>
                )}
                {Object.entries(row).map(([key, value]) => {
                  if (key[0].toLowerCase() === key[0]) return null;
                  return (
                    <td key={key} className={thtdClass}>
                      {key === 'Images' ? (
                        <img
                          src={value}
                          className="w-[50px] min-w-[30px]"
                          alt="img"
                        />
                      ) : (
                        value
                      )}
                    </td>
                  );
                })}

                <td className={thtdClass}>
                  {section === 'products' ? (
                    <div className="flex gap-1">
                      <Link
                        to={`?method=update&productId=${row.ID}`}
                        className="[&>*]:!h-full"
                      >
                        <Label
                          title="edit"
                          dataSet={{ 'edit-value': row.ID }}
                        />
                      </Link>
                      <Label
                        title="delete"
                        dataSet={{ 'delete-value': row.ID }}
                        handler={handleDelete}
                      />
                    </div>
                  ) : (
                    <Link
                      to={row.id}
                      state={data.find((order) => {
                        return order._id === row.id;
                      })}
                      className="[&>*]:!h-full"
                    >
                      <Label title="view" />
                    </Link>
                  )}
                </td>
              </tr>
            );
          })}
          <tr>
            <td colSpan="999" className={`${thtdClass} pb-4 pt-5`}></td>
          </tr>
          <tr>
            <td colSpan="999" className={`${thtdClass} px-3 py-2 text-end`}>
              1-8 of 8
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default ListInfo;
