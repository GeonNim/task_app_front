import { MdHome } from 'react-icons/md';
import { MdFactCheck } from 'react-icons/md';
import { MdWatchLater } from 'react-icons/md';
import { BsFillExclamationSquareFill } from 'react-icons/bs';

export const naviMenus = [
  { label: 'Home', to: '/', icon: <MdHome className="w-5 h-5" /> },
  {
    label: 'Proceeding',
    to: '/proceeding',
    icon: <MdWatchLater className="w-5 h-5" />,
  },
  {
    label: 'Important',
    to: '/important',
    icon: <BsFillExclamationSquareFill className="w-4 h-4" />,
  },
  {
    label: 'Completed',
    to: '/completed',
    icon: <MdFactCheck className="w-5 h-5" />,
  },
];
