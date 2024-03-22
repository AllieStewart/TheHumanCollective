// Start of JSX file
// Viewing a single log with possible comments underneath it.
// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import TParticles from '../components/Particles';

import { QUERY_SINGLE_LOG } from '../utils/queries';

const SingleLog = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { logId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_LOG, {
    // pass URL parameter
    variables: { logId: logId },
  });

  const log = data?.log || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <TParticles />
      <h3 className="logBox card-header single-card text-light p-2 m-0">
        {log.logAuthor} <br />
        <span style={{ fontSize: '1rem' }}>
          had this log on {log.createdAt}
        </span>
      </h3>
      <div className="logBox bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {log.logText}
        </blockquote>
      </div>

      <div className="my-5">
        <CommentList comments={log.comments} />
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <CommentForm logId={log._id} />
      </div>
    </div>
  );
};

export default SingleLog;
// End of JSX file