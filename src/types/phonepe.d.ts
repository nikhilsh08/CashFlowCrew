declare global {
  interface Window {
    PhonePeCheckout?: {
      transact: (options: {
        tokenUrl: string;
        callback: (response: 'USER_CANCEL' | 'CONCLUDED') => void;
        type?: 'IFRAME' | 'REDIRECT';
      }) => void;
      closePage: () => void;
    };
  }
}

export {};
