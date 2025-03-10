import { useEffect, useState, useRef } from "react";
import { User } from "../types";
import { useNavigate } from "react-router-dom";
import { fetchUserData } from "../services/UsersService";
import { useError } from "../context/ErrorHandlingContext";
import { useQuery } from "@tanstack/react-query";
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import { Button, Input, Space, Table, Typography, Skeleton } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words'



interface DataType {
  user: User;
  zipcode: string;
  address: string;
  phone: string;
  email: string;
  name: string;
  key: number;
}

type DataIndex = keyof DataType;



// const onChange: TableProps<DataType>["onChange"] = (
//   pagination,
//   filters,
//   sorter,
//   extra
// ) => {
//   console.log("params", pagination, filters, sorter, extra);
// };

const UsersTable = () => {
  const [userData, setUserData] = useState<DataType[]>([]);
  const navigate = useNavigate();
  const { setError } = useError();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);


  const { isLoading, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUserData,
  });


  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
          //  type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
         
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
      sorter: (a, b) => a.user.name.length - b.user.name.length,
      sortDirections: ["descend"],
      ...getColumnSearchProps('name')
    },
    {
      title: "Email",
      dataIndex: "email",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.user.email.localeCompare(b.user.email),
      ...getColumnSearchProps('email')
    },
    {
      title: "Phone",
      dataIndex: "phone",
  
    },
    {
      title: "Address",
      dataIndex: "address",
      ...getColumnSearchProps('address')
    },
    {
      title: "Zipcode",
      dataIndex: "zipcode",
      ...getColumnSearchProps('zipcode')
    },
  ];


  useEffect(() => {
       if(data) {
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
      }
  }, [data]);

  const handleUserSelection = (record: DataType) => {
    navigate(`/users/${record.user.id}`);
  };


  if (error) {
    setError(error.message);
    return <Typography.Text>Error loading user details</Typography.Text>;
  }
  if (isLoading) return <Skeleton active />;
  return (
    <div>
      <Typography.Title level={2}>Users</Typography.Title>

      <Table<DataType>
        columns={columns}
        dataSource={userData}
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
