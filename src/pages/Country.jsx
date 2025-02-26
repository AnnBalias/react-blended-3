import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Container from '../components/Container/Container';
import CountryInfo from '../components/CountryInfo/CountryInfo';
import GoBackBtn from '../components/GoBackBtn/GoBackBtn';
import Section from '../components/Section/Section';
import { useEffect, useMemo, useRef, useState } from 'react';
import { fetchCountry } from '../service/countryApi';
import Loader from '../components/Loader/Loader';


const Country = () => {

  const location = useLocation();
  const goBackUrl = useRef(location.state ?? '/');

  const {countryId} = useParams();
  const [countryData, setCountryData] = useState(null)

  useEffect(() => {
    const getCountry = async () => {
      const getData = await fetchCountry(countryId); 
      setCountryData(getData);
    };
    getCountry();
  }, [countryId]);
  
  return (
    <Section>
      <Container>
        <GoBackBtn goBackUrl={goBackUrl} />
        {!countryData ? <Loader /> : <CountryInfo countryData={countryData} />}
      </Container>
    </Section>
  );
};

export default Country;
