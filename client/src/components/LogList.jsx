// Start of JSX file
// The list of logs seen on the site.
import { Link } from 'react-router-dom';

const LogList = ({
  logs,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!logs.length) {
    return <h3>No Logs Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {logs &&
        logs.map((log) => (
          <div key={log._id} className="card mb-3">
            <h4 className="card-header text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${log.logAuthor}`}
                >
                  {log.logAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                    had this log on {log.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You had this log on {log.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{log.logText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/logs/${log._id}`}
            >
              Join the discussion on this log.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default LogList;
// End of JSX file