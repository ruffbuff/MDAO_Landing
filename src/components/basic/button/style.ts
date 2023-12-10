import styled from "styled-components";

export type StyledButtonPropsType = {
    bg?: string
    color?: string
    p?: string
    w?: string
    h?: string
    fsize?: string
    kind?: 'clip' | 'radius' | 'rect'
    border?: string
    hover?: string
}

export const StyledButton = styled.button<StyledButtonPropsType>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
    text-transform: uppercase;
    white-space: nowrap;
    font-family: var(--body-font);
    transition: background-color .3s;
    ${({ w }) => w ? `width: ${w};` : ``}
    &:hover {
        ${({ hover }) => hover ? `background: var(--${hover});` : ``}
    }
    ${({ border }) => border ? `border: ${border};` : ``}
    ${({ h }) => `line-height: ${h ? h : '2.69rem'};`}
    ${({ h }) => `min-height: ${h ? h : '2.69rem'};`}
    ${({ p }) => `padding: ${p ?? '0 2rem'};`}
    ${({ bg }) => bg ? `background: ${bg};` : ``}
    ${({ color }) => color ? `color: ${color};` : ``}
    ${({ fsize }) => fsize ? `font-size: ${fsize};` : ``}
    ${({ kind }) => {
        if (kind) {
            switch (kind) {
                case 'clip':
                    return 'clip-path: polygon(25% 0%, 100% 0, 100% 76%, 79% 100%, 0 100%, 0 25%);';
                case 'radius':
                    return 'border-radius:0.9rem';
                default:
                    return '';
            }
        }
        return ``
    }}

`
