import { Link } from "react-router-dom";
type Props = {
  to: string;
  bg: string;
  text: string;
  textColor: string;
  onClick?: () => Promise<void>;
};
export const NavigationLink = (props: Props) => {
  return (
    <Link
      onClick={props.onClick}
      className="font-semibold uppercase mx-2 px-4 py-3 rounded-xl"
      to={props.to}
      style={{ background: props.bg, color: props.textColor }}
    >
      {props.text}
    </Link>
  );
};
