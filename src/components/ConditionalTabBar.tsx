import {ReactNode} from 'react';

const ConditionalTabBar = ({
  children,
  show,
}: {
  children: ReactNode;
  show: Boolean;
}) => {
  console.log('children', children);

  return show ? children : null;
};

export default ConditionalTabBar;
