import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Card from './Card';

describe('Card', () => {
  it('renders title and description correctly', () => {
    const title = 'Test Title';
    const description = 'Test Description';

    render(<Card title={title} description={description} />);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it('renders children when provided', () => {
    const title = 'Test Card';
    const description = 'Test Description';
    const childContent = 'Child Content';

    render(
      <Card title={title} description={description}>
        <p>{childContent}</p>
      </Card>
    );

    expect(screen.getByText(childContent)).toBeInTheDocument();
  });

  it('renders without children', () => {
    const title = 'Test Card';
    const description = 'Test Description';

    render(<Card title={title} description={description} />);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it('has correct styling classes', () => {
    const { container } = render(
      <Card title="Test" description="Test Description" />
    );

    const card = container.querySelector('div');
    expect(card).toHaveClass(
      'bg-white',
      'rounded-lg',
      'shadow-lg',
      'p-6',
      'border',
      'border-gray-200'
    );
  });
});
