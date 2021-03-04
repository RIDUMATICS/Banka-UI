import react, { useState } from 'react';
import classnames from 'classnames';
import { IoIosArrowForward } from 'react-icons/io';

const AccordionItem = (props) => {
  return (
    <div className="text-secondary">
      <div
        className="p-4 border-b flex items-center justify-between"
        onClick={() => props.activate(props.active ? null : props.position)}
      >
        <h4
          className={classnames('cursor-pointer select-none', {
            'font-semibold': props.active,
          })}
        >
          {props.title}
        </h4>
        <IoIosArrowForward
          className={classnames(
            'transition- duration-500 ease-in-out transform text-primary',
            {
              'rotate-90': props.active,
            }
          )}
        />
      </div>
      <p
        className={classnames(
          'transition- duration-500 ease-in-out px-7 max-h-0 overflow-hidden text-sm',
          { 'max-h-40 p-5': props.active }
        )}
      >
        {' '}
        {props.content}
      </p>
    </div>
  );
};

export default AccordionItem;
