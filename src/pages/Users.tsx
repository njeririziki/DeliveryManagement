import { useEffect, useState } from "react";
import { User } from "../types";
import { Typography, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useNavigate } from "react-router-dom";
//import { fetchUserData } from "../services/UsersService";
import { useError } from "../context/ErrorHandlingContext";
interface DataType {
  user: User;
}

const  fetchUserData = async (): Promise<User[]> => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      headers: {
        "x-mirage-bypass": "true",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log({ data });

    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return [];
  }
};

const columns: TableColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    showSorterTooltip: { target: "full-header" },
    sorter: (a, b) => a.user.name.length - b.user.name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Email",
    dataIndex: "email",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.user.email.localeCompare(b.user.email),
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "Zipcode",
    dataIndex: "zipcode",
  },
];

const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const UsersTable = () => {
  const [userData, setUserData] = useState<DataType[]>([]);
  const navigate = useNavigate();
  const { setError } = useError();



  useEffect(() => {
    fetchUserData()
      .then((data: User[]) => {
        console.log({ fetchUserData: data });
        
        const transformedData = data.map((user, index) => ({
          key: index,
          user: user,
          name: user.name,
          username: user.username,
          address:
            user.address?.city +
            ", " +
            user.address?.street +
            ". " +
            user.address?.suite,
          phone: user.phone,
          email: user.email,
          zipcode: user.address?.zipcode,
        }));
        setUserData(transformedData);
      })
      .catch((error) => {
        console.error(error);
        return setError(error);
      });
  }, []);

  const handleUserSelection = (record: DataType) => {
    navigate(`/users/${record.user.id}`);
  };

  return (
    <div>
      <Typography.Title level={2}>Users</Typography.Title>

      <Table<DataType>
        columns={columns}
        dataSource={userData}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
        onRow={(record) => {
          return {
            onClick: () => handleUserSelection(record), 
          };
        }}
      />
    </div>
  );
};

export default UsersTable;
