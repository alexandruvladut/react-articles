import React from 'react';
import { renderWithProviders } from '../../../utils/renderWithProviders';
import { screen, waitFor, fireEvent } from '@testing-library/react';
import EditArticle from '../EditArticle';

describe('EditArticle Component', () => {
  it('renders edit article form with pre-filled data', async () => {
    renderWithProviders(<EditArticle />, { route: '/articles/1/edit' });

    await waitFor(() => expect(screen.getByDisplayValue('Test Article')).toBeInTheDocument());
    expect(screen.getByDisplayValue('Test Content')).toBeInTheDocument();
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
  });

  it('submits updated article data', async () => {
    renderWithProviders(<EditArticle />, { route: '/articles/1/edit' });

    await waitFor(() => screen.getByDisplayValue('Test Article'));

    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Updated Article' } });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => expect(screen.getByText(/Article updated successfully/i)).toBeInTheDocument());
  });

  it('shows error message when update fails', async () => {
    renderWithProviders(<EditArticle />, { route: '/articles/1/edit' });

    await waitFor(() => screen.getByDisplayValue('Test Article'));

    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => expect(screen.getByText(/Failed to update article/i)).toBeInTheDocument());
  });
});
