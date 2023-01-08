import React from 'react';
import useTitle from '../../Shared/hooks/useTitle';

const Home = () => {
  useTitle('Home');
  return (
    <div>
      <h1>This is Home Page</h1>
    </div>
  );
};

export default Home;