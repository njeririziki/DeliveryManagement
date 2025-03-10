import { FileTextOutlined } from '@ant-design/icons';

export const statisticData = [
    {
      title: 'Order Information',
      card:[{
        category: 'Shipped Orders',
        icon: <FileTextOutlined />,
        value: '101 orders'
      },
      {
        category: 'Pending Orders',
        icon: <FileTextOutlined />,
        value: '34 orders'
      }]
      
    },
    {
      title: 'Cargo Information',
      card:[{
        category: 'Cargo in Transit',
        icon: <FileTextOutlined />,
        value: '5 Tons'
      },
      {
        category: 'Cargo in Warehouse',
        icon: <FileTextOutlined />,
        value: '47 Tons'
      }]
    },
    {
      title: 'Delivery Information',
      card:[{
        category: 'Delayed Orders',
        icon: <FileTextOutlined />,
        value: '63 orders'
      },
      {
        category: 'Delivered Orders',
        icon: <FileTextOutlined />,
        value: '56 orders'
      }]
  
    }
  ]