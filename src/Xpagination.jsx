import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEmployeeData = async () => {
      try {
        const response = await fetch(
          `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
        );
        const res = await response.json();
        setData(res);
      } catch (error) {
        console.error('Failed to fetch Employee Data', error);
        setError(error);
      }
    };

    getEmployeeData();
  }, []);

  const itemsoflastIndex = currentPage * itemPerPage;
  const itemsofFirstIndex = itemsoflastIndex - itemPerPage;
  const currentData = data.slice(itemsofFirstIndex, itemsoflastIndex);
  const totalPage = Math.ceil(data.length / itemPerPage);
  const handleNextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div>
        <h1 className="text">Employee Data Table</h1>
      </div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => {
              return (
                <>
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'flex-end',
            gap: '20px',
          }}
        >
          <button onClick={handlePrevPage}>Prev</button>
          <p style={{ position: 'relative', bottom: '10px' }}>{currentPage}</p>
          <button onClick={handleNextPage}>Next</button>
        </div>
      </div>
    </>
  );
}

export default App;
