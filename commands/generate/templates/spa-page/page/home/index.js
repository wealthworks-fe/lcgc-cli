import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getHome } from '../../api';
import './index.less';

export default () => {
  const [data, setData] = useState({});

  useEffect(() => {
    getHome().then((data) => {
      setData(data);
    });
  }, []);

  return (
    <div className="page-home">
      <h1>home</h1>
      <Link to="/about">Go to About</Link>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
};
