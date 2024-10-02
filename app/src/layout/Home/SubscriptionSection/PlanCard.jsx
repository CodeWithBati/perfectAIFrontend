import Link from "next/link";

const PlanCard = ({
  title,
  price,
  duration,
  credits,
  members,
  features,
  buttonText,
  buttonColor,
  link,
  commingSoon = false,
}) => {
  return (
    <div className="md:w-6/12 lg:w-4/12 xl:w-4/12 p-3 md:p-4">
      <div className="bg-white dark:bg-slate-950 p-7 border-slate-100 shadow rounded-2xl ring-1 ring-blue-500">
        <h2 className="text-2xl/snug font-bold w-max bg-gradient-to-r to-custom-blue-light from-custom-purple-light dark:to-custom-blue-dark dark:from-custom-purple-dark text-transparent bg-clip-text">
          {title}
        </h2>
        <div className="flex items-baseline gap-x-2 mt-2 mb-6">
          <span className="text-2xl font-bold tracking-tight text-slate-700 dark:text-slate-300">
            {" "}
            {price}{" "}
          </span>
          <span className="text-sm font-semibold leading-6 tracking-wide text-slate-500">
            {" "}
            {duration}{" "}
          </span>
        </div>

        <ul className="flex flex-col max-w-md text-gray-500 dark:text-slate-300 list-inside gap-4">
          {features.map((feature, index) => (
            <li className="flex items-start" key={index}>
              <svg
                className="w-5 h-5 me-2 mt-1 text-blue-500 flex-shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="">{feature}</span>
            </li>
          ))}
        </ul>
        {commingSoon && (
          <div className=" italic text-slate-500 text-xs text-center mt-3">
            <p>Coming soon:</p>
            <p className=" w-11/12 mx-auto">
              Improve your tool with customer feedback & bug reporting
            </p>
          </div>
        )}

        <div className="mt-7">
          <Link href={link}>
            <button
              className={`inline-flex justify-center w-full font-bold text-base ${buttonColor} text-white hover:bg-blue-800 transition-all px-7 py-3 rounded-lg`}
            >
              {buttonText}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
