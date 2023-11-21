import React from "react";
import { StyledButton, StyledButtonPropsType } from "./style";

interface ButtonPropsType {
    children: any
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    disabled?: boolean
    $style?: StyledButtonPropsType
}

const Button: React.FC<ButtonPropsType> = ({
    children,
    $style,
    ...rest
}) => {
    return (
        <StyledButton
            {...$style}
            {...rest}
        >
            {children}
        </StyledButton>
    )
}

export default Button;
