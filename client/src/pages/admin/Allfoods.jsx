import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';

export default function Allfoods() {
  const [foodData, setFoodData] = useState([]);
  const [totalfoodData, setTotalFoodData] = useState(``);

  const getfoods = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/admin/foodData", {
        withCredentials: true,
      });
      setFoodData(data.foods);
      setTotalFoodData(data.totalfoods);
    } catch (error) {
      console.error("Error fetching donated foods:", error.message);
    }
  };

  useEffect(() => {
    getfoods();
  }, []);

  // Function to format the date into a readable format
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };

  // Table columns
  const columns = React.useMemo(
    () => [
      // { Header: 'Organization', accessor: 'nameofOrg' },
      { Header: 'Org Email', accessor: 'emailofOrg' },
      { Header: 'Receiver', accessor: 'nameofReceiver' },
      // { Header: 'Receiver Email', accessor: 'emailofReceiver' },
      { Header: 'Donor', accessor: 'nameofDonor' },
      // { Header: 'Donor Email', accessor: 'emailofDonor' },
      { Header: 'Contact No', accessor: 'contactnumofDonor' },
      { Header: 'Location', accessor: 'locationofDonor' },
      { Header: 'Donates From', accessor: 'donatesFrom' },
      { Header: 'Food', accessor: 'foodname' },
      { Header: 'Quantity', accessor: 'quantity' },
      {
        Header: 'Expire Date',
        accessor: 'foodExpdate',
        Cell: ({ value }) => formatDate(value),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: foodData
  })

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Donated Foods List {totalfoodData}</h2>
      <div className="overflow-x-auto">
        <table {...getTableProps()} className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} className="border-b">
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()} className="p-3 text-left">
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className="border-b hover:bg-gray-100">
                    {row.cells.map(cell => (
                      <td {...cell.getCellProps()} className="p-3">
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center p-3 text-gray-600">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
