import React from "react";
import { BiChevronRight } from "react-icons/bi";

const Button = ({ title, icon = false, others, handleClick }) => {
  return (
    <div
      className={`${others} w-[179px] h-[56px] text-lg rounded-sm font-bold text-[#232536] flex justify-center items-center space-x-5 cursor-pointer`}
      onClick={handleClick}
    >
      {title}
      {icon && <BiChevronRight />}
    </div>
  );
};

export default Button;
