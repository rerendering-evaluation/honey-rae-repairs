import { memo } from "react";
export const TicketSearch = memo(({
  setterFunction
}) => {
  return <div>
            <input onChange={changeEvent => {
      setterFunction(changeEvent.target.value);
    }} type="text" placeholder="Enter search terms" />
        </div>;
});