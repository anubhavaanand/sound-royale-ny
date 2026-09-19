import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LobbyLanding } from '../LobbyLanding';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: React.forwardRef(
      ({ children, ...props }: Record<string, unknown>, ref: React.Ref<HTMLDivElement>) =>
        React.createElement('div', { ...props, ref }, children as React.ReactNode),
    ),
    button: React.forwardRef(
      ({ children, ...props }: Record<string, unknown>, ref: React.Ref<HTMLButtonElement>) =>
        React.createElement('button', { ...props, ref }, children as React.ReactNode),
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}));

describe('LobbyLanding', () => {
  const defaultProps = {
    playerNameInput: 'TestPlayer',
    isLoading: false,
    discordAccountStatus: null,
    onCreateMode: vi.fn(),
    onJoinMode: vi.fn(),
    onLinkDiscord: vi.fn(),
    onManageDiscord: vi.fn(),
  };

  it('renders Create and Join buttons', () => {
    render(<LobbyLanding {...defaultProps} />);
    expect(screen.getByTestId('create-room-button')).toBeInTheDocument();
    expect(screen.getByTestId('join-room-mode-button')).toBeInTheDocument();
  });

  it('calls onCreateMode when Create is clicked', () => {
    render(<LobbyLanding {...defaultProps} />);
    fireEvent.click(screen.getByTestId('create-room-button'));
    expect(defaultProps.onCreateMode).toHaveBeenCalledTimes(1);
  });

  it('calls onJoinMode when Join is clicked', () => {
    render(<LobbyLanding {...defaultProps} />);
    fireEvent.click(screen.getByTestId('join-room-mode-button'));
    expect(defaultProps.onJoinMode).toHaveBeenCalledTimes(1);
  });

  it('disables Create and Join when player name is empty', () => {
    render(<LobbyLanding {...defaultProps} playerNameInput="" />);
    expect(screen.getByTestId('create-room-button')).toBeDisabled();
    expect(screen.getByTestId('join-room-mode-button')).toBeDisabled();
  });

  it('shows Link Discord button when Discord is not linked', () => {
    render(<LobbyLanding {...defaultProps} discordAccountStatus={null} />);
    expect(screen.getByText('Link Discord')).toBeInTheDocument();
  });

  it('calls onLinkDiscord when Link Discord is clicked', () => {
    render(<LobbyLanding {...defaultProps} discordAccountStatus={null} />);
    fireEvent.click(screen.getByText('Link Discord'));
    expect(defaultProps.onLinkDiscord).toHaveBeenCalledTimes(1);
  });

  it('does not show Link Discord when Discord is already linked', () => {
    render(
      <LobbyLanding
        {...defaultProps}
        discordAccountStatus={{
          is_linked: true,
          discord_username: 'testuser',
        }}
      />,
    );
    expect(screen.queryByText('Link Discord')).not.toBeInTheDocument();
  });
});
