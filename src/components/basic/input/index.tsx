import React from "react";
import { InputBoard, InputContainer, InputContent, InputLabel, InputWrapper, StyledInput, StyledInputPropsType, StyledTextarea } from "./style";

type InputPropsType = {
    label?: string | React.ReactNode
    value?: string
    onChange?: any
    placeholder?: string
    helpSide?: any
    $style?: StyledInputPropsType
}

export const Input: React.FC<InputPropsType> = ({
    label,
    helpSide,
    $style,
    ...rest
}) => {
    return (
        <InputContainer>
            {label && (<InputLabel>{label}</InputLabel>)}
            <InputContent>
                <InputWrapper>
                    <StyledInput {...rest} />
                    {helpSide}
                </InputWrapper>
                <InputBoard {...$style} />
            </InputContent>
        </InputContainer>
    )
}

type TextareaPropsType = InputPropsType & {}

export const Textarea: React.FC<TextareaPropsType> = ({
    label,
    helpSide,
    $style,
    ...rest
}) => {
    return (
        <InputContainer>
            {label && (<InputLabel>{label}</InputLabel>)}
            <InputContent>
                <InputWrapper>
                    <StyledTextarea as="textarea" rows={5} {...rest} />
                    {helpSide}
                </InputWrapper>
                <InputBoard {...$style} />
            </InputContent>
        </InputContainer>
    )
}
