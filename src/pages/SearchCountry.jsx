import { useEffect, useState } from 'react';
import Container from '../components/Container/Container';
import SearchForm from '../components/SearchForm/SearchForm';
import Section from '../components/Section/Section';
import { fetchByRegion } from '../service/countryApi';
import Loader from '../components/Loader/Loader';
import CountryList from '../components/CountryList/CountryList';
import Heading from '../components/Heading/Heading';
import { useLocation, useSearchParams } from 'react-router-dom';

const SearchCountry = () => {
  
  const [searchParams, setSearchParams] = useSearchParams();
  const searchRegion = searchParams.get("region") ?? "";
    
  const [ countriesList, setCountriesList ] = useState([]);
  const [ load, setLoad ] = useState(false);
  const [ error, setError ] = useState(false);

  useEffect(() => {
    if (!searchRegion) return;

    const fetchCountries = async () => {
      try {
        setLoad(true)
        setError(false)
        const countries = await fetchByRegion(searchRegion);
        if (countries.length === 0) {
          setError(true);
          setCountriesList([]);
          return
        }
        setCountriesList(countries);      
      } catch (error) {
        setError(true);
      } finally {
        setLoad(false)
      }
    };
    fetchCountries();
  }, [searchRegion])

  const onSubmit = (region) => {
    setSearchParams({ region });
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
