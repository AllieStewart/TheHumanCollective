// Start of JSX file
// Home page for web page; shows posts from other users.
import { useQuery } from '@apollo/client';

import TParticles from '../components/Particles';

const Home = () => {
  return (
    <main>
      <TParticles />
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
        </div>
        <div className="col-12 col-md-8 mb-3">
        </div>
      </div>
    </main>
  );
};

export default Home;
// End of JSX file