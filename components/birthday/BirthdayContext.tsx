'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BirthdayState } from '@/types/birthday';

interface BirthdayContextProps {
  state: BirthdayState;
  updateState: (updates: Partial<BirthdayState>) => void;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (index: number) => void;
}

const initialState: BirthdayState = {
  currentStepIndex: 0,
  theme: null,
  cakeType: null,
  flavor: null,
  frosting: '',
  decorations: [],
  personalization: {
    name: '',
    age: '',
    message: '',
  },
  size: null,
  addOns: {},
  delivery: {
    date: '',
    time: '',
    address: '',
    instructions: '',
  },
};

const BirthdayContext = createContext<BirthdayContextProps | undefined>(undefined);

export const BirthdayProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<BirthdayState>(initialState);

  const updateState = (updates: Partial<BirthdayState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    setState((prev) => ({
      ...prev,
      currentStepIndex: Math.min(prev.currentStepIndex + 1, 8),
    }));
  };

  const prevStep = () => {
    setState((prev) => ({
      ...prev,
      currentStepIndex: Math.max(prev.currentStepIndex - 1, 0),
    }));
  };

  const setStep = (index: number) => {
    setState((prev) => ({
      ...prev,
      currentStepIndex: index,
    }));
  };

  return (
    <BirthdayContext.Provider value={{ state, updateState, nextStep, prevStep, setStep }}>
      {children}
    </BirthdayContext.Provider>
  );
};

export const useBirthday = () => {
  const context = useContext(BirthdayContext);
  if (!context) {
    throw new Error('useBirthday must be used within a BirthdayProvider');
  }
  return context;
};
