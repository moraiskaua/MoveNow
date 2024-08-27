import { routes } from '@/contants/routes';
import { Redirect } from 'expo-router';

const Home = () => {
  return <Redirect href={routes.auth.welcome} />;
};

export default Home;
