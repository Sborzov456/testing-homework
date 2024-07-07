import React, { PropsWithChildren } from 'react'
import { MemoryRouter } from 'react-router-dom';

export function renderWithRouterProvider(ui: React.ReactElement) {
    const Wrapper = ({ children }: PropsWithChildren) => <MemoryRouter>{children}</MemoryRouter>;

    return <Wrapper> {ui} </Wrapper>
}
