import { cleanup, render, waitFor } from '@testing-library/react';
import DataGrid from './DataGrid';

function getCell(rowIndex, colIndex) {
  const cell = document.querySelector(
    `[role="row"][data-rowindex="${rowIndex}"] [role="cell"][data-colindex="${colIndex}"]`,
  );
  if (cell == null) {
    throw new Error(`Cell ${rowIndex} ${colIndex} not found`);
  }
  return cell;
}

function ResizeObserverMock(callback) {
  let timeout;

  return {
    observe: (element) => {
      // Simulates the async behavior of the native ResizeObserver
      timeout = setTimeout(() => {
        callback([{ borderBoxSize: [{ blockSize: element.clientHeight }] }]);
      });
    },
    disconnect: () => {
      clearTimeout(timeout);
    },
    unobserve: () => {},
  };
}

const originalResizeObserver = window.ResizeObserver;

beforeEach(() => {
  window.ResizeObserver = ResizeObserverMock;
});

afterEach(() => {
  window.ResizeObserver = originalResizeObserver;
});

it('DataGrid', async () => {
  render(<DataGrid />);

  await waitFor(() => {
    expect(getCell(0, 1).textContent).toBe('John Doe');
  })
});