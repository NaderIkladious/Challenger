import React from 'react';
import { Link } from 'react-router-dom';

const notFound = () => (
  <div className="container not-found vh100 mx-5 d-flex align-items-center justify-content-center">
    <div className="p-5 bg-white border rounded text-center mx-5">
      <h2 className="mt-5">Page not found!</h2>

      <p className="my-5 px-5">
        It seems like you got lose, Click <Link to="/">here</Link> to check latest Case studies.
      </p>
    </div>
  </div>
);

export default notFound;
