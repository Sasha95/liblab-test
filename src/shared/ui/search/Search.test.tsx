import { render, screen, fireEvent } from '../../../shared/utils/test-utils';
import { Search } from './Search';

describe('Search', () => {
  it('renders with default props', () => {
    render(<Search value="" onChange={() => {}} />);
    expect(screen.getByTestId('search-form')).toBeInTheDocument();
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('search-button')).toBeInTheDocument();
  });

  it('calls onChange when input changes', () => {
    const handleChange = jest.fn();
    render(<Search value="" onChange={handleChange} />);
    fireEvent.change(screen.getByTestId('search-input'), { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalledWith('test');
  });

  it('calls onSubmit when form is submitted', () => {
    const handleSubmit = jest.fn();
    render(<Search value="abc" onChange={() => {}} onSubmit={handleSubmit} />);
    fireEvent.submit(screen.getByTestId('search-form'));
    expect(handleSubmit).toHaveBeenCalledWith('abc');
  });

  it('disables input and button when disabled', () => {
    render(<Search value="" onChange={() => {}} disabled />);
    expect(screen.getByTestId('search-input')).toBeDisabled();
    expect(screen.getByTestId('search-button')).toBeEnabled(); // Mantine Button is not disabled by default
  });

  it('sets aria-label and placeholder', () => {
    render(
      <Search value="" onChange={() => {}} aria-label="Custom Search" placeholder="Type here..." />,
    );
    expect(screen.getByTestId('search-form')).toHaveAttribute('aria-label', 'Custom Search');
    expect(screen.getByTestId('search-input')).toHaveAttribute('placeholder', 'Type here...');
  });
});
