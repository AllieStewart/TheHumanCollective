// Start of JSX file
// Where Google Earth/Maps is implemented (GoogleAPI integration).
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_LOG } from '../utils/mutations';
import { QUERY_LOGS, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Geolocation = () => {
    const [logText, setLogText] = useState('');
    // const [geolocationData, setGeolocation] = useState('');

    const [addLog, { error }] = useMutation
  (ADD_LOG, {
    refetchQueries: [
      QUERY_LOGS,
      'getPLogs',
      QUERY_ME,
      'me'
    ]
});


};

export default Geolocation;