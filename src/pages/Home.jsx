import { useEffect, useState } from 'react';

import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import Section from '../components/Section/Section';
import CountryList from '../components/CountryList/CountryList';
import Loader from '../components/Loader/Loader';

import { getCountries } from '../service/countryApi';

const Home = () => {
  
  const [ countriesList, setCountriesList ] = useState([]);
  const [ load, setLoad ] = useState(false);
  const [ error, setError ] = useState(false);

  useEffect(() => {
    const getCountriesList = async () => {
      try {
        setLoad(true)
        setError(false)
        const countries = await getCountries();
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
    getCountriesList();
  }, [])

  if (countriesList.length === 0) {
    return
  }

  return (
    <Section>
      <Container>
        {load && <Loader />}
        {error ? <Heading title="Not found" bottom /> : <CountryList countries={countriesList} />}
      </Container>
    </Section>
  );
};
export default Home;
