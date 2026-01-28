import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('App', () => {
  it('renders the main heading', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: /chaos zero nightmare manager/i })
    ).toBeInTheDocument();
  });

  it('displays the welcome message', () => {
    render(<App />);
    expect(
      screen.getByText(
        /welcome to your new project with typescript, tailwind css, and playwright!/i
      )
    ).toBeInTheDocument();
  });

  it('shows the counter button with initial value', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /count is 0/i });
    expect(button).toBeInTheDocument();
  });

  it('increments the counter when button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    const button = screen.getByRole('button', { name: /count is 0/i });
    await user.click(button);

    expect(
      screen.getByRole('button', { name: /count is 1/i })
    ).toBeInTheDocument();
  });

  it('lists all included features', () => {
    render(<App />);

    expect(
      screen.getByText(/vite \+ react \+ typescript/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/tailwind css v4/i)).toBeInTheDocument();
    expect(screen.getByText(/eslint \+ prettier/i)).toBeInTheDocument();
    expect(screen.getByText(/husky \+ lint-staged/i)).toBeInTheDocument();
    expect(screen.getByText(/playwright e2e testing/i)).toBeInTheDocument();
  });
});
