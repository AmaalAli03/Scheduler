import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const { spots } = props;
  const formatSpots = () => {
    if (spots === 1) {
      return <span>1 spot remaining</span>;
    } else if (spots === 0) {
      return <span>no spots remaining</span>;
    }
    return (<span>{spots} spots remaining</span>);
  };
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} selected={props.selected} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );

}