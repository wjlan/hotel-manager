import React, { useState, useEffect } from 'react';
import { Table, Button, Popconfirm, Pagination, Select, Tag, Input } from 'antd';
import { $list, $del, $checkout } from '../../api/guestApi';
import { $list as $resideList } from '../../api/resideApi';
import MyNotification from '../../components/MyNotification/MyNotification';
import AddGuest from './AddGuest';

export default function Guest() {
  // reside state list
  const [resideList, setResideList] = useState([]);
  // load reside state list
  const loadStateList = () => {
    $resideList().then((data) => {
      data = data.map((r) => {
        return {
          value: r.resideStateId,
          label: r.resideStateName === '未结账' ? 'Checked In' : 'Checked Out',
        };
      });
      data.unshift({ value: 0, label: 'Please select reside state' });
      setResideList(data);
    });
  };
  // guest name for filtering list data
  const [guestName, setGuestName] = useState(null);
  // reside state id for filtering list data
  const [resideStateId, setResideStateId] = useState(0);
  // count data rows
  const [count, setCount] = useState(1);
  // Page
  const [pageIndex, setPageIndex] = useState(1);
  // notification
  const [notiMsg, setNotiMsg] = useState({ type: '', description: '' });
  // guestId editing status
  const [guestId, setGuestId] = useState(0);
  // check drawer open or not
  const [open, setOpen] = useState(false);
  // guest list data
  const [guestList, setGuestList] = useState([]);
  // table
  const columns = [
    {
      title: 'Name',
      dataIndex: 'guestName',
      width: '80px',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      width: '100px',
    },
    {
      title: 'Identity Id',
      dataIndex: 'identityId',
      width: '120px',
    },
    {
      title: 'Room Id',
      dataIndex: 'roomId',
      width: '80px',
    },
    {
      title: 'Room Type',
      dataIndex: 'roomTypeName',
      width: '100px',
    },
    {
      title: 'Room Price',
      dataIndex: 'roomTypePrice',
      width: '80px',
    },
    {
      title: 'Bed Number',
      dataIndex: 'bedNum',
      width: '80px',
    },
    {
      title: 'Reside Date',
      dataIndex: 'resideDate',
      width: '100px',
    },
    {
      title: 'Leave Date',
      dataIndex: 'leaveDate',
      width: '100px',
    },
    {
      title: 'Deposit',
      dataIndex: 'deposit',
      width: '80px',
    },
    {
      title: 'Total Price',
      dataIndex: 'totalMoney',
      width: '80px',
    },
    {
      title: 'Guest Number',
      dataIndex: 'guestNum',
      width: '80px',
    },
    {
      title: 'Reside State',
      dataIndex: 'resideStateName',
      width: '80px',
      render: (resideStateName) => (
        <Tag color={resideStateName === '已结账' ? 'lightgreen' : 'lightcoral'}>
          {resideStateName === '已结账' ? 'Checked Out' : 'Checked In'}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (ret) => {
        return (
          ret.resideStateName === '已结账' ? (
            <Popconfirm
              title="Are you sure to delete?"
              onConfirm={() => {
                del(ret.guestId);
              }}
              okText="Confirm"
              cancelText="Cancel"
            >
              <Button danger size="small">
                Delete
              </Button>
            </Popconfirm>
          ) : (
            <>
              <Button
                size="small"
                style={{ borderColor: 'orange', color: 'orange' }}
                onClick={() => {
                  edit(ret.guestId);
                }}
              >
                Edit
              </Button>
              <Button
                size="small"
                style={{ marginLeft: '5px', borderColor: 'lightseagreen', color: 'lightseagreen' }}
                onClick={() => {
                  // checkout function
                  $checkout({ guestId: ret.guestId }).then((ret) => {
                    setNotiMsg({
                      type: 'success',
                      description: `Checked Out! Total is $${ret.totalMoney}`,
                    });
                    // reload list data
                    loadList();
                  });
                }}
              >
                Check Out
              </Button>
            </>
          )
        );
      },
    },
  ];
  // edit guest function
  const edit = (guestId) => {
    setOpen(true);
    setGuestId(guestId);
  };
  // delete guest function
  const del = (guestId) => {
    $del({ guestId }).then(({ success, message }) => {
      if (success) {
        setNotiMsg({ type: 'success', description: 'Deleted Successfully' });
        loadList();
      } else {
        setNotiMsg({ type: 'error', description: 'Delete Error' });
      }
    });
  };
  // Load guest list
  const loadList = () => {
    $list({ pageSize: 10, pageIndex, guestName, resideStateId }).then(({ data, count }) => {
      // console.log(data);
      data = data.map((r) => {
        return {
          key: r.guestId,
          guestId: r.guestId,
          identityId: r.identityId,
          guestName: r.guestName,
          phone: r.phone,
          roomId: r.roomId,
          roomTypeName: r.room.roomType.roomTypeName,
          roomTypePrice: r.room.roomType.roomTypePrice,
          bedNum: r.room.roomType.bedNum,
          resideDate: r.resideDate,
          leaveDate: r.leaveDate,
          deposit: r.deposit,
          totalMoney: r.totalMoney,
          guestNum: r.guestNum,
          resideStateName: r.resideState.resideStateName,
        };
      });
      setGuestList(data);
      setCount(count);
    });
  };
  useEffect(() => {
    loadStateList(); // load room state list data
    loadList();
  }, [pageIndex]);
  return (
    <>
      <div className="search">
        <span>Guest Name:</span>
        <Input value={guestName} onChange={(e)=>{setGuestName(e.target.value)}} size='small' style={{width:'150px'}}/>
        <span style={{marginLeft:'5px'}}>Reside State:</span>
        <Select size='small' style={{width:'220px'}} options={resideList} defaultValue={0} onSelect={(value)=>{
          setResideStateId(value)
        }}></Select>
        <Button type="primary" style={{marginLeft:'5px'}} size='small' onClick={loadList}>Search</Button>
        <Button
          style={{marginLeft:'5px'}}
          size="small"
          onClick={() => {
            setOpen(true);
          }}
        >
          Add
        </Button>
      </div>
      <Table size="small" dataSource={guestList} columns={columns} pagination={false} />
      <Pagination style={{marginTop:'5px'}} size='small' defaultCurrent={pageIndex} 
      total={count} pageSize={10} onChange={(page)=>{setPageIndex(page)}}/>
      <AddGuest open={open} setOpen={setOpen} loadList={loadList} guestId={guestId} setGuestId={setGuestId}/>
      <MyNotification notiMsg={notiMsg} />
    </>
  )
}