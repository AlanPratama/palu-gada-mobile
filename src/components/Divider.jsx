import { View } from "react-native";

export default function Divider ({
  width = 1,
  orientation = "horizontal",
  color = "#343434",
  twClass,
}) {
  const dividerStyles = [
    { width: orientation === "horizontal" ? "100%" : width },
    { height: orientation === "vertical" ? "100%" : width },
    { backgroundColor: color },
  ];

  return <View style={dividerStyles} className={twClass} />;
};
