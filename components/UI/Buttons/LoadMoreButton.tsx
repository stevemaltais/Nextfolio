// LoadMoreButton.js
import React from 'react';
import PrimaryButton from '@/components/UI/Buttons/PrimaryButton';

const LoadMoreButton = ({ onClick, loading, className }) => {
  return (
    <PrimaryButton
      text={loading ? 'Chargement...' : 'Charger plus'}
      onClick={onClick}
      className={className}
      isButton
    />
  );
};

export default LoadMoreButton;
