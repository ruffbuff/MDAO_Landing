import styled from "styled-components";

export interface InlineInputPropsType {
    bg?: string
    color?: string
    border?: string
    between?: string
}

type QueryType = { [key: string]: InlineInputPropsType };

export interface StyledInputPropsType extends InlineInputPropsType {
    queries?: QueryType
}

const setStyle = ({
    bg,
    between,
    color,
    border
}: InlineInputPropsType) => {
    return `
		${bg ? `background-color:			${bg};` : ``}
		${border ? `border:			${border};` : ``}
		${color ? `color:			${color};` : ``}
		${between ? `
			margin: 0 calc(-${between} * 2) 0 -${between};
			&>* {
				padding: 0 ${between};
			}
		` : ``}
	`
}

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

export const InputLabel = styled.span`
    font-size: 0.8rem;
    font-weight: 900;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
`

export const InputContent = styled.div`
    position: relative;
`

export const InputWrapper = styled.label`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1.7rem;
    line-height: 3.5rem;
    min-height: 3.5rem;
    z-index: 1;
`

export const InputBoard = styled.div<StyledInputPropsType>`
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(0, -50%);
    width: 100%;
    height: 100%;
    ${({ queries, ...rest }: StyledInputPropsType) => `
		${setStyle(rest)}
		${queries
            ? Object.keys(queries).reverse()?.map((breakpoint: string) => {
                return `@media (max-width: ${breakpoint}px) {
							${setStyle(queries[breakpoint])}
						}`;
            }).join('')
            : ``
        }
	`}
    border-radius: 1rem;
`

export const StyledInput = styled.input`
    flex: 1;
    display: block;
    min-width: 0;
    padding: 0;
    background: none;
    border: none;
    outline: none;
    font-size: 1rem;
    font-family: var(--body-font);
`

export const StyledTextarea = styled(StyledInput)`
`
