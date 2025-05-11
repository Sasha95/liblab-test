import { render, screen } from '@testing-library/react';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  const getPageHref = (page: number) => `/page/${page}`;

  it('renders nothing if totalPages <= 1', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} getPageHref={getPageHref} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders correct pages and dots for middle page', () => {
    render(
      <Pagination currentPage={5} totalPages={10} getPageHref={getPageHref} siblingCount={1} />,
    );
    // Should render 1, ..., 4, 5, 6, ..., 10
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getAllByText('…')).toHaveLength(2);
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('renders correct pages for first page', () => {
    render(
      <Pagination currentPage={1} totalPages={5} getPageHref={getPageHref} siblingCount={1} />,
    );
    expect(screen.getByText('1')).toHaveAttribute('aria-current', 'page');
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Prev')).toHaveAttribute('aria-disabled', 'true');
  });

  it('renders correct pages for last page', () => {
    render(
      <Pagination currentPage={5} totalPages={5} getPageHref={getPageHref} siblingCount={1} />,
    );
    expect(screen.getByText('5')).toHaveAttribute('aria-current', 'page');
    expect(screen.getByText('Next')).toHaveAttribute('aria-disabled', 'true');
  });

  it('Prev/Next buttons have correct hrefs and states', () => {
    render(
      <Pagination currentPage={3} totalPages={5} getPageHref={getPageHref} siblingCount={1} />,
    );
    const prev = screen.getByText('Prev');
    const next = screen.getByText('Next');
    expect(prev).toHaveAttribute('href', '/page/2');
    expect(next).toHaveAttribute('href', '/page/4');
    expect(prev).not.toHaveAttribute('aria-disabled', 'true');
    expect(next).not.toHaveAttribute('aria-disabled', 'true');
  });

  it('all page links have correct hrefs', () => {
    render(
      <Pagination currentPage={2} totalPages={4} getPageHref={getPageHref} siblingCount={1} />,
    );
    expect(screen.getByText('1')).toHaveAttribute('href', '/page/1');
    expect(screen.getByText('2')).toHaveAttribute('href', '/page/2');
    expect(screen.getByText('3')).toHaveAttribute('href', '/page/3');
    expect(screen.getByText('4')).toHaveAttribute('href', '/page/4');
  });

  it('has correct aria-label and test id', () => {
    render(<Pagination currentPage={2} totalPages={3} getPageHref={getPageHref} />);
    const nav = screen.getByTestId('pagination');
    expect(nav).toHaveAttribute('aria-label', 'Pagination');
  });

  it('dots are not focusable or links', () => {
    render(
      <Pagination currentPage={5} totalPages={10} getPageHref={getPageHref} siblingCount={1} />,
    );
    const dots = screen.getAllByText('…');
    dots.forEach((dot) => {
      expect(dot.tagName).toBe('SPAN');
    });
  });

  it('supports custom siblingCount', () => {
    render(
      <Pagination currentPage={5} totalPages={10} getPageHref={getPageHref} siblingCount={2} />,
    );
    // Should render more pages around current
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
  });
});
