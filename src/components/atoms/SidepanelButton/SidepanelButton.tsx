import { Button, Box, Flex } from "@chakra-ui/react";
import { IconType } from "react-icons";
interface SidepanelProps {
  selected: boolean;
  [key: string]: any;
  href: string;
  icon: IconType;
  size?: "small" | "medium" | "large";
  onClick?: () => void;
}

export const SidepanelButton: React.FC<SidepanelProps> = ({
  onClick,
  children,
  size,
  ...props
}) => {
  let colorActive = "#F8F9FA";
  let borderStyle = "none";
  let inverseColor = "white";
  let textColor = "#868e98";

  if (props.selected) {
    colorActive = "white";
    borderStyle = "1px 3px 8px 0px rgba(0,0,0,0.04)";
    inverseColor = "#4FD1C5";
    textColor = "black";
  }

  let widthDiv: string = "30px";
  let heightDiv: string = "25px";
  let iconSize: number;
  if (size) {
    if (size === "small")
      (iconSize = 15), (widthDiv = "30px"), (heightDiv = "25px");
    if (size === "medium")
      (iconSize = 18), (widthDiv = "35px"), (heightDiv = "30px");
    if (size === "large")
      (iconSize = 25), (widthDiv = "45px"), (heightDiv = "35px");
  }

  const icon = () => {
    const iconColor = props.selected ? "white" : "#4FD1C5";
    return <props.icon size={iconSize} color={iconColor}></props.icon>;
  };

  const handleClick = () => {
    props.selected = props.selected ? false : true;
  };
  return (
    <div style={{ width: "80%" }} onClick={onClick}>
      <a href={props.href} style={{ height: "100%", display: "flex" }}>
        <Flex
          fontSize="12px"
          textAlign="left"
          position="relative"
          bg={colorActive}
          fontWeight="bold"
          w="100%"
          h="45"
          color={textColor}
          boxShadow={borderStyle}
          alignItems="center"
          borderRadius="15px"
          _hover={{
            bg: "#F8F9FA",
          }}
          {...props}
        >
          <Box
            style={{
              background: inverseColor,
              display: "flex",
              width: widthDiv,
              height: heightDiv,
              position: "absolute",
              alignItems: "center",
              justifyContent: "center",
              left: "5%",
              borderRadius: "10px",
            }}
          >
            {icon()}
          </Box>
          <Box
            style={{
              position: "absolute",
              left: "30%",
            }}
          >
            {children}
          </Box>
        </Flex>
      </a>
    </div>
  );
};
