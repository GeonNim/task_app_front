import React, { useState } from 'react';

import {
  fetchDeleteItemData,
  fetchGetItemsData,
  fetchUpdateCompletedData,
} from '../redux/slices/apiSlice';
import { useDispatch } from 'react-redux';

import { MdEditDocument } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';

import { toast } from 'react-toastify';
import { openModal } from '../redux/slices/modalSlice';

const Item = ({ task }) => {
  const { _id, title, description, date, iscompleted, isimportant, userid } =
    task;

  const dispatch = useDispatch();

  const [isCompleted, setIsCompleted] = useState(iscompleted);

  const deleteItem = async () => {
    const firm = window.confirm('아이템을 삭제하시겠습니까?');
    if (!firm) return;

    if (!_id) {
      toast.error('잘못된 접근 입니다.');
      return;
    }
    try {
      await dispatch(fetchDeleteItemData(_id)).unwrap();
      toast.success('삭제되었습니다.');
      await dispatch(fetchGetItemsData(userid)).unwrap();
    } catch (error) {
      toast.error('삭제에 실패했습니다.');
      console.errer(error);
    }
  };

  const changeCompleted = async () => {
    const newIsCompleted = !isCompleted;
    setIsCompleted(newIsCompleted);

    const updateCompletedData = {
      itemId: _id,
      isCompleted: newIsCompleted,
    };
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateCompletedData),
    };

    await dispatch(fetchUpdateCompletedData(options));
    newIsCompleted
      ? toast.success('할일 완료.')
      : toast.success('할일 미완료.');
    await dispatch(fetchGetItemsData(userid)).unwrap();
  };

  const handleOpenModal = () => {
    dispatch(openModal({ modalType: 'update', task }));
  };
  const handleShowModal = () => {
    dispatch(openModal({ modalType: 'show', task }));
  };
  const textLengthOverCut = (txt, len, lastTxt) => {
    if (len == '' || len == null) {
      len = 60;
    }
    if (lastTxt == '' || lastTxt == null) {
      lastTxt = '...';
    }
    if (txt.length > len) {
      txt = txt.substr(0, len) + lastTxt;
    }
    return txt;
  };

  return (
    <div className="item w-1/3 h-[25vh] p-[0.25rem]">
      <div className="w-full h-full border border-gray-500 rounded-md  flex flex-col py-3 px-4 justify-between bg-gray-950">
        <div className="">
          <h2 className="text-xl font-normal mb-3 relative pb-2 flex justify-between">
            <span className="w-full h-[1px] bg-gray-500 absolute bottom-0 "></span>
            {title}
            <button onClick={handleShowModal}>
              <span className="text-sm py-1 px-3 border border-gray-500 rounded-md hover:bg-gray-700 cursor-pointer ">
                자세히
              </span>
            </button>
          </h2>
          <p
            className="text-sm overflow-y-auto"
            style={{ whiteSpace: 'pre-wrap' }}
          >
            {textLengthOverCut(description)}
          </p>
        </div>
        <div className="lower">
          <p className="text-sm mb-1 ">{date}</p>
          <div className="item-footer flex justify-between">
            <div className="item-footer-left flex gap-x-2">
              {iscompleted ? (
                <button
                  className="py-1 px-4 bg-gray-600 text-sm text-white rounded-md"
                  onClick={changeCompleted}
                >
                  Completed
                </button>
              ) : (
                <button
                  className="py-1 px-4 bg-green-600 text-sm text-white rounded-md"
                  onClick={changeCompleted}
                >
                  InCompleted
                </button>
              )}
              {isimportant ? (
                <button className="py-1 px-4 bg-red-500 text-sm text-white rounded-md">
                  Important
                </button>
              ) : (
                ''
              )}
            </div>
            <div className="item-footer-right flex gap-4 items-center">
              <button className="w-5 h-5  " onClick={handleOpenModal}>
                <MdEditDocument />
              </button>
              <button className="delete" onClick={deleteItem}>
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
