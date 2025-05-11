import { render } from '../../../shared/utils/test-utils';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders without crashing', () => {
    render(<Spinner />);
  });
});
