import { SVGAttributes } from "react";
import * as featherIcon from "react-feather";

type IconKey = keyof typeof featherIcon;

interface Props extends SVGAttributes<SVGElement> {
  icon: IconKey;
  size?: string | number;
}

export const Icon = ({ icon, ...props }: Props) => {
  const IconName = featherIcon[icon];
  return <IconName strokeWidth="1" {...props} />;
};
