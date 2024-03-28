import React from 'react';
import { describe, expect, it } from "vitest";
import { render, fireEvent } from '@testing-library/react';
import { create } from ".";

describe(() => {
  interface BearState {
    bears: number;
    increase: (by: number) => void;
  }

    it('create store by zustand', () => {

    })
    it('create store by custom create function', () => {
        const useStore = create<BearState>((set) => ({
            bears: 0,
            increase: (by) => set((state) => ({ bears: state.bears + by })),
        }));
      
          const Comp = () => {
            const {bears, increase} = useStore.use(['bears', 'increase']);
            return (
              <>
                <span data-testid="text">{bears}</span>
                <button
                  data-testid="button"
                  onClick={() => {
                    increase(1);
                  }}
                >
                  increase
                </button>
              </>
            );
          };
      
          const { getByTestId } = render(<Comp />);
      
          expect(getByTestId('text').textContent).toBe('0');
      
          fireEvent.click(getByTestId('button'));
      
          expect(getByTestId('text').textContent).toBe('1');
      
          fireEvent.click(getByTestId('button'));
      
          expect(getByTestId('text').textContent).toBe('2');
    })
})