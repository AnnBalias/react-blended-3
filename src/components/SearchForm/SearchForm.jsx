// import { FiSearch } from 'react-icons/fi';
import styles from './SearchForm.module.css';

const regions = [
  { id: 'africa', value: 'africa', name: 'Africa' },
  { id: 'america', value: 'america', name: 'America' },
  { id: 'asia', value: 'asia', name: 'Asia' },
  { id: 'europe', value: 'europe', name: 'Europe' },
  { id: 'oceania', value: 'oceania', name: 'Oceania' },
];

const SearchForm = ({ onSubmit }) => {

  const sub = (event) => {
    event.preventDefault(); 
    const selectReg = event.target.elements.region.value;
    if (selectReg === 'default') return;
    onSubmit(selectReg);
  };

  const autoSub = (event) => {
    event.target.form.requestSubmit(); 
  };

  return (
    <form className={styles.form} onSubmit={sub}>
      <button className={styles.button} type="submit">
        {/* <FiSearch size="16px" /> */}
      </button>
      <select
        aria-label="select"
        className={styles.select}
        name="region"
        required
        defaultValue="default"
        onChange={autoSub}
      >
        <option disabled value="default">
          Select a region
        </option>
        {regions.map(({id, value, name}) => {
          return <option value={value} key={id}>{name}</option>
        })}
      </select>
    </form>
  );
};

export default SearchForm;
