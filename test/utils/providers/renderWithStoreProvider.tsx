import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';

export function renderWithStoreProviders(ui: React.ReactElement, store: Store) {
  
    const Wrapper = ({ children }: PropsWithChildren) => <Provider store={store}>{children}</Provider>;

    return <Wrapper> {ui} </Wrapper>
}
