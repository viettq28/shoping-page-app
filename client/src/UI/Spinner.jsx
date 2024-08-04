import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons';

const Spinner = () => {
  return (
    <>
      <div className="fixed inset-0 flex justify-center align-middle backdrop-blur-sm">
        <FontAwesomeIcon
          icon={faCompactDisc}
          className="m-auto animate-spin text-4xl"
        />
      </div>
    </>
  );
};
export default Spinner;
