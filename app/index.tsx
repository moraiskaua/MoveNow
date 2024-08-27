import { routes } from '@/contants/routes';
import { useAuth } from '@clerk/clerk-expo';
import { Redirect } from 'expo-router';

const Home = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) return <Redirect href={routes.root.tabs.home} />;

  return <Redirect href={routes.auth.welcome} />;
};

export default Home;
