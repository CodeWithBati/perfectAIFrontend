"use client";

const InstructionsStepper = () => {
  return (
    <ol className="justify-center items-center w-full space-y-4 lg:flex lg:space-x-8 lg:space-y-0 rtl:space-x-reverse">
      <li style={{fontFamily: 'sansation'}} className="flex items-center text-custom-blue-light dark:text-custom-blue-dark space-x-2.5 rtl:space-x-reverse">
        <span className="flex items-center justify-center min-w-10 min-h-10 bg-blue-100 dark:bg-slate-700 border border-custom-blue-light dark:border-custom-blue-dark dark:text-custom-blue-dark rounded-full text-custom-blue-light font-bold">
          1
        </span>
        <span>
          <h3 className="font-medium leading-tight">Sign up & verify email</h3>
        </span>
      </li>
      
      <li style={{fontFamily: 'sansation'}} className="flex items-center text-custom-blue-light dark:text-custom-blue-dark space-x-2.5 rtl:space-x-reverse">
        <span className="flex items-center justify-center min-w-10 min-h-10 bg-blue-100 dark:bg-slate-700 border border-custom-blue-light dark:border-custom-blue-dark dark:text-custom-blue-dark rounded-full text-custom-blue-light font-bold">
          2
        </span>
        <span>
          <h3 className="font-medium leading-tight">
            Use the chatbot to describe your task in detail
          </h3>
        </span>
      </li>
      <li style={{fontFamily: 'sansation'}} className=" flex items-center text-custom-blue-light dark:text-custom-blue-dark space-x-2.5 rtl:space-x-reverse">
        <span className="flex items-center justify-center min-w-10 min-h-10 bg-blue-100 dark:bg-slate-700 border border-custom-blue-light dark:border-custom-blue-dark dark:text-custom-blue-dark rounded-full text-custom-blue-light font-bold">
          3
        </span>
        <span>
          <h3 className="font-medium leading-tight">
            Follow our AI tool recommendations to complete your task
          </h3>
        </span>
      </li>
    </ol>
  );
};

export default InstructionsStepper;
