import { useState } from 'react';
import Container from '../components/Container/Container';
import SearchForm from '../components/SearchForm/SearchForm';
import Section from '../components/Section/Section';
import { fetchByRegion } from '../service/countryApi';
import Loader from '../components/Loader/Loader';
import CountryList from '../components/CountryList/CountryList';
import Heading from '../components/Heading/Heading';

const SearchCountry = () => {

  const [ countriesList, setCountriesList ] = useState([]);
  const [ region, setRegion ] = useState('');
  const [ load, setLoad ] = useState(false);
  const [ error, setError ] = useState(false);

  const onSubmit = async (region) => {
    try {
      setLoad(true)
      setError(false)
      setRegion(region);
      const countries = await fetchByRegion(region);
      if (countries.length === 0) {
        setError(true);
        return
      }
      setCountriesList(countries);
    } catch (error) {
      setError(true);
    } finally {
      setLoad(false)
    }
  };

  return (
    <Section>
      <Container>
        <SearchForm onSubmit={onSubmit} />
        {load && <Loader />}
        {error ? <Heading title="Not found" bottom /> : <CountryList countries={countriesList} />}
      </Container>
    </Section>
  );
};

export default SearchCountry;
