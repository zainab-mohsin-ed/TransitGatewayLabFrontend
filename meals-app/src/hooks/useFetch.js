import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetch(queryField, queryAttributesStr) {
  // Declaring the essential state variables for data and checking
  // if the request is loading or succeeded
  const [data, setData] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const controller = new AbortController();

  useEffect(() => {
    // Changing loading and success state to true whenever there's an effect
    setLoading(true);
    setSuccess(false);

    // Extracting data from queryAttributesStr
    const options = { headers: 
        {
            'content-type': 'text/plain'
        }}

    // asynchronous function to make API call
    async function fetchData() {
      try {
        const signal = controller.signal;
        const response = await axios.get('/api/getmeals', { signal });
        console.log(response)

        // Checking if the request was a success
        if (response.status === 200) {
          setSuccess(true);
          setData(response); // Storing response data
        } else {
          const errorMessage = response.data.errorMessage || response.data.statusText;
          throw new Error(`Status Code: ${response.status}\nError Message: ${errorMessage}`);
        }
      } catch (error) {
        console.error(error.message);
        setData({ error: error.message });
        setSuccess(false);
      } finally {
        // Changing loading state to false whenever the API request ends in success or failure
        setLoading(false);
      }
    }

    // Making sure that a null field is not passed
    if (queryField) {
      fetchData();
    } else {
      setLoading(false);
      setSuccess(true);
    }

    // Cancelling the fetch request in case the user navigates
    // away from the screen
    // return () => {
    //     controller.abort();
    //   };
    

    // Defining variables that trigger useFetch
  }, [queryField, queryAttributesStr]);

  // Returning useFetch response
  return { data, success, loading };
}