import { render, screen } from '@testing-library/react';
import { LoggedOutHeader, LoggedInHeader } from './Header.stories';
import "../../i18n";


describe('logged out site-header', () => {
  it('should render with the correct text', () => {
    render(<LoggedOutHeader {...LoggedOutHeader.args} />);
    expect(screen.getByText("login")).toBeInTheDocument();
  });
});

describe('logged in site-header', () => {
  it('should render with the correct text', () => {
    render(<LoggedInHeader {...LoggedInHeader.args} />);
    expect(screen.getByText("logout")).toBeInTheDocument();
  });
});
