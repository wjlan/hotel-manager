import React, { useState, useEffect } from 'react';
import { Table, Button, Popconfirm, Pagination, Select, Tag } from 'antd';
import { $list as $roomList, $del as $delRoom } from '../../api/roomApi';
import { $list as $typeList } from '../../api/typeApi';
import { $list as $stateList } from '../../api/stateApi';
import MyNotification from "../../components/MyNotification/MyNotification";
import AddRoom from './AddRoom';

export default function Room() {
  const [typeList, setTypeList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [roomTypeId, setRoomTypeId] = useState(0);
  const [roomStateId, setRoomStateId] = useState(0);
  const [count, setCount] = useState(1);
  const [pageIndex, setPageIndex] = useState(1);
  const [notiMsg, setNotiMsg] = useState({ type: "", description: "" });
  const [roomId, setRoomId] = useState(0);
  const [open, setOpen] = useState(false);
  const [roomList, setRoomList] = useState([]);

  const loadTypeList = () => {
    $typeList().then((data) => {
      data = data.map((r) => {
        return {
          value: r.roomTypeId,
          label: r.roomTypeName
        };
      });
      data.unshift({ value: 0, label: 'Please select a room type' });
      setTypeList(data);
    });
  };

  const loadStateList = () => {
    $stateList().then((data) => {
      data = data.map((r) => {
        return {
          value: r.roomStateId,
          label: r.roomStateName
        };
      });
      data.unshift({ value: 0, label: 'Please select room state' });
      setStateList(data);
    });
  };

  const edit = (roomId) => {
    setOpen(true);
    setRoomId(roomId);
  };

  const del = (roomId) => {
    $delRoom({ roomId }).then(({ success, message }) => {
      if (success) {
        setNotiMsg({ type: "success", description: message });
        loadList();
      } else {
        setNotiMsg({ type: "error", description: message });
      }
    });
  };

  const loadList = () => {
    $roomList({ roomTypeId, roomStateId, pageSize: 10, pageIndex }).then(({ data, count }) => {
      data = data.map((r) => {
        return {
          key: r.roomId,
          roomId: r.roomId,
          roomTypeName: r.roomType.roomTypeName,
          roomTypePrice: r.roomType.roomTypePrice,
          bedNum: r.roomType.bedNum,
          roomStateName: r.roomState.roomStateName,
        };
      });
      setRoomList(data);
      setCount(count);
    });
  };

  useEffect(() => {
    loadTypeList();
    loadStateList();
    loadList();
  }, [pageIndex]);

  const getColorByRoomState = (roomStateName) => {
    switch (roomStateName) {
      case '空闲':
        return 'lightgreen';
      case '维修':
        return 'lightsalmon';
      case '入住':
        return 'lightcoral';
      default:
        return '';
    }
  };

  const getEnglishRoomState = (roomStateName) => {
    switch (roomStateName) {
      case '空闲':
        return 'Empty';
      case '维修':
        return 'Maintenance';
      case '入住':
        return 'Occupied';
      default:
        return '';
    }
  };

  const columns = [
    {
      title: "Room Id",
      dataIndex: "roomId",
      width: "100px",
    },
    {
      title: "Room Type",
      dataIndex: "roomTypeName",
      width: "150px",
    },
    {
      title: "Room Price",
      dataIndex: "roomTypePrice",
      width: "150px",
    },
    {
      title: "Bed Number",
      dataIndex: "bedNum",
      width: "150px",
    },
    {
      title: "Room State",
      dataIndex: "roomStateName",
      width: "150px",
      render: (roomStateName) => (
        <Tag color={getColorByRoomState(roomStateName)}>
          {getEnglishRoomState(roomStateName)}
        </Tag>
      )
    },
    {
      title: "Action",
      key: "action",
      render: (ret) => {
        return (
          ret.roomStateName === '入住' ? null :
            <>
              <Button size="small" style={{ borderColor: 'orange', color: 'orange' }} onClick={() => {
                edit(ret.roomId)
              }}>Edit</Button>
              <Popconfirm
                title="Notion"
                description="Are you sure to delete?"
                onConfirm={() => {
                  del(ret.roomId);
                }}
                okText="Confirm"
                cancelText="Cancel"
              >
                <Button style={{ marginLeft: '5px' }} danger size="small">
                  Delete
                </Button>
              </Popconfirm>
            </>
        )
      },
    }
  ];

  return (
    <>
      <div className="search">
        <span>Type:</span>
        <Select size='small' style={{ width: '200px' }} options={typeList} defaultValue={0} onSelect={(value) => {
          setRoomTypeId(value)
        }}></Select>
        <span style={{ marginLeft: '5px' }}>State:</span>
        <Select size='small' style={{ width: '200px' }} options={stateList} defaultValue={0} onSelect={(value) => {
          setRoomStateId(value)
        }}></Select>
        <Button type="primary" style={{ marginLeft: '5px' }} size='small' onClick={loadList}>Search</Button>
        <Button
          style={{ marginLeft: '5px' }}
          size="small"
          onClick={() => {
            setOpen(true);
          }}
        >
          Add
        </Button>
      </div>
      <Table size="small" dataSource={roomList} columns={columns} pagination={false} />
      <Pagination style={{ marginTop: '5px' }} size='small' defaultCurrent={pageIndex}
        total={count} pageSize={10} onChange={(page) => { setPageIndex(page) }} />
      <AddRoom open={open} setOpen={setOpen} loadList={loadList} roomId={roomId} setRoomId={setRoomId} />
      <MyNotification notiMsg={notiMsg} />
    </>
  )
}
