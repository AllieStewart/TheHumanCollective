// Start of JSX file
// FAQ page about the website.
import TParticles from '../components/Particles';

const FAQ = () => {
return (
    <main className="flex-row justify-center mb-4">
      <TParticles />
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header text-light p-2">Frequently Asked Questions</h4>
          <div className="postBox card-body">
          <div className="card-body bg-light p-2">
            <h5>How'd this idea come about?</h5>
            <p>I thought about it, three years ago.</p>
          </div>
        </div>
      </div>
     </div>
    </main>
);
};

export default FAQ;
// End of JSX file