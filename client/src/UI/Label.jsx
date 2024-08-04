const Label = ({title, dataSet, handler}) => {
  const getDataSet = dataSet ? Object.entries(dataSet).reduce((acc, [dataSetName, dataSetVal]) => {
    acc[`data-${dataSetName}`] = dataSetVal;
    return acc;
  }, {}) : {};
  const className = (() => {
    switch (title) {
      case 'delete':
      case 'delete selected':
        return 'delete';
      case 'edit':
      case 'add new':
      case 'view':
        return 'update';
      default: return '';
    }
  })();

  return <div className={`rounded p-1 w-fit h-fit bg-white text-[0.8em] cursor-pointer border-[1px] border-solid ${className === 'delete' ? 'border-red-600 text-red-600' : ''}${className === 'update' ? 'border-green-600 text-greem-600' : ''}`} onClick={handler} {...getDataSet} >
    {title.replace(/(^[a-z]|\s[a-z])/g, char => char.toUpperCase())}
  </div>
};
export default Label