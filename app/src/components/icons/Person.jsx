import React from "react";
import classNames from "classnames";

function Person({ className, primaryColor, shadeColor }) {
    const compClass = classNames({
        "h-full": !className,
        [`${className}`]: className,
    });
    const primaryColorClass = classNames({
        "fill-blue-600": !primaryColor,
        [`${primaryColor}`]: primaryColor,
    });
    const shadeColorClass = classNames({
        "fill-blue-300": !shadeColor,
        [`${shadeColor}`]: shadeColor,
    });
    return (
        <>
            {/* prettier-ignore */}
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={compClass}>
                <circle className={primaryColorClass} cx="12" cy="7" r="5"/>
                <path className={shadeColorClass} d="M3 19V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V19C21 16.2386 18.7614 14 16 14H8C5.23858 14 3 16.2386 3 19Z"/>
            </svg>
        </>
    );
}

export default Person;
